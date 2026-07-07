import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

import DashboardNavbar from "../components/DashboardNavbar";
import StatsCards from "../components/StatsCards";
import UrlForm from "../components/UrlForm";
import UrlTable from "../components/UrlTable";
import SearchBar from "../components/SearchBar";

import "../components/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [urls, setUrls] = useState([]);
    const [search, setSearch] = useState("");

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
                    Authorization: `Bearer ${token}`,
                },
            });

            setUrls(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load URLs");
        }
    };

    const createShortUrl = async (originalUrl) => {
        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/api/url/shorten",
                {
                    original_url: originalUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Short URL Created!");

            fetchUrls();
        } catch (error) {
            console.error(error);
            toast.error("Failed to create URL");
        }
    };

    const deleteUrl = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this URL?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/api/url/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("URL Deleted!");

            fetchUrls();
        } catch (error) {
            console.error(error);
            toast.error("Delete Failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        toast.success("Logged Out");
        navigate("/login");
    };

    const filteredUrls = urls.filter((url) => {
        return (
            url.original_url
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            url.short_code
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    });

    return (
        <div className="dashboard">
            <DashboardNavbar onLogout={logout} />

            <h1 className="dashboard-title">
                Welcome Back 👋
            </h1>

            <p className="dashboard-subtitle">
                Manage, search and track all your shortened URLs.
            </p>

            <StatsCards urls={urls} />

            <UrlForm onCreate={createShortUrl} />

            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <UrlTable
                urls={filteredUrls}
                onDelete={deleteUrl}
            />
        </div>
    );
}

export default Dashboard;