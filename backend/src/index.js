const express = require('express');//importando a express
const mongoose = require('mongoose');//importando o mongoose
const routes = require('./routes');//importando o arquivo de rotas
const app = express();//Instância o express
const cors = require('cors');//importando o cors

//conectando ao servidor
mongoose.connect('mongodb+srv://Fernando:fernando@cluster0-lsl2g.mongodb.net/RadarDev?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(cors());//Utiliza o cors

app.use(express.json());//informando utilizando o formato JSON

app.use(routes);//Utilizando as rotas

app.listen(3333);//mandando a aplicação escutar a porta 3333