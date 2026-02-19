const toggleBtn = document.getElementById("toggleMode");
toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
};

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chat-box");
  const message = input.value;

  if (!message) return;

  chatBox.innerHTML += `
    <div class="message user">
      <p>${message}</p>
      <img src="IMG_7006.jpeg">
    </div>
  `;

  input.value = "";

  chatBox.innerHTML += `
    <div class="message bot typing">
      <img src="IMG_7004.jpeg">
      <p>Typing...</p>
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const botReply = data.choices[0].message.content;

  document.querySelector(".typing").remove();

  chatBox.innerHTML += `
    <div class="message bot">
      <img src="IMG_7004.jpeg">
      <p>${botReply}</p>
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;
}
