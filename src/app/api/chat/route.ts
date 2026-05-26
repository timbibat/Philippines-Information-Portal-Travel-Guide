import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: "GEMINI_API_KEY environment variable is not configured. Please set it in Settings > Secrets." 
      }, { status: 500 });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

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
    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    return NextResponse.json({ error: error?.message || "An error occurred with the AI assistant." }, { status: 550 });
  }
}
