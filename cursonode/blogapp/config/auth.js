const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
//* Model de usuários
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

module.exports = function(passport) {

    passport.use(new localStrategy(
         //* Aqui informamos os campos irão ser verificados/validados
        {
            //? aqui colocamos o email pois cada usuário terá um email diferente para fazer o login
            usernameField: 'email',
            passwordField: 'senha' //? caso o nosso campo de senha tivesse o name igual a 'password' essa configuração não seria necessária mas como escrevemos em português isso se faz necessário
        },
        (email, senha, done) => {
            Usuario.findOne({email}).lean().then(usuario => {
                if(!usuario){
                    //? done recebe 3 parâmetros, o 1° são os dados da conta encontrado, o 2° se a verificação teve sucesso e a 3° uma mensagem retornada para o usuário
                    return done(null, false, {message: 'Esta conta não existe'})
                }

                //* Comparando dois valores encriptados com o bcrypt, aqui estamos comparando a senha informada no campo de senha com a senha hasheada no banco de dados
                bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                    if(batem){
                        return done(null, usuario)
                    }else{
                        return done(null, false, {message: 'Senha incorreta'})
                    }
                })
            })
        }
    ))


    passport.serializeUser((usuario, done) => {
        done(null, usuario)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })
}