import express from "express";
import { addTask, getTaskByUid } from "../Controllers/UsuarioControllers.js";
const router = express.Router();

router.get('/:uid', getTaskByUid)
router.post('/create',addTask);
router.patch('/edit/:uid')
export default router;