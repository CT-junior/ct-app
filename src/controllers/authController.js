const express = require('express');/* Definindo e importando o Express */

const User = require('../models/User');/* Definindo e importando o modulo User */

const router = express.Router();/* Chamnado função Router do express para definir as rotas dos usuarios */

/* Rota de cadastro */
router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {

        /* Conferindo e retornando de o usuario já existe */
        if (await User.findOne({ email }))
        return res.status(400).send({ error: 'O usuário já existe!' });

        const user = await User.create(req.body);

        user.senha = undefined;/* Escondendo senha */

        return res.send({ user });
    } catch (err) {
        return res.status(400).send({error: 'Falha no Registro!'});
    }
});

module.exports = CTapp => CTapp.use('/auth', router);/* todas as rotas adefinidas acima serão prefixadas com o /auth */