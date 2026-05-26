import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Chat endpoint for Interactive Tour Operator & Travel Planner
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY environment variable is not configured. Please set it in Settings > Secrets." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Format custom history if supplied, matching Gemini structure
      const chatHistory = history || [];

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: `You are a warm, vibrant, and enthusiastic Philippine Tour Guide & Cultural Concierge named "Bayani" (meaning Hero). Your job is to welcome tourists and answer questions about the Philippines' culture, heritage, geography (the 3 main groups: Luzon, Visayas, Mindanao), travel tips, festivals, and food.

Guidelines:
1. Embody Filipino Hospitality: Use warm, humble, hospitable, and friendly language. Include Filipino phrases occasionally like "Mabuhay!" (Welcome / Long Live!), "Salamat!" (Thank you), "Kumusta?" (How are you?), and "Kain tayo!" (Let's eat!), but keep them easy to understand.
2. Itinerary Planning: When asked to plan a trip, structure a beautiful day-by-day travel itinerary. Give concrete suggestions for hotels/resorts, activities, transport, and local culinary delicacies (e.g. recommending Halo-Halo on a sunny afternoon or Lechon in Cebu).
3. Highly Visually Structured: Use headers, clean bullet points, bold accents, and clear sections in markdown format to make your tips extremely easy to read.
4. Keep answers factual, exciting, tourist-friendly, and safe. Suggest local festivals matching the interest (such as Ati-Atihan, Sinulog, or Panagbenga).`,
        },
        history: chatHistory
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Chat API Error:", error);
      res.status(500).json({ error: error?.message || "An error occurred with the AI assistant." });
    }
  });

  // Vite development server / production static server middleware integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite hot-reload middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode serving static dist files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Fulfilled full-stack server running successfully at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal server initialization error:", err);
});
