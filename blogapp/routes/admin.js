const express = require('express')
const router = express.Router() //serve para criar rotas em arquivos separados

// Usando model de forma externa com mongoose
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

//! ROTA INICIAL
router.get('/', (req, resp) => {
    resp.render('admin/index')
})

//! EXIBE AS CATEGORIAS
router.get('/categorias', (req, resp) => {
    Categoria.find().sort({data: 'desc'}).lean()
    .then((categorias) => {
        resp.render('admin/categorias', {categorias})
    }).catch(err => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias')
        req.redirect('/admin')
    })
})

//! EXIBE TELA DE ADIÇÃO DE NOVA CATEGORIA
router.get('/categorias/add', (req, resp) => {
    resp.render('admin/addcategorias')
})

//! ADICIONANDO NOVA CATEGORIA
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
        .catch(() => {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente')
            resp.redirect('/admin')
        })
    }
})

//! PEGA AS INFORMAÇÕES DA CATEGORIA QUE SERÁ EDITADA
router.get('/categorias/edit/:id', (req, resp) => {
    Categoria.findById(req.params.id).lean().then(categoria => {
        resp.render('admin/editcategorias', {categoria}) 
    }).catch(() => {
        req.flash('error_msg', 'Essa categoria não existe')
        resp.redirect('/admin/categorias')
    })
})

//! EDITADA A CATEGORIA DESEJADA
router.post('/categorias/edit', (req, resp) => {
    Categoria.findById(req.body.id).then(categoria => { //* Coleta a categoria com o id correspondente a requisição

        const {nome, slug} = req.body //? Extrai os valores do nome e slug que estão sendo enviados

        let erros = [] //? Array que armazena os erros

        if (!nome || typeof nome == undefined || nome == null) {
            erros.push({ 
                texto: "Nome invalido" 
            })
        }

        if (!slug || typeof slug == undefined || slug == null) {
            erros.push({ 
                texto: "Slug invalido" 
            })
        }

        if (erros.length > 0) { //* Caso haja algum erro o mesmo será exibido na tela junto com as informações atuais dos campos referentes ao nome e slug da categoria
            Categoria.findById(req.body.id).lean().then(categoria => {
                resp.render("admin/editcategorias", { categoria, erros })
            }).catch(() => {
                req.flash("error_msg", "Erro ao pegar os dados")
                resp.redirect("admin/categorias")
            })
        } else {
            categoria.nome = nome //? Define o nome da categoria como o que está sendo enviado
            categoria.slug = slug //? Define o slug da categoria como o que está sendo enviado

            categoria.save().then(() => { //* Atualiza as alterações no banco de dados
                req.flash("success_msg", "Categoria editada com sucesso!")
                resp.redirect("/admin/categorias")
            }).catch(() => {
                req.flash("error_msg", "Erro ao salvar a edição da categoria")
                resp.redirect("admin/categorias")
            })
        }
    }).catch(() => {
        req.flash("error_msg", "Erro ao editar a categoria")
        req.redirect("/admin/categorias")
    })
})

//! DELETA UMA CATEGORIA ESCOLHIDA
router.post('/categorias/deletar', (req, resp) => {
    Categoria.findByIdAndRemove(req.body.id).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso')
        resp.redirect('/admin/categorias')
    }).catch(() => {
        req.flash('error_msg', 'Não foi possível deletar a categoria')
        resp.redirect('/admin/categorias')
    })
})

//! EXIBE AS POSTAGENS
router.get('/postagens', (req, resp) => {
    resp.render('admin/postagens')
})

//! EXIBE TELA DE ADIÇÃO DE NOVA POSTAGEM E LISTA TODAS AS CATEGORIAS
router.get('/postagens/add', (req, resp) => {
    Categoria.find().lean().then(categorias => {
        resp.render('admin/addpostagens', {categorias})
    }).catch(() => {
        req.flash('error_msg', 'Houve um erro ao carregar o formulário')
        resp.redirect('/admin/postagens')
    })
})

module.exports = router