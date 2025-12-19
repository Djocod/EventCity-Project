// CREATE NES USER AND GET MULTIPLE USERS FROM DATABASE

const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function create(user) {
  const result = await db.query(
    `INSERT INTO Users (surname, name, password, email, birthdate, city) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      user.surname,
      user.name,
      user.password,
      user.email,
      user.birthdate,
      user.city,
    ]
  );

  let message = "Error while creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }

  return { message };
}

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM Users`);
  const data = helper.emptyorRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

module.exports = {
  getMultiple,
  create,
};
