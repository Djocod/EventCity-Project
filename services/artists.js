const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const axios = require("axios");
const spotifyToken = require("../config.spotifyToken");

const spotifyClientId = config.spotifyToken.spotifyClientId;
const spotifyClientSecret = config.spotifyToken.spotifyClientSecret;

// Fetch artists from Spotify API and insert into database if not exisr
async function fetchAndInsertArtists(keyword, page = 1) {
  try {
    const token = await getAccessToken();
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      id
    )}&type=artist&limit=20`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${spotifyClientId}&${spotifyClientSecret}`,
      },
    });

    const data = await response.json();
    const artists = data.artists.items;

    for (const artist of artists) {
      const [existing] = await db.query(
        "SELECT id FROM Artists WHERE id_artists_spotify = ?",
        [artist.id]
      );
      if (!existing.length) {
        await db.query("INSERT INTO Artists (id_artists_spotify) VALUES (?)", [
          artist.id,
        ]);
      }
    }

    return {
      page,
      limit,
      total: data.artists.total,
      results: artists.map((a) => ({
        spotify_id: a.id,
        name: a.name,
        genres: a.genres,
      })),
    };
  } catch (error) {
    console.error(
      "❌ Error fetching or inserting artists:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM Artists`);
  const data = helper.emptyorRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

module.exports = {
  fetchAndInsertArtists,
  getMultiple,
};
