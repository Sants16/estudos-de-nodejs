const http = require('http')

http.createServer((requisição, resposta) => {
    resposta.end('Hello Node.js')
}).listen(8000)

console.log('O servidor está rodando')