const { Router } = require('express');
const Categoria_ServicoController = require('../controllers/Categoria_ServicoController');


const categoria_servicoController = new Categoria_ServicoController();

const route = Router();

route.post('/categoria_servico', (req, res) => {categoria_servicoController.criaRegistroController(req, res)});
route.get('/categoria_servico', (req, res) => {categoria_servicoController.pegaTodosController(req, res)});
route.get('/categoria_servico/:id', (req, res) => categoria_servicoController.pegaUmRegistroPorIdController(req, res));
route.put('/categoria_servico/:id', (req, res) => categoria_servicoController.atulizaDadoController(req, res));
route.delete('/categoria_servico/:id', (req, res) => categoria_servicoController.excluiRegistroController(req, res));

module.exports = route;