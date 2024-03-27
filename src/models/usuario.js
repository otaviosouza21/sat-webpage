'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.belongsTo(models.Rule, {
        foreignKey: 'rule_id',
      });
      Usuario.hasMany(models.Servico,{
        foreignkey:'servico_id',
      });
    }
  }
  Usuario.init({
    nome: DataTypes.STRING,
    contato_pessoal_01: DataTypes.STRING,
    contato_pessoal_02: DataTypes.STRING,
    contato_negocio_01: DataTypes.STRING,
    contato_negocio_02: DataTypes.STRING,
    tempo_reside: DataTypes.INTEGER,
    socio_sat: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios'
  });
  return Usuario;
};