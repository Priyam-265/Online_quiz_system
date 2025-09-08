// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(bodyParser.json());

// // ✅ Explicit CORS setup
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://127.0.0.1:3000", // Add this line
//       "https://online-quiz-system-t7it.onrender.com",
//     ],
//     credentials:true,
//     methods: ["GET", "POST"],
//   })
// );


// const client = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1",
// });

// // ✅ Health check route
// app.get("/", (req, res) => {
//   res.send("✅ Backend is live!");
// });

// // ✅ Chat endpoint
// app.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     const response = await client.chat.completions.create({
//       model: "deepseek/deepseek-chat",
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

// // ✅ Use Render’s provided PORT
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// ✅ Allowed origins (must include your frontend!)
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://online-quiz-system-front.onrender.com", // ✅ frontend, not backend
];

// ✅ Global CORS middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ✅ Health check
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

// ✅ Use Render’s provided PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
