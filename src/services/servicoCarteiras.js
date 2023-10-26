const mq = require('./servicoMQ')
const controladoraCarteriras = require('../controllers/controladoraCarteiras')

// Importa o módulo dotenv
const env = require('dotenv').config()
const {NOME_FILA_CRIAR_CARTEIRA: FILA_CRIAR_CARTEIRA} = process.env
const {NOME_FILA_EXCLUIR_CARTEIRA: FILA_EXCLUIR_CARTEIRA} = process.env

function consumirFilaCriarCarteiras() {
    mq.consumeFromQueue(FILA_CRIAR_CARTEIRA, message => {
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
    mq.consumeFromQueue(FILA_EXCLUIR_CARTEIRA, message => {
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