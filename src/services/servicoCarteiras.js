const mq = require('./servicoMQ')
const controladoraCarteriras = require('../controllers/controladoraCarteiras')

function consumirFilaCriarCarteiras() {
    mq.consumeFromQueue('filaCriarCarteiras', message => {
        //Processamento da mensagem
        var idNovaCarteira = JSON.parse(message.content).replace(/\"/g, "")
        var novaCarteira = {
            idCarteira: idNovaCarteira,
            saldo: 0
        }
        console.log('Nova mensagem recebida da fila.')
        console.log("Criando carteira id " + idNovaCarteira)
        controladoraCarteriras.criarCarteira(novaCarteira)
    })
}

function consumirFilaExcluirCarteira() {
    mq.consumeFromQueue('filaExcluirCarteiras', message => {
        //Processamento da mensagem
        var idCarteiraExcluir = JSON.parse(message.content).replace(/\"/g, "")
        console.log('Nova mensagem recebida da fila.')
        console.log("Excluindo carteira id " + idCarteiraExcluir)
        controladoraCarteriras.excluirCarteira(idCarteiraExcluir)
    })
}

module.exports = {
    consumirFilaCriarCarteiras,
    consumirFilaExcluirCarteira
}