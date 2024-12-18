const { Router } = require('express');
const TipoRespostaController = require('../controllers/TipoResposta_Controller.js');

const tipoRespostaController = new TipoRespostaController();

const route = Router();

// Rotas de CRUD para o modelo TipoResposta
route.post('/api/tipo-respostas', (req, res) => tipoRespostaController.criaRegistroController(req, res));
route.get('/api/tipo-respostas', (req, res) => tipoRespostaController.pegaTodosController(req, res));
route.get('/api/tipo-respostas/:id', (req, res) => tipoRespostaController.pegaUmRegistroPorIdController(req, res));
route.put('/api/tipo-respostas/:id', (req, res) => tipoRespostaController.atulizaDadoController(req, res));
route.delete('/api/tipo-respostas/:id', (req, res) => tipoRespostaController.excluiRegistroController(req, res));

module.exports = route;
