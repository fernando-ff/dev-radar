/**===========================================
     Representação da entidade na aplicação
 =============================================*/

const mongoose = require('mongoose');//importando o mongoose
const PointSchema = require('./utils/PointSchema');

//Informando a base de dados que formato Dev/usuário vai ter
const DevSchema = new mongoose.Schema({
    name: String, 
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index:'2dsphere'
    }
});

//exportando o model
module.exports = mongoose.model('Dev', DevSchema);