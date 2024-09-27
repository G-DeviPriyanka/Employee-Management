# app.py
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your actual Gemini API endpoint and key
GEMINI_API_URL = "https://api.gemini.com/v1/chat"
GEMINI_API_KEY = "AIzaSyDGXZ5zxwcXl01fuB3xFrnBa3gyyWa0b_E"

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    # Call the Gemini API
    response = requests.post(
        GEMINI_API_URL,
        json={"message": user_message},
        headers={"Authorization": f"Bearer {GEMINI_API_KEY}"}
    )
    if response.status_code == 200:
        api_response = response.json()
        return jsonify(api_response)
    else:
        return jsonify({"error": "Error communicating with Gemini API"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
