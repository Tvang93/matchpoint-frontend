'use client'

import { useEffect, useState } from "react";
import { getCommentsByLocationId, postComment } from "@/utils/DataServices";
import { IComment } from "@/utils/Interfaces";

interface Props {
    courtId: number;
    userId: number;
    token: string;
}

export default function CommentsSection({ courtId, userId, token }: Props) {
    const [comments, setComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            const data = await getCommentsByLocationId(courtId);
            if (data) setComments(data);
            console.log(data);
        };
        fetchComments();
    }, [courtId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const result = await postComment(courtId, userId, newComment, token);
        if (result?.success) {
            const updated = await getCommentsByLocationId(courtId);
            if (updated) setComments(updated);
            setNewComment("");
        }
    };

    return (
        <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-bold mb-2">Comments</h3>

            <ul className="space-y-3 mb-4">
                {comments.length > 0 ? comments.map(comment => (
                    <li key={comment.id} className="border rounded-lg p-3 shadow-sm ">
                        <div className="font-semibold">{comment.username}</div>
                        <p>{comment.comment}</p>
                    </li>
                )) : (
                    <p>No comments yet. Be the first!</p>
                )}
            </ul>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border rounded p-2 w-full resize-none"
                    placeholder="Add your comment..."
                    rows={3}
                />
                <button type="submit" className="self-end bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                    Post
                </button>
            </form>
        </div>
    );
}