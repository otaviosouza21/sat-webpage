const Controller = require('./Controller.js');
const model = require('../models')
const UsuarioServices = require('../services/UsuarioServices.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioServices = new UsuarioServices();
const camposObrigatorios = ['nome','email','senha','contato_pessoal_01','tempo_reside','rule_id','socio_sat',"status"]

class UsuarioController extends Controller {
  constructor() {
    super(usuarioServices,camposObrigatorios);
  }
 
  async registerUsuarioController(req,res){
    const {email} = req.body;
    const bodyReq = req.body;

    //valida campos obrigatorios
    try{
      const isTrue = await this.allowNull(req, res);
      if(isTrue.status){
        //checar se o usuario existe
        const userExist = await this.propsServices.pegaRegistroPorDado(email)
        if(userExist.status){
          return res.status(422).json({
            message:"por favor, utilize outro e-mail!",
            error:true
          });
        }
        //gerando senha cripto
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(bodyReq.senha, salt);
        bodyReq.senha = senhaHash;
        //criando usuario
        const createUser = await model.Usuario.create(bodyReq);
        return res.status(200).json({ message: `usuario cadastrado com sucesso`,error:false });
      }else{
        return res.status(500).json({
          message: 'Preencha todos os campos necessarios',
          campos: isTrue.campos,
          error: true,
        });
      }
    }catch(e){
      return res.status(500).json({ message: `erro ao criar, mensagem do erro:${e}` });
    }
  }

  async loginUsuarioController(req,res){
    const {email, senha} = req.body;
      //validações
      if(!email){
        return res.status(422).json({message:"o email é obrigatorio"});
      }
      if(!senha){
        return res.status(422).json({message:"Por favor, insira uma senha!"});
      }
    
    //checar se o email existe
    const userExist = await this.propsServices.pegaRegistroPorDado(email)
    if(!userExist.status){
      return res.status(422).json({
        message:"e-mail não cadastrado",
        error:true
      });
    }
    //checar se a senha cripto confere
    const senhaDB = userExist.retorno.dataValues.senha;
    const checkSenha = await bcrypt.compare(senha, senhaDB)
    if(!checkSenha){
      return res.status(404).json({message:"Senha Invalida!"});
    }

    try{
      const secret = process.env.SECRET;

      const token = jwt.sign({
        email: userExist.retorno.dataValues.email
      },
      secret,
      )
      res.status(200).json({message:"Autentiação realizada com sucesso",token})
      
    }catch(e){
      return res.status(500).json({ message: `erro ao logar, mensagem do erro:${e}` });
    }
  }

  }


module.exports = UsuarioController;
