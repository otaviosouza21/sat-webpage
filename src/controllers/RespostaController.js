const Controller = require('./Controller');
const RespostaServices = require('../services/RespostaServices.js');

const camposObrigatorios = ['usuario_id', 'pergunta_id', 'resposta_texto'];
const respostaServices = new RespostaServices();

class RespostaController extends Controller {
  constructor() {
    super(respostaServices, camposObrigatorios);
  }

  async cadastrarResposta(req, res) {
    try {
      const isValid = await this.allowNull(req, res);
      if (isValid.status) {
        const novaResposta = await this.propsServices.criaRegistro(req.body);
        return res.status(201).json({
          message: 'Resposta criada com sucesso!',
          data: novaResposta,
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
        message: `Erro ao cadastrar resposta: ${error.message}`,
        error: true
      });
    }
  }

  async listarRespostas(req, res) {
    try {
      const respostas = await this.propsServices.pegaTodosRegistros();
      return res.status(200).json({ data: respostas, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao listar respostas: ${error.message}`,
        error: true
      });
    }
  }

  async pegarRespostaPorId(req, res) {
    try {
      const { id } = req.params;
      const resposta = await this.propsServices.pegaUmRegistroPorId(id);

      if (!resposta) {
        return res.status(404).json({
          message: 'Resposta não encontrada',
          error: true
        });
      }

      return res.status(200).json({ data: resposta, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao buscar resposta: ${error.message}`,
        error: true
      });
    }
  }

  async atualizarResposta(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const atualizado = await this.propsServices.atualizaDado(dadosAtualizados, id);

      if (!atualizado) {
        return res.status(404).json({
          message: 'Resposta não encontrada para atualização',
          error: true
        });
      }

      return res.status(200).json({
        message: 'Resposta atualizada com sucesso!',
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao atualizar resposta: ${error.message}`,
        error: true
      });
    }
  }

  async excluirResposta(req, res) {
    try {
      const { id } = req.params;

      const excluido = await this.propsServices.excluiRegistro(id);

      if (!excluido) {
        return res.status(404).json({
          message: 'Resposta não encontrada para exclusão',
          error: true
        });
      }

      return res.status(200).json({
        message: 'Resposta excluída com sucesso!',
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao excluir resposta: ${error.message}`,
        error: true
      });
    } 
  }
}

module.exports = RespostaController;
