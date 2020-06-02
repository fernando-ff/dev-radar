const express = require('express');//importando a express
const mongoose = require('mongoose');//importando o mongoose
const http = require('http');//Importnado modulo http  do No
const cors = require('cors');//importando o cors
const { setupWebsocket } = require('./websocket');//Importando o websocket
const routes = require('./routes');//importando o arquivo de rotas

const app = express();//Instância o express
const server = http.Server(app);//Extraindo o servidor http do express

setupWebsocket(server);//Envia o servidor

//conectando ao servidor
mongoose.connect('mongodb+srv://Fernando:fernando@cluster0-lsl2g.mongodb.net/RadarDev?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);//Coriigindo deprecationWarring
app.use(cors());//Utiliza o cors
app.use(express.json());//informando que esta sendo utilizado o formato JSON
app.use(routes);//Utilizando as rotas
server.listen(3333);//mandando a aplicação escutar a porta 3333