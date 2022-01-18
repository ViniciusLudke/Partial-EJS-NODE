
import express from "express"; 

import routes from "./routes.js"; 

import db from "./src/db.js"; 

import hd from "handlebars";
import cors from 'cors';
import bodyParser from "body-parser";

const app = express(); 
app.use(express.static('public'));//quer dizer q eu quero usar alguma coisa o use, e o public eh a psta
//de meus arq estativos, ja vai aceitar q utilizo arq staticos
//configurar ejs
// ejs, motor de html utilizado, usar o ejs como view engine
app.set('view engine','ejs');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))//isso que vai fazer as pessoas enviarem dados
app.use(bodyParser.json());//utilizar para api com o format json



app.use(express.json()); 

app.use(routes); 


db.sync(console.log(`Banco de dados conectado: ${process.env.DB_NAME}`)); 



app.listen(3000, () => console.log("Servidor iniciado na porta 3000")); 
//qnd for inicido exibira esta msg no terminal

  



