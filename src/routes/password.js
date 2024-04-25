const {Router} = require('express')
const PasswordController = require('../controllers/PasswordController')

const passwordController = new PasswordController()

const route = Router()

route.post('/api/recover-password',(req,res)=> passwordController.requestPassword(req,res))
route.post('/api/reset-password/:token',(req,res)=> passwordController.resetPassword(req,res))

module.exports = route