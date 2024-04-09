const Controller = require('./Controller.js');
const ServicoServices = require('../services/ServicoServices.js');
const model = require('../models');


const servicoServices = new ServicoServices();
const camposObrigatorios = ['possui_nome_negocio','tempo_negocio','descricao_servico','categoria_id','usuario_id']

class ServicoController extends Controller {
  constructor() {
    super(servicoServices,camposObrigatorios);
  }
 
  async InnerJoinPegaServicoUsuario(req,res){
    try {
      const listaRegistros = await model.Servico.findAll({
        include: [{
          model: model.Usuario,
          attributes:['id','nome','email','contato_pessoal_01','contato_pessoal_02','contato_negocio_01','contato_negocio_02','socio_sat','createdAt','updatedAt','rule_id']
        }],
      });
      console.log(await listaRegistros);
      return res.status(200).json(listaRegistros)
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
    }
  }

  async InnerJoinPegaServicoCategoria(req,res){
    try {
      const listaRegistros = await model.Servico.findAll({
        include: [{
          model: model.Categoria_Servico
        }],
      });
      return res.status(200).json(listaRegistros)
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
    }
  }
}

module.exports = ServicoController;
