const express = require('express')
const router = express.Router() //serve para criar rotas em arquivos separados

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
    Categoria.find().sort({data: 'desc'}).lean()
    .then((categorias) => {
        resp.render('admin/categorias', {categorias})
    }).catch(err => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias')
        req.redirect('/admin')
    })
})

router.get('/categorias/add', (req, resp) => {
    resp.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, resp) => {
    const { nome, slug } = req.body

    //* Validação
    let erros = []

    if(!nome || typeof nome === undefined || nome === null){
        erros.push({
            texto: 'Nome inválido'
        })
    }

    if(!slug || typeof slug === undefined || slug === null){
        erros.push({
            texto: 'Slug inválido'
        })
    }

    if(erros.length > 0){
       resp.render('admin/addcategorias', {
        erros //erros: erros
       }) 
    } else {
        const novaCategoria = {
            nome, //nome: nome
            slug //slug: slug
        }
    
        new Categoria(novaCategoria).save()
        .then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso')
            resp.redirect('/admin/categorias')
        })
        .catch(err => {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente')
            resp.redirect('/admin')
        })
    }
})

module.exports = router