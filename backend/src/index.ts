import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Rutas
import aiRouter from "./routes/ai";
app.use("/api/ai", aiRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
