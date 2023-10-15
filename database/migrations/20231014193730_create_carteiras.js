/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('carteiras', (table) => {
        table.text("idUsuario", 36).primary().notNullable()
        table.double("saldo").notNullable().defaultTo(0)
        table.timestamp("ultimaAtualizacao").defaultTo(knex.fn.now())
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('carteiras')
};
