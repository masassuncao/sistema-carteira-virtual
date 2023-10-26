// Importa o módulo repositório de carteiras
const repositorioCarteiras = require('../repositories/repositorioCarteiras')

// Importa o módulo modelo de usuario
const modeloCarteria = require('../models/modeloCarteria')

// Importa o módulo dotenv
const env = require('dotenv').config()
const {SALDO_PADRAO_INICIAL: SALDO_INICIAL} = process.env

function criarCarteira(dadosNovaCarteira) {
    const modelo = modeloCarteria.modeloNovaCarteira
    dadosNovaCarteira.saldo = parseFloat(SALDO_INICIAL)

    try {
        repositorioCarteiras.incluirNovaCarteira(modelo.parse(dadosNovaCarteira))
        .then((carteiras) => {
            if (carteiras) {
                console.log('Carteira ' + carteiras[0].idCarteira + ' criada com sucesso.')
            } else {
                console.log('Falha ao criar carteira ' + dadosNovaCarteira.idCarteira)
            }
        })
    } catch (e) {
        console.log(`Erro ao criar carteira: ${e.message}`)
    }
}

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

function obterTodasCarteiras(req, res) {
    repositorioCarteiras.listarTodasCarteiras
        .then(carteiras => {
            return res.status(200).json(carteiras)
        })
        .catch(err => {
            return res.status(500).json({status: "NOK", mensagem: `Erro ao recuperar registros do banco de dados: ${err.message}`})
        })
}

function excluirCarteira(idCarteira) {
    repositorioCarteiras.excluirCarteiraPorId(idCarteira)
    .then(usuarios => {
        if (usuarios) {
            console.log("Usuário " + idCarteira + " excluído com sucesso!")
        } else {
            console.log('Carteira ' + idCarteira + ' não localizada.')
        }
    })
    .catch(err => {
        console.log(`Erro ao excluir carteira: ${err.message}`)
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
    criarCarteira,
    buscarCarteiraPorId,
    excluirCarteira,
    obterTodasCarteiras,
    obterExtratoTransacoesPorIdCarteira,
    realizarTransacaoCarteiraViaREST
}