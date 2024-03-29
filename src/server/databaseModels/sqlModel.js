const { Pool } = require("pg");

const { MYURL } = require("../envSecrets/envfiles");

const myURI = process.env.MYURL

const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
  query: (text, params, callback) => {
    // console.log("executed query, ", text);
    return pool.query(text, params, callback);
  },
};
