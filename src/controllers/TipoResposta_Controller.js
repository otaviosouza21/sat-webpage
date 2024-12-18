const Controller = require('./Controller');
const TipoRespostaServices = require('../services/tipoResposta_Services.js');

const camposObrigatorios = ['nome', 'status'];
const tipoRespostaServices = new TipoRespostaServices();

class TipoRespostaController extends Controller {
  constructor() {
    super(tipoRespostaServices, camposObrigatorios);
  }
}

module.exports = TipoRespostaController;
