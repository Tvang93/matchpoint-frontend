'use client'

import { useEffect, useState } from "react";
import { getCommentsByLocationId, postComment } from "@/utils/DataServices";
import { IComment } from "@/utils/Interfaces";

interface Props {
    courtId: number;
    userId?: number | null;
    token?: string | null;
}

export default function CommentsSection({ courtId, userId, token }: Props) {
    const [allComments, setAllComments] = useState<IComment[]>([]);
    const [displayedComments, setDisplayedComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showMore, setShowMore] = useState(false);
    const commentsPerPage = 5;

    useEffect(() => {
        const fetchComments = async () => {
            const data = await getCommentsByLocationId(courtId);
            if (data) {
                setAllComments(data);
                setDisplayedComments(data.slice(0, commentsPerPage));
                setShowMore(data.length > commentsPerPage);
            }
        };
        fetchComments();
    }, [courtId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !userId || !token) return;

        const result = await postComment(courtId, userId, newComment, token);
        if (result?.success) {
            const updated = await getCommentsByLocationId(courtId);
            if (updated) {
                setAllComments(updated);
                setDisplayedComments(updated.slice(0, commentsPerPage));
                setShowMore(updated.length > commentsPerPage);
                setCurrentPage(1);
            }
            setNewComment("");
        }
    };

    const loadMoreComments = () => {
        const nextPage = currentPage + 1;
        // const startIndex = currentPage * commentsPerPage;
        const endIndex = nextPage * commentsPerPage;
        const newDisplayedComments = allComments.slice(0, endIndex);
        
        setDisplayedComments(newDisplayedComments);
        setCurrentPage(nextPage);
        setShowMore(endIndex < allComments.length);
    };

    return (
        <div className="bg-[#3C434E] rounded-lg p-6">
            <h2 className="text-xl font-bold text-[#E1FF00] mb-4">Comments</h2>

            <div className="space-y-4 mb-6">
                {displayedComments.length > 0 ? displayedComments.map(comment => (
                    <div key={comment.id} className="bg-[#243451] rounded-lg p-4 border border-gray-600">
                        <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                                {comment.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="font-semibold text-white">{comment.username}</div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{comment.comment}</p>
                    </div>
                )) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400">No comments yet. Be the first to share your experience!</p>
                    </div>
                )}
            </div>

            {showMore && (
                <div className="text-center mb-6">
                    <button 
                        onClick={loadMoreComments}
                        className="text-[#E1FF00] hover:text-yellow-300 font-medium transition-colors"
                    >
                        See More Reviews →
                    </button>
                </div>
            )}

            {userId && token ? (
                <div className="border-t border-gray-600 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Leave a Comment</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full bg-[#243451] border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-[#E1FF00] transition-colors"
                            placeholder="Share your experience at this court..."
                            rows={3}
                        />
                        <div className="flex justify-end">
                            <button 
                                type="submit" 
                                className="bg-[#E1FF00] text-black px-6 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
                                disabled={!newComment.trim()}
                            >
                                Post Comment
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="border-t border-gray-600 pt-6">
                    <p className="text-gray-400 text-center">Log in to share your experience at this court.</p>
                </div>
            )}
        </div>
    );
}