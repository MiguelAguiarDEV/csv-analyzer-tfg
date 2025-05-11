import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY no está definida en el entorno");
}

export async function askGemini(prompt: string): Promise<string> {
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };
  const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
  const res = await axios.post(url, body, {
    headers: { "Content-Type": "application/json" },
    timeout: 20000,
  });
  // Gemini responde en res.data.candidates[0].content.parts[0].text
  return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
