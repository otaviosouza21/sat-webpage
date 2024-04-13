const nodemailer = require("nodemailer");
require("dotenv/config.js");

class EmailController {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async enviaEmail(req, res) {
    const { to, subject, text } = req.body;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send("Erro ao enviar e-mail.");
      } else {
        console.log("Email enviado: " + info.response);
        res.status(200).send("E-mail enviado com sucesso.");
      }
    });
  }
}

module.exports = EmailController;
