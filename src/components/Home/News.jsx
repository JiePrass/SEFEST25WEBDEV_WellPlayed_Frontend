/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewsCard({ className, link, title, description, fullText, bgImage }) {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            className={`relative bg-cover bg-center rounded-lg overflow-hidden transition duration-500 cursor-pointer ${className}`}
            style={{ backgroundImage: `url(${bgImage})` }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate(link)}
        >
            {/* Overlay */}
            <div
                className={`absolute inset-0 transition-all duration-500 ${hover ? "bg-opacity-80" : "bg-opacity-50"}`}
            ></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3
                    className={`transition-all duration-500 text-xl md:text-3xl font-bold ${hover ? "opacity-0" : "opacity-100"}`}
                >
                    {title}
                </h3>
                <p
                    className={`transition-all text-base md:text-xl duration-500 ${hover ? "opacity-0" : "opacity-100"}`}
                >
                    {description}
                </p>

                {/* Deskripsi panjang dengan efek naik */}
                <div
                    className={`absolute bottom-6 left-6 right-6 text-sm md:text-lg transition-all duration-500 ${hover ? "opacity-100 translate-y-[-10px]" : "opacity-0 translate-y-4"}`}
                >
                    {fullText}
                </div>
            </div>
        </div>
    );
}

export default function News() {
    return (
        <div className="py-10">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-10">
                Bahaya Emisi Karbon yang <br /> Berlebih untuk Dunia
            </h1>
            <div className="grid grid-cols-12 gap-6 h-[600px]">
                <NewsCard
                    className="col-span-7 h-full"
                    link="https://www.detik.com/edu/detikpedia/d-7772265/suhu-makin-meningkat-ilmuwan-bumi-sudah-terlalu-panas-untuk-ditinggali-lansia"
                    title="Suhu Makin Meningkat, Ilmuwan: Bumi Sudah Terlalu Panas untuk Ditinggali Lansias"
                    description="Suhu bumi meningkat drastis akibat emisi karbon yang tidak terkendali."
                    fullText="Dampak perubahan iklim semakin terlihat dengan meningkatnya suhu global, mencairnya es di kutub, serta cuaca ekstrem yang semakin sering terjadi. Fenomena ini tidak hanya mengancam ekosistem alami tetapi juga mempengaruhi kehidupan manusia, termasuk peningkatan frekuensi bencana alam seperti banjir, kekeringan, dan badai besar yang merugikan berbagai sektor kehidupan."
                    bgImage="https://akcdn.detik.net.id/community/media/visual/2023/04/25/ilustrasi-gelombang-panas_169.jpeg?w=700&q=90"
                />
                <div className="grid grid-rows-2 col-span-5 gap-6 h-full">
                    <NewsCard
                        link="https://news.detik.com/berita/d-6902495/ini-penyebab-polusi-udara-jakarta-yang-ancam-kesehatan-masyarakat"
                        title="Polusi Udara Jakarta Mengancam Kesehatan Warga"
                        description="Kualitas udara menurun drastis akibat gas rumah kaca dan emisi kendaraan."
                        fullText="Paparan polusi udara berlebih dapat menyebabkan gangguan pernapasan, penyakit jantung, serta menurunkan kualitas hidup manusia secara signifikan."
                        bgImage="https://akcdn.detik.net.id/community/media/visual/2023/08/21/potret-langit-jakarta-di-hari-pertama-wfh-50-asn-dki-6_169.jpeg?w=700&q=90"
                    />
                    <NewsCard
                        link="https://finance.detik.com/foto-bisnis/d-7604790/marak-pengunaan-solar-panel-untuk-tekan-emisi-karbon"
                        title="Marak Pengunaan Solar Panel untuk Tekan Emisi Karbon"
                        description="Emisi karbon yang menjadi salah satu penyebab pemanasan global. Penggunaan solar panel pun semakin marak untuk mengurangi emisi karbon."
                        fullText="Emisi karbon dalam bentuk CO2 yang merupakan produk sampingan dari pembangkit listrik konvensional di seluruh dunia, menjadi salah satu penyebab suhu rata-rata dunia meningkat dan menjadi penyebab terganggunya aspek lain dari iklim bumi."
                        bgImage="https://akcdn.detik.net.id/community/media/visual/2024/10/24/marak-pengunaan-solar-panel-untuk-tekan-emisi-karbon_169.jpeg?w=700&q=90"
                    />
                </div>
            </div>
        </div>
    );
}
