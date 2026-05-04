const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// CONNECT DATABASE
connectDB();

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server running");
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/api/records", recordRoutes);

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});