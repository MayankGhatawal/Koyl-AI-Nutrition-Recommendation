from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch

# Load the model once
model_name = "t5-small"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

def generate_nutrition_response(query: str) -> str:
    prompt = f"Recommend a diet based on the following medical conditions and allergies:\n{query}"
    inputs = tokenizer.encode(prompt, return_tensors="pt", max_length=512, truncation=True)

    outputs = model.generate(inputs, max_length=150, num_return_sequences=1, early_stopping=True)
    decoded = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return decoded
