const z = require("zod")

const modeloNovaTransacao = z.object({
    idTransacao: z.string().nullable(), 
    idCarteira: z.string(),
    valorTransacao: z.number().default(0),
    naturezaTransacao: z.ZodEnum(['credito', 'debito']),
    dataHoraTransacao: z.date().nullable()
})

module.exports = {
    modeloNovaTransacao
}