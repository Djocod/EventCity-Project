// DATABASE CONNECTION AND QUERY EXECUTION

const mysql = require("mysql");
const config = require("../config");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.database);
  const [results] = await connection.execute(sql, params);

  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query,
};
