import { Request, Response } from "express";
import { getAiSuggestions } from "../services/aiService";

// Controlador para POST /api/ai
export async function handleAiSuggest(req: Request, res: Response) {
  try {
    const { csvData, meta } = req.body;
    if (!csvData || !Array.isArray(csvData)) {
      return res
        .status(400)
        .json({ error: "csvData debe ser un array de objetos" });
    }
    // Llama al servicio de IA (mock por ahora)
    const result = await getAiSuggestions(csvData, meta);
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error interno en IA", details: (err as Error).message });
  }
}
