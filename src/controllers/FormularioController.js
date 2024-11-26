const Controller = require('./Controller');
const FormularioServices = require('../services/FormularioServices.js');

const camposObrigatorios = ['titulo', 'descricao', 'tipo', 'usuario_id'];
const formularioServices = new FormularioServices();

class FormularioController extends Controller {
  constructor() {
    super(formularioServices, camposObrigatorios);
  }

  async cadastrarFormulario(req, res) {
    try {
      const isValid = await this.allowNull(req, res);
      if (isValid.status) {
        const novoFormulario = await this.propsServices.criaRegistro(req.body);
        return res.status(201).json({
          message: 'Formulário criado com sucesso!',
          data: novoFormulario,
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
        message: `Erro ao cadastrar formulário: ${error.message}`,
        error: true
      });
    }
  }

  async listarFormularios(req, res) {
    try {
      const formularios = await this.propsServices.pegaTodosRegistros();
      return res.status(200).json({ data: formularios, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao listar formulários: ${error.message}`,
        error: true
      });
    }
  }

  async pegarFormularioPorId(req, res) {
    try {
      const { id } = req.params;
      const formulario = await this.propsServices.pegaUmRegistroPorId(id);

      if (!formulario) {
        return res.status(404).json({
          message: 'Formulário não encontrado',
          error: true
        });
      }

      return res.status(200).json({ data: formulario, error: false });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao buscar formulário: ${error.message}`,
        error: true
      });
    }
  }

  async atualizarFormulario(req, res) {
    try {
      const { id } = req.params;
      const dadosAtualizados = req.body;

      const atualizado = await this.propsServices.atualizaDado(dadosAtualizados, id);

      if (!atualizado) {
        return res.status(404).json({
          message: 'Formulário não encontrado para atualização',
          error: true
        });
      }

      return res.status(200).json({
        message: 'Formulário atualizado com sucesso!',
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao atualizar formulário: ${error.message}`,
        error: true
      });
    }
  }

  async excluirFormulario(req, res) {
    try {
      const { id } = req.params;

      const excluido = await this.propsServices.excluiRegistro(id);

      if (!excluido) {
        return res.status(404).json({
          message: 'Formulário não encontrado para exclusão',
          error: true
        });
      }

      return res.status(200).json({
        message: 'Formulário excluído com sucesso!',
        error: false
      });
    } catch (error) {
      return res.status(500).json({
        message: `Erro ao excluir formulário: ${error.message}`,
        error: true
      });
    }
  }
}

module.exports = FormularioController;
