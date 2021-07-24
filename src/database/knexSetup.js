const knex = require("knex");
require("dotenv").config();

const config = {
    client: process.env.DB_CLIENT,
    connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
  }
}

const connection = knex(config);
// connection.raw('SELECT name FROM "user"').then(result => console.log(result));
module.exports = connection;
