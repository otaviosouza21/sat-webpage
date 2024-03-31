const Controller = require('./Controller.js');
const ServicoServices = require('../services/ServicoServices.js');

const servicoServices = new ServicoServices();
const camposObrigatorios = ['possui_nome_negocio','tempo_negocio','descricao_servico','categoria_id','usuario_id']

class ServicoController extends Controller {
  constructor() {
    super(servicoServices,camposObrigatorios);
  }
 
}

module.exports = ServicoController;
