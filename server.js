const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully 👍"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Mongoose Schema & Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: Number,
  feedback: String,
});

const Usermodel = mongoose.model("Detail", UserSchema);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// Form submission route
app.post("/send-to-mongo", (req, res) => {
  const data = req.body;
  Usermodel.create(data)
    .then(() => {
      console.log("Data sent to MongoDB 👍");
      res.status(200).json({ message: "Data saved successfully" });
    })
    .catch((error) => {
      console.log("Error saving data:", error);
      res.status(500).json({ error: "Failed to save data" });
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
