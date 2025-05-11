# CSV Analyzer

CSV Analyzer es un MVP web modular que permite analizar archivos CSV de forma visual e inteligente, combinando la potencia de React, Node.js y Gemini AI.

## 🚀 Características principales

- **Subida y previsualización de archivos CSV** en tabla interactiva.
- **Configuración y visualización de gráficas** (barras, próximamente tarta) con opciones de ejes, color, orden y límite.
- **Sugerencias automáticas de gráficas e informes** generados por IA (Gemini AI Flash 2.0).
- **Resumen automático del dataset** al subir el archivo.
- **UX moderna y responsiva** con Tailwind y componentes modulares.
- **Arquitectura escalable**: frontend y backend desacoplados, código limpio y documentado.

## 🖼️ Capturas de pantalla

<!--
Pega aquí tus capturas de pantalla del flujo completo:
- Subida de CSV
- Resumen IA
- Gráficas sugeridas
- Informe/conclusiones IA
-->

## 🧩 Tecnologías utilizadas

- **Frontend:** React + Vite + TypeScript + Tailwind + Papaparse + Recharts + Axios
- **Backend:** Node.js + Express + TypeScript + CORS + dotenv
- **AI:** Gemini AI Flash 2.0 (API REST)

## 📦 Estructura del proyecto

```
csv-analyzer/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── ...
│   ├── package.json
│   └── ...
├── context.md
└── README.md
```

## ⚡ Instalación y uso rápido

1. **Clona el repositorio** y entra en la carpeta del proyecto.
2. **Instala dependencias** en ambos módulos:
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Configura el backend**:
   - Copia `.env.example` a `.env` en `/backend` y pon tu clave de Gemini AI.
4. **Arranca ambos servidores** (en terminales separadas):
   ```sh
   cd backend && npm run dev
   cd ../frontend && npm run dev
   ```
5. **Abre** [http://localhost:5173](http://localhost:5173) y ¡empieza a analizar tus CSV!

## 🤖 ¿Cómo funciona la IA?
- Al subir un CSV, Gemini genera un resumen automático del dataset.
- Al pulsar "Sugerencia IA", Gemini analiza los datos y sugiere gráficas relevantes, devolviendo conclusiones claras y observaciones directas sobre los patrones detectados.
- El backend fuerza a la IA a responder solo con tipos de gráficas soportados y conclusiones basadas en los datos presentes.

## 📝 Notas de arquitectura
- El menú de configuración manual de gráficas se oculta cuando hay sugerencias IA.
- Las gráficas IA usan la misma lógica de agregación, orden y límite que las manuales.
- El código está modularizado y documentado para facilitar la escalabilidad y el mantenimiento.

## 📄 Documentación técnica
Consulta el archivo [`context.md`](./context.md) para detalles de arquitectura, convenciones y decisiones técnicas.

---

**Desarrollado por Miguel Santiesteban Aguiar · 2025**
