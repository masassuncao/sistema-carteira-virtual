/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('carteiras').del()
  await knex('carteiras').insert([
    {idCarteira: "03c43d4b-b27e-44f3-a771-3cec26f34c9d", saldo: 100 },
    {idCarteira: "5aff4567-d368-4cc4-a322-c9413fab0ee8", saldo: 500 }
  ]);
};
