const mongoose = require('../database');/* Definindo e importando o Mongoose */
const bcrypt = require('bcrypt');/* Definindo e importando o Bcrypt */


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


/* Encriptação da Senha */
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const User = mongoose.model('User', UserSchema); /* Definindo o User  */

module.exports = User;/* Exportando modulo User */