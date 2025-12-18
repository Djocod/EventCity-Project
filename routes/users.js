const express = require("express");
const router = express.Router();
const Users = require("../services/Users");

// instead of // put here the page from where we get the users information is form
router.get("/", async function (req, res, next) {
  try {
    res.json(await Users.getMultiple(req.query.page));
  } catch (err) {
    console.error(` Error while getting Users `, err.message);
    next(err);
  }
});

module.exports = router;
