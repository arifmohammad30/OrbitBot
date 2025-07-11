# Stable Dockerfile for OrbitBot Backend
FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PIP_DEFAULT_TIMEOUT=600
ENV PIP_NO_CACHE_DIR=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --upgrade pip setuptools wheel

# Copy requirements
COPY requirements.txt ./requirements.txt

# Install packages with multiple fallback strategies
RUN pip install --no-cache-dir fastapi==0.104.1 uvicorn[standard]==0.24.0 python-dotenv==1.0.0 requests==2.31.0 || \
    pip install --no-cache-dir --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org fastapi==0.104.1 uvicorn[standard]==0.24.0 python-dotenv==1.0.0 requests==2.31.0

# Install LangChain packages with more flexible versions
RUN pip install --no-cache-dir "langchain>=0.0.350,<0.1.0" "langchain-community>=0.0.10,<0.1.0" "langchain-together>=0.3.0,<0.4.0" || \
    pip install --no-cache-dir --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org "langchain>=0.0.350,<0.1.0" "langchain-community>=0.0.10,<0.1.0" "langchain-together>=0.3.0,<0.4.0"

# Install ChromaDB and sentence-transformers
RUN pip install --no-cache-dir chromadb==0.4.18 sentence-transformers==2.2.2 || \
    pip install --no-cache-dir --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org chromadb==0.4.18 sentence-transformers==2.2.2

# Install remaining packages
RUN pip install --no-cache-dir nest-asyncio==1.5.8 neo4j==5.15.0 pydantic==2.5.0 typing-extensions==4.8.0 || \
    pip install --no-cache-dir --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org nest-asyncio==1.5.8 neo4j==5.15.0 pydantic==2.5.0 typing-extensions==4.8.0

# Copy application code
COPY main.py ./

# Create non-root user
RUN useradd --create-home --shell /bin/bash app && \
    chown -R app:app /app
USER app

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/ || exit 1

# Run the application
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"] 