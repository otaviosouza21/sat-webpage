const Services = require("./Services");
const model = require("../models/index.js");

class FormularioServices extends Services {
  constructor() {
    super("Formulario");
  }



  async listarFormularios_Services() {
    const formulariosAtivos = await model.Formulario.findAll({
      include: [
        {
          model: model.Pergunta,
          attributes: [
            "titulo",
            "descricao",
            "possui_sub_pergunta",
            "tipo_resposta_id",
          ],
          include:[
            {
              model: model.SubPergunta,
              attributes: [
                "pergunta_id",
                "titulo",
              ],

            }
          ]
        },
        {
          model: model.Tipos_formulario,
          attributes: [
            "id",
            "nome",
            "status",
          ],
        }
      ],
    });
    if (formulariosAtivos) {
      console.log("Nenhum registro encontrado na base de dados.");
      return { error: true, retorno: formulariosAtivos };
    } else {
      console.log("Registros encontrados na base de dados.");
      return { retorno: formulariosAtivos, error: false };
    }
  }

  
  async listarFormulariosAtivos_Services() {
    const formulariosAtivos = await model.Formulario.findAll({
      where: { status: true },
      include: [
        {
          model: model.Pergunta,
          attributes: [
            "titulo",
            "descricao",
            "possui_sub_pergunta",
            "tipo_resposta_id",
          ],
        },
      ],
    });
    if (formulariosAtivos) {
      console.log("Nenhum registro encontrado na base de dados.");
      return { error: true, retorno: formulariosAtivos };
    } else {
      console.log("Registros encontrados na base de dados.");
      return { retorno: formulariosAtivos, error: false };
    }
  }


}

module.exports = FormularioServices;
