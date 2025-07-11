# OrbitBot: MOSDAC Knowledge Navigator

OrbitBot is a full-stack AI-powered assistant for ISRO's MOSDAC (Meteorological and Oceanographic Satellite Data Archival Center) portal it is a part of  Bharatiya Antariksh Hackathon 2025 conducted by @ISRO . It leverages advanced Retrieval-Augmented Generation (RAG) techniques, combining a knowledge graph, vector database, and large language models to provide accurate, context-rich answers about MOSDAC's data and services.

---

## 🌐Live Demo

- **Frontend:** [https://orbit-bot.vercel.app/](https://orbit-bot.vercel.app/)
- **Backend API:** [https://orbitbot.onrender.com/](https://orbitbot.onrender.com/)

---

## 🚀 Features

- **Hybrid RAG Search:** Combines knowledge graph and vector search for robust answers.
- **Modern UI:** Built with React, Vite, TypeScript, and Tailwind CSS.
- **FastAPI Backend:** Python backend with LangChain, ChromaDB, Neo4j, and HuggingFace integration.
- **Seamless Deployment:** Frontend on Vercel, backend on Render.
- **API Documentation:** Swagger UI available at `/docs` on the backend.

---

## 🗂️ Project Structure

```
ISRO/
  OrbitBot/
    Backend/      # FastAPI backend, vector DB, KG, LLM logic
    UI/           # Vite + React frontend
```

---

## 🏗️ Architecture & Workflow

```mermaid
graph TD
  A[User] -->|Asks Question| B(React/Vite Frontend)
  B -->|POST /hybrid-search| C(FastAPI Backend)
  C -->|Query| D1[Knowledge Graph (Neo4j)]
  C -->|Query| D2[Vector DB (ChromaDB)]
  D1 -->|KG Facts| C
  D2 -->|Relevant Docs| C
  C -->|Prompt| E[LLM (LangChain + TogetherAI)]
  E -->|Answer| C
  C -->|Response| B
  B -->|Displays Answer| A
```

---

## 🖥️ Frontend (UI)

### Tech Stack

- React + Vite + TypeScript
- Tailwind CSS

### Local Development

```sh
cd OrbitBot/UI
npm install
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

### API Endpoint Configuration

- The frontend communicates with the backend at `https://orbitbot.onrender.com`.
- For local development, you can set the API base URL using a `.env` file:
  ```
  VITE_API_BASE_URL=http://127.0.0.1:8000
  ```
  In your code, use:
  ```js
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  ```

### Deployment

- Deployed on [Vercel](https://vercel.com/).
- To deploy your own, connect your repo to Vercel, set the project root to `UI`, and set environment variables as needed.

---

## 🧠 Backend (API)

### Tech Stack

- FastAPI (Python 3.11)
- LangChain, ChromaDB, Neo4j, HuggingFace
- CORS enabled for frontend integration

### Setup & Run Locally

1. **Install Python 3.11** (see `runtime.txt`)
2. **Install dependencies:**
   ```sh
   cd OrbitBot/Backend
   python -m venv venv
   source venv/bin/activate  # or .\venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
3. **Configure environment variables:**  
   Create a `.env` file in `Backend/` with:
   ```
   TOGETHER_API_KEY=your_together_api_key
   HF_API_KEY=your_huggingface_api_key
   NEO4J_URI=bolt://your_neo4j_host:7687
   NEO4J_USERNAME=your_neo4j_username
   NEO4J_PASSWORD=your_neo4j_password
   ```
4. **Ensure ChromaDB data is present:**  
   Place your ChromaDB folder at `OrbitBot/Backend/chroma_db/`.
5. **Run the server:**
   ```sh
   uvicorn main:app --reload
   ```
   Access API docs at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### Deployment

- Deployed on [Render](https://render.com/).
- For your own deployment, set environment variables in the Render dashboard.

---

## 📦 Backend Requirements

See `OrbitBot/Backend/requirements.txt` for all dependencies.

---

## 📝 API Usage

- **POST `/hybrid-search`**  
  Request:
  ```json
  { "question": "What is MOSDAC?" }
  ```
  Response:
  ```json
  {
    "question": "...",
    "answer": "...",
    "kg_context": "...",
    "vector_db_context": "..."
  }
  ```

- **GET `/`**  
  Health check endpoint.



---

## 🛡️ Security

- **Never commit secrets:**  
  Ensure `.env` is in `.gitignore` and never pushed to the repository.
- **Regenerate API keys** if accidentally exposed.

---


---

## 📄 License

MIT License

---

## 📢 Acknowledgements

- ISRO MOSDAC: [https://mosdac.gov.in/](https://mosdac.gov.in/)
- LangChain, HuggingFace, Neo4j, ChromaDB, Vercel, Render

---

## 👥 Team

* **Mohammad Arif**
* **Tamma Kundanareddy**
* **Mandapati Lakshman Kumar**

---

## 
