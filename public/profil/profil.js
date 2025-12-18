const cardCont = document.querySelector(".card-container");

function getApiTicketMaster() {
  fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=FR&size=50&apikey=GB63Q2HN7Fo2mTBmSXL25Dq6wS1amhVV&segmentId=KZFzniwnSyZfZ7v7nJ"
  )
    .then((res) => res.json())
    .then((res) => {
      cardCont.innerHTML = "";
      res._embedded.events.forEach((data) => {
        console.log(data._embedded.attractions[0].externalLinks.spotify[0].url);
        const card = document.createElement("div");
        card.classList = "card";
        card.innerHTML = `
            <img src=${data.images[8].url} />
            <div class="text">
                <h3>${data.name}</h3> 
                
                <div class="location-date">
                    <p>Date:</p>
                    <p>${data.dates.start.localDate}</p>
                </div>
                <button>
                <a href="${data._embedded.attractions[0].externalLinks.spotify[0].url}">Spotify</a>
                </button>
            </div>
            `;

        cardCont.appendChild(card);
      });
      // console.log(res._embedded.events[0].classifications[0].segment);
    });
}
getApiTicketMaster();
