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
        type: Date, //tipo data
        default: Date.now() //passando um valor padrão para o campo
    }
})

mongoose.model('categorias', Categoria)