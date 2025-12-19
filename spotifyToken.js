//const spotifyToken = require("./config/spotifyToken");
const config = require("./config");
const axios = require("axios");

const spotifyClientId = config.spotifyToken.spotifyClientId;
const spotifyClientSecret = config.spotifyToken.spotifyClientSecret;
const spotifyToken = `${spotifyClientId}:${spotifyClientSecret}`;
//const { spotifyClientId, spotifyClientSecret } = config.spotifyToken;

let cachedToken = null; // save token to the cache
let tokenExpiresAt = 0;

async function getSpotifyToken() {
  const now = Date.now();

  // if token is in cache and still valid
  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken; // return cached token if still valid
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${spotifyToken}`).toString("base64"),
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  const data = await response.json();
  console.log("Spotify response:", data); // debug output

  if (!data.access_token) {
    throw new Error("Failed to get access token");
  }

  cachedToken = data.access_token;
  tokenExpiresAt = now + (data.expires_in - 60) * 1000; // token is stored in cache for 1 hour

  return cachedToken;
}

module.exports = { getSpotifyToken };
