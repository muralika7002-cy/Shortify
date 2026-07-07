function StatsCards({ urls }) {
    const totalUrls = urls.length;

    const totalClicks = urls.reduce(
        (sum, url) => sum + url.clicks,
        0
    );

    const averageClicks =
        totalUrls === 0
            ? 0
            : (totalClicks / totalUrls).toFixed(1);

    const cardStyle = {
        background: "#1e293b",
        padding: "25px",
        borderRadius: "15px",
        textAlign: "center",
        flex: 1,
        color: "white",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    };

    const numberStyle = {
        fontSize: "38px",
        fontWeight: "bold",
        color: "#7c3aed",
        marginTop: "10px"
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                marginBottom: "35px",
                flexWrap: "wrap"
            }}
        >
            <div style={cardStyle}>
                <h3>Total URLs</h3>
                <div style={numberStyle}>{totalUrls}</div>
            </div>

            <div style={cardStyle}>
                <h3>Total Clicks</h3>
                <div style={numberStyle}>{totalClicks}</div>
            </div>

            <div style={cardStyle}>
                <h3>Average Clicks</h3>
                <div style={numberStyle}>{averageClicks}</div>
            </div>
        </div>
    );
}

export default StatsCards;