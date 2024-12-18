'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo extends Model {
    static associate(models) {
      Tipo.hasMany(models.Formulario, { foreignKey: 'tipo_id' }); // Relacionamento inverso
    }
  }
  Tipo.init(
    {
      nome: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Tipos_formulario',
      tableName: 'tipos_formulario'
    }
  );
  return Tipo;
};
