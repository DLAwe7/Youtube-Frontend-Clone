import { timeAgo } from "../utils/formatters"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { ToggleButton } from "./ToggleButton";
import { useToast } from "../contexts/ToastContext";





function CommentTemplate({ level, id, className, imageColor, userName, publishedAt, text,
    likes, isLiked, isDisliked, likeToggle, dislikeToggle, setCommentToReply }) {

    const { showToast, toastId } = useToast();



    return (

        <div className={`box-comment ${className ? className : ""}`} style={level > 0 ? { paddingLeft: (level + 1) * 20 } : {}}>

            <div className="comment-info-container">

                <div className={` avatar ${className ? "scaledAvatar" : ""}`} style={{ backgroundColor: imageColor ? imageColor : "" }}>{userName[0]}</div>

                <div className="comment-content">

                    <div className="comment-date-name">

                        <span className="comment-name">@{userName}</span>
                        <span className="comment-date">{timeAgo(publishedAt)}</span>

                    </div>

                    <div className="comment-paragraph-container">

                        <p className="comment-paragraph">{text}</p>

                    </div>

                    <div className="comment-buttons-container">

                        <div className='comment-like-button-wrapper'>

                            <button className={`comment-like-button `} onClick={() => likeToggle()} aria-label="like Button" aria-pressed={"like"}>

                                <FontAwesomeIcon className={`${isLiked ? "active-icon" : ""}`} icon={faThumbsUp} aria-hidden="true" />

                            </button>

                            <span>{likes}</span>


                        </div>


                        <div className='comment-dislike-button-wrapper'>

                            <button className={`comment-dislike-button`} onClick={() => dislikeToggle()} aria-label="dislike Button" aria-pressed={"dislike"}>

                                <FontAwesomeIcon className={`${isDisliked ? "active-icon" : ""}`} icon={faThumbsDown} aria-hidden="true" />

                            </button>

                        </div>

                        <div className='reply-button-container'>

                            <button className={`reply-button`} onClick={() => { setCommentToReply(id); }} aria-controls={toastId} aria-label="reply Button">

                                <span>Reply</span>

                            </button>



                        </div>


                    </div>


                </div>

                <div className="report-button-wrapper">

                    <button className={`report-button`} onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId} aria-label="report Button">

                        <FontAwesomeIcon icon={faEllipsisVertical} aria-hidden="true" />

                    </button>

                </div>

            </div>


        </div>
    )

}

export default CommentTemplate