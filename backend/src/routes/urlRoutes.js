const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    createShortUrl,
    redirectUrl,
    getUrlStats,
    getMyUrls,
    deleteUrl
} = require("../controllers/urlController");

// Protected Routes
router.post("/shorten", verifyToken, createShortUrl);
router.get("/my-urls", verifyToken, getMyUrls);
router.delete("/:id", verifyToken, deleteUrl);

// Public Routes
router.get("/stats/:code", getUrlStats);
router.get("/:code", redirectUrl);

module.exports = router;