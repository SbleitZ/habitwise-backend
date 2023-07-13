import express from "express";
import cors from "cors";
import taskRouter from "./src/routes/Task.js";
import dailyRouter from "./src/routes/DailyQuotes.js";
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors({
  origin:[process.env.PUBLIC_URL,"http://localhost:3000"],
  methods:["GET","POST","PUT","PATCH","DELETE"],
  credentials:true,
}))
// app.post('/crear',addTask);
// app.get('/buscar/:uid',getTaskByUid)
//rutas

app.use((req, res, next) => {
  const startTime = new Date();
  // if (req.method !== 'OPTIONS' && req.headers.origin !== 'http://localhost2:3000') {
  // console.log("errorazo")  
  // res.status(403).json({ error: 'Error de CORS: Acceso no permitido' });
  //   return;
  // }
  // Registrar un evento 'finish' para imprimir los detalles de la solicitud
  res.on('finish', () => {
    const endTime = new Date();
    const elapsedTime = endTime - startTime;
    console.log(`${req.protocol.toUpperCase()} ${req.method} ${req.originalUrl} ${res.statusCode} [${elapsedTime}ms, ${req.ip}]`);
  });

  // Pasar la solicitud al siguiente middleware o ruta
  next();
});
app.use('/tasks', taskRouter)
app.use('/daily', dailyRouter)
app.get('/',(req,res)=>{
  res.sendStatus(200);
})
app.listen(PORT,() =>{
  console.log("Server listening on port "+PORT);
});