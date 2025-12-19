const express = require("express");
const router = express.Router();
const events = require("../services/events");

// page where we get all the events information from
router.get(
  "//public/landing-swipe/landing-swipe.html",
  async function (req, res, next) {
    try {
      res.json(await events.getMultiple(req.query.page));
    } catch (err) {
      console.error(` Error while getting Events `, err.message);
      next(err);
    }
  }
);

//get events from the ticketmaster API
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
