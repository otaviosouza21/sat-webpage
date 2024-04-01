const model = require('../models')

class Services{
        constructor(nomeModel){
            this.nomeModel = nomeModel;
        }
    //-------------CREATE-------------//
    async criaRegistro(dadosDoRegistro) {
        return model[this.nomeModel].create(dadosDoRegistro);
    }

    //-----------READ--------------//
    async pegaTodosRegistros(){
        return model[this.nomeModel].findAll();
    }

    async pegaUmRegistroPorId(id) {
        return model[this.nomeModel].findByPk(id);
    }

    async pegaRegistroPorDado(dado){
        const retorno = await model[this.nomeModel].findOne({where: {email: dado}})
        if(retorno === null){
            console.log('registro não encontrado na base de dados');
            const resposta = retorno
            return {status:false, retorno: retorno};
        }else{
            //dado
            console.log('registro foi encontrado na base de dados');
            return {status:true, retorno: retorno};

        }

    }

    //-----------UPDATE--------------//
    async atualizaDado(dadosAtualizados, id){
        const ListaDeRegistrosAtualizado = await model[this.nomeModel].update(dadosAtualizados,{where:{id:id}});
        if(ListaDeRegistrosAtualizado === 0){
            return false;
        }else{
            return true
        }
    }
    //-----------DELETE--------------//
    async excluiRegistro(id) {
        return model[this.nomeModel].destroy({ where: { id: id } });
    }
}


module.exports = Services