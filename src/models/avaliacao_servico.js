'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avaliacao_Servico extends Model {

    static associate(models) {
      Avaliacao_Servico.belongsTo(models.Servico,{
        foreignKey: 'servico_id',
      });
    }
  }
  Avaliacao_Servico.init({
    avaliacao: DataTypes.DOUBLE,
    comentario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Avaliacao_Servico',
    tableName: 'avaliacao_servicos',
  });
  return Avaliacao_Servico;
};