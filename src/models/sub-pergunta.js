'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubPergunta extends Model {
    static associate(models) {
      SubPergunta.belongsTo(models.Pergunta, { foreignKey: 'pergunta_id' });
      SubPergunta.hasMany(models.RespostaSubPergunta, { foreignKey: 'sub_pergunta_id' });
    }
  }
  SubPergunta.init(
    {
      pergunta_id: DataTypes.INTEGER,
      titulo: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'SubPergunta',
      tableName: 'sub_perguntas'
    }
  );
  return SubPergunta;
};
