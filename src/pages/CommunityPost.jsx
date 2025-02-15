import { useState, useEffect } from "react";
import Post from "../components/Post";
import CreatePostForm from "../components/Form/CreatePostForm";
import api from "../../services/api"; // Import instance Axios yang sudah dikonfigurasi

export default function CommunityPage() {
    const [posts, setPosts] = useState([]);

    // Fungsi untuk mengambil data post dari API
    const fetchPosts = async () => {
        try {
            const response = await api.get("/community"); // Pastikan endpoint ini benar
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Fungsi untuk menyukai post
    const likePost = async (postId) => {
        // Optimistic update: perbarui state terlebih dahulu
        setPosts(
            posts.map((post) =>
                post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
            )
        );
        try {
            await api.post(`/community/${postId}/like`);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    // Fungsi untuk menambahkan komentar
    const addComment = async (postId, commentText) => {
        const user_id = parseInt(localStorage.getItem("user_id"), 10);
        // Optimistic update
        setPosts(
            posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [
                            ...(post.comments || []),
                            {
                                id: `${Date.now()}-${Math.random()}`, // key unik sementara
                                user_id,
                                post_id: postId,
                                comment: commentText, // gunakan "comment" untuk render
                                commenter: {
                                    id: user_id,
                                    name: localStorage.getItem("username") || "User",
                                },
                                replies: [],
                            },
                        ],
                    };
                }
                return post;
            })
        );
        try {
            await api.post(`/community/${postId}/comments`, {
                content: commentText, // API mengharapkan "content"
            });
            fetchPosts();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // Fungsi untuk melaporkan post
    const reportPost = async (postId) => {
        alert(`Post dengan ID ${postId} telah dilaporkan.`);
        try {
            await api.post(`/community/${postId}/report`);
        } catch (error) {
            console.error("Error reporting post:", error);
        }
    };

    // Fungsi untuk menambahkan post baru
    const addPost = async (newPost) => {
        try {
            await api.post("/community", newPost);
            fetchPosts();
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Community</h1>
            <CreatePostForm addPost={addPost} />
            <div className="transition-opacity duration-300 opacity-100 mt-4 space-y-4">
                {posts.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center">Belum ada post.</p>
                ) : (
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                            likePost={likePost}
                            addComment={addComment}
                            reportPost={reportPost}
                            refreshPosts={fetchPosts} // pastikan refreshPosts dikirim sebagai prop
                        />
                    ))
                )}
            </div>
        </div>
    );
}
