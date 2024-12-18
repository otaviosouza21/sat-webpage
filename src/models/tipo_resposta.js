'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TipoResposta extends Model {
    static associate(models) {
      TipoResposta.hasMany(models.Pergunta, { 
        foreignKey: 'tipo_resposta_id' 
      });
    }
  }
  TipoResposta.init(
    {
      nome: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Tipo_Resposta',
      tableName: 'tipo_respostas'
    }
  );
  return TipoResposta;
};
