const express = require('express')
const router = express.Router() //serve para criar rodas em arquivos separados

// Usando model de forma externa com mongoose
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

router.get('/', (req, resp) => {
    resp.render('admin/index')
})

router.get('/posts', (req, resp) => {
    resp.send('Página de posts')
})

router.get('/categorias', (req, resp) => {
    resp.render('admin/categorias')
})

router.get('/categorias/add', (req, resp) => {
    resp.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, resp) => {
    const { nome, slug } = req.body

    const novaCategoria = {
        nome, //nome: nome
        slug //slug: slug
    }

        new Categoria(novaCategoria).save()
        .then(() => console.log('Categoria foi salva com sucesso'))
        .catch(err => console.log(err))
})

module.exports = router