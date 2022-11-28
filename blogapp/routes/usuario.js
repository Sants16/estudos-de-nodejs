const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')

//! EXIBE A TELA DE REGISTRO
router.get('/registro', (req, resp) => {
    resp.render('usuario/registro')
})

//! CADASTRA O USUÁRIO
router.post('/registro', (req, resp) => {
    let erros = []
    const {nome, email, senha, senha2} = req.body

    if(!nome || typeof nome == undefined || nome == null){
        erros.push({texto: 'Nome inválido'})
    }

    if(!email || typeof email == undefined || email == null){
        erros.push({texto: 'E-mail inválido'})
    }

    if(!senha || typeof senha == undefined || senha == null){
        erros.push({texto: 'Senha inválida'})
    }

    if(senha != senha2){
        erros.push({texto: 'As senhas são diferentes, tente novamente'})
    }


    if(erros.length > 0){
        resp.render('usuario/registro', {erros})
    } else {
        Usuario.findOne({email}).then(usuario => {
            if(usuario){
                req.flash('error_msg', 'Já existe uma conta cadastrada com este e-mail')
                resp.redirect('/usuario/registro')
            } else {
                const novoUsuario = new Usuario({
                    nome,
                    email,
                    senha
                })

                //*encriptando/hashando a senha
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash('error_msg', 'Houve um erro durante o salvamento do usuário')
                            resp.redirect('/')
                        }

                        novoUsuario.senha = hash
                        novoUsuario.save().then(() => {
                            req.flash('success_msg', 'Usuário criado com sucesso')
                            resp.redirect('/')
                        }).catch(() => {
                            req.flash('error_msg', 'Houve um erro ao criar o usuário')
                            resp.redirect('/usuario/registro')
                        })
                    })
                })
            }
        }).catch(() => {
            req.flash('error_msg', 'Houve um erro interno')
            resp.redirect('/')
        })
    }
})

router.get('/login', (req, resp) => {
    resp.render('usuario/login')
})

module.exports = router