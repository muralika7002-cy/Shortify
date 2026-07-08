import axios from "axios";

const api = axios.create({
    baseURL: "https://shortify-on3i.onrender.com"
});

export default api;