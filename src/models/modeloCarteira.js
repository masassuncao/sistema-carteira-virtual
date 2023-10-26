const z = require("zod")

const modeloNovaCarteira = z.object({
    idCarteira: z.string(),
    saldo: z.number().default(0),
})

module.exports = {
    modeloNovaCarteira
}