/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transacoes').del()
  await knex('transacoes').insert([
    {idCarteira: "03c43d4b-b27e-44f3-a771-3cec26f34c9d", valorTransacao: 150, naturezaTransacao: "credito" },
    {idCarteira: "03c43d4b-b27e-44f3-a771-3cec26f34c9d", valorTransacao: 10, naturezaTransacao: "debito" },
    {idCarteira: "03c43d4b-b27e-44f3-a771-3cec26f34c9d", valorTransacao: 30, naturezaTransacao: "debito" },
    {idCarteira: "03c43d4b-b27e-44f3-a771-3cec26f34c9d", valorTransacao: 10, naturezaTransacao: "debito" },
    {idCarteira: "5aff4567-d368-4cc4-a322-c9413fab0ee8", valorTransacao: 500, naturezaTransacao: "credito" },
  ]);
};
