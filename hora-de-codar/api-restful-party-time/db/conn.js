const mongoose = require('mongoose')

module.exports = async function main() {

    mongoose.set('strictQuery', true)
    await mongoose.connect('mongodb+srv://joao:Izhj6n8hbyH1ej8Q@cluster0.56aovhj.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Conectou no banco');
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    })

}