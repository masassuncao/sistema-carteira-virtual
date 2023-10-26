const knexConfig = require('../../knexfile.js')[process.env.ENV || 'development']
const knex = require('knex')(knexConfig)

function incluirNovaCarteira(novaCarteira) {
    return knex('carteiras')
            .insert({...novaCarteira})
            .returning('idCarteira')
}

function buscarCarteiraPorId(id) {
    return knex('carteiras')
            .where({idCarteira: id})
}

function listarTodasTransacoesPorIdCarteira(id) {
    return knex('transacoes')
            .where({idCarteira: id})
}

function listarTodasCarteiras() {
    return knex('carteiras')
}

function alterarCarteiraPorId(id, carteiraComAlteracao) {
    return knex('carteiras')
        .where({idCarteira: id})
        .update(carteiraComAlteracao)
}

function excluirCarteiraPorId(id) {
    return knex('carteiras')
        .where({idCarteira: id})
        .returning('id')
        .del()
}

module.exports = {
    alterarCarteiraPorId,
    buscarCarteiraPorId,
    excluirCarteiraPorId,
    incluirNovaCarteira,
    listarTodasCarteiras,
    listarTodasTransacoesPorIdCarteira,
}