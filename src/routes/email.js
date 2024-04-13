const { Router } = require('express');
const EmailController = require('../controllers/EmailController');


const emailController = new EmailController();

const route = Router();

route.post('/send-email', (req, res) => {emailController.enviaEmail(req, res)});

module.exports = route;