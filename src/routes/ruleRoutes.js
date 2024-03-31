const { Router } = require('express');
const RuleController = require('../controllers/RuleController');


const ruleController = new RuleController();

const route = Router();

route.post('/rules', (req, res) => {ruleController.criaRegistroController(req, res)});
route.get('/rules', (req, res) => {ruleController.pegaTodosController(req, res)});
route.get('/rules/:id', (req, res) => ruleController.pegaUmRegistroPorIdController(req, res));
route.put('/rules/:id', (req, res) => ruleController.atulizaDadoController(req, res));
route.delete('/rules/:id', (req, res) => ruleController.excluiRegistroController(req, res));

module.exports = route;