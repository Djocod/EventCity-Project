let mysql = require("mysql");
let config = require("../config");

let connection = mysql.createConnection(config.database);

// create a list to add tables more easily in the future.
let createTables = [
  "CREATE TABLE IF NOT EXISTS Users (id INT PRIMARY KEY AUTO_INCREMENT, surname VARCHAR (30),	name VARCHAR (30), password VARCHAR (15), email VARCHAR (30), age TINYINT, city VARCHAR (20))",

  "CREATE TABLE IF NOT EXISTS Tags (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR (20))",

  "CREATE TABLE IF NOT EXISTS Users_Tags (id INT PRIMARY KEY AUTO_INCREMENT, id_Users INT, id_Tags INT, CONSTRAINT FK_User FOREIGN KEY (id_Users) REFERENCES Users(id), CONSTRAINT FK_Tags FOREIGN KEY (id_Tags) REFERENCES Tags(id))",

  "CREATE TABLE IF NOT EXISTS Events (id INT PRIMARY KEY AUTO_INCREMENT, id_ticketmaster VARCHAR (70))",

  "CREATE TABLE IF NOT EXISTS Events_Tags (id INT PRIMARY KEY AUTO_INCREMENT, id_Events INT, id_Tags INT, CONSTRAINT FK_EventsTags FOREIGN KEY (id_Events) REFERENCES Events(id), CONSTRAINT FK_TagsEvents FOREIGN KEY (id_Tags) REFERENCES Tags(id))",

  "CREATE TABLE IF NOT EXISTS Users_Events (id INT PRIMARY KEY AUTO_INCREMENT, id_Events INT, id_Users INT, CONSTRAINT FK_Events FOREIGN KEY (id_Events) REFERENCES Events(id), CONSTRAINT FK_Users FOREIGN KEY (id_Users) REFERENCES Users(id))",

  "CREATE TABLE IF NOT EXISTS Artists (id INT PRIMARY KEY AUTO_INCREMENT, id_artists_spotify VARCHAR (150))",

  "CREATE TABLE IF NOT EXISTS Artists_Tags (id INT PRIMARY KEY AUTO_INCREMENT, id_Artists INT, id_Tags INT, CONSTRAINT FK_ArtistsTags FOREIGN KEY (id_Artists) REFERENCES Artists(id), CONSTRAINT FK_TagsArtists FOREIGN KEY (id_Tags) REFERENCES Tags(id))",
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
