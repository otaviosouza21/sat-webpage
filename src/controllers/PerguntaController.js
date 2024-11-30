const Controller = require('./Controller');
const PerguntaServices = require('../services/PerguntaServices.js');

const camposObrigatorios = ['formulario_id', 'titulo', 'tipo_resposta'];
const perguntaServices = new PerguntaServices();

class PerguntaController extends Controller {
  constructor() {
    super(perguntaServices, camposObrigatorios);
  }


  async cadastrarPergunta(req, res) {
  
    try {
       const isValid = await this.allowNull(req, res);
      if (!isValid.status) {
        const novaPergunta = await this.propsServices.criaVarios(req.body);
        return res.status(201).json({
          message: 'Pergunta criada com sucesso!',
          data: novaPergunta,
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
        message: `Erro ao cadastrar pergunta: ${error.message}`,
        error: true
      });
    }
  }

  async cadastrarVariasPerguntas(data) {
    try {
      /* const isValid = await this.allowNull(req, res); */
      if (true) {
        const novaPergunta = await this.propsServices.criaVarios(data);
        return {error: false, data: novaPergunta};
      } else {
        return {error: true, message: 'Preencha todos os campos obrigatorios'};
      }
    } catch (error) {
      return {error: false, message: error.message};
    }
  }

  async listarPerguntas(req, res) {
    try {
      const perguntas = await this.propsServices.pegaTodosRegistros();
      return res.status(200).json({ data: perguntas, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao listar perguntas: ${error.message}`,
        error: true
      });
    }
  }

  async pegarPerguntaPorId(req, res) {
    try {
      const { id } = req.params;
      const pergunta = await this.propsServices.pegaUmRegistroPorId(id);

      if (!pergunta) {
        return res.status(404).json({
          message: 'Pergunta não encontrada',
          error: true
        });
      }

      return res.status(200).json({ data: pergunta, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao buscar pergunta: ${error.message}`,
        error: true
      });
    }
  }

  async atualizarPergunta(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const atualizado = await this.propsServices.atualizaDado(dadosAtualizados, id);

      if (!atualizado) {
        return res.status(404).json({
          message: 'Pergunta não encontrada para atualização',
          error: true
        });
      }

      return res.status(200).json({
        message: 'Pergunta atualizada com sucesso!',
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao atualizar pergunta: ${error.message}`,
        error: true
      });
    }
  }

  async excluirPergunta(req, res) {
    try {
      const { id } = req.params;

      const excluido = await this.propsServices.excluiRegistro(id);

      if (!excluido) {
        return res.status(404).json({
          message: 'Pergunta não encontrada para exclusão',
          error: true
        });
      }

      return res.status(200).json({
        message: 'Pergunta excluída com sucesso!',
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao excluir pergunta: ${error.message}`,
        error: true
      });
    }
  }
}

module.exports = PerguntaController;
