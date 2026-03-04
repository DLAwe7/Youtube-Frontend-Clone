import UserComment from "./UserComment"
import CommentCard from "./CommentCard"
import { useEffect, useMemo, useState } from "react";
import { videosToFetch } from "../data/videosData";
import { useParams } from "react-router-dom";
import { useComments } from "../utils/useVideos";



const normalizeComments = (comments = []) => {
    return comments.map(comment => ({
        ...comment,
        replies: normalizeComments(comment.replies ?? []),
    }));
};



function Comments({ data }) {

    const { videoId } = useParams();

    const [comments, setComments] = useState([]);
    const [commentToReply, setCommentToReply] = useState(null);
    const [currentValue, setCurrentValue] = useState("");

    const { data: commentsToDisplay, isLoading, error } = useComments();

    const currentVideo = videosToFetch.find(v => v.videoId === videoId);
    const category = currentVideo?.category;


    const memoComments = useMemo(() => {
        if (!commentsToDisplay) return [];

        const resolvedCategory = category ?? "catVideos";

        const categoryBlock = commentsToDisplay.find(
            block => block[resolvedCategory]
        );

        if (!categoryBlock || !categoryBlock[resolvedCategory]?.length) {
            return [];
        }

        const commentsArray = categoryBlock[resolvedCategory];
        const randomIndex = Math.floor(Math.random() * commentsArray.length);

        return commentsArray[randomIndex]?.comments || [];
    }, [commentsToDisplay, category]);

    useEffect(() => {
        setComments(normalizeComments(memoComments));
    }, [memoComments]);


    const appendComment = (comment) => {

        setComments(prev => [comment, ...prev]);

    }


    function insertReply(tree, parentId, newComment) {
        return tree.map(comment => {
            const replies = Array.isArray(comment.replies) ? comment.replies : [];

            if (comment.id === parentId) {
                return {
                    ...comment,
                    replies: [newComment, ...replies],
                };
            }

            if (replies.length > 0) {
                return {
                    ...comment,
                    replies: insertReply(replies, parentId, newComment),
                };
            }

            return {
                ...comment,
                replies,
            };
        });
    }


    if (isLoading) return <p>Loading comments...</p>;
    if (error) return <p>Error loading comments.</p>;
    if (!commentsToDisplay) return <p>Fetching comments...</p>;


    return <>

        <div className="comments-card-container">

            <div className="comments-filter-wrapper">

                <span>{data.statistics.commentCount} comments</span>

            </div>

            <UserComment setComments={setComments} insertReply={insertReply}
                appendComment={appendComment} setCommentToReply={setCommentToReply} commentToReply={commentToReply}
                setCurrentValue={setCurrentValue} currentValue={currentValue} />

            <CommentCard commentToReply={commentToReply} commentsData={comments} setComments={setComments}
                appendComment={appendComment} setCommentToReply={setCommentToReply} insertReply={insertReply}
                setCurrentValue={setCurrentValue} currentValue={currentValue} />


        </div>


    </>





}

export default Comments