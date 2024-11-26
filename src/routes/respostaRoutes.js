const { Router } = require('express');
const RespostaController = require('../controllers/RespostaController.js');

const respostaController = new RespostaController();

const route = Router();

// Rotas de CRUD para o modelo Resposta
route.post('/api/respostas', (req, res) => respostaController.cadastrarResposta(req, res));
route.get('/api/respostas', (req, res) => respostaController.listarRespostas(req, res));
route.get('/api/respostas/:id', (req, res) => respostaController.pegarRespostaPorId(req, res));
route.put('/api/respostas/:id', (req, res) => respostaController.atualizarResposta(req, res));
route.delete('/api/respostas/:id', (req, res) => respostaController.excluirResposta(req, res));

module.exports = route;
