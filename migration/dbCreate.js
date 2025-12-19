// import mysql because we will create database and tables that rely on mySQL
let mysql = require("mysql");
// connect config file
let config = require("../config");

// create a connection to our local database
let connection = mysql.createConnection(config.initialDatabase);

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connection was successful");
  let SQLQuery = "CREATE DATABASE IF NOT EXISTS " + config.database.database;
  connection.query(SQLQuery, (err, result) => {
    if (err) throw err;
    console.log("Database created");
  });
});
