const input = document.getElementById("message");

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const userText = input.value;
    if (!userText) return;

    addMessage(userText, "user");
    input.value = "";

    const typing = addMessage("AIが入力中...", "ai");

    const res = await fetch("/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: userText})
    });

    const data = await res.json();
    typing.remove();
    typeEffect(data.response);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv;
}

function typeEffect(text) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "ai");
    chatBox.appendChild(messageDiv);

    let i = 0;
    const interval = setInterval(() => {
        messageDiv.innerText += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 20);
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}