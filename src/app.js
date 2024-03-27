const express = require('express')
const routes = require('./routes/index.js')
const sequelize = require('./config/config.js')

const app = express();
routes(app)

sequelize.authenticate()
.then(() => {
  console.log('Conexão estabelecida com sucesso.');
})
.catch((err) => {
  console.error('Não foi possível conectar ao banco de dados:', err);
});

module.exports = app;