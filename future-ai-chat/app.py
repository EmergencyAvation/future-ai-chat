from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

chatbot = pipeline(
    "text-generation",
    model="rinna/japanese-gpt2-medium"
)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]

    prompt = f"ユーザー: {user_message}\nAI:"
    response = chatbot(prompt, max_length=150, do_sample=True, temperature=0.7)

    text = response[0]["generated_text"]
    ai_reply = text.split("AI:")[-1]

    return jsonify({"response": ai_reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
