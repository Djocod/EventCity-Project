const express = require("express");
const router = express.Router();
const events = require("../services/events");

// instead of // put here the page the page gets all the events information from
router.get("/", async function (req, res, next) {
  try {
    res.json(await events.getMultiple(req.query.page));
  } catch (err) {
    console.error(` Error while getting Events `, err.message);
    next(err);
  }
});

// POST /events/fetch → fetch from Ticketmaster & insert into DB
router.post("/fetch", async function (req, res, next) {
  try {
    const result = await events.fetchAndInsertEvents();
    res.json(result);
  } catch (err) {
    console.error(`Error while fetching Events from Ticketmaster`, err.message);
    next(err);
  }
});
module.exports = router;
