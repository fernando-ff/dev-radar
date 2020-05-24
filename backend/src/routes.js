const express = require('express');

const routes = express.Router();

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');


routes.get('/search', SearchController.index );

//Rota para cadastro e listagem dos devs
routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
//exportando as rotas
module.exports = routes;