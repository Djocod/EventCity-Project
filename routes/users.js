const express = require("express");
const router = express.Router();
const Users = require("../services/Users");

// users information is taken from here
router.get("/public/form/form.html", async function (req, res, next) {
  try {
    res.json(await Users.getMultiple(req.query.page));
  } catch (err) {
    console.error(` Error while getting Users `, err.message);
    next(err);
  }
});

// POST - create a new user
router.post("/form", async function (req, res, next) {
  try {
    res.json(await Users.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

module.exports = router;
