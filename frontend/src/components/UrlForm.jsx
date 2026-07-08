import { useState } from "react";

function UrlForm({ onCreate }) {

    const [originalUrl, setOriginalUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [expiration, setExpiration] = useState("never");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!originalUrl.trim()) return;

        onCreate(
            originalUrl,
            customAlias,
            expiration
        );

        setOriginalUrl("");
        setCustomAlias("");
        setExpiration("never");
    };

    return (
        <div
            style={{
                background: "#1e293b",
                padding: "30px",
                borderRadius: "15px",
                margin: "30px 0"
            }}
        >

            <h2 style={{ color: "white" }}>
                Create Short URL
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Paste your URL..."
                    value={originalUrl}
                    onChange={(e) =>
                        setOriginalUrl(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "15px",
                        marginTop: "20px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "16px"
                    }}
                />

                <input
                    type="text"
                    placeholder="Custom Alias (Optional)"
                    value={customAlias}
                    onChange={(e) =>
                        setCustomAlias(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "15px",
                        marginTop: "15px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "16px"
                    }}
                />

                <select
                    value={expiration}
                    onChange={(e) =>
                        setExpiration(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "15px",
                        marginTop: "15px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "16px"
                    }}
                >
                    <option value="never">Never Expires</option>
                    <option value="24h">24 Hours</option>
                    <option value="7d">7 Days</option>
                    <option value="30d">30 Days</option>
                </select>

                <button
                    type="submit"
                    style={{
                        marginTop: "20px",
                        padding: "15px 30px",
                        background: "#7c3aed",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    Shorten URL
                </button>

            </form>

        </div>
    );
}

export default UrlForm;