const Controller = require("./Controller");
const FormularioServices = require("../services/FormularioServices.js");
const model = require("../models");

const camposObrigatorios = [
  "titulo",
  "descricao",
  "tipo_id",
  "usuario_id",
  "status",
  "vigencia_inicio",
  "vigencia_fim",
  "perguntas",
];
const formularioServices = new FormularioServices();

class FormularioController extends Controller {
  constructor() {
    super(formularioServices, camposObrigatorios);
  }

  // async cadastrarFormulario(req, res) {
  //   const transaction = await sequelize.transaction();
  //   const { form, question } = req.body;

  //   try {
  //     // Validação inicial
  //     const isValid = await this.allowNullForm(form, res);
  //     if (!isValid.status) {
  //       return res.status(400).json({
  //         message: "Preencha todos os campos obrigatórios",
  //         campos: isValid.campos,
  //         error: true,
  //       });
  //     }

  //     // Cria o formulário dentro da transação
  //     const novoFormulario = await this.propsServices.criaRegistro(form, {
  //       transaction,
  //     });

  //     if (!novoFormulario.id) {
  //       throw new Error(
  //         "Erro ao criar perguntas pois não foi possível obter a ID"
  //       );
  //     }

  //     // Prepara perguntas com vínculo
  //     const perguntasComVinculo = question.map((pergunta) => ({
  //       ...pergunta,
  //       formulario_id: novoFormulario.id,
  //     }));

  //     // Cria perguntas em massa dentro da transação
  //     const novasPerguntas = await perguntaController.cadastrarVariasPerguntas(
  //       perguntasComVinculo,
  //       transaction
  //     );

  //     //Vai iterar sobre as novas perguntas, e verificar se há tipo MultRespostas
  //     novasPerguntas.data.forEach(async (novaPergunta, index) => {
  //       if (novaPergunta.possui_sub_pergunta) {
  //         const subPerguntasComVinculo = question[
  //           index
  //         ].multipleQuestionOptions.map((subPergunta) => ({
  //           ...subPergunta,
  //           pergunta_id: novaPergunta.id,
  //         }));

  //         await subPerguntaController.cadastrarVariasSubPerguntas(
  //           subPerguntasComVinculo,
  //           transaction
  //         );
  //       }
  //     });

  //     // Confirma todas as operações
  //     await transaction.commit();

  //     // Retorna sucesso
  //     return res.status(201).json({
  //       message: "Formulário criado com sucesso!",
  //       form: novoFormulario,
  //       questions: novasPerguntas.data,
  //       error: false,
  //     });
  //   } catch (error) {
  //     // Desfaz as operações em caso de erro
  //     await transaction.rollback();

  //     return res.status(500).json({
  //       message: `Erro ao cadastrar formulário: ${error.message}`,
  //       error: true,
  //     });
  //   }
  // }

  async cadastrarFormulario(req, res) {
    const { perguntas } = req.body;
    const form = req.body;
    try {
      const isTrue = await this.allowNull(req, res);
      console.log(isTrue);
      if (!isTrue.status) {
        return res.status(500).json({
          message: "Preencha todos os campos necessários",
          campos: isTrue.campos,
          error: true,
        });
      }

      // Verifica se ja existe formulario com o nome informado
      const formExist = await model.Formulario.findOne({
        where: { titulo: form.titulo },
      });
      if (formExist !== null) {
        return res.status(500).json({
          message: "Já existe formulario com o nome informado!",
          error: true,
        });
      }

      // Verifica se perguntas foi passado e se é um array
      if (!perguntas || !Array.isArray(perguntas)) {
        return res.status(400).json({
          message:
            "perguntas não fornecidas ou inválidas, deve ser fornecida em lista",
          error: true,
        });
      }

      // verificando se o tipo de formulario passado existe
      const tipoForm = await model.Tipos_formulario.findOne({
        where: { id: form.tipo_id },
      });
      if (tipoForm === null) {
        return res.status(500).json({
          message:
            "tipo de formulario invalido, contate o administrador do sistema!",
          error: true,
        });
      }

      // verificando se o usuario que esta criando o formulario existe
      const usuario = await model.Usuario.findOne({
        where: { id: form.usuario_id, rule_id: 3 },
      });

      if (usuario === null) {
        return res.status(500).json({
          message:
            "Sem acesso necessario ou não existe, contate o administrador do sistema!",
          error: true,
        });
      }

      const cadastroFormulario = await formularioServices.cadastrarFormulario(
        form,
        perguntas
      );

      if (cadastroFormulario.status) {
        return res.status(200).json({
          message: `Formulário cadastrado com sucesso!`,
          error: false,
          data: cadastroFormulario.formulario,
        });
      } else {
        return res.status(500).json({
          message: `Erro ao cadastrar o Formulário`,
          error: true,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: `Erro ao buscar registro, contate o administrador do sistema`,
        error: true,
      });
    }
  }

  async allowNullForm(req, res) {
    this.camposVazios = []; //serve para nao acumular valores duplicados na array
    const todosCamposTrue = this.camposObrigatorios.every((campo) => {
      if (req[campo] == null) {
        this.camposVazios.push(campo);
      }

      return req[campo];
    });

    if (todosCamposTrue) {
      return { status: true };
    } else {
      return { status: false, campos: this.camposVazios };
    }
  }

  async listarFormularios(req, res) {
    try {
      const formularios = await formularioServices.listarFormularios_Services();
      return res.status(200).json({ data: formularios, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao listar formulários: ${error.message}`,
        error: true,
      });
    }
  }

  async listarFormulariosAtivos(req, res) {
    try {
      const formularios =
        await formularioServices.listarFormulariosAtivos_Services();
      return res.status(200).json({ data: formularios, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao listar formulários: ${error.message}`,
        error: true,
      });
    }
  }

  async pegarFormularioPorId(req, res) {
    try {
      const { id } = req.params;
      const formulario = await this.propsServices.pegaUmRegistroPorId(id);

      if (!formulario) {
        return res.status(404).json({
          message: "Formulário não encontrado",
          error: true,
        });
      }

      return res.status(200).json({ data: formulario, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao buscar formulário: ${error.message}`,
        error: true,
      });
    }
  }

  async atualizarFormulario(req, res) {
    try {
      const { id } = req.params;
      const { form } = req.body;

      const atualizado = await this.propsServices.atualizaDado(form, id);

      if (!atualizado) {
        return res.status(404).json({
          message: "Formulário não encontrado para atualização",
          error: true,
        });
      }

      return res.status(200).json({
        message: "Formulário atualizado com sucesso!",
        error: false,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao atualizar formulário: ${error.message}`,
        error: true,
      });
    }
  }

  async excluirFormulario(req, res) {
    try {
      const { id } = req.params;

      const excluido = await this.propsServices.excluiRegistro(id);

      if (!excluido) {
        return res.status(404).json({
          message: "Formulário não encontrado para exclusão",
          error: true,
        });
      }

      return res.status(200).json({
        message: "Formulário excluído com sucesso!",
        error: false,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao excluir formulário: ${error.message}`,
        error: true,
      });
    }
  }
}

module.exports = FormularioController;
