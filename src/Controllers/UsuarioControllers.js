import { requestToBodyStream } from "next/dist/server/body-streams.js";
import {Usuario, Analytics} from "../../mongo.js";
import en from "../DB/quotes/en.json" assert { type: "json"};
import es from "../DB/quotes/es.json" assert { type: "json"};
// import es from "../DB/quotes/es.json";
const languages = {
  en,
  es
}
export const addTask= async (req,res) => {
  //crea el documento con los datos nuevos
  const body = req.body;
  console.log(body)
  // body.createdAt = new Date().toISOString()
  const usuario = new Usuario(body)
  const savedUsuario = await usuario.save()//retorna una promesa
  res.status(200).send(savedUsuario);
  // console.log("Enviado")
}

export const getTaskByUid = async(req,res) =>{
  const { uid } = req.params;
  // console.log(uid)
  const usuarios = await Usuario.find({ uid: uid });
  // console.log(usuarios.sort((a,b)=> a.createdTime)).sort({creationTime:1})
  const taskOrdenada = usuarios.sort((a,b)=> {
    return b.creationTime - a.creationTime;
  });
  // console.log(taskOrdenada)
  res.status(200).send(taskOrdenada);
  // console.log(usuarios)
}

export const getRandomQuote = (req,res) =>{
  const { language } = req.params;
  const max = languages[language].length;
  const numeroDaily = Math.floor((Math.random() * (max -0)));
  // console.log(languages[language][numeroDaily])
  // console.log(numeroDaily)
  res.status(200).json(languages[language][numeroDaily])
}
export const editTaskById = async(req,res) =>{
  const { id } =req.params;
  const body = req.body;
  try {
    const task = await Usuario.findById(id);
    Object.assign(task,body);
    await task.save();
    return res.status(200).send({message:'Tarea actualizada'});
  } catch (error) {
    console.log(error);
    return res.status(404).send({message:'Tarea no encontrada'});
  }

}
// crear();
export const deleteById = async(req,res) => {
  const { id } = req.params
  try {
    const deletedTask = await Usuario.findByIdAndDelete(id)
    if (!deletedTask)
      return res.status(404).json({ message: "Tarea no encontrada" });
    return res.status(204).json(deletedTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

}

export const addAnalytics = async(req,res) => {

  /*
  esto se hará con el boton de completar todo, que hará un conteo de
  cuantas  tareas se hicieron hoy y cuantas no se hicieron
  si existe una tarea que no este completada, entonces la racha termina, en caso contrario la racha sigue,
  */
 const { uid } = req.params;
 const body = req.body;
 
 const analytics = await Analytics.find({uid});
  if(!body) return res.status(404).json({message: "No existe el body."})
 const dato = analytics.pop();
 console.log(dato);
//  const analyticsSorted = usuarios.sort((a,b)=> {
//   return b.creationTime - a.creationTime;
// });
 console.log("body.createdAt",body.createdAt)
 console.log("body.createdAt",dato.createdAt)
 const fechaRecienteAnalitica = new Date(body.createdAt)
 const fechaUltimaAnalitica = new Date(dato.createdAt)
 console.log(fechaRecienteAnalitica)
 console.log(fechaUltimaAnalitica)
 if(fechaRecienteAnalitica > fechaUltimaAnalitica && fechaRecienteAnalitica.getDate() > fechaUltimaAnalitica.getDate())
 {
  try{  
    const analytics = await Analytics(body);
    const savedAnalytics = analytics.save();
    return res.status(200).send(savedAnalytics);
   }catch(err){
    return res.status(403).send({message:err.message});
  
   }
 }else{
  return res.status(403).send({
    message:"Debes esperar a que pase un día completo antes de hacerlo nuevamente.",
  })
 }



}

export const getAnalyticsByUid = async(req,res) =>{
  const { uid } = req.params;
  const analyticsByUser = await Analytics.find({uid});
  console.log(analyticsByUser)
  return res.status(200).send(analyticsByUser)
}

export const completeEveryHabits = async(req, res) => {
  const { uid } = req.params;
  // const body = req.body;
  // console.log(uid)
  try {
    const eliminado = await Usuario.deleteMany({uid:uid,status:true});
    return res.status(200).json(eliminado)
  } catch (error) {
    return res.status(404).json({message:error.message})

  }
}