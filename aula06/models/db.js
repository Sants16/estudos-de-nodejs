const { Sequelize } = require("sequelize")
const sequelize = new Sequelize('postapp', 'root', 'rocha003', { // database que iremos conectar / usuario / senhad do usuario 
    host: 'localhost', //em qual servidor esta o banco de dados
    dialect: 'mysql', //qual o tipo do banco de dados
    query: {raw: true}
})

module.exports = {
    Sequelize,
    sequelize
}