const funcSomar = require("./modulos/somar")
const funcSubtrair = require("./modulos/subtrair")
const funcMultiplicar = require("./modulos/multiplicar")
const funcDividir = require("./modulos/dividir")
const funcElevar = require("./modulos/elevar")

const funcs = [
    funcSomar(2, 8),
    funcSubtrair(4, 3),
    funcMultiplicar(6, 5),
    funcDividir(9, 3),
    funcElevar(6, 6)
]

funcs.forEach(func => console.log(func))