const inputSearch = document.getElementById("search-dash");
const cardCont = document.querySelector(".card-container");
const selectGender = document.getElementById("select-gender");

// Clés API
const TICKETMASTER_API_KEY = "GB63Q2HN7Fo2mTBmSXL25Dq6wS1amhVV";
let spotifyAccessToken = ""; // À définir avec votre token Spotify

let allGenres = new Set();

// ============ SPOTIFY API ============
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
      followers: artist.followers?.total || 0,
    };
  } catch (error) {
    console.error("Erreur Spotify :", error);
    return null;
  }
}

// ============ TICKETMASTER API ============
async function searchEventsOnTicketmaster(artistName) {
  if (!artistName) return [];

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(
    artistName
  )}&countryCode=US&size=50&apikey=${TICKETMASTER_API_KEY}`;

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

// ============ AFFICHAGE ============
function displayArtistCard(artist) {
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

  cardCont.insertAdjacentElement("afterbegin", artistSection);
}

function displayEvents(events) {
  events.forEach((data) => {
    const card = document.createElement("div");
    card.classList = "card";
    card.innerHTML = `
      <img src="${data.images[8]?.url || data.images[0]?.url}" />
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

    // Collecter les genres pour le filtre
    const genre = data.classifications?.[0]?.genre?.name;
    if (genre) allGenres.add(genre);
  });
}

function updateGenreFilter() {
  selectGender.innerHTML = '<option value="">Tous les genres</option>';
  allGenres.forEach((genre) => {
    const opt = document.createElement("option");
    opt.value = genre;
    opt.textContent = genre;
    selectGender.appendChild(opt);
  });
}

function displayNoResult() {
  cardCont.innerHTML =
    "<p class='no-result'>Aucun artiste ou événement trouvé.</p>";
}

// ============ RECHERCHE PRINCIPALE ============
async function searchArtistAndEvents() {
  const artistName = inputSearch.value.trim();

  if (!artistName) {
    cardCont.innerHTML = "";
    return;
  }

  // Afficher un loader
  cardCont.innerHTML = "<p class='loading'>Recherche en cours...</p>";
  allGenres.clear();

  // 1. Rechercher l'artiste sur Spotify
  const spotifyArtist = await searchArtistOnSpotify(artistName);

  if (!spotifyArtist) {
    displayNoResult();
    return;
  }

  cardCont.innerHTML = "";

  // 2. Afficher la carte de l'artiste
  displayArtistCard(spotifyArtist);

  // 3. Rechercher les événements sur Ticketmaster
  const events = await searchEventsOnTicketmaster(spotifyArtist.name);

  if (events.length === 0) {
    const noEvents = document.createElement("p");
    noEvents.classList.add("no-events");
    noEvents.textContent = "Aucun concert trouvé pour cet artiste.";
    cardCont.appendChild(noEvents);
  } else {
    displayEvents(events);
    updateGenreFilter();
  }
}

// ============ FILTRAGE PAR GENRE ============
function filterByGenre() {
  const selectedGenre = selectGender.value;
  const allCards = cardCont.querySelectorAll(".card");

  allCards.forEach((card) => {
    const genreText = card.querySelector(".event-genre")?.textContent || "";
    if (!selectedGenre || genreText === selectedGenre) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// ============ EVENT LISTENERS ============
inputSearch.addEventListener("input", () => {
  // Recherche automatique après 500ms d'inactivité
  clearTimeout(inputSearch.searchTimeout);
  inputSearch.searchTimeout = setTimeout(searchArtistAndEvents, 500);
});

selectGender.addEventListener("change", filterByGenre);

// Note: Vous devez obtenir un token Spotify OAuth
// Pour tester, utilisez: https://developer.spotify.com/console/get-search-item/
