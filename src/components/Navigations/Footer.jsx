import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-slate-200 text-black rounded-xl mb-8">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Bagian atas footer */}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Judul / Tagline */}
                    <div className="text-2xl md:text-3xl font-bold leading-tight">
                        Pesona Alam
                        <br />
                        Warisan Nusantara
                    </div>

                    {/* Informasi Lokasi dan Tahun */}
                    <div className="mt-4 md:mt-0 text-right space-y-1 text-sm md:text-base">
                        <div>Bogor, Indonesia</div>
                        <div>WellPlayed</div>
                        <div>2024-2025</div>
                    </div>
                </div>

                {/* Garis pemisah */}
                <hr className="border-black my-6" />

                {/* Bagian bawah footer */}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Logo & Brand (Bisa diarahkan ke halaman utama) */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="font-semibold">Carbon Tracker</span>
                    </Link>

                    {/* Menu Navigasi */}
                    <nav className="flex items-center space-x-4 mt-4 md:mt-0 text-sm md:text-base">
                        <Link to="/" className="hover:underline">
                            Beranda
                        </Link>
                        <Link to="/calculator" className="hover:underline">
                            Kalkulator
                        </Link>
                        <Link to="/dashboard" className="hover:underline">
                            Dasbor
                        </Link>
                        <Link to="/leaderboard" className="hover:underline">
                            Papan Peringkat
                        </Link>
                    </nav>

                    {/* Hak Cipta */}
                    <div className="mt-4 md:mt-0 text-sm">
                        © 2025 NusanTours
                    </div>
                </div>
            </div>
        </footer>
    );
}
