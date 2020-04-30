const mongoose = require('mongoose');/* Definindo e importando o Mongoose */


/* Definindo o Schema: campos do Banco de Dados */
const UserSchema = new mongoose.Schema({

    nome: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,

    },

    senha: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema); /* Definindo o User  */

module.exports = User;/* Exportando modulo User */