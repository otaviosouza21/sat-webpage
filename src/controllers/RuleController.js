const Controller = require('./Controller.js');
const RuleServices = require('../services/RuleServices.js');

const ruleServices = new RuleServices();
const camposObrigatorios = ['nome','status']

class RuleController extends Controller {
  constructor() {
    super(ruleServices,camposObrigatorios);
  }
 


}

module.exports = RuleController;
