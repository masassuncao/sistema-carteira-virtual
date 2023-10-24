const express = require('express')
const controladoraCarteiras = require('../controllers/controladoraCarteiras')

const rotasV1 = express.Router()

// Gera log das requisições
rotasV1.use(
    (req, res, next) => {
        console.log(new Date().toLocaleString(), "-", req.ip, "-", req.method, req.url)
        next()
    }
)

// Configurações das rotas
rotasV1.use(express.json())
rotasV1.use(express.urlencoded({extended: true}))

// Rotas da aplicação
rotasV1.get('/carteiras/:id/saldo', controladoraCarteiras.buscarCarteiraPorId)
rotasV1.get('/carteiras/:id/extrato/', controladoraCarteiras.obterExtratoTransacoesPorIdCarteira)
rotasV1.post('/carteiras/:id/transacao/', controladoraCarteiras.realizarTransacaoCarteiraViaREST)
rotasV1.use(
    (req, res) => {
        res.statusCode = 404
        res.send('Página não encontrada!')
    }
)

module.exports = rotasV1