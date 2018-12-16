
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('username').notNullable();
      table.string('email', 50).unique().notNullable();
      table.string('password').notNullable();
      table.timestamp('joined').notNullable().defaultTo(knex.raw('now()'));
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
