class Controller {
  constructor(propsServices, campos) {
    this.propsServices = propsServices;
    this.camposObrigatorios = campos;
    this.camposVazios = [];
  }

   async allowNull(req, res) {
    this.camposVazios = [] //serve para nao acumular valores duplicados na array
    const todosCamposTrue = this.camposObrigatorios.every((campo) => {

      if (req.body[campo] == null) {
        this.camposVazios.push(campo)
      }
      
      return req.body[campo];
    });
    
    if (todosCamposTrue){
      return { status: true };
    } 
    else{
      return { status: false, campos: this.camposVazios };
    } 
  }

  //------------------------------------CREATE-------------------------------------------//
  async criaRegistroController(req, res) {
    const dadosParaCriacao = req.body;
    const isTrue = await this.allowNull(req, res);
    try {
      if (isTrue.status) {
        const novoRegistroCriado = await this.propsServices.criaRegistro(dadosParaCriacao);
        return res.status(200).json(novoRegistroCriado);
      } else {
        return res.status(500).json({
          message: 'Preencha todos os campos necessarios',
          campos: isTrue.campos,
          error: true,
        });
      }
    } catch (e) {
      return res.status(400).json({ message: `erro ao criar, mensagem do erro:${e}` });
    }
  }

  //-------------------------------------READ-------------------------------------//
  async pegaTodosController(req, res) {
    try {
      const listaDeRegistro = await this.propsServices.pegaTodosRegistros();
      return res.status(200).json(listaDeRegistro);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
    }
  }
  //-------------------------------------READ-POR-ID-------------------------------------//

  async pegaUmRegistroPorIdController(req, res) {
    const { id } = req.params;
    try {
      
      const umRegistro = await this.propsServices.pegaUmRegistroPorId(Number(id));
      if(umRegistro == null){
        return res.status(400).json({message:`não foi possivel encontrar o registro: ${id}`,resposta:umRegistro});
      }else{
        return res.status(200).json(umRegistro);
      }
    } catch (erro){
      return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${erro}` });
    }
  }

  //-------------------------------------UPDATE PELO ID-------------------------------------//
  async atulizaDadoController(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const umRegistro = await this.propsServices.pegaUmRegistroPorId(Number(id));
      if(umRegistro == null){
        return res.status(400).json({message:`não foi possivel encontrar o registro: ${id}`,resposta:umRegistro});
      }
      const bodyOk = Object.getOwnPropertyNames(dadosAtualizados).every((campo) => {
        return Object.values(umRegistro._options.attributes).includes(campo);
      });

      if(bodyOk){
        const foiAtulizado = await this.propsServices.atualizaDado(dadosAtualizados,Number(id)); 
        return res.status(200).json({ message: `registro atualizado`, reg:umRegistro});
      }else{
        return res.status(400).json({ message: `campos digitados não conferem`});
      }

    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  //-------------------------------------DELETE PELO ID-------------------------------------//

  async excluiRegistroController(req, res) {
    const { id } = req.params;
    try {
      const foiDeletado = await this.propsServices.excluiRegistro(Number(id));
      if(foiDeletado === 0){
        return res.status(400).json({message: `id ${id} não encontrado`,resposta: foiDeletado})
      }else{
        return res.status(200).json({ message: `id ${id} deletado`,resposta: foiDeletado });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = Controller;
