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
  body.createdAt = new Date().toISOString()
  const usuario = new Usuario(body)
  const savedUsuario = await usuario.save()//retorna una promesa
  res.status(200).send(savedUsuario);
  console.log("Enviado")
}

export const getTaskByUid = async(req,res) =>{
  const { uid } = req.params;
  console.log(uid)
  const usuarios = await Usuario.find({ uid: uid })
  res.status(200).send(usuarios)
  console.log(usuarios)
}

export const getRandomQuote = (req,res) =>{
  const { language } = req.params;
  const max = languages[language].length;
  const numeroDaily = Math.floor((Math.random() * (max -0)));
  console.log(languages[language][numeroDaily])
  // console.log(numeroDaily)
  res.status(200).json(languages[language][numeroDaily])
}
// crear();