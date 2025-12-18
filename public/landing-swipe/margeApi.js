// écupération d'un artiste depuis Spotify + recherche de ses événements via Ticketmaster

async function searchArtistOnSpotify(artistName) {
  if (!artistName) return null;

  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    artistName
  )}&type=artist&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });

    if (!response.ok) {
      console.error("Spotify API error:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data.artists || data.artists.items.length === 0) {
      return null;
    }

    const artist = data.artists.items[0];

    return {
      name: artist.name,
      image: artist.images?.[0]?.url || "",
      spotifyUrl: artist.external_urls?.spotify || "#",
      genres: artist.genres || [],
      popularity: artist.popularity ?? 0,
    };
  } catch (error) {
    console.error("Erreur Spotify :", error);
    return null;
  }
}

async function searchEventsOnTicketmaster(artistName) {
  if (!artistName) return [];

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(
    artistName
  )}&countryCode=FR&apikey=${TICKETMASTER_API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("Ticketmaster API error:", response.status);
      return [];
    }

    const data = await response.json();
    return data?._embedded?.events || [];
  } catch (error) {
    console.error("Erreur Ticketmaster :", error);
    return [];
  }
}

async function searchArtistAndEvents(artistName) {
  const spotifyArtist = await searchArtistOnSpotify(artistName);

  if (!spotifyArtist) {
    displayNoResult();
    return;
  }

  const events = await searchEventsOnTicketmaster(spotifyArtist.name);
  displayEvents(events, spotifyArtist);
}

function createArtistCard(artist) {
  const genres =
    artist.genres.length > 0 ? artist.genres.join(", ") : "Genre inconnu";

  return `
    <div class="artist-card">
      ${artist.image ? `<img src="${artist.image}" alt="${artist.name}">` : ""}
      <h2>${artist.name}</h2>
      <p>${genres}</p>
      <a href="${artist.spotifyUrl}" target="_blank" rel="noopener">
        Écouter sur Spotify
      </a>
    </div>
  `;
}

function createEventCard(event, artist) {
  const date = event?.dates?.start?.localDate || "Date à venir";

  return `
    <div class="event-card">
      <h3>${event.name}</h3>
      <p>${date}</p>

      <div class="artist-in-event">
        ${
          artist.image ? `<img src="${artist.image}" alt="${artist.name}">` : ""
        }
        <span>${artist.name}</span>
        <a href="${artist.spotifyUrl}" target="_blank" rel="noopener">
          Spotify
        </a>
      </div>

      <a href="${event.url}" target="_blank" rel="noopener">
        Acheter des billets
      </a>
    </div>
  `;
}

function displayEvents(events, artist) {
  const container = document.getElementById("events-container");
  container.innerHTML = "";

  container.insertAdjacentHTML("beforeend", createArtistCard(artist));

  if (events.length === 0) {
    container.insertAdjacentHTML(
      "beforeend",
      "<p>Aucun concert trouvé pour le moment.</p>"
    );
    return;
  }

  events.forEach((event) => {
    container.insertAdjacentHTML("beforeend", createEventCard(event, artist));
  });
}

function displayNoResult() {
  const container = document.getElementById("events-container");
  container.innerHTML = "<p>Artiste introuvable sur Spotify.</p>";
}
