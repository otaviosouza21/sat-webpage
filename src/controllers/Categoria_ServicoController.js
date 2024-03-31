const Controller = require('./Controller.js');
const Categoria_ServicoServices = require('../services/Categoria_ServicoServices.js');

const categoria_servicoServices = new Categoria_ServicoServices();
const camposObrigatorios = ['nome','cor_categoria','status']

class Categoria_ServicoController extends Controller {
  constructor() {
    super(categoria_servicoServices,camposObrigatorios);
  }
 


}

module.exports = Categoria_ServicoController;
