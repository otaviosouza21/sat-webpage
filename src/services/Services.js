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