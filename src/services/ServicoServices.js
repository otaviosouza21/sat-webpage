const Services = require('./Services.js');
const model = require('../models/index.js')
class ServicoServices extends Services {
  constructor() {
    super('Servico');
  }


  
  async pegaServicosAtivos(ItenStarted,limit) {


    const listaServicos = await model.Servico.findAll({
      where:{status:true},
      include: [{
        model: model.Usuario,
        attributes:['id','nome','email','contato_pessoal_01','contato_pessoal_02','contato_negocio_01','contato_negocio_02','socio_sat','createdAt','updatedAt','rule_id'],
      }],
        offset: Number(ItenStarted),
        limit:Number(limit),
        order:[['id','DESC']],
    });

    // Array para armazenar os números dos pedidos Encontrados
    //const ServicosEncontrados = listaServicos.map(servicos => servicos.id);

    if (listaServicos) {
        console.log('Nenhum registro encontrado na base de dados.');
        return { error: true, retorno: listaServicos };
    } else {
        console.log('Registros encontrados na base de dados.');
        return { retorno: pedidosComItens, error: false };
    }
}

async pegaServicos(ItenStarted,limit) {


  const listaServicos = await model.Servico.findAll({
    include: [{
      model: model.Usuario,
      attributes:['id','nome','email','contato_pessoal_01','contato_pessoal_02','contato_negocio_01','contato_negocio_02','socio_sat','createdAt','updatedAt','rule_id'],
    }],
      offset: Number(ItenStarted),
      limit:Number(limit),
      order:[['id','DESC']],
  });

  // Array para armazenar os números dos pedidos Encontrados
  //const ServicosEncontrados = listaServicos.map(servicos => servicos.id);

  if (listaServicos) {
      console.log('Nenhum registro encontrado na base de dados.');
      return { error: true, retorno: listaServicos };
  } else {
      console.log('Registros encontrados na base de dados.');
      return { retorno: pedidosComItens, error: false };
  }
}
}

module.exports = ServicoServices;
