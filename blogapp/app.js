// Carregando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./routes/admin') //arquivo admin.js na pasta de routes
    //const mongoose = require('mongoose')
    const path = require('path')
const { default: mongoose } = require('mongoose')

// Configurações
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

    // Mongoose
    try{
        mongoose.connect('mongodb://localhost/blogapp', { useNewUrlParser: true })
        .then(() => {
            console.log('Conectado ao banco de dados')
        })
    } catch(err) {
        console.log(err)
    }

    // Pasta Public, pasta de arquivos estáticos
        app.use(express.static(path.join(__dirname + '/public')))

// Rotas
    app.use('/admin', admin) //todas as rotas do arquivo admin.js terão de ter o "prefixo de rota" /admin, ou seja, /admin/posts, /admin/categorias e etc

const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor rodando, localhost:8081');
})