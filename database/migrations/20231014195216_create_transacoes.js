/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transacoes', (table) => {
        table.uuid("idTransacao").primary().defaultTo(knex.fn.uuid())
        table.text("idCarteira", 36).notNullable()
        table.double("valorTransacao", 2).notNullable().defaultTo(0)
        table.enu("naturezaTransacao", ['credito', 'debito'])
        table.timestamp("dataHoraTransacao", {useTz: true}).defaultTo(knex.fn.now())
        table.foreign("idCarteira").references('carteiras.idCarteira')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('transacoes')
};
