'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servico extends Model {

    static associate(models) {
      Servico.belongsTo(models.Categoria_Servico, {
        foreignKey: 'categoria_id',
      });
      Servico.belongsTo(models.Avaliacao_Servico, {
        foreignKey: 'avaliacao_id',
      });
      Servico.belongsTo(models.Usuario, {
        foreignKey: 'servico_id',
      });
    }
  }
  Servico.init({
    possui_nome_negocio: DataTypes.BOOLEAN,
    nome_negocio: DataTypes.STRING,
    tempo_negocio: DataTypes.INTEGER,
    descricao_servico: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Servico',
    tableName:'servicos'
  });
  return Servico;
};