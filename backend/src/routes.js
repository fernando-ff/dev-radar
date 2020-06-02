/*=======================
    Rotas da aplicação
=========================*/
//Importando o express
const express = require('express');

//Importando o módulo de roteamento do express
const routes = express.Router();

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

//Rota para cadastro e listagem dos devs
routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

//Rota para procura de devs num raio de 10km
routes.get('/search', SearchController.index );


//exportando as rotas
module.exports = routes;