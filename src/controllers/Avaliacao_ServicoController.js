const Controller = require('./Controller.js');
const Avaliacao_ServicoServices = require('../services/Avaliacao_ServicoServices.js');

const avaliacao_servicoServices = new Avaliacao_ServicoServices();
const camposObrigatorios = ['avaliacao','servico_id']

class Categoria_ServicoController extends Controller {
  constructor() {
    super(avaliacao_servicoServices,camposObrigatorios);
  }
 


}

module.exports = Categoria_ServicoController;
