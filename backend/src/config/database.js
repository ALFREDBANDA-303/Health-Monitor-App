const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(
  __dirname,
  "../../../database/health_monitor.db"
);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("Database connection failed", err.message);
  } else {
    console.log("SQLite database connected");
  }
});

module.exports = db;