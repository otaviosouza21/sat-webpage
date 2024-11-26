const express = require('express')
const cors = require('cors')
const rule = require('./ruleRoutes.js')
const usuario = require('./usuarioRoutes.js')
const categoria_servico = require('./categoria_servicoRoutes.js')
const servico = require('./servicoRoutes.js')
const avaliacao = require('./avaliacao_servicoRoutes.js')
const email = require('./email.js')
const password = require('./password.js')
const formulario = require('./formularioRoutes.js')

module.exports = (app)=>{
    app.use(cors());
    app.use(express.json());
    app.use(rule);
    app.use(usuario);
    app.use(categoria_servico);
    app.use(servico);
    app.use(avaliacao);
    app.use(email);
    app.use(password);
    app.use(formulario);
}