/* eslint-disable react/prop-types */
import { useState } from "react";
import { HeartIcon, ChatBubbleLeftIcon, FlagIcon } from "@heroicons/react/24/outline";

export default function Post({ post, likePost, addComment, reportPost }) {
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        addComment(post.id, commentText);
        setCommentText("");
    };

    return (
        <div className="bg-white p-3 md:p-4 rounded-md shadow-md space-y-2">
            <h3 className="text-sm md:text-lg font-semibold">{post.title}</h3>
            <p className="text-gray-600 text-xs md:text-sm">{post.content}</p>
            <span className="text-xs md:text-sm text-gray-500">Kategori: {post.category}</span>

            {/* Tombol Interaksi */}
            <div className="flex items-center justify-between mt-2 text-xs md:text-sm">
                <button
                    className="flex items-center text-gray-600 hover:text-red-500 transition"
                    onClick={() => likePost(post.id)}
                >
                    <HeartIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                    {post.likes} Suka
                </button>

                <button
                    className="flex items-center text-gray-600 hover:text-blue-500 transition"
                    onClick={() => setShowComments(!showComments)}
                >
                    <ChatBubbleLeftIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                    {post.comments.length} Komentar
                </button>

                <button
                    className="flex items-center text-gray-600 hover:text-red-500 transition"
                    onClick={() => reportPost(post.id)}
                >
                    <FlagIcon className="h-4 w-4 md:h-5 md:w-5 mr-1" />
                    Laporkan
                </button>
            </div>

            {/* Form & Komentar */}
            {showComments && (
                <div className="mt-2">
                    <form onSubmit={handleCommentSubmit} className="flex flex-col md:flex-row gap-2">
                        <input
                            type="text"
                            placeholder="Tulis komentar..."
                            className="flex-1 p-2 border rounded-md text-xs md:text-sm"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="px-3 py-2 bg-blue-500 text-white text-xs md:text-sm rounded-md hover:bg-blue-600 transition"
                        >
                            Kirim
                        </button>
                    </form>

                    <div className="mt-2 space-y-1">
                        {post.comments.map((comment, index) => (
                            <p key={index} className="text-gray-600 text-xs md:text-sm bg-gray-100 p-2 rounded-md">
                                {comment}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
