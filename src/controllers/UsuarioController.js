const Controller = require('./Controller.js');
const UsuarioServices = require('../services/UsuarioServices.js');

const usuarioServices = new UsuarioServices();
const camposObrigatorios = ['nome','contato_pessoal_01','tempo_reside','socio_sat','rule_id']

class UsuarioController extends Controller {
  constructor() {
    super(usuarioServices,camposObrigatorios);
  }
 


}

module.exports = UsuarioController;
