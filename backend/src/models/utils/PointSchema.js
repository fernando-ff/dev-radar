/*==================================================
    Um tipo de dado para entidades
=====================================================*/

const mongoose = require('mongoose');//Importando o mongoose


const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum:['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});
//Exportando 
module.exports = PointSchema;