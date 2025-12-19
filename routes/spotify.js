const express = require("express");
const router = express.Router();
const { getSpotifyToken } = require("../spotifyToken");

// where the spotify token is fetched
router.get("/spotify-token", async (req, res) => {
  try {
    const token = await getSpotifyToken();
    res.json({ access_token: token });
  } catch (error) {
    res.status(500).json({ error: "Impossible d'obtenir le token Spotify" });
  }
});

module.exports = router;
