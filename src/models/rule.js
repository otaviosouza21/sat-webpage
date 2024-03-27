'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rule extends Model {

    static associate(models) {
      Rule.hasMany(models.Usuario,{
        foreignKey:'rule_id'
      });
    }
  }
  
  Rule.init({
    nome: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Rule',
    tableName:'rules'
  });
  return Rule;
};