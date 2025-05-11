# Contexto del Proyecto: CSV Analyzer

## Descripción General
CSV Analyzer es un MVP de aplicación web que permite a los usuarios subir archivos CSV, visualizar su contenido en una tabla interactiva, configurar y mostrar gráficas (de barras y de tarta) personalizables, y obtener recomendaciones automáticas e informes generados por Gemini AI Flash 2.0 a partir de los datos cargados.

## Objetivos
- Subida y preview de archivos CSV.
- Configuración y visualización de gráficas (barras y tarta) con opciones de ejes, rangos, etiquetas, títulos, colores y estilos.
- Envío de datos/metadatos a Gemini AI para sugerencias de gráficas e informe automático.
- Arquitectura escalable y moderna, separando frontend y backend.

## Tecnologías Seleccionadas
### Frontend
- **Vite + React + TypeScript**: Desarrollo rápido y moderno.
- **Papaparse**: Parseo de archivos CSV en el navegador.
- **Recharts**: Visualización de gráficas (barras y tarta).
- **Axios**: Llamadas HTTP al backend.

### Backend
- **Node.js + Express + TypeScript**: API REST sencilla y escalable.
- **CORS**: Permitir peticiones cross-origin.
- **Axios**: Llamadas HTTP a Gemini AI.
- **dotenv**: Variables de entorno.

### AI
- **Gemini AI Flash 2.0**: Sugerencias de gráficas e informe automático vía API REST.

## Estructura de Carpetas
```
csv-analyzer/
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── App.tsx
│       └── ...
└── context.md
```

## Convenciones
- Todo cambio relevante en la arquitectura, endpoints, lógica o dependencias debe reflejarse en este archivo `context.md`.
- El archivo debe servir como fuente de verdad para cualquier IA o desarrollador que se incorpore al proyecto.

## Roadmap Inicial
1. Crear frontend con Vite + React + TypeScript.
2. Instalar Papaparse, Recharts y Axios en frontend.
3. Crear backend con Node.js + Express + TypeScript.
4. Instalar dependencias backend (Express, CORS, Axios, dotenv).
5. Configurar scripts y estructura básica.
6. Documentar cada avance en este archivo.

---

**Última actualización:** Backend y frontend inicializados, dependencias principales instaladas, estructura de carpetas definida.
