const Services = require('./Services.js');
const model = require('../models/index.js')
const { Op } = require('sequelize');

class ServicoServices extends Services {
  constructor() {
    super('Servico');
  }


  
  async pegaServicosAtivos(ItenStarted,limit,nome_negocio) {
    const listaServicos = await model.Servico.findAll({
      where:{
        status:true,
        nome_negocio:{[Op.like]:`%${nome_negocio}%`}},
      include: [{
        model: model.Usuario,
        attributes:['id','nome','email','contato_pessoal_01','contato_pessoal_02','contato_negocio_01','contato_negocio_02','socio_sat','createdAt','updatedAt','rule_id'],
      }],
        offset: Number(ItenStarted),
        limit:Number(limit),
        order:[['id','DESC']],
    });

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
