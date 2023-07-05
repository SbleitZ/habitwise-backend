import express from "express";
import { addTask, getTaskByUid, deleteById, editTaskById, completeEveryHabits } from "../Controllers/UsuarioControllers.js";
const router = express.Router();

router.get('/:uid', getTaskByUid)
router.post('/create',addTask);
router.patch('/edit/:id',editTaskById);
router.delete('/delete/:id/',deleteById);
router.delete('/complete/:uid',completeEveryHabits);
export default router;