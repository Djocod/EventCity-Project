const https = require("https");
const config = require("./config");
const ticketmasterKey = config.ticketmasterKey.ticketmasterKeyAPI;

// Function to fetch general events (no keyword)
function fetchEvents(
  size = 50,
  countryCode = "FR",
  segmentId = "KZFzniwnSyZfZ7v7nJ"
) {
  return new Promise((resolve, reject) => {
    // Build the API path without keyword
    const path = `/discovery/v2/events.json?apikey=${ticketmasterKey}&size=${size}&countryCode=${countryCode}&segmentId=${segmentId}`;

    const options = {
      hostname: "app.ticketmaster.com",
      path: path,
      method: "GET",
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const events = json._embedded?.events || [];
          resolve(events);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}

// Export the function
module.exports = { fetchEvents };

fetchEvents(50, "FR", "KZFzniwnSyZfZ7v7nJ")
  .then((events) => {
    console.dir(events, { depth: null });
  })
  .catch((err) => console.log(err));
