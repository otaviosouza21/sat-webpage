const { Router } = require('express');
const RespostaSubPerguntaController = require('../controllers/RespostaSubPerguntaController.js');

const respostaSubPerguntaController = new RespostaSubPerguntaController();

const route = Router();

// Rotas de CRUD para o modelo RespostaSubPergunta
route.post('/api/respostas-subperguntas', (req, res) => respostaSubPerguntaController.cadastrarRespostaSubPergunta(req, res));
route.get('/api/respostas-subperguntas', (req, res) => respostaSubPerguntaController.listarRespostasSubPerguntas(req, res));
route.get('/api/respostas-subperguntas/:id', (req, res) => respostaSubPerguntaController.pegarRespostaSubPerguntaPorId(req, res));
route.put('/api/respostas-subperguntas/:id', (req, res) => respostaSubPerguntaController.atualizarRespostaSubPergunta(req, res));
route.delete('/api/respostas-subperguntas/:id', (req, res) => respostaSubPerguntaController.excluirRespostaSubPergunta(req, res));

module.exports = route;
