/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function Profile({ handleLogout, emissionData }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/profile");
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) {
        return <div className="text-center py-8">Loading profile...</div>;
    }

    // Destructure data dari profile
    const { name, point, profile_picture, achievements } = profile;

    // Bangun URL untuk foto profil
    const profileImgUrl = profile_picture
        ? `http://localhost:2304${profile_picture.startsWith("/") ? "" : "/"}${profile_picture}`
        : "https://placehold.co/400x400";

    // Hitung total CO₂ jika emissionData tersedia (misalnya emissionData berisi objek dengan properti "value")
    const totalCO2 = emissionData && emissionData.length > 0
        ? emissionData.reduce((acc, cur) => acc + (cur.value || 0), 0).toFixed(2)
        : 0;

    // Jika ranking tidak tersedia dari API, kita bisa menetapkan placeholder
    const ranking = profile.ranking || "#1";

    return (
        <div className="space-y-6 p-4">
            {/* Bagian Profil */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center space-y-4 relative">
                {/* Edit Profile Button */}
                <button className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Edit Profile
                </button>
                {/* Foto Profil */}
                <img
                    src={profileImgUrl}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-green-500"
                />
                {/* Nama & Role */}
                <h1 className="text-3xl font-bold">{name}</h1>
                <p className="text-md text-gray-500">Joined Since:</p>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600">
                    LOGOUT
                </button>
            </div>

            {/* Empat Kotak Ringkasan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Ranking */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <h4 className="text-lg font-semibold mb-2">Ranking</h4>
                    <p className="text-3xl font-bold text-purple-500">{ranking}</p>
                </div>
                {/* Total CO₂ */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <h4 className="text-lg font-semibold mb-2">Total CO₂</h4>
                    <p className="text-3xl font-bold text-red-500">{totalCO2} kg</p>
                </div>
                {/* Total Poin */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <h4 className="text-lg font-semibold mb-2">Total Poin</h4>
                    <p className="text-3xl font-bold text-green-600">{point}</p>
                </div>
            </div>

            {console.log(achievements)}

            {/* Pencapaian */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Pencapaian</h2>
                {achievements && achievements.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                        {achievements.map((ach, index) => (
                            <li key={index}>
                                <strong>{ach.name}:</strong> {ach.description}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Tidak ada pencapaian.</p>
                )}
            </div>
        </div>
    );
}
