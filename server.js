// Load environment variables (like Mongo URI, JWT secret, etc.)
require("dotenv").config();

// Import express
const express = require("express");

// Import our MongoDB connection function
const connectDB = require("./config/db");

// Connect to the database
connectDB();

// Create an express app
const app = express();

// Middleware to parse JSON (must come before routes)
app.use(express.json());
 
// Define a test route for homepage
app.get("/", (req, res) => {
  res.send("Hello from the realm of wizardly");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Port from environment or fallback
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is wizardly running on port ${PORT}`);
});
