// Leaderboard.jsx
import React, { useState, useEffect } from "react";
import api from "../../services/api";

// Komponen ProfilePicture: menampilkan avatar atau placeholder
function ProfilePicture({ profilePicture, size }) {
    let avatarSize;
    switch (size) {
        case "large":
            avatarSize = "w-20 h-20 md:w-24 md:h-24";
            break;
        case "medium":
            avatarSize = "w-16 h-16 md:w-20 md:h-20";
            break;
        case "small":
            avatarSize = "w-8 h-8 md:w-10 md:h-10";
            break;
        default:
            avatarSize = "w-16 h-16 md:w-20 md:h-20";
    }

    return profilePicture ? (
        <img
            src={profilePicture}
            alt="Profile"
            className={`${avatarSize} rounded-full object-cover`}
        />
    ) : (
        <div
            className={`${avatarSize} bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-sm`}
        >
            ?
        </div>
    );
}

// Komponen LeaderboardRow: menampilkan satu baris leaderboard
function LeaderboardRow({ rank, user }) {
    // Styling khusus untuk 3 peringkat teratas
    let rowStyle = "bg-white";
    if (rank === 1) rowStyle = "bg-yellow-100 font-bold";
    else if (rank === 2) rowStyle = "bg-gray-100";
    else if (rank === 3) rowStyle = "bg-orange-100";

    return (
        <tr className={`hover:bg-gray-50 transition ${rowStyle}`}>
            <td className="px-4 py-2 text-sm md:text-base text-gray-700">{rank}</td>
            <td className="px-4 py-2 text-sm md:text-base text-gray-700 flex items-center gap-2">
                <ProfilePicture profilePicture={user.profile_picture} size="small" />
                {user.name}
            </td>
            <td className="px-4 py-2 text-sm md:text-base text-gray-700">{user.point}</td>
        </tr>
    );
}

// Komponen Leaderboard: komponen utama
export default function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await api.get("/leaderboard"); // Pastikan endpoint ini benar
                setLeaderboardData(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        };

        fetchLeaderboard();
    }, []);

    if (!Array.isArray(leaderboardData) || leaderboardData.length === 0) {
        return <div className="text-center py-8">Loading leaderboard...</div>;
    }

    // Urutkan data berdasarkan poin tertinggi
    const sortedData = [...leaderboardData].sort((a, b) => b.point - a.point);
    // Batasi hanya 15 peringkat teratas
    const leaderboard = sortedData.slice(0, 15);

    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Leaderboard</h1>
            <table className="w-full text-left bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-gray-600 font-medium text-sm md:text-base">Rank</th>
                        <th className="px-4 py-2 text-gray-600 font-medium text-sm md:text-base">Name</th>
                        <th className="px-4 py-2 text-gray-600 font-medium text-sm md:text-base">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((user, index) => (
                        <LeaderboardRow key={user.id} rank={index + 1} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
