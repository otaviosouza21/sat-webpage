const { Router } = require('express');
const ServicoController = require('../controllers/ServicoController');


const servicoController = new ServicoController();

const route = Router();

route.post('/servico', (req, res) => {servicoController.criaRegistroController(req, res)});
route.get('/servico', (req, res) => {servicoController.pegaTodosController(req, res)});
route.get('/servico/:id', (req, res) => servicoController.pegaUmRegistroPorIdController(req, res));
route.put('/servico/:id', (req, res) => servicoController.atulizaDadoController(req, res));
route.delete('/servico/:id', (req, res) => servicoController.excluiRegistroController(req, res));

module.exports = route;