const mongoose = require('mongoose')
const { Schema } = mongoose

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true } //? Salva a data de criação e alteração do model
)

const Service = mongoose.model('Service', serviceSchema)

module.exports = {
    Service,
    serviceSchema
}