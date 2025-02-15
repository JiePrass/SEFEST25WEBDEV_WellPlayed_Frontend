/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header({ setLogout }) {
    const [username, setUsername] = useState("User"); // Default username
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Cek apakah token ada di localStorage
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
            const storedUser = localStorage.getItem("username");
            if (storedUser) setUsername(storedUser);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <header className="bg-[#FBFBFB] py-4 px-6 flex justify-between items-center shadow-md">
            {/* Logo */}
            <div className="text-xl font-bold text-gray-800">
                <Link to="/">🌿 CarbonTrack</Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/calculator" className="text-gray-600 hover:text-gray-900">Calculator</Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link to="/leaderboard" className="text-gray-600 hover:text-gray-900">Leaderboard</Link>
            </nav>

            {/* Profile / Auth Buttons */}
            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <Link to="/profile" className="flex items-center space-x-3">
                        <img
                            src="https://placehold.co/400"
                            alt="User"
                            className="w-10 h-10 rounded-full border"
                        />
                        <span className="text-gray-700 font-medium">{username}</span>
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
}
