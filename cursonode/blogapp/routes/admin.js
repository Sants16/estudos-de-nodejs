const express = require('express')
const router = express.Router() //* Serve para criar rotas em arquivos separados

//* Usando model de forma externa com mongoose
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')
//* Helper para verificar se o usuário é um administrador
const { eAdmin } = require('../helpers/eAdmin')

//! ROTA INICIAL
router.get('/', eAdmin, (req, resp) => {
    resp.render('admin/index')
})

//! EXIBE AS CATEGORIAS
router.get('/categorias', eAdmin, (req, resp) => {
    Categoria.find().sort({data: 'desc'}).lean()
    .then((categorias) => {
        resp.render('admin/categorias', {categorias})
    }).catch(err => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias')
        req.redirect('/admin')
    })
})

//! EXIBE TELA DE ADIÇÃO DE NOVA CATEGORIA
router.get('/categorias/add', eAdmin, (req, resp) => {
    resp.render('admin/addcategorias')
})

//! ADICIONANDO NOVA CATEGORIA
router.post('/categorias/nova', eAdmin, (req, resp) => {
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
        })
        .catch(() => {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente')
        }).finally(() => {
            resp.redirect('/admin/categorias')
        })
    }
})

//! PEGA AS INFORMAÇÕES DA CATEGORIA QUE SERÁ EDITADA
router.get('/categorias/edit/:id', eAdmin, (req, resp) => {
    Categoria.findById(req.params.id).lean().then(categoria => {
        resp.render('admin/editcategorias', {categoria}) 
    }).catch(() => {
        req.flash('error_msg', 'Essa categoria não existe')
        resp.redirect('/admin/categorias')
    })
})

//! EDITA A CATEGORIA DESEJADA
router.post('/categorias/edit', eAdmin, (req, resp) => {
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
                resp.redirect("/admin/categorias")
            })
        } else {
            categoria.nome = nome //? Define o nome da categoria como o que está sendo enviado
            categoria.slug = slug //? Define o slug da categoria como o que está sendo enviado

            categoria.save().then(() => { //* Atualiza as alterações no banco de dados
                req.flash("success_msg", "Categoria editada com sucesso!")
            }).catch(() => {
                req.flash("error_msg", "Erro ao salvar a edição da categoria")
            }).finally(() => {
                resp.redirect('/admin/categorias')
            })
        }
    }).catch(() => {
        req.flash("error_msg", "Erro ao editar a categoria")
        req.redirect("/admin/categorias")
    })
})

//! DELETA UMA CATEGORIA ESCOLHIDA
router.post('/categorias/deletar', eAdmin, (req, resp) => {
    Categoria.findByIdAndRemove(req.body.id).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso')
    }).catch(() => {
        req.flash('error_msg', 'Não foi possível deletar a categoria')
    }).finally(() => {
        resp.redirect('/admin/categorias')
    })
})

//! EXIBE AS POSTAGENS
router.get('/postagens', eAdmin, (req, resp) => {
    Postagem.find().lean().populate({path: 'categoria', strictPopulate: false}).sort({data: 'desc'}).then(postagens => {
        resp.render('admin/postagens', {postagens})
    }).catch(() => {
        req.flash('error_msg', 'Houve um erro ao listar as postagens')
        resp.redirect('/admin')
    })
})

//! EXIBE TELA DE ADIÇÃO DE NOVA POSTAGEM E LISTA TODAS AS CATEGORIAS
router.get('/postagens/add', eAdmin, (req, resp) => {
    Categoria.find().lean().then(categorias => {
        resp.render('admin/addpostagens', {categorias})
    }).catch(() => {
        req.flash('error_msg', 'Houve um erro ao carregar o formulário')
        resp.redirect('/admin/postagens')
    })
})

//! CRIA UMA NOVA POSTAGEM NO BANCO DE DADOS
router.post('/postagens/nova', eAdmin, (req, resp) => {
    let erros = []

    const {titulo, slug, descricao, conteudo, categoria} = req.body

    if (!titulo || typeof titulo == undefined || titulo == null) {
        erros.push({ 
            texto: "Título inválido" 
        })
    }
    if (!slug || typeof slug == undefined || slug == null) {
        erros.push({ 
            texto: "Slug inválido" 
        })
    }
    if (!descricao|| typeof descricao == undefined || descricao == null) {
        erros.push({ 
            texto: "Descrição inválida" 
        })
    }
    if (!conteudo || typeof conteudo == undefined || conteudo == null) {
        erros.push({ 
            texto: "Conteúdo inválido" 
        })
    }
    if(categoria === '0'){
        erros.push({
            texto: 'Categoria inválida, registre uma categoria'
        })
    }

    if(erros.length > 0){
        resp.render('admin/addpostagens', {erros})
    } else {
        const novaPostagem = {
            titulo,
            slug,
            descricao,
            conteudo,
            categoria
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash('success_msg', 'Postagem criada com sucesso')
        }).catch(() => {
            req.flash('error_msg', 'Houve um erro durante o salvamento da postagem')
        }).finally(() => {
            resp.redirect('/admin/postagens')
        })
    }
})

//! PEGA AS INFORMAÇÕES DA POSTAGEM QUE SERÁ EDITADA
router.get('/postagens/edit/:id', eAdmin, (req, resp) => {
    Postagem.findById(req.params.id).lean().then(postagem => {

        Categoria.find().lean().then(categorias => {
            resp.render('admin/editpostagens', {categorias, postagem})
        }).catch(() => {
            req.flash('error_msg', 'Houve um erro ao listar as categorias')
            resp.redirect('/admin/postagens')
        })

    }).catch(() => {
        req.flash('error_msg', 'Houve um erro ao carregar o formulário de edição')
        resp.redirect('/admin/postagens')
    })
})

//! EDITA A POSTAGEM
router.post('/postagens/edit', eAdmin, (req, resp) => {
    //Postagem.findOne({_id: req.body.id})
    Postagem.findById(req.body.id).then(postagem => {

        const {titulo, slug, descricao, conteudo, categoria} = req.body

        postagem.titulo = titulo
        postagem.slug = slug
        postagem.descricao = descricao
        postagem.conteudo = conteudo
        postagem.categoria = categoria

        postagem.save().then(() => {
            req.flash('success_msg', 'Postagem editada com sucesso!')
        }).catch(() => {
            req.flash('error_msg', 'Erro interno')
        }).finally(() => {
            resp.redirect('/admin/postagens')
        })

    }).catch(() => {
        req.flash('error_msg', 'Houve um erro ao editar a postagem')
        resp.redirect('/admin/postagens')
    })
})

//! DELETANDO POSTAGEM
router.get('/postagens/deletar/:id', eAdmin, (req, resp) => {
    Postagem.deleteOne({_id: req.params.id}).then(() => {
        req.flash('success_msg', 'Postagem deletada com sucesso')
    }).catch(() => {
        req.flash('error_msg', 'Houve um erro interno')
    }).finally(() => {
        resp.redirect('/admin/postagens')
    })
})



module.exports = router