'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RespostaSubPergunta extends Model {
    static associate(models) {
      RespostaSubPergunta.belongsTo(models.Resposta, { foreignKey: 'resposta_id' });
      RespostaSubPergunta.belongsTo(models.SubPergunta, { foreignKey: 'sub_pergunta_id' });
    }
  }
  RespostaSubPergunta.init(
    {
      resposta_id: DataTypes.INTEGER,
      sub_pergunta_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'RespostaSubPergunta',
      tableName: 'respostas_sub_perguntas'
    }
  );
  return RespostaSubPergunta;
};
