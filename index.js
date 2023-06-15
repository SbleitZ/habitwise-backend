import express from "express";
import cors from "cors";
import taskRouter from "./src/routes/Task.js";
import dailyRouter from "./src/routes/DailyQuotes.js";
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors())
// app.post('/crear',addTask);
// app.get('/buscar/:uid',getTaskByUid)
//rutas
app.use('/tasks', taskRouter)
app.use('/daily', dailyRouter)
app.listen(PORT,() =>{
  console.log("Server listening on port "+PORT);
});