import express from "express";
import { addTask, getTaskByUid, deleteById } from "../Controllers/UsuarioControllers.js";
const router = express.Router();

router.get('/:uid', getTaskByUid)
router.post('/create',addTask);
router.patch('/edit/:uid');
router.delete('/delete/:id/',deleteById);
export default router;