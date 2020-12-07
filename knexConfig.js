const connectionConfig = {
  host : 'localhost',
  user : 'root',
  port : 3306,
  password : '123456',
  database : 'demo'
}

const knex = require('knex')({
  client: 'mysql',
  connection: connectionConfig
});

module.exports = { knex, connectionConfig }