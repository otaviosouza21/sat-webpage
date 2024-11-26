const { Router } = require('express');
const FormularioController = require('../controllers/FormularioController.js');

const formularioController = new FormularioController();

const route = Router();

// Rotas de CRUD para o modelo Formulario
route.post('/api/formularios', (req, res) => formularioController.cadastrarFormulario(req, res));
route.get('/api/formularios', (req, res) => formularioController.listarFormularios(req, res));
route.get('/api/formularios/:id', (req, res) => formularioController.pegarFormularioPorId(req, res));
route.put('/api/formularios/:id', (req, res) => formularioController.atualizarFormulario(req, res));
route.delete('/api/formularios/:id', (req, res) => formularioController.excluirFormulario(req, res));

module.exports = route;
