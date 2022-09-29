const express = require('express')
const expressApp = express()


expressApp.listen(8000, () => {
    console.log('Servidor rodando na url http://localhost:8000')
})