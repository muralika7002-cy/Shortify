import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import DashboardNavbar from "../components/DashboardNavbar";
import StatsCards from "../components/StatsCards";
import UrlForm from "../components/UrlForm";
import UrlTable from "../components/UrlTable";

import "../components/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

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

    const createShortUrl = async (originalUrl) => {
        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/api/url/shorten",
                {
                    original_url: originalUrl
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchUrls();

        } catch (error) {
            console.error(error);
            alert("Failed to create URL");
        }
    };

    const deleteUrl = async (id) => {
        if (!window.confirm("Delete this URL?")) return;

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/api/url/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchUrls();

        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard">

            <DashboardNavbar onLogout={logout} />

            <h1 className="dashboard-title">
                Welcome Back 👋
            </h1>

            <p className="dashboard-subtitle">
                Manage all your shortened URLs from one place.
            </p>

            <StatsCards urls={urls} />

            <UrlForm onCreate={createShortUrl} />

            <UrlTable
                urls={urls}
                onDelete={deleteUrl}
            />

        </div>
    );
}

export default Dashboard;