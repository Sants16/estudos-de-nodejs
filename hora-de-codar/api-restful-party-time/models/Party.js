const mongoose = require('mongoose')
const { Schema } = mongoose
const { serviceSchema } = require('./Service') //* Importamos o schema do service para definilo como tipo do atributo services do partySchema 

const partySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    services: {
        type: [serviceSchema], //? assim dizemos que o atributo services é um array de serviceSchema
    }
}, { timestamps: true }
)

const Party = mongoose.model('Party', partySchema)

module.exports = Party