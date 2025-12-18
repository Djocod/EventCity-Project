const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Import des routes
const usersRouter = require("./routes/users");
const artistsRouter = require("./routes/artists");
const eventsRouter = require("./routes/events");
const spotifyRouter = require("./routes/spotify");
const ticketmasterRouter = require("./routes/ticketmaster"); // AJOUT

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (frontend)
app.use(express.static("public"));

// Routes API
app.use("/Users", usersRouter);
app.use("/artists", artistsRouter);
app.use("/events", eventsRouter);
app.use("/spotify", spotifyRouter);
app.use("/ticketmaster", ticketmasterRouter); // AJOUT

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const server = app.listen(8081, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example server listening at http://%s:%s", host, port);
});

// this allows that the "public" folder can be everyone This folder holds all information about the front
app.use(express.static("public"));
