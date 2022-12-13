const { Pool } = require('pg');

const myURI = process.env.URL;

const pool = new Pool({
  connectionString: myURI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query, ', text);
    return pool.query(text, params, callback);
  }
};
