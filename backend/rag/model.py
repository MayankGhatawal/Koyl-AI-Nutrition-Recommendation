import google.generativeai as genai

# Set your API key here
genai.configure(api_key="AIzaSyA0XGfZZ0ODrA9UqhlPzc9r1VswxHYxDwA")  # Replace with your actual key

def generate_nutrition_response(query: str) -> str:
    prompt = f"Based on the following details, recommend a suitable diet:\n{query}"
    try:
        model = genai.GenerativeModel("chat-bison-001")
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error generating response: {str(e)}"
