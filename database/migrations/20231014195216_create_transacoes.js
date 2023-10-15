/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transacoes', (table) => {
        table.uuid("idTransacao").primary().defaultTo(knex.fn.uuid())
        table.text("idUsuario", 36).notNullable()
        table.double("valorTransacao").notNullable().defaultTo(0)
        table.timestamp("dataHoraTransacao").defaultTo(knex.fn.now())
        table.foreign("idUsuario").references('carteiras.idUsuario')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('transacoes')
};
