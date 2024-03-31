'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servico extends Model {

    static associate(models) {
      Servico.belongsTo(models.Categoria_Servico, {//pertence a uma categoria
        foreignKey: 'categoria_id',
        targetKey:'id'
      });
      Servico.hasMany(models.Avaliacao_Servico, {//tem varias
        foreignKey:'servico_id',
        targetKey: 'servico_id'
      })
      Servico.belongsTo(models.Usuario, {//pertence a um usuario
        foreignKey: 'usuario_id',
        targetKey:'id',
      });
    }
  }
  Servico.init({
    possui_nome_negocio:DataTypes.BOOLEAN,
    nome_negocio: DataTypes.STRING,
    tempo_negocio: DataTypes.INTEGER,
    descricao_servico: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Servico',
    tableName:'servicos',
  });
  return Servico;
};