// Importa o módulo repositório de carteiras
const repositorioCarteiras = require('../repositories/repositorioCarteiras')

function buscarCarteiraPorId(req, res) {
    repositorioCarteiras.buscarCarteiraPorId(req.params.id)
        .then(carteiras => {
            if (carteiras.length) {
                return res.status(200).json(carteiras[0])
            }
            return res.status(404).json({status: "NOK", mensagem: "Carteira não cadastrada."})
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao recuperar registro do banco de dados: ${err.message}`})
        })
}

function obterExtratoTransacoesPorIdCarteira(req, res) {
    repositorioCarteiras.listarTodasTransacoesPorIdCarteira(req.params.id)
    .then(transacoes => {
        if (transacoes.length) {
            return res.status(200).json(transacoes)
        }
        return res.status(404).json({status: "NOK", mensagem: "Não há transações para o usuário."})
    })
    .catch(err => {
        return res.status(500).json({status: "NOK", mensagem: `Erro ao recuperar registros do banco de dados: ${err.message}`})
    })
    
}

function realizarTransacaoCarteiraViaREST(req, res) {
    idCarteira = req.params.id
    valorTransacao = req.body.valorTransacao
    naturezaTransacao = req.body.naturezaTransacao
    repositorioCarteiras.buscarCarteiraPorId(idCarteira)
        .then(carteiras => {
            if (carteiras.length) {
                if (('credito' === naturezaTransacao) || ('debito' === naturezaTransacao)) {
                    //Verifica se, no caso de débito, o saldo da carteira é suficiente:
                    if (('credito' === naturezaTransacao) || (valorTransacao <= carteiras[0].saldo)) {
                        //Efetua transacao:
                        carteiraAposTransacao = atualizarSaldoCarteira(carteiras[0], valorTransacao, naturezaTransacao)
                        repositorioCarteiras.alterarCarteiraPorId(idCarteira, carteiraAposTransacao)
                            .then( () => {
                                return res.status(200).json({status: "OK", mensagem: "Transação realizada com sucesso."})
                            })
                            .catch(err => {
                                return res.status(500).json({status: "NOK", mensagem: `Erro ao atualizar registro no banco de dados: ${err.message}`})
                            })
                    } else {
                        //Saldo insuficiente para processar a transacao:
                        return res.status(422).json({status: "NOK", mensagem: "O saldo disponível não é suficiente para processar essa transação."})
                    }
                } else {
                    return res.status(400).json({status: "NOK", mensagem: "Tipo de transação desconhecido."})
                }
            } else {
                return res.status(404).json({status: "NOK", mensagem: "Carteira não cadastrada."})
            }
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao recuperar registros do banco de dados: ${err.message}`})
        })
}

function realizarTransacaoCarteiraViaFila(req, res) {
    idCarteira = req.body.id
    valorTransacao = req.body.valorTransacao
    naturezaTransacao = req.body.naturezaTransacao
    repositorioCarteiras.buscarCarteiraPorId(idCarteira)
        .then(carteiras => {
            if (carteiras.length) {
                if (('credito' === naturezaTransacao) || ('debito' === naturezaTransacao)) {
                    //Verifica se, no caso de débito, o saldo da carteira é suficiente:
                    if (('credito' === naturezaTransacao) || (valorTransacao <= carteiras[0].saldo)) {
                        //Efetua transacao:
                        carteiraAposTransacao = atualizarSaldoCarteira(carteiras[0], valorTransacao, naturezaTransacao)
                        repositorioCarteiras.alterarCarteiraPorId(idCarteira, carteiraAposTransacao)
                            .then( () => {
                                return res.status(200).json({status: "OK", mensagem: "Transação realizada com sucesso."})
                            })
                            .catch(err => {
                                return res.status(500).json({status: "NOK", mensagem: `Erro ao atualizar registro no banco de dados: ${err.message}`})
                            })
                    } else {
                        //Saldo insuficiente para processar a transacao:
                        return res.status(422).json({status: "NOK", mensagem: "O saldo disponível não é suficiente para processar essa transação."})
                    }
                } else {
                    return res.status(400).json({status: "NOK", mensagem: "Tipo de transação desconhecido."})
                }
            } else {
                return res.status(404).json({status: "NOK", mensagem: "Carteira não cadastrada."})
            }
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao recuperar registros do banco de dados: ${err.message}`})
        })
}

function obterTodasCarteiras(req, res) {
    repositorioCarteiras.listarTodasCarteiras
        .then(carteiras => {
            return res.status(200).json(carteiras)
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao recuperar registros do banco de dados: ${err.message}`})
        })
}


function atualizarSaldoCarteira(carteira, valor, naturezaTransacao) {
    if ('credito' === naturezaTransacao) {
        valor = (Math.abs(valor))
    } else {
        if ('debito' === naturezaTransacao) {
            valor = -1 * (Math.abs(valor))
        } else {
            //Nenhuma alteração será efetuada:
            valor = 0
        }
    }
    //Atualiza o saldo da carteira e retorna o objeto:
    carteira.saldo+= valor
    return carteira
}

module.exports = {
    buscarCarteiraPorId,
    obterTodasCarteiras,
    obterExtratoTransacoesPorIdCarteira,
    realizarTransacaoCarteiraViaREST
}