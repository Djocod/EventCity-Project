const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const usersRouter = require("./routes/users");

const corsOptions = {
  origin: "*",
  credential: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
