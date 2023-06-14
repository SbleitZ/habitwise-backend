const express = require('express');
const { crear, buscar } = require('./mongo');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.post('/crear',crear);
app.get('/buscar/:id',buscar)

//rutas
app.use('/')
app.listen(PORT,() =>{
  console.log("Server listening on port "+PORT);
});