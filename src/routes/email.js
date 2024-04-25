const { Router } = require('express');
const EmailController = require('../controllers/EmailController');

const emailController = new EmailController();

const route = Router();

route.post('/api/send-email', (req, res) => {emailController.sendEmail(req, res)});

module.exports = route;