const mongoose = require('mongoose')
const dotenv = require('dotenv-safe')

dotenv.config()

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true   
        });
        console.log("Banco de dados conectado")
    } catch (error) {
        console.log("Error:", error.message)
    }
};

module.exports = {
    connect
}