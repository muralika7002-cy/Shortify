console.log("SERVER STARTED");

const express = require("express");
const app = express();

// Database
require("./src/database/database");

// Middleware
const verifyToken = require("./src/middleware/authMiddleware");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const urlRoutes = require("./src/routes/urlRoutes");

// Controllers
const { redirectUrl } = require("./src/controllers/urlController");

app.use(express.json());

// Test Route
app.get("/test", (req, res) => {
    res.send("Test route working");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// URL Routes
app.use("/api/url", urlRoutes);

// Protected Route
app.get("/protected", verifyToken, (req, res) => {
    res.json({
        message: "Protected route working",
        user: req.user
    });
});

// Redirect Route (KEEP LAST)
app.get("/:code", redirectUrl);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});