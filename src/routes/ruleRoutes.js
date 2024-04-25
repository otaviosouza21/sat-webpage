const { Router } = require('express');
const RuleController = require('../controllers/RuleController');


const ruleController = new RuleController();

const route = Router();

route.post('/api/rules', (req, res) => {ruleController.criaRegistroController(req, res)});
route.get('/api/rules', (req, res) => {ruleController.pegaTodosController(req, res)});
route.get('/api/rules/:id', (req, res) => ruleController.pegaUmRegistroPorIdController(req, res));
route.put('/api/rules/:id', (req, res) => ruleController.atulizaDadoController(req, res));
route.delete('/api/rules/:id', (req, res) => ruleController.excluiRegistroController(req, res));

module.exports = route;