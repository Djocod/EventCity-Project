//

let mysql = require("mysql");
let config = require("../config");

// CREATE FAKE DATA INPUT FOR USERS TABLE FOr TESTING

let connection = mysql.createConnection(config.database);

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connection to SQL was successful");

  let sql =
    "INSERT INTO Users(surname, name, password,email,birthdate,city) VALUES ?";
  let values = [
    [
      "Lechamps",
      "Lucie",
      "password1",
      "lucie.lechamps@example.com",
      "1995-05-15",
      "Paris",
    ],
    [
      "Leduc",
      "Paul",
      "password2",
      "paul.leduc@example.com",
      "1997-06-13",
      "Paris",
    ],
    [
      "Dubois",
      "Marie",
      "password3",
      "marie.dubois@example.com",
      "1985-08-01",
      "Lyon",
    ],
    [
      "Bernard",
      "Jean",
      "password4",
      "jean.bernard@example.com",
      "1970-01-17",
      "Paris",
    ],
    [
      "Fournier",
      "Marielle",
      "password5",
      "marielle.fournier@example.com",
      "2000-04-25",
      "Lyon",
    ],
    [
      "Girard",
      "Antoine",
      "password6",
      "antoine.girard@example.com",
      "2003-09-28",
      "Paris",
    ],
    [
      "Moreau",
      "Sophie",
      "password7",
      "sophie.moreau@example.com",
      "2005-11-16",
      "Marseille",
    ],
    [
      "Stein",
      "Victor",
      "password8",
      "victor.stein@example.com",
      "1996-02-01",
      "Strasbourg",
    ],
    [
      "Lambert",
      "Laura",
      "password9",
      "laura.lambert@example.com",
      "1989-03-21",
      "Strasbourg",
    ],
    [
      "Deschamps",
      "Raphael",
      "password10",
      "raphael.deschamps@example.com",
      "1998-07-10",
      "Paris",
    ],
  ];
  connection.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted:" + result.affectedRows);
  });
});
