const { Router } = require('express');
const Avaliacao_ServicoController = require('../controllers/Avaliacao_ServicoController.js');


const avaliacao_servicoController = new Avaliacao_ServicoController();

const route = Router();

route.post('/api/avaliacao_servico', (req, res) => {avaliacao_servicoController.criaRegistroController(req, res)});
route.get('/api/avaliacao_servico', (req, res) => {avaliacao_servicoController.pegaTodosController(req, res)});
route.get('/api/avaliacao_servico/:id', (req, res) => avaliacao_servicoController.pegaUmRegistroPorIdController(req, res));
route.get('/api/avaliacao_servico/servico', (req, res) => {avaliacao_servicoController.InnerJoinPegaAvaliaServico(req, res)});
route.get('/api/avaliacao_servico/servico/:id', (req, res) => {avaliacao_servicoController.InnerJoinPegaAvaliaServicoPorId(req, res)});
route.put('/api/avaliacao_servico/:id', (req, res) => avaliacao_servicoController.atulizaDadoController(req, res));
route.delete('/api/avaliacao_servico/:id', (req, res) => avaliacao_servicoController.excluiRegistroController(req, res));

module.exports = route;