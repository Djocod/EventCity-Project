import "dotenv/config";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let cachedToken = null;
let tokenExpiry = 0;

export async function getToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("CLIENT_ID || CLIENT_SECRET not found in .env");
  }

  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  // const json = await res.json();
  // console.log(json);
  // const { access_token, expires_in } = json;
  const { access_token, expires_in } = await res.json();
  cachedToken = access_token;
  tokenExpiry = Date.now() + (expires_in - 60) * 1000;
  return access_token;
}
