const express = require("express");
const router = express.Router();
const artists = require("../services/artists");

// instead of // put here the page the page gets all the events information from
router.get("/", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const data = await artists.getMultiple(page);
    res.json(data);
  } catch (err) {
    console.error(` Error while getting Artists `, err.message);
    next(err);
  }
});

// POST /artists/fetch → fetch artists from Spotify and insert into database
router.post("/fetch", async function (req, res, next) {
  try {
    const { keyword } = req.body;
    const result = await artists.fetchAndInsertArtists(keyword);
    res.json(result);
  } catch (err) {
    console.error(`Error while fetching Artists from Spotify`, err.message);
    next(err);
  }
});

module.exports = router;
