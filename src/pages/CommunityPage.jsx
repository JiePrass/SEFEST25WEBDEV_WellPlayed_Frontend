import { useState, useEffect } from "react";
import Post from "../components/Post";
import CreatePostForm from "../components/Form/CreatePostForm";
import api from "../../services/api";

export default function CommunityPage() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await api.get("/community");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Fungsi untuk toggle like
    const likePost = async (postId) => {
        // Optimistic update: tambahkan like ke community_likes array
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    // Buat objek like sementara
                    const newLike = {
                        id: Date.now(), // gunakan timestamp sebagai ID sementara
                        likeCount: 1,
                        user: {
                            id: parseInt(localStorage.getItem("user_id"), 10),
                            name: localStorage.getItem("username") || "User",
                            profile_picture: localStorage.getItem("profile_picture") || "",
                        },
                    };
                    return {
                        ...post,
                        community_likes: [...(post.community_likes || []), newLike],
                    };
                }
                return post;
            })
        );

        try {
            // Panggil API tanpa body (API hanya membutuhkan postId di URL)
            await api.post(`/community/${postId}/like`);
            // Jika perlu, Anda bisa re-fetch data untuk sinkronisasi, tapi sebaiknya tidak agar tidak menimpa update optimistik.
        } catch (error) {
            console.error("Error liking post:", error);
            // Rollback jika terjadi error
            setPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            community_likes: (post.community_likes || []).slice(0, -1),
                        };
                    }
                    return post;
                })
            );
        }
    };

    const addComment = async (postId, commentText) => {
        const user_id = parseInt(localStorage.getItem("user_id"), 10);
        const username = localStorage.getItem("username") || "User";
        const newComment = {
            id: `${Date.now()}-${Math.random()}`,
            user_id,
            post_id: postId,
            comment: commentText,
            commenter: {
                id: user_id,
                name: username,
            },
            replies: [],
        };

        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...(post.comments || []), newComment] }
                    : post
            )
        );

        try {
            await api.post(`/community/${postId}/comments`, {
                content: commentText,
            });
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const reportPost = async (postId) => {
        alert(`Post dengan ID ${postId} telah dilaporkan.`);
        try {
            await api.post(`/community/${postId}/report`);
        } catch (error) {
            console.error("Error reporting post:", error);
        }
    };

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
                            refreshPosts={fetchPosts}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
