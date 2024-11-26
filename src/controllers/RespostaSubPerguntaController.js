const Controller = require('./Controller');
const RespostaSubPerguntaServices = require('../services/RespostaSubPerguntaServices');

const camposObrigatorios = ['resposta_id', 'sub_pergunta_id'];
const respostaSubPerguntaServices = new RespostaSubPerguntaServices();

class RespostaSubPerguntaController extends Controller {
  constructor() {
    super(respostaSubPerguntaServices, camposObrigatorios);
  }

  async cadastrarRespostaSubPergunta(req, res) {
    try {
      const isValid = await this.allowNull(req, res);
      if (isValid.status) {
        const novaRespostaSubPergunta = await this.propsServices.criaRegistro(req.body);
        return res.status(201).json({
          message: 'Resposta para sub-pergunta criada com sucesso!',
          data: novaRespostaSubPergunta,
          error: false
        });
      } else {
        return res.status(400).json({
          message: 'Preencha todos os campos obrigatórios',
          campos: isValid.campos,
          error: true
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao cadastrar resposta para sub-pergunta: ${error.message}`,
        error: true
      });
    }
  }

  async listarRespostasSubPerguntas(req, res) {
    try {
      const respostasSubPerguntas = await this.propsServices.pegaTodosRegistros();
      return res.status(200).json({ data: respostasSubPerguntas, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao listar respostas para sub-perguntas: ${error.message}`,
        error: true
      });
    }
  }

  async pegarRespostaSubPerguntaPorId(req, res) {
    try {
      const { id } = req.params;
      const respostaSubPergunta = await this.propsServices.pegaUmRegistroPorId(id);

      if (!respostaSubPergunta) {
        return res.status(404).json({
          message: 'Resposta para sub-pergunta não encontrada',
          error: true
        });
      }

      return res.status(200).json({ data: respostaSubPergunta, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao buscar resposta para sub-pergunta: ${error.message}`,
        error: true
      });
    }
  }

  async atualizarRespostaSubPergunta(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const atualizado = await this.propsServices.atualizaDado(dadosAtualizados, id);

      if (!atualizado) {
        return res.status(404).json({
          message: 'Resposta para sub-pergunta não encontrada para atualização',
          error: true
        });
      }

      return res.status(200).json({
        message: 'Resposta para sub-pergunta atualizada com sucesso!',
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao atualizar resposta para sub-pergunta: ${error.message}`,
        error: true
      });
    }
  }

  async excluirRespostaSubPergunta(req, res) {
    try {
      const { id } = req.params;

      const excluido = await this.propsServices.excluiRegistro(id);

      if (!excluido) {
        return res.status(404).json({
          message: 'Resposta para sub-pergunta não encontrada para exclusão',
          error: true
        });
      }

      return res.status(200).json({
        message: 'Resposta para sub-pergunta excluída com sucesso!',
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao excluir resposta para sub-pergunta: ${error.message}`,
        error: true
      });
    }
  }
}

module.exports = RespostaSubPerguntaController;
