'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria_Servico extends Model {

    static associate(models) {
      Categoria_Servico.hasMany(models.Servico, {//tem muitos
        foreignKey: 'categoria_id',
      });
    }
  }
  Categoria_Servico.init({
    nome: DataTypes.STRING,
    cor_categoria: DataTypes.STRING,
    status: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Categoria_Servico',
    tableName:'categoria_servicos',

  });
  return Categoria_Servico;
};