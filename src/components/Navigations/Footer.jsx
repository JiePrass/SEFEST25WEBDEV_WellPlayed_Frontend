import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mb-8 rounded-2xl">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Bagian atas footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Branding dan Tagline */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-3xl font-bold">Carbon Tracker</h2>
                        <p className="text-gray-400 mt-2">
                            Tracking your carbon footprint for a greener future.
                        </p>
                    </div>
                    {/* Navigasi */}
                    <nav className="flex flex-wrap gap-4">
                        <Link to="/" className="hover:text-green-400 transition-colors">
                            Beranda
                        </Link>
                        <Link to="/calculator" className="hover:text-green-400 transition-colors">
                            Kalkulator
                        </Link>
                        <Link to="/dashboard" className="hover:text-green-400 transition-colors">
                            Dasbor
                        </Link>
                        <Link to="/leaderboard" className="hover:text-green-400 transition-colors">
                            Papan Peringkat
                        </Link>
                    </nav>
                </div>

                {/* Garis Pemisah */}
                <hr className="border-gray-800 my-6" />

                {/* Bagian bawah footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-500 text-center md:text-left">
                        <p>Bogor, Indonesia</p>
                        <p>WellPlayed</p>
                        <p>2024-2025</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-sm text-gray-500">
                        © 2025 Carbon Tracker. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
