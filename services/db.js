const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
  const connection = await mysql.createConnection(config.database);

  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error("❌ Erreur SQL:", error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

module.exports = {
  query,
};
