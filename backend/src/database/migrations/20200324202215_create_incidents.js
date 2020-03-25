exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table){
    // Criando uma chave primária com auto-increment:
    table.increments()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.decimal('value').notNullable()

    // Relacionamentos:
    table.string('ngo_id').notNullable()

    // Configurando relacionamentos
    table.foreign('ngo_id').references('id').inTable('ngos')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents')
};
