console.log("NAT_API in window:", window.NAT_API);
console.log("API_BASE is:", API_BASE);
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const chatbox = document.getElementById("chatbox");
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const character = document.getElementById("character");

  if (!chatbox || !chatMessages || !userInput || !sendBtn || !character) {
    console.warn("Chat elements or #character not found — check your HTML IDs.");
    return;
  }

  const BOT_EMOJI = "🐰 ";
  const USER_EMOJI = "🐼 ";
  let thinkingEl = null;

  // Create a message bubble
  function addMessage(type, text) {
    const wrapper = document.createElement("div");
    wrapper.className = type === "bot" ? "text-left py-1" : "text-right py-1";

    const bubble = document.createElement("span");
    if (type === "bot") {
      bubble.className =
        "inline-block px-3 py-1 rounded-lg text-sm bg-white/90 dark:bg-gray-800/90 text-black dark:text-white";
      bubble.textContent = BOT_EMOJI + text;
    } else {
      bubble.className =
        "inline-block px-3 py-1 rounded-lg text-sm bg-black text-[#c5c0b2] dark:bg-white dark:text-black";
      bubble.textContent = USER_EMOJI + text;
    }

    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);

    gsap.from(wrapper, { opacity: 0, y: 8, duration: 0.28, ease: "power2.out" });
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return wrapper;
  }

  // Add a thinking placeholder
  function addThinking() {
    thinkingEl = addMessage("bot", "Thinking... 🤔");
    const span = thinkingEl.querySelector("span");
    span.classList.add("italic", "opacity-70");
    return thinkingEl;
  }

  // Replace thinking bubble with real AI response
  function replaceThinkingWith(text) {
    if (!thinkingEl) {
      addMessage("bot", text);
      return;
    }
    const span = thinkingEl.querySelector("span");
    span.classList.remove("italic", "opacity-70");
    span.textContent = BOT_EMOJI + text;
    thinkingEl = null;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Show chatbox (animated) + greet once
  ScrollTrigger.create({
    trigger: "#character",
    start: "top 75%",
    once: true,
    onEnter: () => {
      if (chatbox.classList.contains("hidden")) chatbox.classList.remove("hidden");
      gsap.fromTo(
        chatbox,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );

      setTimeout(() => {
        addMessage("bot", "Hi — I’m Nat! 🌸");
        userInput.focus();
      }, 280);
    },
  });
  // const API_BASE = window.NAT_API || "http://localhost:3000";

const API_BASE =
  window.NAT_API ||
  (window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://online-quiz-system-t7it.onrender.com");

console.log("NAT_API in window:", window.NAT_API);
console.log("API_BASE is:", API_BASE);


  // 🔹 Call your backend AI server (DeepSeek free model)
  async function fetchAIResponse(message) {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      return data.reply || "Sorry, I didn’t understand that. 😅";
    } catch (err) {
      console.error("❌ Fetch error:", err);
      return "Oops, something went wrong. 😢";
    }
  }

  // Handle sending user text
  async function handleUserText(text) {
    addMessage("user", text);
    addThinking();

    const reply = await fetchAIResponse(text);
    replaceThinkingWith(reply);
  }

  // Send button
  sendBtn.addEventListener("click", () => {
    const txt = userInput.value.trim();
    if (!txt) return;
    userInput.value = "";
    handleUserText(txt);
    userInput.focus();
  });

  // Enter key = send
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });

  // Escape key = close chatbox
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!chatbox.classList.contains("hidden")) {
        gsap.to(chatbox, {
          opacity: 0,
          duration: 0.25,
          onComplete: () => chatbox.classList.add("hidden"),
        });
      }
    }
  });
});
