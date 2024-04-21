const UsuarioServices = require("../services/UsuarioServices");
const EmailController = require("../controllers/EmailController");
const Controller = require("./Controller");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv/config.js");

const usuarioServices = new UsuarioServices();

class PasswordController extends Controller {
  constructor() {
    super(usuarioServices);
    this.emailController = new EmailController();
  }

  async requestPassword(req, res) {
    const { email } = req.body;
    const userExist = await this.propsServices.pegaRegistroPorDado(email);
    const secret = process.env.SECRET;

    if (!userExist.status) {
      return res
        .status(400)
        .json({ mensagem: "Email não encontrado", status: false });
    }

    try {
      const token = jwt.sign({ id: userExist.retorno.id }, secret, {
        expiresIn: "1h",
      });
      const resetLink = `http://localhost:5173/reset-password?token=${token}`;

      //gerando link de recuperação
      const options = {
        to: email,
        subject: "Recuperação de Senha - SAT EMPREENDEDORES",
        text: `Segue link para recuperação de senha  ${resetLink}`,
      };
      await this.emailController.sendEmailOptions(req, res, options);
      res.status(200).json({
        mensagem: "Email de recuperação enviado",
        email: email,
        status: true,
      });
    } catch (Error) {
      throw new Error("Erro ao gerar recuperação de Senha");
    }
  }

  async resetPassword(req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;
    const secret = process.env.SECRET;
    try {
      const decoded = jwt.verify(token, secret);
      const user = await this.propsServices.pegaUmRegistroPorId(decoded.id);

      if (!user) {
        return res.status(404).json({mensagem: "Usuario não encontrado", status:false});
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.senha = hashedPassword;
      await user.save()
      res.status(200).json({mensagem: "Senha atualizada com sucesso", status:true});

    } catch (error) {
      res.status(400).json({mensagem: "Link invalido ou inspirado", status:false});
    }
  }
}

module.exports = PasswordController;
