/* eslint-disable react/prop-types */
import { useState } from "react";

export default function CreatePostForm({ addPost }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const categories = ["Energi Bersih", "Daur Ulang", "Transportasi", "Konsumsi Berkelanjutan"];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content || !category) {
            alert("Semua field harus diisi!");
            return;
        }

        const newPost = {
            id: Date.now(),
            title,
            content,
            category,
            likes: 0,
            comments: [],
        };

        addPost(newPost);
        setTitle("");
        setContent("");
        setCategory("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md space-y-4">
            <h2 className="text-lg font-semibold">Buat Post Baru</h2>

            <input
                type="text"
                placeholder="Judul Post"
                className="w-full p-2 border rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Tulis konten post di sini..."
                className="w-full p-2 border rounded-md"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <select
                className="w-full p-2 border rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
                Posting
            </button>
        </form>
    );
}
