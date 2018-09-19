exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function(table) {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('author').notNullable();
  })
 }
 
 exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
 }
 