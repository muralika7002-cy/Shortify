
const db = require("../database/database");

// generate random short code
const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
};

// CREATE SHORT URL
const createShortUrl = (req, res) => {
    const { original_url } = req.body;

    if (!original_url) {
        return res.status(400).json({
            message: "URL is required"
        });
    }

    const shortCode = generateShortCode();

    const userId = req.user.id;

    const query = `
        INSERT INTO urls (original_url, short_code, user_id)
        VALUES (?, ?, ?)
    `;

    db.run(
        query,
        [original_url, shortCode, userId],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Error creating short URL"
                });
            }

            return res.json({
                message: "Short URL created",
                short_url: `http://localhost:5000/${shortCode}`,
                short_code: shortCode,
                user_id: userId
            });
        }
    );
};

// REDIRECT URL
const redirectUrl = (req, res) => {
    const { code } = req.params;

    const query = `
        SELECT original_url FROM urls WHERE short_code = ?
    `;

    db.get(query, [code], (err, row) => {
        if (err || !row) {
            return res.status(404).json({ message: "URL not found" });
        }

        db.run(
            `UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?`,
            [code]
        );

        return res.redirect(row.original_url);
    });
};
const getUrlStats = (req, res) => {
    const { code } = req.params;

    const query = `
        SELECT original_url, short_code, clicks, created_at
        FROM urls
        WHERE short_code = ?
    `;

    db.get(query, [code], (err, row) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (!row) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        return res.json(row);
    });
};

const getMyUrls = (req, res) => {
    const userId = req.user.id;

    const query = `
        SELECT
            id,
            original_url,
            short_code,
            clicks,
            created_at
        FROM urls
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        return res.json(rows);
    });
};

module.exports = {
    createShortUrl,
    redirectUrl,
    getUrlStats,
    getMyUrls
};