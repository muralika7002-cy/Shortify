function UrlTable({ urls, onDelete }) {
    const copyToClipboard = (shortCode) => {
        const shortUrl = `http://localhost:5000/${shortCode}`;

        navigator.clipboard.writeText(shortUrl);

        alert("Short URL copied!");
    };

    if (urls.length === 0) {
        return (
            <div
                style={{
                    background: "#1e293b",
                    padding: "30px",
                    borderRadius: "15px",
                    color: "white",
                    textAlign: "center"
                }}
            >
                <h2>No URLs Found</h2>
                <p>Create your first short URL 🚀</p>
            </div>
        );
    }

    return (
        <div
            style={{
                background: "#1e293b",
                padding: "30px",
                borderRadius: "15px",
                color: "white",
                overflowX: "auto"
            }}
        >
            <h2 style={{ marginBottom: "20px" }}>My URLs</h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >
                <thead>
                    <tr
                        style={{
                            borderBottom: "1px solid #334155"
                        }}
                    >
                        <th align="left">Original URL</th>
                        <th align="left">Short URL</th>
                        <th align="center">Clicks</th>
                        <th align="center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {urls.map((url) => (
                        <tr
                            key={url.id}
                            style={{
                                borderBottom: "1px solid #334155"
                            }}
                        >
                            <td
                                style={{
                                    padding: "15px 0",
                                    maxWidth: "300px",
                                    wordBreak: "break-word"
                                }}
                            >
                                {url.original_url}
                            </td>

                            <td>
                                <a
                                    href={`http://localhost:5000/${url.short_code}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        color: "#7c3aed",
                                        textDecoration: "none"
                                    }}
                                >
                                    {url.short_code}
                                </a>
                            </td>

                            <td align="center">
                                {url.clicks}
                            </td>

                            <td align="center">
                                <button
                                    onClick={() =>
                                        copyToClipboard(url.short_code)
                                    }
                                    style={{
                                        marginRight: "10px",
                                        padding: "8px 14px",
                                        background: "#3b82f6",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer"
                                    }}
                                >
                                    📋 Copy
                                </button>

                                <button
                                    onClick={() => onDelete(url.id)}
                                    style={{
                                        padding: "8px 14px",
                                        background: "#ef4444",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer"
                                    }}
                                >
                                    🗑 Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UrlTable;