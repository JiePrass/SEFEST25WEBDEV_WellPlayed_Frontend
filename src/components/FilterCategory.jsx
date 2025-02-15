/* eslint-disable react/prop-types */
import { FaRecycle, FaSolarPanel, FaCar } from "react-icons/fa"; // Import icon

const categoryIcons = {
    "Daur Ulang": <FaRecycle />,
    "Energi Bersih": <FaSolarPanel />,
    "Transportasi": <FaCar />,
};

export default function FilterCategory({ categories, selectedCategory, setSelectedCategory }) {
    return (
        <div className="my-4 flex gap-2 overflow-x-auto scrollbar-hide">
            <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 shadow-md ${selectedCategory === "" ? "bg-green-500 text-white scale-105" : "bg-gray-200 hover:bg-green-300"
                    }`}
                onClick={() => setSelectedCategory("")}
            >
                Semua
            </button>

            {categories.map((category) => (
                <button
                    key={category}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 shadow-md ${selectedCategory === category
                        ? "bg-green-500 text-white scale-105"
                        : "bg-gray-200 hover:bg-green-300"
                        }`}
                    onClick={() => setSelectedCategory(category)}
                >
                    {categoryIcons[category]} {category}
                </button>
            ))}
        </div>
    );
}
