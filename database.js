const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Skulllink01',
      database : 'bookshop'
    }
  });
  
  module.exports = db;