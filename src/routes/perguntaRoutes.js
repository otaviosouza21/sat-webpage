const { Router } = require('express');
const PerguntaController = require('../controllers/PerguntaController.js');

const perguntaController = new PerguntaController();

const route = Router();

// Rotas de CRUD para o modelo Pergunta
route.post('/api/perguntas', (req, res) => perguntaController.cadastrarPergunta(req, res));
route.get('/api/perguntas', (req, res) => perguntaController.listarPerguntas(req, res));
route.get('/api/perguntas/:id', (req, res) => perguntaController.pegarPerguntaPorId(req, res));
route.put('/api/perguntas/:id', (req, res) => perguntaController.atualizarPergunta(req, res));
route.delete('/api/perguntas/:id', (req, res) => perguntaController.excluirPergunta(req, res));

module.exports = route;
