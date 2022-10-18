const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    data: {
        type: Date, //? Tipo data
        default: Date.now() //? Passa um valor padrão para o campo
    }
})

mongoose.model('categorias', Categoria)