const { Router } = require('express');
const SubPerguntaController = require('../controllers/SubPerguntaController');

const subPerguntaController = new SubPerguntaController();

const route = Router();

// Rotas de CRUD para o modelo SubPergunta
route.post('/api/subperguntas', (req, res) => subPerguntaController.cadastrarSubPergunta(req, res));
route.get('/api/subperguntas', (req, res) => subPerguntaController.listarSubPerguntas(req, res));
route.get('/api/subperguntas/:id', (req, res) => subPerguntaController.pegarSubPerguntaPorId(req, res));
route.put('/api/subperguntas/:id', (req, res) => subPerguntaController.atualizarSubPergunta(req, res));
route.delete('/api/subperguntas/:id', (req, res) => subPerguntaController.excluirSubPergunta(req, res));

module.exports = route;
