import { QRCodeCanvas } from "qrcode.react";

function QRCodeModal({ url, onClose }) {
    if (!url) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
            }}
        >
            <div
                style={{
                    background: "#1e293b",
                    color: "white",
                    padding: "30px",
                    borderRadius: "15px",
                    textAlign: "center",
                    width: "350px",
                }}
            >
                <h2>QR Code</h2>

                <QRCodeCanvas
                    value={url}
                    size={220}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    includeMargin={true}
                />

                <p
                    style={{
                        marginTop: "20px",
                        wordBreak: "break-all",
                    }}
                >
                    {url}
                </p>

                <button
                    onClick={onClose}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#7c3aed",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default QRCodeModal;