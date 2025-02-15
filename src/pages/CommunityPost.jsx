import { useState } from "react";
import Post from "../components/Post";
import CreatePostForm from "../components/Form/CreatePostForm";
import FilterCategory from "../components/FilterCategory"; // ✅ Import FilterCategory

export default function CommunityPage() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Cara Mengurangi Penggunaan Plastik Sehari-hari",
            content: "Kurangi plastik dengan membawa tas belanja sendiri dan gunakan botol minum reusable.",
            category: "Daur Ulang",
            likes: 5,
            comments: ["Bagus banget idenya!", "Saya sudah coba dan berhasil!"],
        },
        {
            id: 2,
            title: "Menghemat Listrik dengan Lampu LED",
            content: "Lampu LED lebih hemat energi dan tahan lama dibandingkan lampu biasa.",
            category: "Energi Bersih",
            likes: 8,
            comments: ["Setuju! Lampu LED juga lebih terang.", "Pakai di rumah jadi hemat listrik."],
        },
    ]);

    const [selectedCategory, setSelectedCategory] = useState("");

    const likePost = (postId) => {
        setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
    };

    const addComment = (postId, commentText) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, comments: [...post.comments, commentText] } : post
        ));
    };

    const reportPost = (postId) => {
        alert(`Post dengan ID ${postId} telah dilaporkan.`);
    };

    const addPost = (newPost) => {
        setPosts([{ ...newPost, id: posts.length + 1, likes: 0, comments: [] }, ...posts]);
    };

    // 🔍 Filter post berdasarkan kategori yang dipilih
    const filteredPosts = selectedCategory
        ? posts.filter(post => post.category === selectedCategory)
        : posts;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Community</h1>

            {/* 🔽 Form untuk membuat post baru */}
            <CreatePostForm addPost={addPost} />

            {/* 🔽 Filter kategori */}
            <FilterCategory
                categories={["Daur Ulang", "Energi Bersih", "Transportasi"]}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {/* 🔽 Daftar post yang telah difilter */}
            <div className="transition-opacity duration-300 opacity-100 mt-4 space-y-4">

                {filteredPosts.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center">Belum ada post dalam kategori ini.</p>
                ) : (
                    filteredPosts.map(post => (
                        <Post key={post.id} post={post} likePost={likePost} addComment={addComment} reportPost={reportPost} />
                    ))
                )}
            </div>
        </div>
    );
}
