const Controller = require('./Controller');
const SubPerguntaServices = require('../services/SubPerguntaServices');

const camposObrigatorios = ['pergunta_id', 'titulo'];
const subPerguntaServices = new SubPerguntaServices();

class SubPerguntaController extends Controller {
  constructor() {
    super(subPerguntaServices, camposObrigatorios);
  }

  async cadastrarSubPergunta(req, res) {
    
    try {
      const isValid = await this.allowNull(req, res);
      if (isValid.status) {
        const novaSubPergunta = await this.propsServices.criaRegistro(req.body);
        return res.status(201).json({
          message: 'Subpergunta criada com sucesso!',
          data: novaSubPergunta,
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
        message: `Erro ao cadastrar subpergunta: ${error.message}`,
        error: true
      });
    }
  }

  async listarSubPerguntas(req, res) {
    try {
      const subPerguntas = await this.propsServices.pegaTodosRegistros();
      return res.status(200).json({ data: subPerguntas, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao listar subperguntas: ${error.message}`,
        error: true
      });
    }
  }

  async pegarSubPerguntaPorId(req, res) {
    try {
      const { id } = req.params;
      const subPergunta = await this.propsServices.pegaUmRegistroPorId(id);

      if (!subPergunta) {
        return res.status(404).json({
          message: 'Subpergunta não encontrada',
          error: true
        });
      }

      return res.status(200).json({ data: subPergunta, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao buscar subpergunta: ${error.message}`,
        error: true
      });
    }
  }

  async atualizarSubPergunta(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const atualizado = await this.propsServices.atualizaDado(dadosAtualizados, id);

      if (!atualizado) {
        return res.status(404).json({
          message: 'Subpergunta não encontrada para atualização',
          error: true
        });
      }

      return res.status(200).json({
        message: 'Subpergunta atualizada com sucesso!',
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao atualizar subpergunta: ${error.message}`,
        error: true
      });
    }
  }

  async excluirSubPergunta(req, res) {
    try {
      const { id } = req.params;

      const excluido = await this.propsServices.excluiRegistro(id);

      if (!excluido) {
        return res.status(404).json({
          message: 'Subpergunta não encontrada para exclusão',
          error: true
        });
      }

      return res.status(200).json({
        message: 'Subpergunta excluída com sucesso!',
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao excluir subpergunta: ${error.message}`,
        error: true
      });
    }
  }
}

module.exports = SubPerguntaController;
