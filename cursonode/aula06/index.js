const express = require('express')
const expressApp = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')


// Config
    // Template Engine
    expressApp.engine('handlebars', handlebars.engine({defaultLayout: 'main'})) //queremos usar o handlebars como template engine do nosso projeto, o main é o template padrão da nossa aplicação
    expressApp.set('view engine', 'handlebars')

    // Body Parser
    expressApp.use(bodyParser.urlencoded({extended: false}))
    expressApp.use(bodyParser.json())

// Rotas

    expressApp.get('/', (req, res) => {
        //retorna todos os posts que existem na tabela Post
        //DESC, ordena os posts do mais novo para o mais antigo
        //ASC, ordena os posts do mais antigo para o mais novo
        Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
            res.render('home', {posts} /*posts: posts*/)
        })
    })

    expressApp.get('/cad', (req, res) => {
        res.render('formulario') //informamos o arquivo handlebars que queremos que seja exibido
    })

    // essa rota só poderá ser acessada quando alguém fizer uma requisição post, além disso não pode ser acessada por meio da url como as rotas get
    expressApp.post('/add', (req, res) => {
        const { titulo, conteudo } = req.body
        try {
            Post.create({
                titulo, //titulo: titulo
                conteudo //conteudo: conteudo
            })
            .then(() => res.redirect('/'))
        } catch(err) {
            res.send(`Houve um erro: ${err}`)
        }
    })

    expressApp.get('/deletar/:id', (req, res) => {
        const { id } = req.params
        try {
            Post.destroy({ where: {'id': id} })
            .then(() => {
                res.send('Postagem deletada com sucesso!')
            }) 
        } catch(err) {
            res.send(`Houve um erro: ${err}`)
        }
    })

expressApp.listen(8000, () => {
    console.log('Servidor rodando na url: http://localhost:8000')
})