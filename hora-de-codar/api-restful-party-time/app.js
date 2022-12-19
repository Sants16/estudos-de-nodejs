//* Importando libs
const express = require('express')
const cors = require('cors')
const app = express()

//* Definindo middlewares
app.use(cors())
app.use(express.json()) //? Permite a comunicação de dados via json

//* Conexão com banco de dados no mongoDBAtalas
const conn = require('./db/conn')
conn()

//* Routes
const routes = require('./routes/router')
app.use('/api', routes)

app.listen(3000, () => {
    console.log('foi');
})