// O que é necessário fazer na criação da migration:
exports.up = function(knex) {
  return knex.schema.createTable('ngos', function (table){
    table.string('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
  })  
};

// O que é necessário fazer (ou desfazer) se algo der errado:
exports.down = function(knex) {
  return knex.schema.dropTable('ngos')
};
