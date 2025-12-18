const inputSearch = document.getElementById("search-dash");
const cardCont = document.querySelector(".card-container");
const selectGender = document.getElementById("select-gender");
const optionGender = document.getElementById("option-gender");

let eventsData = [];

function displayResults(filteredEvents) {
  cardCont.innerHTML = "";
  filteredEvents.forEach((data) => {
    console.log(data.classifications[0].genre.name);

    const card = document.createElement("div");
    card.classList = "card";
    card.innerHTML = `
      <img src="${data.images[8]?.url || data.images[0]?.url}" />
      <div class="text">
        <h3>${data.name}</h3>
            <p class="event-genre">${data.classifications[0].genre.name}</p>
            <div class="location-date">
              <p>Date:</p>
              <p>${data.dates.start.localDate}</p>
            </div>
        <button>
          <a href="${
            data._embedded.attractions?.[0]?.externalLinks?.spotify?.[0]?.url ||
            "#"
          }">Spotify</a>
        </button>
      </div>
    `;
    cardCont.appendChild(card);
  });
}

function getApiTicketMaster() {
  fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&size=50&apikey=GB63Q2HN7Fo2mTBmSXL25Dq6wS1amhVV&segmentId=KZFzniwnSyZfZ7v7nJ"
  )
    .then((res) => res.json())
    .then((res) => {
      eventsData = res._embedded.events;

      // Récupérer tous les genres uniques
      const genresSet = new Set();
      eventsData.forEach((event) => {
        const genre = event.classifications?.[0]?.genre?.name;
        if (genre) genresSet.add(genre);
      });

      // Vider le select puis ajouter le placeholder et chaque genre comme option distincte
      const selectGender = document.getElementById("select-gender");
      selectGender.innerHTML = '<option value="">Genre</option>';
      genresSet.forEach((genre) => {
        if (typeof genre == "undefined" || genre == undefined) return;
        const opt = document.createElement("option");
        opt.value = genre;
        opt.textContent = genre;
        selectGender.appendChild(opt);
      });

      displayResults(eventsData); // Affiche tout au début
    });
}

function filterAndDisplay() {
  const searchValue = inputSearch.value.trim().toLowerCase();
  const selectedGenre = selectGender.value;
  const filtered = eventsData.filter((data) => {
    const nameMatch = data.name.toLowerCase().startsWith(searchValue);
    const genre = data.classifications?.[0]?.genre?.name;
    const genreMatch = !selectedGenre || genre === selectedGenre;
    return nameMatch && genreMatch;
  });
  displayResults(filtered);
}

inputSearch.addEventListener("input", filterAndDisplay);
selectGender.addEventListener("change", filterAndDisplay);

getApiTicketMaster();
