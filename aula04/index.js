const express = require('express')
const expressApp = express() //recebendo a função express

expressApp.get('/', (requisição, resposta) => {
    resposta.send('Hello Express.js')
})

expressApp.get('/info', (requisição, resposta) => {
    resposta.send('Utilizando Express.js pela primeira vez')
})

expressApp.get('/data', (requisição, resposta) => {
    const data = new Date
    resposta.send(`Agora são ${data.getHours()}:${data.getMinutes()} do dia ${data.getDay()} do ano de ${data.getFullYear()}`)
})

//tem que ser a ultima linha do codigo
expressApp.listen(9000, () => {
    console.log('Servidor rodando na url http://localhost:9000')
})