import "./CommentCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ToggleButton } from "./ToggleButton";
import { formatCount } from "../utils/formatters";
import CommentTemplate from "../components/CommentTemplate";
import { useState } from "react";
import UserComment from "./UserComment";


function CommentCard({ commentsData, setCommentToReply, commentToReply, appendComment, insertReply, setComments, currentValue, setCurrentValue }) {


    const [openReplies, setOpenReplies] = useState({});
    const [reactions, setReactions] = useState({});


    const getReactionState = (id, baseLikes) => {
        return reactions[id] ?? {
            likes: baseLikes,
            liked: false,
            disliked: false,
        };
    };

    const toggleLike = (commentId, currentLikes, isLiked, isDisliked) => {

        let newLikes = currentLikes;
        let nextLiked = false;

        if (isLiked) {
            newLikes -= 1;
        } else if (isDisliked) {
            newLikes += 2;
            nextLiked = true;
        } else {
            newLikes += 1;
            nextLiked = true;
        }

        setReactions(prev => ({
            ...prev,
            [commentId]: {
                likes: newLikes,
                liked: nextLiked,
                disliked: false,
            }
        }));
    };

    const toggleDislike = (commentId, currentLikes, isLiked, isDisliked) => {
        let newLikes = currentLikes;
        let nextDisliked = false;

        if (isDisliked) {
            if (newLikes !== 0) newLikes += 1;

        } else if (isLiked) {
            newLikes -= 2;
            nextDisliked = true;
        } else {
            newLikes -= 1;
            nextDisliked = true;
        }

        newLikes = Math.max(0, newLikes);

        setReactions(prev => ({
            ...prev,
            [commentId]: {
                likes: newLikes,
                liked: false,
                disliked: nextDisliked,
            }
        }));
    };

    const toggleReplies = (commentId) => {
        setOpenReplies(prev => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };


    const renderComment = (comment, level = 0) => {
        const replyId = `reply-${comment.id}-${level}`;
        const isCommentOpen = !!openReplies[comment.id];
        const reaction = getReactionState(comment.id, comment.likes);

        return (
            <div
                key={comment.id}
                className={`box-comment-wrapper ${level > 0 ? "has-thread" : ""}`}
            >

                {level > 0 && <div className="thread-hook" style={{ marginLeft: (level - 1) * 20 }} />}

                <CommentTemplate
                    className={level > 0 ? "scaled-comment-box" : ""}
                    id={comment.id}
                    imageColor={comment.imageColor}
                    userName={comment.user}
                    publishedAt={comment.publishedAt}
                    text={comment.text}
                    likes={reaction.likes}
                    isLiked={reaction.liked}
                    isDisliked={reaction.disliked}
                    likeToggle={() =>
                        toggleLike(comment.id, reaction.likes, reaction.liked, reaction.disliked)
                    }
                    dislikeToggle={() =>
                        toggleDislike(comment.id, reaction.likes, reaction.liked, reaction.disliked)
                    }
                    setCommentToReply={setCommentToReply}
                    level={level}
                />

                {commentToReply === comment.id && (
                    <UserComment
                        id={replyId}
                        level={level}
                        isReply={true}
                        appendComment={appendComment}
                        insertReply={insertReply}
                        setComments={setComments}
                        commentToReply={commentToReply}
                        setCommentToReply={setCommentToReply}
                        currentValue={currentValue}
                        setCurrentValue={setCurrentValue}
                    />
                )}

                {comment.replies?.length > 0 && (
                    <div>
                        {!isCommentOpen && (

                            <ToggleButton

                                className="show-replies-toggle"
                                isOpen={isCommentOpen}
                                toggle={() => toggleReplies(comment.id)}
                                controlsId={replyId}
                                aria-label={`${comment.replies.length} replies. Show replies.`}
                                level={level}
                            >
                                <FontAwesomeIcon icon={faChevronDown} aria-hidden="true" />
                                <span>
                                    {comment.replies.length === 1
                                        ? "1 reply"
                                        : formatCount(comment.replies.length, "replies")}
                                </span>

                            </ToggleButton>
                        )}

                        {isCommentOpen &&
                            comment.replies.map(reply =>
                                renderComment(reply, level + 1)
                            )}

                        {isCommentOpen && (
                            <ToggleButton
                                className="show-replies-toggle open"
                                isOpen={isCommentOpen}
                                toggle={() => toggleReplies(comment.id)}
                                controlsId={replyId}
                                aria-label={`${comment.replies.length} replies. Hide replies.`}
                                level={level + 1}
                            >
                                <FontAwesomeIcon icon={faChevronUp} aria-hidden="true" />
                                <span>
                                    {comment.replies.length === 1
                                        ? "Hide reply"
                                        : "Hide replies"}
                                </span>
                            </ToggleButton>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return <>{commentsData.map(comment => renderComment(comment))}</>;
}

export default CommentCard;
