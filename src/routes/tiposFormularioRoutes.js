const { Router } = require('express');
const TiposFormularioController = require('../controllers/TiposFormularioController.js');

const tiposFormularioController = new TiposFormularioController();

const route = Router();

// Rotas de CRUD para o modelo TiposFormulario
route.post('/api/tipos-formulario', (req, res) => tiposFormularioController.criaRegistroController(req, res));
route.get('/api/tipos-formulario', (req, res) => tiposFormularioController.pegaTodosController(req, res));
route.get('/api/tipos-formulario/:id', (req, res) => tiposFormularioController.pegaUmRegistroPorIdController(req, res));
route.put('/api/tipos-formulario/:id', (req, res) => tiposFormularioController.atulizaDadoController(req, res));
route.delete('/api/tipos-formulario/:id', (req, res) => tiposFormularioController.excluiRegistroController(req, res));

module.exports = route;
