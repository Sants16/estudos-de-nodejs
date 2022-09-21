const express = require('express')
const expressApp = express() //recebendo a função express

expressApp.get('/', (requisição, resposta) => {
    resposta.send('Hello Express.js')
})

expressApp.get('/sobre', (requisição, resposta) => {
    resposta.send('Utilizando Express.js pela primeira vez')
})

expressApp.get('/data', (requisição, resposta) => {
    const data = new Date
    resposta.send(`Agora são ${data.getHours()}:${data.getMinutes()} do dia ${data.getDay()} do ano de ${data.getFullYear()}`)
})

expressApp.get('/saudacao/:nome/:idade/:nacionalidade', (requisição, resposta) => { //trabalhando com parâmetro, "/:nome do parametro"
    const { nome, idade, nacionalidade } = requisição.params //pegando os parametros da requisição feita para o servidor node
    resposta.send(`<h1>
                        Olá
                        <span style="color:blue;">${nome}</span>, 
                        você tem 
                        <span style="color:blue;">${idade}</span> anos 
                        e é <span style="color:blue;">${nacionalidade}</span>
                    </h1>`)
})

//tem que ser a ultima linha do codigo
expressApp.listen(9000, () => {
    console.log('Servidor rodando na url http://localhost:9000')
})