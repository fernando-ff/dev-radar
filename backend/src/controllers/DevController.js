const axios = require('axios');//Importando o axios

const Dev = require('../models/Dev');//Importando base dados

const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')
//Criando os metodos de requisição e resposata
module.exports = {
    //Lista os usuários
    async index (request, response) {
        const devs = await Dev.find();
        return response.json(devs); 
    },

    //Cria um usuário
    async store (request, response) {
        //pegando as informações do corpo da requisição
        const { github_username, techs, latitude, longitude} = request.body;
        //Acessando o bando de dados e procurando um dev
        let dev = await Dev.findOne({ github_username });
        
        if(!dev) {//Se o usuário não existir na base de dados esse bloco é executado

            //Fazendo chamada a api do github
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            //Pegando esses dados da api
            const { name = login, avatar_url, bio } = apiResponse.data;
            //Desestruturando o array que contem as informações das tecnologias  
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            //Exportando os dados para o BD
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            //Filtrar as conexões que estão no max. 10 km de distancia
            // e que o novo dev tenha pelo menos umas das techs
            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        //Retorna os dados do dev 
        return response.json(dev);
    }
};