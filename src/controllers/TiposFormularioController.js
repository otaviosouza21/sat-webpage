const Controller = require('./Controller');
const TiposFormularioServices = require('../services/TiposFormularioServices');

const camposObrigatorios = ['nome', 'status'];
const tiposFormularioServices = new TiposFormularioServices();

class TiposFormularioController extends Controller {
  constructor() {
    super(tiposFormularioServices, camposObrigatorios);
  }
}

module.exports = TiposFormularioController;
