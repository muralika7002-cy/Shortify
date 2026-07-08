import { useState } from "react";
import toast from "react-hot-toast";
import QRCodeModal from "./QRCodeModal";

function UrlTable({ urls, onDelete }) {
    const [selectedUrl, setSelectedUrl] = useState("");

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
        <>
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
                        <tr style={{ borderBottom: "2px solid #334155" }}>
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
                                    borderBottom: "1px solid #334155",
                                }}
                            >
                                <td
                                    style={{
                                        padding: "18px 0",
                                        maxWidth: "300px",
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
                                            marginRight: "8px",
                                            padding: "8px 12px",
                                            background: "#2563eb",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        📋 Copy
                                    </button>

                                    <button
                                        onClick={() =>
                                            setSelectedUrl(
                                                `http://localhost:5000/${url.short_code}`
                                            )
                                        }
                                        style={{
                                            marginRight: "8px",
                                            padding: "8px 12px",
                                            background: "#7c3aed",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        📱 QR
                                    </button>

                                    <button
                                        onClick={() => onDelete(url.id)}
                                        style={{
                                            padding: "8px 12px",
                                            background: "#dc2626",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
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

            <QRCodeModal
                url={selectedUrl}
                onClose={() => setSelectedUrl("")}
            />
        </>
    );
}

export default UrlTable;