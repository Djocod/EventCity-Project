const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Users table visualization
app.use("/users", usersRouter);

// Artists table visualization
app.use("/artists", artistsRouter);

// Events table visualization
app.use("/events", eventsRouter);

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
