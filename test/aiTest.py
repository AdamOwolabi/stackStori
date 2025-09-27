import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load your .env file
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("⚠️ No GEMINI_API_KEY found. Add it to your .env or environment variables.")

genai.configure(api_key=api_key)

# Correct usage
model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    system_instruction="Always respond with"
)

try:
    response = model.generate_content("Hello Gemini! Can you confirm you're working?")
    print("✅ Gemini response:")
    print(response.text)
except Exception as e:
    print("❌ Error calling Gemini API:", e)