const { Router } = require('express');
const jwt = require('jsonwebtoken');

const UsuarioController = require('../controllers/UsuarioController');


const usuarioController = new UsuarioController();

const route = Router();

route.post('/api/usuarios/auth/register', (req, res) => {usuarioController.registerUsuarioController(req, res)});
route.post('/api/usuarios/auth/login', (req, res) => {usuarioController.loginUsuarioController(req, res)});
route.get('/api/usuarios/auth/:id', checkToken,(req, res) => {usuarioController.privateRouteUsrController(req, res)});
route.get('/api/usuarios', checkToken,(req, res) => {usuarioController.pegaTodosController(req, res)});
route.get('/api/usuarios/:id', checkToken,(req, res) => usuarioController.pegaUmRegistroPorIdController(req, res));
route.put('/api/usuarios/:id', checkToken,(req, res) => usuarioController.atulizaDadoController(req, res));
route.delete('/api/usuarios/:id', checkToken,(req, res) => usuarioController.excluiRegistroController(req, res));

function checkToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]
  
    if(!token){
      return res.status(401).json({message: "acessos negado", error:true})
    }

    try{
        const secret = process.env.SECRET
        jwt.verify(token, secret)

        next()
    }catch(e){
       return res.status(400).json({message:"token invalido"})
    }
}
module.exports = route;