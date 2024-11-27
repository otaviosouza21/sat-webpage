const Controller = require('./Controller.js');
const ServicoServices = require('../services/ServicoServices.js');
const { shuffleArray } = require('../utils/helpers.js'); // Função para embaralhar arrays (veja abaixo)
const model = require('../models');
const { Op } = require('sequelize');

const servicoServices = new ServicoServices();
const camposObrigatorios = ['possui_nome_negocio','tempo_negocio','descricao_servico','categoria_id','usuario_id']

class ServicoController extends Controller {
  constructor() {
    super(servicoServices,camposObrigatorios);
  }
 

  async InnerJoinPegaServicoAtivoUsuarioWhere(req,res){
    try {
      //PAGINACAO
      const { page = 1, nome_negocio = '' } = req.query;
    
      //limite de registros em cada pagina
      const limit = 8;
      var lastPage = 1;

      //consultando quantidade de pedidos encontrados por codcli
      const countServicos = await model.Servico.count({where:{status:true,nome_negocio:{[Op.like]:`%${nome_negocio}%`}}});

      if (countServicos === 0) return res.status(400).json({message:`não foi possivel encontrar o registro`});

      if(countServicos !== 0){
        lastPage = Math.ceil(countServicos / limit)
        
        //Criando objeto com as informações de paginacao
        var paginacao ={
          //caminho
          path: '/api/servico/usuario/?page=1&nome_negocio=nome',
          total_Servicos: countServicos,
          limit_por_page: limit,
          current_page: page,
          total_Pages: lastPage,
          prev_page_url: page - 1 >= 1 ? page -1: false,
          next_page_url: Number(page) + Number(1) > lastPage ? false : Number(page) + 1,
        }

        const ItenStarted = (page * limit) - limit

        const servicos = await servicoServices.pegaServicosAtivos(ItenStarted,limit,nome_negocio)

        if(servicos.retorno.length === 0){
          return res.status(400).json({message:`não foi possivel encontrar o registro`});
        }else{
          return res.status(200).json({servicos:servicos,paginacao});
        }
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
    }
  }

  async InnerJoinPegaTodosServicoUsuario(req,res){
    try {
      //PAGINACAO
      const { page = 1 } = req.query;
      //limite de registros em cada pagina
      const limit = 10;
      var lastPage = 1;

      //consultando quantidade de pedidos encontrados por codcli
      const countServicos = await model.Servico.count();

      if(countServicos !== 0){
        lastPage = Math.ceil(countServicos / limit)
        
        //Criando objeto com as informações de paginacao
        var paginacao ={
          //caminho
          path: '/api/servico/usuario',
          total_Servicos: countServicos,
          limit_por_page: limit,
          current_page: page,
          total_Pages: lastPage,
          prev_page_url: page - 1 >= 1 ? page -1: false,
          next_page_url: Number(page) + Number(1) > lastPage ? false : Number(page) + 1,
        }

        const ItenStarted = (page * limit) - limit

        const servicos = await servicoServices.pegaServicos(ItenStarted,limit)

        if(servicos.retorno.length === 0){
          return res.status(400).json({message:`não foi possivel encontrar o registro`});
        }else{
          return res.status(200).json({servicos:servicos,paginacao});
        }
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
    }
  }

  async InnerJoinPegaServicoUsuarioPorId(req,res){
    try {
      const {id} = req.params
      const listaRegistros = await model.Usuario.findByPk(id,{
        include:[{model: model.Servico}]
        
      });

      if(listaRegistros === null){
        return res.status(500).json({ message: `o registro ${id} não foi encontrado`,error:true});
      }else{
        return res.status(200).json(listaRegistros)
      }
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
  }
  }

  async InnerJoinPegaServicoCategoria(req,res){
    try {
      const listaRegistros = await model.Servico.findAll({
        include: [{
          model: model.Categoria_Servico
        }],
      });
      return res.status(200).json(listaRegistros)
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
    }
  }

  async InnerJoinPegaServicoCategoriaPorId(req,res){
    try {
      const {id} = req.params
      const listaRegistros = await model.Servico.findByPk(id,{
        include:[{model: model.Categoria_Servico}]
      });
      if(listaRegistros === null){
        return res.status(500).json({ message: `o registro ${id} não foi encontrado`,error:true});
      }else{
        return res.status(200).json(listaRegistros)
      }
      } catch (e) {
        console.log(e);
        return res.status(500).json({ message: `erro ao buscar registro, mensagem do erro: ${e}` });
  }
  }


  async pegaServicosAgrupadosPorCategoria(req, res) {
    try {
      const categorias = await model.Categoria_Servico.findAll({
        attributes: ['id', 'nome'],
        include: [
          {
            model: model.Servico,
          },
        ],
      });
  
      // Transformar os dados para randomizar as categorias e serviços
      const categoriasAleatorias = shuffleArray(
        categorias.map((categoria) => {
          return {
            ...categoria.dataValues,
            Servicos: shuffleArray(categoria.Servicos).slice(0, 3), // Embaralhar serviços e limitar a 3
          };
        })
      );
  
      return res.status(200).json(categoriasAleatorias);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar serviços', error: true });
    }
  }
  
}

module.exports = ServicoController;
