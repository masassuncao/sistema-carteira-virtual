const mq = require('./servicoMQ')

function consumirFila() {
    mq.consumeFromQueue('filaCriarCarteiras', message => {
        //Processamento da mensagem
        console.log('Nova mensagem recebida da fila.')
        console.log("Criando carteira id " + JSON.parse(message.content))
    })
}

module.exports = {
    consumirFila
}