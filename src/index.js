const express = require('express');/* Definindo e importando o Express */
const bodyParser = require('body-parser');/* Definindo e importando o Body-parser */

const CTapp = express();/* Criando aplicação chamando a função Express */


CTapp.use(bodyParser.json());/* Serve para que a aplicação entenda as requisiçoes em JSON */
CTapp.use(bodyParser.urlencoded({ extended: false }));/* Serve para que a aplicação entenda os parametros em URL*/

/* Teste para ver se a aplicação está funcionando */
/* CTapp.get('/', (req, res) => {
    res.send('AEEEE!');
}); */

CTapp.listen(3000);/* Porta do servidor*/