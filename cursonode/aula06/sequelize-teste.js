const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('teste', 'root', 'rocha003', {
    host: 'localhost', //em qual servidor esta o banco de dados
    dialect: 'mysql' //qual o tipo do banco de dados
}) //fazendo a conexão com o banco de dados

// Model - Postagem
const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

// Model - Usuário
const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

// Inserindo dados
Postagem.create({
    titulo: 'Roundabout',
    conteudo: "i'll be the roundabout"
})

Usuario.create({
    nome: 'Teste',
    sobrenome: 'Da Silva',
    idade: 44,
    email: '@email.com'
})

// Sincroniza o model com o mysql
// Postagem.sync({force: true})
// Usuario.sync({force: true})