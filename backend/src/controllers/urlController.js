const db = require("../database/database");

// Generate random short code
const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
};

// CREATE SHORT URL
const createShortUrl = (req, res) => {
    const {
        original_url,
        custom_alias,
        expiration
    } = req.body;

    if (!original_url) {
        return res.status(400).json({
            message: "URL is required"
        });
    }

    // Validate URL
    try {
        new URL(original_url);
    } catch {
        return res.status(400).json({
            message: "Invalid URL"
        });
    }

    const userId = req.user.id;

    // Use custom alias if provided
    const shortCode =
        custom_alias && custom_alias.trim() !== ""
            ? custom_alias.trim()
            : generateShortCode();

    // Calculate expiration date
    let expiresAt = null;

    if (expiration === "24h") {
        expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    } else if (expiration === "7d") {
        expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    } else if (expiration === "30d") {
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }

    // Check if alias already exists
    db.get(
        "SELECT id FROM urls WHERE short_code = ?",
        [shortCode],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (row) {
                return res.status(400).json({
                    message: "Alias already exists"
                });
            }

            db.run(
                `
                INSERT INTO urls
                (
                    original_url,
                    short_code,
                    custom_alias,
                    user_id,
                    expires_at
                )
                VALUES (?, ?, ?, ?, ?)
                `,
                [
                    original_url,
                    shortCode,
                    custom_alias || null,
                    userId,
                    expiresAt
                ],
                function (err) {

                    if (err) {
                        console.error(err);

                        return res.status(500).json({
                            message: "Error creating short URL"
                        });
                    }

                    return res.json({
                        message: "Short URL created",
                        short_url: `https://shortify-on3i.onrender.com/${shortCode}`,
                        short_code: shortCode,
                        expires_at: expiresAt
                    });

                }
            );

        }
    );
};

// REDIRECT URL
const redirectUrl = (req, res) => {

    const { code } = req.params;

    db.get(
        `
        SELECT *
        FROM urls
        WHERE short_code = ?
        `,
        [code],
        (err, row) => {

            if (err || !row) {
                return res.status(404).json({
                    message: "URL not found"
                });
            }

            // Expiration check
            if (
                row.expires_at &&
                new Date(row.expires_at) < new Date()
            ) {
                return res.status(410).json({
                    message: "This URL has expired."
                });
            }

            db.run(
                `
                UPDATE urls
                SET clicks = clicks + 1
                WHERE short_code = ?
                `,
                [code]
            );

            return res.redirect(row.original_url);

        }
    );
};

// URL STATS
const getUrlStats = (req, res) => {

    const { code } = req.params;

    db.get(
        `
        SELECT
            original_url,
            short_code,
            custom_alias,
            clicks,
            expires_at,
            created_at
        FROM urls
        WHERE short_code = ?
        `,
        [code],
        (err, row) => {

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

        }
    );
};

// MY URLS
const getMyUrls = (req, res) => {

    const userId = req.user.id;

    db.all(
        `
        SELECT
            id,
            original_url,
            short_code,
            custom_alias,
            clicks,
            expires_at,
            created_at
        FROM urls
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,
        [userId],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            return res.json(rows);

        }
    );
};

// DELETE URL
const deleteUrl = (req, res) => {

    const { id } = req.params;
    const userId = req.user.id;

    db.run(
        `
        DELETE FROM urls
        WHERE id = ?
        AND user_id = ?
        `,
        [id, userId],
        function (err) {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "URL not found"
                });
            }

            return res.json({
                message: "URL deleted successfully"
            });

        }
    );
};

module.exports = {
    createShortUrl,
    redirectUrl,
    getUrlStats,
    getMyUrls,
    deleteUrl
};