from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json
import os

# Initialize the model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Construct path to sources.json relative to this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "data", "sources.json")

# Load documents
with open(DATA_PATH, "r", encoding="utf-8") as f:
    documents = json.load(f)

# Prepare corpus and metadata
corpus = [doc["content"] for doc in documents]
metadata = [doc["meta"] for doc in documents]

# Generate embeddings and initialize FAISS index
embeddings = model.encode(corpus)
index = faiss.IndexFlatL2(embeddings[0].shape[0])
index.add(np.array(embeddings))

# Define retrieval function
def retrieve_documents(query, top_k=5):
    query_vec = model.encode([query])
    D, I = index.search(np.array(query_vec), top_k)
    return [corpus[i] for i in I[0]]
