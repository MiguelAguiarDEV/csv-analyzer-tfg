# Documentación Técnica — CSV Analyzer

## Índice
1. [Introducción](#introducción)
2. [Arquitectura General](#arquitectura-general)
3. [Frontend: Estructura y Componentes](#frontend-estructura-y-componentes)
4. [Backend: Estructura y Endpoints](#backend-estructura-y-endpoints)
5. [Integración con Gemini AI](#integración-con-gemini-ai)
6. [Flujo de Usuario y Experiencia](#flujo-de-usuario-y-experiencia)
7. [Lógica de Visualización y Agregación](#lógica-de-visualización-y-agregación)
8. [Convenciones, buenas prácticas y escalabilidad](#convenciones-buenas-prácticas-y-escalabilidad)
9. [Despliegue y ejecución](#despliegue-y-ejecución)
10. [Capturas de pantalla](#capturas-de-pantalla)

---

## Introducción
CSV Analyzer es un MVP web modular desarrollado como Trabajo de Fin de Grado. Permite a cualquier usuario analizar archivos CSV de manera visual e inteligente, combinando tecnologías modernas de frontend y backend con la potencia de Gemini AI para sugerir gráficas e informes automáticos.

El objetivo es ofrecer una herramienta intuitiva, extensible y documentada, que sirva tanto para usuarios finales como para desarrolladores interesados en la arquitectura y la integración de IA en aplicaciones web.

---

## Arquitectura General
- **Frontend**: React + Vite + TypeScript + TailwindCSS. Modular, responsivo y fácil de mantener.
- **Backend**: Node.js + Express + TypeScript. API REST escalable y desacoplada.
- **AI**: Gemini AI Flash 2.0, integrado vía API REST.
- **Comunicación**: El frontend se comunica con el backend mediante Axios y un proxy de desarrollo.

### Diagrama de alto nivel
```
[Usuario] ⇄ [Frontend React] ⇄ [Backend Express] ⇄ [Gemini AI API]
```

---

## Frontend: Estructura y Componentes

- **CsvUploader.tsx**: Componente principal. Permite subir el CSV, muestra la tabla, el resumen IA, el menú de configuración de gráficas y las gráficas sugeridas por IA.
- **CsvTable.tsx**: Renderiza la tabla de datos con scroll sincronizado y testabilidad.
- **BarChartModule.tsx**: Incluye el configurador y el display de gráficas de barras, con validaciones, agregación y visualización profesional.
- **Header/Footer.tsx**: Layout modular y branding.
- **App.tsx**: Estructura principal de la aplicación.

### Lógica destacada
- Al subir un CSV, se muestra un resumen automático generado por IA.
- El usuario puede configurar manualmente una gráfica de barras o pedir sugerencias IA.
- Si hay sugerencias IA, el menú manual se oculta y se muestran las gráficas y conclusiones generadas por Gemini.

---

## Backend: Estructura y Endpoints

- **index.ts**: Arranque y configuración de Express, CORS y rutas.
- **routes/ai.ts**: Define el endpoint `/api/ai`.
- **controllers/aiController.ts**: Lógica de control para recibir datos y delegar en el servicio de IA.
- **services/aiService.ts**: Construye el prompt, llama a Gemini y procesa la respuesta.
- **services/geminiClient.ts**: Cliente HTTP para la API de Gemini, usando la clave de entorno.

### Endpoint principal
- `POST /api/ai` — Recibe `{ csvData, meta }` y responde con sugerencias de gráficas e informe IA, o solo resumen si `meta.onlySummary` está presente.

---

## Integración con Gemini AI
- El backend construye prompts avanzados para forzar a Gemini a sugerir solo tipos de gráficas soportados y a dar conclusiones claras, directas y basadas en los datos presentes.
- Al subir un CSV, se solicita un resumen amigable del dataset (sin gráficas).
- Al pulsar "Sugerencia IA", se piden gráficas, descripciones y conclusiones comparativas.
- El backend filtra y parsea la respuesta para asegurar compatibilidad y robustez.

---

## Flujo de Usuario y Experiencia
1. El usuario sube un archivo CSV.
2. Se muestra un resumen automático del dataset generado por IA.
3. El usuario puede:
   - Configurar manualmente una gráfica de barras (ejes, color, orden, límite).
   - Pulsar "Sugerencia IA" para obtener gráficas e informe automáticos.
4. Si hay sugerencias IA, se muestran las gráficas, descripciones y conclusiones, y se oculta el menú manual.
5. El usuario puede analizar visualmente los datos y las conclusiones de la IA.

---

## Lógica de Visualización y Agregación
- Las gráficas de barras (manuales e IA) agregan los valores de Y para cada X único.
- Se valida que X sea categórico y Y numérico.
- Se permite ordenar por X o Y y limitar el número de elementos mostrados.
- Las gráficas IA usan la misma lógica de agregación y límite para garantizar claridad visual.

---

## Convenciones, buenas prácticas y escalabilidad
- Código modular y documentado.
- Separación estricta de frontend y backend.
- Uso de variables de entorno para claves sensibles.
- El archivo `context.md` se mantiene actualizado como fuente de verdad técnica.
- El prompt de Gemini se ajusta para evitar respuestas ambiguas o condicionales.
- El sistema es fácilmente extensible para soportar nuevos tipos de gráficas o análisis IA.

---

## Despliegue y ejecución

### Requisitos
- Node.js >= 18
- Clave de API de Gemini AI válida

### Pasos
1. Instala dependencias en `backend/` y `frontend/`.
2. Configura `.env` en `backend/` con tu clave de Gemini.
3. Arranca ambos servidores con `npm run dev` en cada módulo.
4. Accede a la app en [http://localhost:5173](http://localhost:5173).

### Producción
- Compila el backend con `npm run build` y arráncalo con `npm start`.
- Compila el frontend con `npm run build` y sirve la carpeta `dist/` con un servidor estático.

---

## Capturas de pantalla

<!--
Pega aquí tus capturas de pantalla del flujo completo:
- Subida de CSV
- Resumen IA
- Gráficas sugeridas
- Informe/conclusiones IA
-->

---

**Autor:** Miguel Santiesteban Aguiar — TFG 2025
