
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDownload, faScissors, faBookmark, faFlag, faThumbsUp,
    faThumbsDown, faShare
} from '@fortawesome/free-solid-svg-icons';
import { formatCount } from '../utils/formatters';
import { useEffect, useState } from 'react';
import { useToast } from '../contexts/ToastContext';



function ActionButtonList({ id, mode, data, isPopover }) {

    const { toastId, showToast } = useToast();

    const [reaction, setReaction] = useState(null);
    const [likes, setLikes] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(null);

    useEffect(() => {
        if (data?.statistics?.likeCount && likes === null) {
            setLikes(Number(data.statistics.likeCount));
        }
    }, [data, likes]);

    const toggleReaction = (type) => {
        setReaction(prevReaction => {
            setLikes(prevLikes => {
                let delta = 0;

                if (prevReaction === null) {
                    delta = type === "like" ? 1 : -1;
                } else if (prevReaction === type) {
                    delta = type === "like" ? -1 : 1;
                } else {
                    delta = type === "like" ? 2 : -2;
                }

                return Math.max(0, prevLikes + delta);
            });

            return prevReaction === type ? null : type;
        });
    };




    return (

        <ul className={`channel-buttons ${mode ? mode : ""}`} role={isPopover ? "menu" : undefined} id={id}>

            {data && <li className={`like-dislike-button`} role={isPopover ? "none" : undefined} >

                <button role={isPopover ? "menuitem" : undefined} className={`description-like-button ${reaction === "like" ? "animated" : ""}`} onClick={() => toggleReaction("like")}
                    aria-label={`like button. amount of likes: ${likes}`} aria-pressed={reaction === "like"}>
                    <FontAwesomeIcon icon={faThumbsUp} aria-hidden="true" />
                    <span>{formatCount(likes)}</span>
                </button>

                <button role={isPopover ? "menuitem" : undefined}
                    className={`description-dislike-button ${reaction === "dislike" ? "animated" : ""}`} onClick={() => toggleReaction("dislike")}
                    aria-label="dislike button" aria-pressed={reaction === "dislike"}>

                    <FontAwesomeIcon icon={faThumbsDown} aria-hidden="true" />

                </button>

            </li>}

            <li className={`action-subscribe mquery`} role={isPopover ? "none" : undefined} >


                <button role={isPopover ? "menuitem" : undefined} className={`subscribe-button ${mode ? mode : ""} ${isSubscribed ? "animated" : ""}`} aria-pressed={isSubscribed} onClick={() => setIsSubscribed(prev => !prev)}>

                    <span>Subscribe</span>

                </button>


            </li>


            <li className={`action-share ${mode ? mode : ""}`} role={isPopover ? "none" : undefined}>
                <button role={isPopover ? "menuitem" : undefined} className="description-button-wrapper" onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                    <FontAwesomeIcon icon={faShare} aria-hidden="true" />
                    <span>Share</span>

                </button>
            </li>

            <li className={`action-download ${mode ? mode : ""}`} role={isPopover ? "none" : undefined}>
                <button role={isPopover ? "menuitem" : undefined} className="description-button-wrapper" onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                    <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                    <span>Download</span>

                </button>
            </li >

            <li className={`action-clip ${mode ? mode : ""}`} role={isPopover ? "none" : undefined}>
                <button role={isPopover ? "menuitem" : undefined} className="description-button-wrapper" onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                    <FontAwesomeIcon icon={faScissors} aria-hidden="true" />
                    <span>Clip</span>

                </button>
            </li>

            <li className={`action-save ${mode ? mode : ""}`} role={isPopover ? "none" : undefined}>
                <button role={isPopover ? "menuitem" : undefined} className="description-button-wrapper" onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                    <FontAwesomeIcon icon={faBookmark} aria-hidden="true" />
                    <span>Save</span>

                </button>
            </li>

            <li className={`action-report ${mode ? mode : ""}`} role={isPopover ? "none" : undefined}>
                <button role={isPopover ? "menuitem" : undefined} className="description-button-wrapper" onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                    <FontAwesomeIcon icon={faFlag} aria-hidden="true" />
                    <span>Report</span>

                </button>
            </li>



        </ul >


    );




}

export default ActionButtonList;