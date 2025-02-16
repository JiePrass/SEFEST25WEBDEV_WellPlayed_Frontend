import { Link } from 'react-router-dom'

export default function HeroSection() {
    return (
        <div
            className="relative bg-cover bg-center h-[400px] md:h-[500px] flex items-end p-6 md:p-10 rounded-lg"
            style={{ backgroundImage: "url('/assets/images/hero.jpg')" }}
        >
            <div className="text-center md:text-left text-white max-w-lg">
                <h1 className="text-lg md:text-4xl font-bold leading-tight">
                    Hitung Emisi & Hidup Lebih Ramah Lingkungan
                </h1>
                <p className="text-xs md:text-lg mt-2 md:mt-4">
                    Ketahui jejak karbonmu, ubah kebiasaan dengan seru, dan dapatkan hadiah lewat misi harian!
                </p>
                <Link
                    to="/login"
                    className="text-xs mt-4 md:mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 md:px-6 md:py-3 rounded-lg transition inline-block"
                >
                    Hitung Sekarang!
                </Link>
            </div>
        </div>
    )
}