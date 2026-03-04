import "./UserComment.css"
import { ToggleButton } from "./ToggleButton"
import { useUser } from "../hooks/useUser";
import { useState } from "react";



function UserComment({ id, level, isReply, appendComment, insertReply, setComments, commentToReply, setCommentToReply }) {

    const { data, isLoading, error } = useUser();


    const [isCommentFocused, setIsCommentFocused] = useState(false);

    const [localValue, setLocalValue] = useState("");


    const generateUniqueId = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    };

    const submitComment = (isReply) => {

        if (!localValue.trim()) return;


        const newComment = {

            id: generateUniqueId(),
            user: data.snippet.title,
            imageColor: "hsl(199, 89%, 49%)",
            publishedAt: new Date().toISOString(),
            likes: 0,
            text: localValue,
            replies: []
        };


        if (isReply && commentToReply) {

            setComments(prev => insertReply(prev, commentToReply, newComment));
            setCommentToReply(null);

        } else {

            appendComment(newComment);

        };

        setLocalValue("");
        setIsCommentFocused(false);
    }


    if (isLoading) return <p>Loading main video...</p>;
    if (error) return <p>Error: {error.message}</p>;




    return <div id={id ? id : undefined} className={`user-comment-container ${isReply ? "m-left" : ""}`} style={isReply ? { paddingLeft: (level + 1) * 20 } : {}}>

        <img src={data.snippet.thumbnails.default.url} alt={`${data.snippet.title}'s profile picture`} className={`${isCommentFocused && !isReply ? "focused" : ""}`}></img>

        <form className="user-input-container" onSubmit={(e) => {
            e.preventDefault();
            submitComment(isReply);
        }}>


            <label htmlFor={`message-input-${id}`} className="sr-only">
                Enter comment
            </label>


            <input id={`message-input-${id}`} type="text" value={localValue} placeholder={"Add a comment..."} onFocus={() => setIsCommentFocused(true)}
                onChange={(event) => setLocalValue(event.target.value)} autoComplete="off" />


            <div className={`user-buttons-container ${isCommentFocused || isReply ? "display" : ""}`}>






                <div className="cancel-add-button-container">

                    <button type="button" className={"cancel-button"} onClick={() => { setIsCommentFocused(false); setLocalValue(""); setCommentToReply(false); }}>

                        <span>Cancel</span>

                    </button>

                    <button className={"add-comment-button"} type="submit">

                        <span>Add a comment</span>

                    </button>

                </div>

            </div>


        </form>

    </div>



}

export default UserComment