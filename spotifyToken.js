const spotifyToken = require("./config.spotifyToken"); //

let cachedToken = null; // save token to the cash
let tokenExpiresAt = 0;

export async function getSpotifyToken() {
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
  tokenExpiresAt = now + (data.expires_in - 60) * 1000; // cache for 1 hour

  return cachedToken;
}
