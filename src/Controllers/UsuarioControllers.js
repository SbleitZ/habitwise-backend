import {Usuario, Analytics, Streaks} from "../../mongo.js";
// import en from "../DB/quotes/en.json" assert { type: "json"};
// import es from "../DB/quotes/es.json" assert { type: "json"};
// // import es from "../DB/quotes/es.json";
// const languages = {
//   en,
//   es
// }
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
 console.log("fechaRecienteAnalitica",fechaRecienteAnalitica)
 console.log("fechaUltimaAnalitica",fechaUltimaAnalitica)
 if(fechaRecienteAnalitica > fechaUltimaAnalitica && fechaRecienteAnalitica.getDate() > fechaUltimaAnalitica.getDate())
 {
  console.log("puedes completar todo")
  try{  
    const analytics = await Analytics(body);
    const savedAnalytics = await analytics.save();
    const racha = await Streaks.findOne({uid})
    if(!racha){
      const nuevaRacha = new Streaks({
        uid,
        days:0,
        lastMaxStreak:0,
        createdAt:body.createdAt,
      });
      nuevaRacha.save();
      return res.status(200).send(nuevaRacha);
    }
    if(body.streak){
      //no completo todo
      //la racha se va
      //si no tiene racha registrada, entonces se crea.
      // if(!racha){
      //   new Streaks({
      //     uid,
      //     days:0,
      //     lastMaxStreak:0,
      //     createdAt:body.createdAt,
      //   });
      // }
      racha.days += 1;
      racha.lastMaxStreak +=1;
      await racha.save();
    }else{
      console.log("pero entro acá")
      // if(!racha){
      //   new Streaks({
      //     uid,
      //     days:0,
      //     lastMaxStreak:0,
      //     createdAt:body.createdAt,
      //   });
      // }
      racha.days = 0;
      await racha.save();
    //caso contrario se reinicia la racha y se guarda su latests
    }
    return res.status(200).send(savedAnalytics);
   }catch(err){
    return res.status(403).send({message:err.message});
  
   }
 }else{
  console.log("no puedes")
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
  if(!uid) return res.sendStatus(403);
  // const body = req.body;
  // console.log(uid)
  try {
    const eliminado = await Usuario.deleteMany({uid:uid,status:true});
    return res.status(200).json(eliminado)
  } catch (error) {
    return res.status(404).json({message:error.message})

  }
}