import express from "express";
import { addTask, getTaskByUid, deleteById, editTaskById, completeEveryHabits, addAnalytics, getAnalyticsByUid } from "../Controllers/UsuarioControllers.js";
const router = express.Router();

router.get('/:uid', getTaskByUid);
router.get('/analytics/:uid', getAnalyticsByUid);
router.post('/create',addTask);
router.post('/confirm_complete/:uid',(req,res)=>{

  try {
    addAnalytics(req,res);
  } catch (error) {
    return res.status(500).json({message: "No existe el body."})

  }
});
router.patch('/edit/:id',editTaskById);
router.delete('/delete/:id/',deleteById);
router.delete('/complete/:uid',completeEveryHabits);

export default router;