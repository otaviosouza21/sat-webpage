"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Remover a constraint existente em respostas_sub_perguntas
    await queryInterface.removeConstraint(
      "respostas_sub_perguntas",
      "respostas_sub_perguntas_ibfk_1"
    );

    // 2. Remover a coluna resposta_id
    await queryInterface.removeColumn("respostas_sub_perguntas", "resposta_id");

    // 3. Adicionar a coluna usuario_id
    await queryInterface.addColumn("respostas_sub_perguntas", "usuario_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios", // Nome da tabela que referencia
        key: "id", // Coluna de referência
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // 4. Adicionar o relacionamento correto entre sub_perguntas e perguntas
    await queryInterface.addConstraint("sub_perguntas", {
      fields: ["pergunta_id"],
      type: "foreign key",
      name: "sub_perguntas_pergunta_id_fk",
      references: {
        table: "perguntas",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // 1. Remover a constraint entre sub_perguntas e perguntas
    await queryInterface.removeConstraint(
      "sub_perguntas",
      "sub_perguntas_pergunta_id_fk"
    );

    // 2. Remover a coluna usuario_id
    await queryInterface.removeColumn("respostas_sub_perguntas", "usuario_id");

    // 3. Recriar a coluna resposta_id
    await queryInterface.addColumn("respostas_sub_perguntas", "resposta_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "respostas",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // 4. Restaurar a constraint removida em respostas_sub_perguntas
    await queryInterface.addConstraint("respostas_sub_perguntas", {
      fields: ["resposta_id"],
      type: "foreign key",
      name: "respostas_sub_perguntas_ibfk_1",
      references: {
        table: "respostas",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
};
