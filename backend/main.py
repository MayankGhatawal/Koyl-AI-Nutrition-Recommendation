from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from rag.retriever import retrieve_documents
from rag.generator import generate_nutrition_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    symptoms: str
    allergies: str

class NutritionRecommendation(BaseModel):
    recommendations: List[str]
    summary: str

@app.post("/api/recommend", response_model=NutritionRecommendation)
async def recommend(data: Query):
    try:
        query = f"Symptoms: {data.symptoms}. Allergies: {data.allergies}."
        retrieved_docs = retrieve_documents(query, top_k=5)

        combined_context = "\n".join(retrieved_docs)
        full_prompt = f"{query}\n\nRelevant Information:\n{combined_context}"

        summary = generate_nutrition_response(full_prompt)

        return {
            "recommendations": retrieved_docs,
            "summary": summary
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
