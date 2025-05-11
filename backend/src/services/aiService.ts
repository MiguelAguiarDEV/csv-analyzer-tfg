import { askGemini } from "./geminiClient";

// Servicio para conectar con Gemini AI y generar sugerencias de gráficas/informe

export async function getAiSuggestions(csvData: any[], meta: any) {
  // Tipos de gráficas soportados actualmente
  const supportedCharts = [
    {
      type: "bar",
      description:
        "Gráfica de barras: requiere xKey (columna categórica) y yKey (columna numérica).",
    },
    // Puedes agregar más tipos aquí en el futuro, por ejemplo: { type: "pie", description: "..." }
  ];

  // Construir un prompt para Gemini
  let prompt = "";
  if (meta?.onlySummary) {
    prompt = `Eres un asistente experto en análisis de datos. Resume brevemente el siguiente dataset CSV para un usuario no técnico. Describe el tipo de datos, el rango de valores, la variedad de columnas y cualquier característica relevante o curiosidad general. No sugieras gráficas ni análisis avanzado, solo un resumen general y amigable.\n\nColumnas: ${JSON.stringify(
      meta?.columns
    )}\nResumen de columnas: ${JSON.stringify(
      meta?.summary
    )}\nMuestra de datos: ${JSON.stringify(csvData.slice(0, 5))}`;
  } else {
    prompt = `
Eres un asistente experto en análisis de datos. Analiza el siguiente resumen de un archivo CSV y sugiere:
- Al menos una gráfica relevante (tipo, columnas X/Y, título, breve descripción)
- Un informe breve sobre tendencias o insights generales
- Para cada gráfica sugerida, incluye una conclusión clara, específica y basada en los datos presentes sobre lo que revela esa gráfica (no solo descripción, sino interpretación y mensaje clave). La conclusión debe destacar patrones, tendencias, anomalías, grupos sobresalientes o correlaciones observadas en la gráfica, y debe estar redactada como una observación directa sobre los datos, evitando frases condicionales o hipotéticas como 'permitiría observar' o 'se podría apreciar'. Usa frases como "se observa que...", "destacan...", "la mayoría...", "existe una tendencia...", "se aprecia una correlación...", etc. No repitas la descripción, enfócate en el análisis visual y comparativo.
- El informe debe incluir observaciones y conclusiones sobre las gráficas sugeridas, explicando qué aporta cada una y qué conclusiones se pueden extraer de ellas

SOLO puedes sugerir los siguientes tipos de gráficas (no inventes otros):
${supportedCharts.map((c) => `- ${c.type}: ${c.description}`).join("\n")}

Columnas: ${JSON.stringify(meta?.columns)}
Resumen de columnas: ${JSON.stringify(meta?.summary)}
Muestra de datos: ${JSON.stringify(csvData.slice(0, 5))}

Responde en JSON con la estructura:
{
  "charts": [
    { "type": "bar", "xKey": string, "yKey": string, "title": string, "description": string, "conclusion": string }
  ],
  "report": string // Informe general que incluya conclusiones sobre las gráficas sugeridas
}
`;
  }
  const aiResponse = await askGemini(prompt);
  try {
    // Buscar el primer bloque JSON en la respuesta
    const match = aiResponse.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    // Si no hay JSON, devolver informe plano
    return { charts: [], report: aiResponse };
  } catch (e) {
    return { charts: [], report: aiResponse };
  }
}
