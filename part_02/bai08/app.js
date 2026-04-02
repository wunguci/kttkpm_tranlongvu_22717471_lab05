const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: "db",
  user: "user",
  password: "password",
  database: "mydb",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed: ", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("Node.js connected to MySQL!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
