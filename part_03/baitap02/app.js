const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// connect MongoDB
mongoose
  .connect("mongodb://mongo:27017/mydb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// schema
const Item = mongoose.model("Item", { name: String });

// API
app.get("/", (req, res) => {
  res.send("Node.js + MongoDB running!");
});

app.post("/add", async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.send(item);
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
