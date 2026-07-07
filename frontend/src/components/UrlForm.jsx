import { useState } from "react";

function UrlForm({ onCreate }) {
    const [originalUrl, setOriginalUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!originalUrl.trim()) {
            alert("Please enter a URL");
            return;
        }

        await onCreate(originalUrl);

        setOriginalUrl("");
    };

    return (
        <div
            style={{
                background: "#1e293b",
                padding: "30px",
                borderRadius: "15px",
                marginBottom: "35px"
            }}
        >
            <h2>Create Short URL</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="https://example.com"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "15px",
                        borderRadius: "10px",
                        border: "none",
                        marginTop: "20px",
                        marginBottom: "20px",
                        fontSize: "16px"
                    }}
                />

                <button
                    type="submit"
                    className="primary-btn"
                >
                    Shorten URL
                </button>
            </form>
        </div>
    );
}

export default UrlForm;