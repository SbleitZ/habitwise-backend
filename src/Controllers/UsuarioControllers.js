import Usuario from "../../mongo.js";
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
    return res.status(204).json({message:"Tarea eliminada"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

}