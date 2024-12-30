const Services = require("./Services");
const model = require("../models/index.js");
const { stack } = require("sequelize/lib/utils");

class FormularioServices extends Services {
  constructor() {
    super("Formulario");
  }

  async listarFormularios_Services() {
    const formularios = await model.Formulario.findAll({
      include: [
        {
          model: model.Tipos_formulario,
          attributes: ["id", "nome", "status"], // Campos relevantes de Tipos_formulario
        },
        {
          model: model.Pergunta,
          attributes: [
            "titulo",
            "descricao",
            "possui_sub_pergunta",
            "tipo_resposta_id",
          ],
          include: [
            {
              model: model.SubPergunta,
              attributes: ["pergunta_id", "titulo"], // Campos relevantes de SubPergunta
            },
          ],
        },
      ],
    });

    // Verifica se há registros encontrados
    if (!formularios || formularios.length === 0) {
      console.log("Nenhum registro encontrado na base de dados.");
      return { error: true, retorno: [] }; // Retorna array vazio para consistência
    }

    console.log("Registros encontrados na base de dados.");
    return { retorno: formularios, error: false };
  }

  async listarFormulariosAtivos_Services() {
    const formulariosAtivos = await model.Formulario.findAll({
      where: { status: true },
      include: [
        {
          model: model.Tipos_formulario,
          attributes: ["id", "nome", "status"], // Campos relevantes de Tipos_formulario
        },
        {
          model: model.Pergunta,
          attributes: [
            "titulo",
            "descricao",
            "possui_sub_pergunta",
            "tipo_resposta_id",
          ],
          include: [
            {
              model: model.SubPergunta,
              attributes: ["titulo"], // Inclui os campos relevantes da SubPergunta
            },
          ],
        },
      ],
    });

    if (!formulariosAtivos || formulariosAtivos.length === 0) {
      console.log("Nenhum registro encontrado na base de dados.");
      return { error: true, retorno: formulariosAtivos };
    } else {
      console.log("Registros encontrados na base de dados.");
      return { retorno: formulariosAtivos, error: false };
    }
  }

  async listarFormulariosAtivos_ServicesWhere(column, id) {
    const formulariosAtivos = await model.Formulario.findAll({
      where: { [column]: id },
      include: [
        {
          model: model.Tipos_formulario,
          attributes: ["id", "nome", "status"], // Campos relevantes de Tipos_formulario
        },
        {
          model: model.Pergunta,
          attributes: [
            "titulo",
            "descricao",
            "possui_sub_pergunta",
            "tipo_resposta_id",
          ],
          include: [
            {
              model: model.SubPergunta,
              attributes: ["titulo"], // Inclui os campos relevantes da SubPergunta
            },
          ],
        },
      ],
    });

    if (!formulariosAtivos || formulariosAtivos.length === 0) {
      console.log("Nenhum registro encontrado na base de dados.");
      return { error: true, retorno: formulariosAtivos };
    } else {
      console.log("Registros encontrados na base de dados.");
      return { retorno: formulariosAtivos, error: false };
    }
  }

  async cadastrarFormulario(form, perguntas) {
    const transaction = await model.sequelize.transaction(); // Inicia a transação
    try {
      // 1. Cria o formulário principal
      const formulario = await model.Formulario.create(
        {
          titulo: form.titulo,
          descricao: form.descricao,
          tipo_id: form.tipo_id,
          usuario_id: form.usuario_id,
          status: form.status,
          vigencia_inicio: form.vigencia_inicio,
          vigencia_fim: form.vigencia_fim,
        },
        { transaction }
      );

      // 2. Itera pelas perguntas para processar cada uma
      for (const pergunta of perguntas) {
        const { tipo_resposta_id, opcoes_resposta, ...perguntaData } = pergunta;

        // Cria a pergunta associada ao formulário
        const novaPergunta = await model.Pergunta.create(
          {
            ...perguntaData,
            tipo_resposta_id,
            formulario_id: formulario.id,
          },
          { transaction }
        );

        // 3. Verifica se `tipo_resposta_id` é 3 para tratar `opcoes_resposta`
        if (tipo_resposta_id === 3 && Array.isArray(opcoes_resposta)) {
       
          
          for (const opcao of opcoes_resposta) {
            await model.SubPergunta.create(
              {
                titulo: opcao.titulo,
                pergunta_id: novaPergunta.id, // Relaciona com a pergunta
              },
              { transaction }
            );
          }
        }
      }

      // Confirma a transação
      await transaction.commit();

      // Retornar o formulário completo com todos os relacionamentos
      const formularioCompleto = await model.Formulario.findOne({
        where: { id: formulario.id },
        include: [
          {
            model: model.Pergunta,
            include: [
              {
                model: model.SubPergunta,
              },
            ],
          },
        ],
      });

      return { status: true, formulario: formularioCompleto };
    } catch (error) {
      // Reverte a transação em caso de erro
      console.error("Erro ao cadastrar formulári =(:", error);
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FormularioServices;
