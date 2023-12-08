const { Pool } = require('pg');

const sql = new Pool({
  host: 'database',
  port: 5432,
  database: 'timelinedb',
  user: 'admin',
  password: 'admin',
});

module.exports = sql;

