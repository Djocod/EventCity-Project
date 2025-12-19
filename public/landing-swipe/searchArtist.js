const inputSearch = document.getElementById("search-dash");
const cardCont = document.querySelector(".card-container");
const containerArtistSection = document.querySelector(
  ".container-artist-section"
);

let spotifyAccessToken = "";

// ============ Get Token Spotify ============
async function fetchSpotifyAccessToken() {
  try {
    const res = await fetch("http://localhost:3000/spotify/spotify-token");
    if (!res.ok) throw new Error("Erreur serveur");

    const data = await res.json();
    if (data.access_token) {
      spotifyAccessToken = data.access_token;
      console.log("✅ Token Spotify récupéré avec succès");
      return true;
    } else {
      throw new Error("Token absent dans la réponse");
    }
  } catch (e) {
    console.error("❌ Erreur lors de la récupération du token Spotify:", e);
    alert(
      "Impossible de se connecter à Spotify. Vérifiez que le serveur backend est démarré."
    );
    return false;
  }
}

// ============ if token is dead reload ============
window.addEventListener("DOMContentLoaded", async () => {
  const tokenOk = await fetchSpotifyAccessToken();
  if (tokenOk) {
    displayArtistsWithEventsOnLoad();
  } else {
    cardCont.innerHTML =
      "<p class='no-result'>⚠️ Service temporairement indisponible</p>";
  }
});

// ============ get event and check if  ============
async function displayArtistsWithEventsOnLoad() {
  try {
    const response = await fetch(
      "http://localhost:3000/ticketmaster/events?countryCode=FR&size=10"
    );

    if (!response.ok) {
      console.error("Erreur Ticketmaster:", response.status);
      return;
    }

    const data = await response.json();
    const events = data?._embedded?.events || [];

    if (events.length === 0) {
      cardCont.innerHTML = "<p class='no-result'>Aucun événement trouvé</p>";
      return;
    }

    cardCont.innerHTML = "";
    containerArtistSection.innerHTML = "";

    for (const event of events) {
      const artistName = event._embedded?.attractions?.[0]?.name;

      if (artistName) {
        const spotifyArtist = await searchArtistOnSpotify(artistName);
        if (spotifyArtist) {
          displayArtistCard(spotifyArtist);
        }
      }

      displayEvents([event]);
    }
  } catch (e) {
    console.error("Erreur lors du chargement initial:", e);
    cardCont.innerHTML = "<p class='no-result'>Erreur de chargement</p>";
  }
}

// ============ search data on spotify ============
async function searchArtistOnSpotify(artistName) {
  if (!artistName || !spotifyAccessToken) return null;

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
      console.error("Erreur Spotify API:", response.status);
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
      followers: artist.followers?.total || 0,
    };
  } catch (error) {
    console.error("Erreur Spotify:", error);
    return null;
  }
}

// ============ search data on ticket ============
async function searchEventsOnTicketmaster(artistName) {
  if (!artistName) return [];

  try {
    const response = await fetch(
      `http://localhost:3000/ticketmaster/events/search?keyword=${encodeURIComponent(
        artistName
      )}&countryCode=US&size=50`
    );

    if (!response.ok) {
      console.error("Erreur Ticketmaster API:", response.status);
      return [];
    }

    const data = await response.json();
    return data?._embedded?.events || [];
  } catch (error) {
    console.error("Erreur Ticketmaster:", error);
    return [];
  }
}

// ============ display card artist spotify ============
function displayArtistCard(artist) {
  containerArtistSection.innerHTML = "";
  const artistSection = document.createElement("div");
  artistSection.classList.add("artist-info-card");

  const genres =
    artist.genres.length > 0 ? artist.genres.join(", ") : "Genre inconnu";
  const followersFormatted = artist.followers.toLocaleString();

  artistSection.innerHTML = `
    <div class="artist-header">
      ${
        artist.image
          ? `<img src="${artist.image}" alt="${artist.name}" class="artist-image">`
          : ""
      }
      <div class="artist-details">
        <h2>${artist.name}</h2>
        <p class="artist-genres">${genres}</p>
        <p class="artist-stats">Popularité: ${
          artist.popularity
        }/100 | ${followersFormatted} followers</p>
        <a href="${
          artist.spotifyUrl
        }" target="_blank" rel="noopener" class="spotify-link">
          🎵 Écouter sur Spotify
        </a>
      </div>
    </div>
  `;

  containerArtistSection.appendChild(artistSection);
}

// ============ display card event ticket master ============
function displayEvents(events) {
  events.forEach((data) => {
    // search best img
    let imageUrl = "";
    if (data.images && data.images.length > 0) {
      imageUrl =
        data.images[Math.min(2, data.images.length - 1)]?.url ||
        data.images[0].url;
    }

    const card = document.createElement("div");
    card.classList = "card";
    card.innerHTML = `
      <img src="${imageUrl}" alt="${data.name}" />
      <div class="text">
        <h3>${data.name}</h3>
        <p class="event-genre">${
          data.classifications?.[0]?.genre?.name || "Genre non spécifié"
        }</p>
        <div class="location-date">
          <p>Date:</p>
          <p>${data.dates.start.localDate}</p>
        </div>
        <button>
          <a href="${data.url}" target="_blank">Billets</a>
        </button>
      </div>
    `;
    cardCont.appendChild(card);
  });
}

// ============ Compare the names ============
async function searchArtistAndEvents() {
  const artistName = inputSearch.value.trim();

  if (!artistName) {
    cardCont.innerHTML = "";
    return;
  }
  const spotifyArtist = await searchArtistOnSpotify(artistName);

  if (!spotifyArtist) {
    cardCont.innerHTML = "";
    return;
  }

  cardCont.innerHTML = "";
  displayArtistCard(spotifyArtist);

  const events = await searchEventsOnTicketmaster(spotifyArtist.name);

  if (events.length === 0) {
    const noEvents = document.createElement("p");
    noEvents.classList.add("no-events");
    noEvents.textContent = "Aucun concert trouvé pour cet artiste.";
    cardCont.appendChild(noEvents);
  } else {
    displayEvents(events);
  }
}

// ============ limits calls ============
inputSearch.addEventListener("input", () => {
  clearTimeout(inputSearch.searchTimeout);
  inputSearch.searchTimeout = setTimeout(searchArtistAndEvents, 500);
});
