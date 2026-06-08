import { getToken } from "../services/spotifyToken.service.js";

export async function handleToken(req, res) {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Paramètre q requis" });

    const token = await getToken();
    const spotifyRes = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=artist&limit=10`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const data = await spotifyRes.json();
    console.log(data);
    return res.status(200).json(data.artists.items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
