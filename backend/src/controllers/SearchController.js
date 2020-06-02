const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    //Lista os devs no raio de 10km
    async index( request, response) {
        //Busca os devs baseado na localização e tecnologias
        const { latitude, longitude, techs } = request.query;
        //Separando as techs pela virgula
        const techsArray = parseStringAsArray(techs);
        //Buscando tecnologias na base dados    
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            }
        });

        return response.json({ devs });
    }
}