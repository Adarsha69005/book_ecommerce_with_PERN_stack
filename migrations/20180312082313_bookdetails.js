
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bookdetails', (table) => {
      table.increments();
      table.text('title');
      table.text('description');
      table.text('images');
      table.float('price');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bookdetails');
};
