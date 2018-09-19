exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function(table) {
    table.increments();
    table.string('name', 20).notNullable();
    table.string('description', 80).notNullable();
    table.integer('price').notNullable();
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
}