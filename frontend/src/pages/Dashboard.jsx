import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/api/url/my-urls", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUrls(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>

            <h2>My URLs</h2>

            {urls.map((url) => (
                <div key={url.id}>
                    <p>
                        <strong>Original:</strong> {url.original_url}
                    </p>

                    <p>
                        <strong>Short Code:</strong> {url.short_code}
                    </p>

                    <p>
                        <strong>Clicks:</strong> {url.clicks}
                    </p>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Dashboard;