'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Formulario extends Model {
    static associate(models) {
      Formulario.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      Formulario.hasMany(models.Pergunta, { 
        onDelete: 'CASCADE',
        foreignKey: 'formulario_id' 
      });
      Formulario.belongsTo(models.Tipos_formulario, { foreignKey: 'tipo_id' }); // Novo relacionamento
    }
  }
  Formulario.init(
    {
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      usuario_id: DataTypes.INTEGER,
      vigencia_inicio: DataTypes.DATE,
      vigencia_fim: DataTypes.DATE,
      tipo_id: DataTypes.INTEGER // Nova coluna
    },
    {
      sequelize,
      modelName: 'Formulario',
      tableName: 'formularios'
    }
  );
  return Formulario;
};
