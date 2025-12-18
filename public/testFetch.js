fetch(
  "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=FR&size=50&apikey=GB63Q2HN7Fo2mTBmSXL25Dq6wS1amhVV&segmentId=KZFzniwnSyZfZ7v7nJ"
)
  .then((res) => res.json())
  .then((res) => {
    // console.log(res._embedded.events[0].classifications[0].segment);

    const data = res._embedded.events;
    for (let i = 0; i < data.length; i++) {
      const segment = data[i].classifications;
      console.log(segment);
    }
  });
