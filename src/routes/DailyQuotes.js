import express from "express";
import { getRandomQuote } from "../Controllers/UsuarioControllers.js";
const router = express.Router();

router.get('/:language', getRandomQuote);
export default router;