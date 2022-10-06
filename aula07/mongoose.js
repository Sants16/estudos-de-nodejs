const mongoose = require('mongoose')

try{
    //Configurando o mongoose
    mongoose.connect('mongodb://localhost/aprendendo', { useNewUrlParser: true }) //aprendendo é o banco de dados que iremos nos conectar
    .then(() => console.log('Conexão realizada com sucesso'))
} catch(err) {
    console.log(`Houve um erro: ${err}`);
}

//Model - Usuários
const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
    nome: {
        type: String, // String | Number | Boolean e etc...
        required: true //faz o campo ser obrigatorio de ser preenchido
    },
    sobrenome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    país: {
        type: String
    }
})

mongoose.model('usuarios', UsuarioSchema)

const novoUsuario = mongoose.model('usuarios')

new novoUsuario({
    nome: 'João',
    sobrenome: 'Victor',
    email: 'email@teste.mail',
    idade: 17,
    país: 'Brasil'
})
.save() //salvar o registro no banco de dados
.then(() => console.log('Usuário salvo'))
.catch(err => console.log(err))

/*
Criar Model de forma mais simples e atualizada: 

const Schema = mongoose.Schema

const Usuario = new Schema ({
                nome: String,
                apelido: String,
                idade: Number
})

mongoose.model('nomeDaCollection', Usuario)

//Adicionar dados na collection
const adicinarDado = mongoose.model('nomeDaCollection')

new AdicionarDados ({
              nome: 'Nome qualquer',
              apelido: 'Apelido qualquer',
              idade: 30
}).save().then(() => {
             console.log('Feito!')
}).catch((erro) => {
             console.log('Erro ' + erro)
})
*/