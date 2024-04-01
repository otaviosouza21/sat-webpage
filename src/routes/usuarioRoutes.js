const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');


const usuarioController = new UsuarioController();

const route = Router();

route.post('/usuarios/auth/register', (req, res) => {usuarioController.registerUsuarioController(req, res)});
route.post('/usuarios/auth/login', (req, res) => {usuarioController.loginUsuarioController(req, res)});
route.get('/usuarios/auth/:id', (req, res) => {usuarioController.loginUsuarioController(req, res)});
route.get('/usuarios', (req, res) => {usuarioController.pegaTodosController(req, res)});
route.get('/usuarios/:id', (req, res) => usuarioController.pegaUmRegistroPorIdController(req, res));
route.put('/usuarios/:id', (req, res) => usuarioController.atulizaDadoController(req, res));
route.delete('/usuarios/:id', (req, res) => usuarioController.excluiRegistroController(req, res));

module.exports = route;