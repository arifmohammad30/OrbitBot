# Use Python 3.11 slim for better performance and compatibility
FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PIP_DEFAULT_TIMEOUT=600
ENV PIP_NO_CACHE_DIR=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

# Set work directory
WORKDIR /app

# Install system dependencies in one layer for better caching
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    git \
    curl \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Upgrade pip and install wheel for faster builds
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# Copy requirements first for better layer caching
COPY requirements.txt ./

# Install Python dependencies step by step to identify problematic packages
RUN pip install --no-cache-dir fastapi uvicorn[standard] python-dotenv requests

# Install LangChain packages
RUN pip install --no-cache-dir langchain langchain-community langchain-together

# Install ChromaDB and related packages
RUN pip install --no-cache-dir chromadb sentence-transformers

# Install remaining packages
RUN pip install --no-cache-dir nest-asyncio neo4j pydantic typing-extensions

# Copy application code
COPY main.py ./

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash app && \
    chown -R app:app /app
USER app

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 