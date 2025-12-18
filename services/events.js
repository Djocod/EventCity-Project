const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const { fetchEvents } = require("./ticketmaster");

async function fetchAndInsertEvents() {
  try {
    // 1️⃣ Fetch events from Ticketmaster
    const events = await fetchEvents();

    // 2️⃣ Insert into database
    for (const event of events) {
      const ticketmasterId = event.id;

      const existing = await db.query(
        "SELECT id FROM Events WHERE id_ticketmaster = ?",
        [ticketmasterId]
      );

      if (!existing.length) {
        await db.query("INSERT INTO Events (id_ticketmaster) VALUES (?)", [
          ticketmasterId,
        ]);
      }
    }

    return {
      message: "Events fetched and inserted successfully",
      count: events.length,
    };
  } catch (error) {
    console.error("Error inserting Ticketmaster events:", error);
    throw error;
  }
}

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM Events`);
  const data = helper.emptyorRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

module.exports = {
  getMultiple,
  fetchAndInsertEvents,
};
