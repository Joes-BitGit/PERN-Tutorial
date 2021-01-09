const { Pool } = require('pg');

const pool = new Pool({
  user: 'josephalmeida',
  host: 'localhost',
  database: 'yelper',
  password: null,
  port: 5432,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
}