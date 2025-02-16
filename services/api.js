import axios from "axios";

const API_URL = "http://localhost:2304/api"; // Sesuaikan dengan backend

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const loginUser = (email, password) => {
    return api.post("/login", { email, password });
};

export const registerUser = (name, email, password) => {
    return api.post("/register", { name, email, password });
};

export const fetchEmissionData = async () => {
    try {
        const response = await api.get("/kalkulator/riwayat");
        return response.data; // Kembalikan data untuk diproses di komponen
    } catch (error) {
        console.error("Error fetching emission data:", error);
        return [];
    }
};

export default api;
