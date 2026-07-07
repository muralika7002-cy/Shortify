import toast from "react-hot-toast";

function UrlTable({ urls, onDelete }) {
    const copyToClipboard = (shortCode) => {
        const shortUrl = `http://localhost:5000/${shortCode}`;

        navigator.clipboard.writeText(shortUrl);

        toast.success("Copied to clipboard!");
    };

    if (urls.length === 0) {
        return (
            <div
                style={{
                    background: "#1e293b",
                    padding: "30px",
                    borderRadius: "15px",
                    textAlign: "center",
                    color: "white",
                    marginTop: "20px",
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
                overflowX: "auto",
                marginTop: "20px",
            }}
        >
            <h2 style={{ marginBottom: "20px" }}>My URLs</h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr
                        style={{
                            borderBottom: "2px solid #334155",
                        }}
                    >
                        <th
                            align="left"
                            style={{ paddingBottom: "15px" }}
                        >
                            Original URL
                        </th>

                        <th
                            align="left"
                            style={{ paddingBottom: "15px" }}
                        >
                            Short URL
                        </th>

                        <th
                            align="center"
                            style={{ paddingBottom: "15px" }}
                        >
                            Clicks
                        </th>

                        <th
                            align="center"
                            style={{ paddingBottom: "15px" }}
                        >
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {urls.map((url) => (
                        <tr
                            key={url.id}
                            style={{
                                borderBottom: "1px solid #334155",
                            }}
                        >
                            <td
                                style={{
                                    padding: "18px 0",
                                    maxWidth: "320px",
                                    wordBreak: "break-word",
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
                                        color: "#8b5cf6",
                                        textDecoration: "none",
                                        fontWeight: "bold",
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
                                        background: "#2563eb",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "8px 14px",
                                        cursor: "pointer",
                                        marginRight: "10px",
                                    }}
                                >
                                    📋 Copy
                                </button>

                                <button
                                    onClick={() =>
                                        onDelete(url.id)
                                    }
                                    style={{
                                        background: "#dc2626",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "8px 14px",
                                        cursor: "pointer",
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