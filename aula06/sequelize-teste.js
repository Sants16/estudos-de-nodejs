const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('teste', 'root', 'rocha003', {
    host: 'localhost', //em qual servidor esta o banco de dados
    dialect: 'mysql' //qual o tipo do banco de dados
}) //fazendo a conexão com o banco de dados

/* 
- 1° parametro exigido é à qual banco de dados queremos nos conectar 
- 2° parametro exigido é o nome do usuario no banco de dados 
- 3° parametro é a senha desse usuario 
- 4° parametro é um object
*/

sequelize.authenticate()
.then(
    () => console.log('A autenticação foi realizada com sucesso')
).catch(
    (error) => console.log(`Falha ao se conectar: ${error}`)
)