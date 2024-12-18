'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pergunta extends Model {
    static associate(models) {
      Pergunta.belongsTo(models.Formulario, { foreignKey: 'formulario_id' });
      Pergunta.hasMany(models.SubPergunta, { 
        onDelete: 'CASCADE',
        foreignKey: 'pergunta_id'
       });
      Pergunta.hasMany(models.Resposta, { foreignKey: 'pergunta_id' });
      Pergunta.belongsTo(models.TipoResposta, { 
        foreignKey: 'tipo_resposta_id', 
        as: 'tipoResposta' 
      });
    }
  }
  Pergunta.init(
    {
      formulario_id: DataTypes.INTEGER,
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      possui_sub_pergunta: DataTypes.BOOLEAN,
      tipo_resposta_id: DataTypes.INTEGER // Nova coluna para relacionamento
    },
    {
      sequelize,
      modelName: 'Pergunta',
      tableName: 'perguntas'
    }
  );
  return Pergunta;
};
