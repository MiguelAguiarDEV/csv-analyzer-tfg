# csv-analyzer Backend

Este backend está construido con Node.js, Express y TypeScript. Expone el endpoint `/api/ai` para recibir datos/metadatos de un CSV y devolver sugerencias de gráficas e informes generados por IA (Gemini AI).

## Estructura de carpetas

- `src/` - Código fuente principal
  - `routes/` - Definición de rutas Express
  - `controllers/` - Lógica de controladores
  - `services/` - Lógica de negocio y conexión con IA
- `dist/` - Archivos compilados (no versionar)

## Scripts

- `npm run dev` - Desarrollo con recarga automática
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar servidor compilado

## Instalación

1. Instala dependencias: `npm install`
2. Copia `.env.example` a `.env` y configura tus claves (por ejemplo, Gemini API)
3. Ejecuta en desarrollo: `npm run dev`

## Endpoint principal

- `POST /api/ai` - Recibe datos/metadatos del CSV y devuelve sugerencias de gráficas e informe IA.

---

Documentación y convenciones ampliadas en `context.md` (raíz del proyecto).
