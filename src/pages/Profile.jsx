/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import BarChart from "../components/Charts/BarChart";

export default function Profile({ handleLogout }) {
    // Data ringkasan profil (dummy) – ganti dengan data nyata dari API jika tersedia
    const [summary, setSummary] = useState({
        totalPoints: 1250,
        totalCO2: 1600,
        co2Saved: 350,
        ranking: 5,
        co2Goal: 500, // Target penghematan CO₂
    });

    // Data untuk Bar Chart – Pengurangan Emisi per bulan (dummy)
    const [chartData, setChartData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
        datasets: [
            {
                label: "Pengurangan Emisi (kg CO₂)",
                data: [12, 18, 15, 22, 30, 28, 35, 32, 40, 38, 42, 45],
                backgroundColor: "rgba(75,192,192,0.6)",
                fill: true,
            },
        ],
    });

    // Simulasikan fetch data dari API (ganti dengan fetch asli jika perlu)
    useEffect(() => {
        // Contoh pseudo-fetch
        // fetch('/api/profile')
        //   .then(res => res.json())
        //   .then(data => {
        //     setSummary({
        //       totalPoints: data.totalPoints,
        //       totalCO2: data.totalCO2,
        //       co2Saved: data.co2Saved,
        //       ranking: data.ranking,
        //       co2Goal: data.co2Goal,
        //     });
        //     setChartData({
        //       labels: data.chartLabels,
        //       datasets: [
        //         {
        //           label: "Pengurangan Emisi (kg CO₂)",
        //           data: data.emissionReductions,
        //           backgroundColor: "rgba(75,192,192,0.6)",
        //           fill: true,
        //         },
        //       ],
        //     });
        //   })
        //   .catch(err => console.error(err));
    }, []);

    // Hitung persentase pencapaian target penghematan CO₂
    const goalPercentage = Math.min((summary.co2Saved / summary.co2Goal) * 100, 100);

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
                    src="https://placehold.co/400x400"
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-green-500"
                />
                {/* Nama & Rank */}
                <h1 className="text-3xl font-bold">Qodar Arrizqie</h1>
                <p className="text-md text-gray-500">Algo Mobile Legend | Area Rank 75 Top Local</p>
                <button onClick={handleLogout} className="bg-red-500 p-10">LOGOUT LE</button>
            </div>

            {/* Empat Kotak Ringkasan */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Total Poin */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <h4 className="text-lg font-semibold mb-2">Total Poin</h4>
                    <p className="text-3xl font-bold text-green-600">{summary.totalPoints}</p>
                </div>
                {/* Total CO₂ */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <h4 className="text-lg font-semibold mb-2">Total CO₂</h4>
                    <p className="text-3xl font-bold text-red-500">{summary.totalCO2} kg</p>
                </div>
                {/* CO₂ Dihemat */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <h4 className="text-lg font-semibold mb-2">CO₂ Dihemat</h4>
                    <p className="text-3xl font-bold text-blue-500">{summary.co2Saved} kg</p>
                </div>
                {/* Ranking */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <h4 className="text-lg font-semibold mb-2">Ranking</h4>
                    <p className="text-3xl font-bold text-purple-500">#{summary.ranking}</p>
                </div>
            </div>

            {/* Goal Progress Indicator */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Target Penghematan CO₂</h2>
                <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                        className="bg-blue-500 h-6 rounded-full text-center text-white"
                        style={{ width: `${goalPercentage}%` }}
                    >
                        <span className="text-sm font-semibold">{goalPercentage.toFixed(0)}%</span>
                    </div>
                </div>
                <p className="mt-2 text-gray-600">
                    Target: {summary.co2Goal} kg CO₂ | Dihemat: {summary.co2Saved} kg CO₂
                </p>
            </div>

            {/* Pencapaian */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Pencapaian</h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li><strong>Eco Warrior:</strong> Menyelesaikan 50 aktivitas ramah lingkungan.</li>
                    <li><strong>Carbon Crusher:</strong> Mengurangi emisi CO₂ sebanyak {summary.co2Saved} kg tahun ini.</li>
                    <li><strong>Green Streak:</strong> Aktivitas harian selama 30 hari berturut-turut.</li>
                    <li><strong>Community Leader:</strong> Berkontribusi di 10 event komunitas hijau.</li>
                </ul>
            </div>

            {/* Bar Chart - Pengurangan Emisi */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Pengurangan Emisi Tahun Ini</h2>
                <BarChart data={chartData} className="h-80" />
            </div>
        </div>
    );
}
