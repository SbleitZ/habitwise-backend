import express from "express";
import { addTask, getTaskByUid, editTaskById, completeEveryHabits, addAnalytics, getAnalyticsByUid, getStreaksByUid,deleteEveryTaskById } from "../Controllers/UsuarioControllers.js";
const router = express.Router();

router.get('/:uid', getTaskByUid);
router.get('/analytics/:uid', getAnalyticsByUid);
router.get('/streaks/:uid', getStreaksByUid);
router.post('/create',addTask);
router.post('/confirm_complete/:uid',(req,res)=>{

  try {
    addAnalytics(req,res);
  } catch (error) {
    return res.status(500).json({message: "No existe el body."})

  }
});
router.patch('/edit/:id',editTaskById);
//router.delete('/delete/:id/',deleteById);
router.delete('/delete/:id/',deleteEveryTaskById);
// router.delete('/complete/:uid',completeEveryHabits);

export default router;
