/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <header className="bg-[#FBFBFB] py-4 px-6 flex justify-between items-center">
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
                {isLoggedIn ? (
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://placehold.co/400"
                            alt="User"
                            className="w-10 h-10 rounded-full border"
                        />
                        <span className="text-gray-700 font-medium">John Doe</span>
                    </div>
                ) : (
                    <div className="flex space-x-2">
                        <Link to="/login" className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600">
                            Login
                        </Link>
                        <Link to="/register" className="px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
