const express = require("express");
const { Client } = require("pg");

const app = express();

const client = new Client({
  host: "db",
  user: "postgres",
  password: "postgres",
  database: "votes",
});

// Connect with retry logic
let connected = false;
const maxRetries = 30;
const retryDelay = 2000; // 2 seconds

async function connectWithRetry(attempt = 0) {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    // Create table if needed
    await client.query(`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        vote VARCHAR(10),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Votes table ready");
    connected = true;
  } catch (err) {
    if (attempt < maxRetries) {
      console.log(
        `PostgreSQL not ready, retrying... (${attempt + 1}/${maxRetries})`,
      );
      setTimeout(() => connectWithRetry(attempt + 1), retryDelay);
    } else {
      console.error("Failed to connect after", maxRetries, "attempts");
      process.exit(1);
    }
  }
}

connectWithRetry();

app.get("/", async (req, res) => {
  if (!connected) {
    return res.status(503).json({ error: "Database not ready" });
  }

  try {
    const result = await client.query(
      "SELECT vote, COUNT(*) as count FROM votes GROUP BY vote ORDER BY vote",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/stats", async (req, res) => {
  if (!connected) {
    return res.status(503).json({ error: "Database not ready" });
  }

  try {
    const result = await client.query("SELECT COUNT(*) as total FROM votes");
    res.json({
      total_votes: result.rows[0].total,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5001, () => {
  console.log("Result service listening on port 5001");
});
