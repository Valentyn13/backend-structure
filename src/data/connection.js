var knex = require("knex");

var dbConfig = require("../../knexfile");

const db = knex(dbConfig.development);

module.exports = db;
