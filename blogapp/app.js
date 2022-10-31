//* Carregando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./routes/admin') //? arquivo admin.js na pasta de routes
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash = require('connect-flash')
    const moment = require('moment') //? modulo para melhorar a visualização da data
    require('./models/Postagem')
    const Postagem = mongoose.model('postagens')

//* Configurações
    //? Sessão
        app.use(session({
            secret: 'cursodenode',
            resave: true,
            saveUninitialized: true
        }))
        //? Flash
        app.use(flash())

    //? Middleware
     app.use((req, resp, next) => {
        //* Assim criamos variáveis globais
        resp.locals.success_msg = req.flash('success_msg')
        resp.locals.error_msg = req.flash('error_msg')

        next() //! Caso não coloquemos o next() o middleware vai parar a nossa requisição e a página vai ficar carregando infinitamente
    })

    //? Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    //? Handlebars
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            helpers: {
                formatDate: (date) => {
                     return moment(date).format('DD/MM/YYYY')
                 }
            }      
        }))
        app.set('view engine', 'handlebars')

    //? Mongoose
        try{
            mongoose.connect('mongodb://localhost/blogapp', { useNewUrlParser: true })
            .then(() => {
                console.log('Conectado ao banco de dados')
            })
        } catch(err) {
            console.log(err)
        }

    //? Pasta Public, pasta de arquivos estáticos
        app.use(express.static(path.join(__dirname + '/public')))

//* Rotas
    //? Lista todas as postagens para o usuário
    app.get('/', (req, resp) => {
        Postagem.find().lean().populate({path: 'categoria', strictPopulate: false}).sort({data: 'desc'}).then((postagens) => {
            resp.render('index', {postagens})
        }).catch(() => {
            req.flash('error_msg', 'Houve um erro interno')
            resp.redirect('/404')
        })
    })

    //? Caso ocorra um erro o usuário é redirecionado para essa rota
    app.get('/404', (req, resp) => {
        resp.send('Erro 404')
    })

    app.use('/admin', admin) //? todas as rotas do arquivo admin.js terão de ter o "prefixo de rota" /admin, ou seja, /admin/posts, /admin/categorias e etc

const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor rodando, http://localhost:8081');
})