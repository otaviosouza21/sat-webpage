'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Formulario extends Model {
    static associate(models) {
      Formulario.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      Formulario.hasMany(models.Pergunta, { 
        onDelete: 'CASCADE',
        foreignKey: 'formulario_id' });
    }
  }
  Formulario.init(
    {
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      tipo: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      usuario_id: DataTypes.INTEGER,
      vigencia_inicio: DataTypes.DATE,
      vigencia_fim: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Formulario',
      tableName: 'formularios'
    }
  );
  return Formulario;
};
