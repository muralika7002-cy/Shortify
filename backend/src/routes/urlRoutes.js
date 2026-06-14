const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    createShortUrl,
    redirectUrl,
    getUrlStats,
    getMyUrls
} = require("../controllers/urlController");

// Protected routes
router.post("/shorten", verifyToken, createShortUrl);
router.get("/my-urls", verifyToken, getMyUrls);

// Public routes
router.get("/stats/:code", getUrlStats);
router.get("/:code", redirectUrl);

module.exports = router;