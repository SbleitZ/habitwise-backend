import express from "express";
import { addTask, getTaskByUid, editTaskById, addAnalytics, getAnalyticsByUid, getStreaksByUid,deleteEveryTaskByUid, deleteById } from "../Controllers/UsuarioControllers.js";
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
//borrar solo una
router.delete('/delete/:id/',deleteById);
//borrar todas
router.delete('/deleteAll/:uid/',deleteEveryTaskByUid);
// router.delete('/complete/:uid',completeEveryHabits);

export default router;
