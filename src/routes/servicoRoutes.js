const { Router } = require('express');
const ServicoController = require('../controllers/ServicoController');


const servicoController = new ServicoController();

const route = Router();

route.post('/api/servico', (req, res) => {servicoController.criaRegistroController(req, res)});
route.get('/api/servico', (req, res) => {servicoController.pegaTodosController(req, res)});
route.get('/api/servico/usuario', (req, res) => {servicoController.InnerJoinPegaServicoUsuario(req, res)});
route.get('/api/servico/usuario/:id', (req, res) => {servicoController.InnerJoinPegaServicoUsuarioPorId(req, res)});
route.get('/api/servico/categoria', (req, res) => {servicoController.InnerJoinPegaServicoCategoria(req, res)});
route.get('/api/servico/categoria/:id', (req, res) => {servicoController.InnerJoinPegaServicoCategoriaPorId(req, res)});
route.get('/api/servico/:id', (req, res) => servicoController.pegaUmRegistroPorIdController(req, res));
route.put('/api/servico/:id', (req, res) => servicoController.atulizaDadoController(req, res));
route.delete('/api/servico/:id', (req, res) => servicoController.excluiRegistroController(req, res));

module.exports = route;