'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pergunta extends Model {
    static associate(models) {
      Pergunta.belongsTo(models.Formulario, { foreignKey: 'formulario_id' });
      Pergunta.hasMany(models.SubPergunta, { foreignKey: 'pergunta_id' });
      Pergunta.hasMany(models.Resposta, { foreignKey: 'pergunta_id' });
    }
  }
  Pergunta.init(
    {
      formulario_id: DataTypes.INTEGER,
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      possui_sub_pergunta: DataTypes.BOOLEAN,
      tipo_resposta: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Pergunta',
      tableName: 'perguntas'
    }
  );
  return Pergunta;
};
