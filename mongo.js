import mongoose from "mongoose"
// const {MONGO_URL:mongoURL}= require('dotenv').config().parsed;
// import S from "dotenv";
// const {MONGO_URL:mongoURL} = S.config().parsed
const mongoURL = process.env.MONGO_URL || "";

// console.log(mongoURL)

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
  autor: {
    type: String,
    // required:true
  },
  uid: { 
    type: String,
    required: true
  },
  task: {
    type:String,
    trim:true
  },
  note:{
    type:String,
    trim:true,
  },
  icon: String,
  status: Boolean,
  category:String,
  checkLists:Array,
  endAt: Boolean,
  endTime: String,
  createdAt: String,
  creationTime: Number,
  expirationTime: String,
})

const Usuario = mongoose.model('Usuario', usuarioSchema);
// Usuario.index({ propietario: 1 }).then(() =>{
//   console.log("creada con exito")
// }).catch((err) => console.log(err))
export default Usuario;