import { Router } from "express";
import { handleAiSuggest } from "../controllers/aiController";

const router = Router();

// POST /api/ai
router.post("/", handleAiSuggest);

export default router;
