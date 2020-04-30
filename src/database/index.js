
const mongoose = require('mongoose');/* Definindo e importando o Mongoose */

mongoose.connect("mongodb://localhost/ctapp", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });/* Conectando com o Banco de Dados */
mongoose.Promise = global.Promise;/* Definindo e identificando a classe  de promise que o mongoose vai usar*/

module.exports = mongoose;/* Exportando modulo mongoose */