let mysql = require("mysql");
let config = require("../config");

let connection = mysql.createConnection(config.database);

// create a list to add tables more easily in the future.
let createTables = [
  "CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY, surname VARCHAR (30),name VARCHAR (30), password VARCHAR (15),email VARCHAR (30), age TINYINT, city VARCHAR (20))",
  "CREATE TABLE IF NOT EXISTS Tags (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR (20))",
  "CREATE TABLE IF NOT EXISTS Users_Tags (id INT AUTO_INCREMENT PRIMARY KEY, id_Users INT, id_Tags INT)",
  "CREATE TABLE IF NOT EXISTS Events (id INT AUTO_INCREMENT PRIMARY KEY, id_ticketmaster VARCHAR (70))",
  "CREATE TABLE IF NOT EXISTS Events_Tags (id INT AUTO_INCREMENT PRIMARY KEY, id_Events INT, id_Tags INT)",
  "CREATE TABLE IF NOT EXISTS Users_Events (id INT AUTO_INCREMENT PRIMARY KEY, id_Events INT, id_Users INT)",
  "CREATE TABLE IF NOT EXISTS Artists (id INT AUTO_INCREMENT PRIMARY KEY, id_artists_spotify VARCHAR (150))",
  "CREATE TABLE IF NOT EXISTS Artists_Tags (id INT AUTO_INCREMENT PRIMARY KEY, id_Artists INT, id_Tags INT)",
];

connection.connect(function (err) {
  for (
    let currentTable = 0;
    currentTable < createTables.length;
    currentTable++
  ) {
    if (err) throw err;
    console.log("Connection to SQL was successful");

    let SQLQuery = createTables[currentTable];

    connection.query(SQLQuery, (err, result) => {
      if (err) throw err;
      console.log("Table was created");
    });
  }
});
