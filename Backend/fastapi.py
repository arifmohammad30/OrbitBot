# ==============================================================================
# 1. IMPORTS & SETUP
# ==============================================================================
import os
import asyncio
from dotenv import load_dotenv

# Import FastAPI and related modules
from fastapi import FastAPI
from pydantic import BaseModel

# Import LangChain components
from langchain_community.vectorstores import Chroma
from langchain_community.graphs import Neo4jGraph
from langchain.chains import GraphCypherQAChain, RetrievalQA
from langchain_together import ChatTogether
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.prompts import PromptTemplate

# Load environment variables from the .env file
load_dotenv()
print("✅ Imports complete and environment variables loaded.")

# ==============================================================================
# 2. CONFIGURATION & CONNECTIONS
# ==============================================================================
# --- LLM and API Configuration ---
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

# --- Neo4j Database Connection ---
NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = "neo4j"
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

# --- ChromaDB Vector Store Path ---
CHROMA_PERSIST_DIR = "OrbitBot/Backend/chroma_db" # Assumes DB is in the same project folder

# ==============================================================================
# 3. INITIALIZE MODELS AND RETRIEVERS
# ==============================================================================
# --- Initialize the LLM via Together AI ---
try:
    llm = ChatTogether(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        temperature=0,
        max_tokens=2048
    )
    print(f"✅ LLM Initialized with Together AI model: {llm.model}")
except Exception as e:
    print(f"❌ Failed to initialize LLM. Check your TOGETHER_API_KEY. Error: {e}")

# --- Initialize the Embedding Model ---
embedding_model = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

# --- Connect to Neo4j Graph ---
try:
    graph = Neo4jGraph(
        url=NEO4J_URI,
        username=NEO4J_USERNAME,
        password=NEO4J_PASSWORD
    )
    print("✅ Successfully connected to Neo4j.")
except Exception as e:
    print(f"❌ Failed to connect to Neo4j. Check credentials. Error: {e}")

# --- Load ChromaDB Vector Store ---
try:
    vector_store = Chroma(
        persist_directory=CHROMA_PERSIST_DIR,
        embedding_function=embedding_model
    )
    retriever = vector_store.as_retriever(search_kwargs={'k': 3}) # Retrieve top 3 chunks
    print(f"✅ Successfully loaded ChromaDB with {vector_store._collection.count()} documents.")
except Exception as e:
    print(f"❌ Failed to load ChromaDB. Make sure the path is correct. Error: {e}")


# ==============================================================================
# 4. DEFINE QUERY FUSION LOGIC
# ==============================================================================
# --- Master Synthesis Prompt ---
synthesis_prompt_template = """
You are an expert AI assistant for ISRO's MOSDAC portal. Your mission is to provide a single, clear, and comprehensive answer to the user's question by synthesizing information from two distinct sources: a Knowledge Graph and a set of documents.

THE USER'S QUESTION:
"{user_question}"

CONTEXTUAL INFORMATION:
Here is the information you have gathered:

1.  **DIRECT FACTS FROM KNOWLEDGE GRAPH:**
    These are precise, structured facts and should be considered the primary source of truth. If this section is empty or contains an error message, no direct facts were found.
    - {kg_results}

2.  **RELEVANT EXCERPTS FROM DOCUMENTS (Vector Search):**
    This text provides broader context and explanations. If this section is empty or contains an error message, no relevant documents were found.
    - {rag_results}

INSTRUCTIONS:
1.  Synthesize a single, final answer to the user's question based on the provided information.
2.  Prioritize the Knowledge Graph facts for specific data points. Use the document excerpts for explanation.
3.  If no relevant information is found, politely state that. Do not make up information.

FINAL ANSWER:
"""

SYNTHESIS_PROMPT = PromptTemplate(
    input_variables=["user_question", "kg_results", "rag_results"],
    template=synthesis_prompt_template,
)

# --- Asynchronous Query Functions ---
async def query_knowledge_graph_async(question: str):
    """Queries the Neo4j Graph asynchronously."""
    print("Querying Knowledge Graph...")
    try:
        cypher_chain = GraphCypherQAChain.from_llm(graph=graph, llm=llm, verbose=True)
        response = await asyncio.to_thread(cypher_chain.invoke, {"query": question})
        return response.get('result', 'No result found.')
    except Exception as e:
        return f"Error querying Knowledge Graph: {e}"

async def query_vector_db_async(question: str):
    """Queries the ChromaDB Vector Store asynchronously."""
    print("Querying Vector DB...")
    try:
        rag_chain = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, verbose=True)
        response = await asyncio.to_thread(rag_chain.invoke, {"query": question})
        return response.get('result', 'No result found.')
    except Exception as e:
        return f"Error querying Vector DB: {e}"

# ==============================================================================
# 5. CREATE THE FASTAPI APPLICATION
# ==============================================================================
app = FastAPI(
    title="MOSDAC-IntelliBot API",
    description="A Hybrid RAG API using a Knowledge Graph and Vector DB with Together AI."
)

class QueryRequest(BaseModel):
    question: str

@app.post("/query-fusion")
async def handle_query_fusion(request: QueryRequest):
    """
    Handles a user query by querying both data sources in parallel and synthesizing an answer.
    """
    user_question = request.question
    
    kg_task = query_knowledge_graph_async(user_question)
    rag_task = query_vector_db_async(user_question)
    kg_results, rag_results = await asyncio.gather(kg_task, rag_task)

    synthesis_chain = SYNTHESIS_PROMPT | llm
    final_answer = await synthesis_chain.ainvoke({
        "user_question": user_question,
        "kg_results": kg_results,
        "rag_results": rag_results
    })

    return {
        "question": user_question,
        "answer": final_answer.content,
        "sources": { "knowledge_graph": kg_results, "vector_database": rag_results }
    }

@app.get("/")
def read_root():
    return {"status": "MOSDAC-IntelliBot API is running!"}