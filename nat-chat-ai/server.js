// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const client = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1",
// });

// app.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     const response = await client.chat.completions.create({
//       model: "deepseek/deepseek-chat", // ✅ DeepSeek model
//       messages: [
//         { role: "system", content: "You are Nat, a friendly and cute AI assistant." },
//         { role: "user", content: message },
//       ],
//     });

//     res.json({ reply: response.choices[0].message.content });
//   } catch (err) {
//     console.error("❌ AI error:", err.response?.data || err.message || err);
//     res.status(500).json({ error: err.response?.data || err.message });
//   }
// });

// app.listen(3000, () => {
//   console.log("✅ Server running on http://localhost:3000");
// });

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ✅ Health check route (for testing backend is alive)
app.get("/", (req, res) => {
  res.send("✅ Backend is live!");
});

// ✅ Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        { role: "system", content: "You are Nat, a friendly and cute AI assistant." },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("❌ AI error:", err.response?.data || err.message || err);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// ✅ IMPORTANT: use Render’s provided port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
