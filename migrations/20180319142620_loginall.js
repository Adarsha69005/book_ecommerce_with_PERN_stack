
exports.up = function(knex, Promise) {
    return knex.schema.createTable('loginall', (table) => {
        table.increments().notNullable();
        table.string('email', 50).notNullable();
        table.string('hash', 100).notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('loginall');
};
