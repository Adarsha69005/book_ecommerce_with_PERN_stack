
exports.up = function(knex, Promise) {
    return knex.schema.createTable('userlist', (table) => {
        table.increments().notNullable();
        table.text('fullname').notNullable();
        table.string('email', 50).unique().notNullable();
        table.timestamp('joined').notNullable().defaultTo(knex.fn.now());
});
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('userslist');
};
