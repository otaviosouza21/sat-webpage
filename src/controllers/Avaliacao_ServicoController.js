const Controller = require('./Controller.js');
const Avaliacao_ServicoServices = require('../services/Avaliacao_ServicoServices.js');
const model = require('../models');

const avaliacao_servicoServices = new Avaliacao_ServicoServices();
const camposObrigatorios = ['avaliacao','servico_id']

class Categoria_ServicoController extends Controller {
  constructor() {
    super(avaliacao_servicoServices,camposObrigatorios);
  }
 
 async InnerJoinPegaAvaliaServico(req,res){
  try {
    const listaRegistros = await model.Avaliacao_Servico.findAll({
      include:[{model: model.Servico}]
    })
      return res.status(200).json(listaRegistros)
    } catch (error) {
      console.log(e);
      return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
  }


  }
 }

module.exports = Categoria_ServicoController;
