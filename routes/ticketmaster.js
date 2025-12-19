const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("../config");

const TICKETMASTER_API_KEY = config.ticketmasterKey.ticketmasterKeyAPI;

// Route pour rechercher des événements par mot-clé (artiste)
router.get("/events/search", async (req, res) => {
  try {
    const { keyword, countryCode = "US", size = 50 } = req.query;

    if (!keyword) {
      return res
        .status(400)
        .json({ error: 'Le paramètre "keyword" est requis' });
    }

    const url = `https://app.ticketmaster.com/discovery/v2/events.json`;

    const response = await axios.get(url, {
      params: {
        keyword: keyword,
        countryCode: countryCode,
        size: size,
        apikey: TICKETMASTER_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Erreur Ticketmaster search:", error.message);
    res.status(500).json({
      error: "Erreur lors de la recherche d'événements",
      details: error.response?.data || error.message,
    });
  }
});

// Route pour récupérer des événements généraux (sans mot-clé)
router.get("/events", async (req, res) => {
  try {
    const { countryCode = "FR", size = 10 } = req.query;

    const url = `https://app.ticketmaster.com/discovery/v2/events.json`;

    const response = await axios.get(url, {
      params: {
        countryCode: countryCode,
        size: size,
        apikey: TICKETMASTER_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("❌ Erreur Ticketmaster events:", error.message);
    res.status(500).json({
      error: "Erreur lors de la récupération des événements",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
