const {MONGO_URL:mongoURL}= require('dotenv').config().parsed;


console.log(mongoURL)
const mongoose = require('mongoose')

mongoose.connect(mongoURL).then(() => {
  console.log("\x1b[32m",'******** Conexión exitosa ********')
}).catch((err) =>{
  console.log("\x1b[31m","******** Error de conexión ******** ")
  console.log(err);
})
//terminar la parte donde realizamos la mierda de los dias
//si el dia de hoy es mayor al dia de ayer, es decir si hoy 14 y lo reviso
// mañana 15, deberia de hacer una comparación de 15 > 14, si se cumple se elimina
//corrección, se comparara por fechas
// const fecha1 = new Date('2022-01-01');
// const fecha2 = new Date('2023-01-01');

// if (fecha1 > fecha2) {
//   console.log('La fecha1 es mayor que fecha2');
// } else if (fecha1 < fecha2) {
//   console.log('La fecha1 es menor que fecha2');
// } else {
//   console.log('La fecha1 es igual a fecha2');
// }
//date.getDate() > date.registrado
const usuarioSchema = mongoose.Schema({//nombre de modelo y luego el objeto
  autor: {type: String},
  task: String,
  endAt: Boolean,
  endTime: String,
  uuid: String,
  createdAt: new Date().toISOString(),
  creationTime: new Date().getTime(),
  expirationTime: String,
})
const Usuario = mongoose.model('Usuario', usuarioSchema);
// Usuario.index({ propietario: 1 }).then(() =>{
//   console.log("creada con exito")
// }).catch((err) => console.log(err))
const crear = async (req,res) => {
  //crea el documento con los datos nuevos
  const body = req.body;
  console.log(body)
  const usuario = new Usuario(body)
  const savedUsuario = await usuario.save()//retorna una promesa
  res.status(200).send(savedUsuario);
  console.log("Enviado")
}
const buscar = async(req,res) =>{
  const usuarios = await Usuario.find({ autor: "Rodrigo" })
  res.status(200).send(usuarios)
  console.log(usuarios)
}
// crear();

module.exports = {
  crear: crear,
  buscar:buscar

}