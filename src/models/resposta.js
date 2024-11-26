'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resposta extends Model {
    static associate(models) {
      Resposta.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      Resposta.belongsTo(models.Pergunta, { foreignKey: 'pergunta_id' });
      Resposta.hasMany(models.RespostaSubPergunta, { foreignKey: 'resposta_id' });
    }
  }
  Resposta.init(
    {
      usuario_id: DataTypes.INTEGER,
      pergunta_id: DataTypes.INTEGER,
      resposta_texto: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Resposta',
      tableName: 'respostas'
    }
  );
  return Resposta;
};
