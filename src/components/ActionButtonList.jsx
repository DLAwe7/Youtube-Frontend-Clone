
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

    const [isSubscribed, setIsSubscribed] = useState(false);

    const [reaction, setReaction] = useState(null);
    const [rawLikes, setRawLikes] = useState(() =>
        Number(data?.statistics?.likeCount ?? 0)
    );

    useEffect(() => {
        setRawLikes(Number(data?.statistics?.likeCount ?? 0));
        setReaction(null);
    }, [data?.id, data?.statistics?.likeCount]);

    const toggleReaction = (type) => {
        setRawLikes((prev) => {
            if (reaction === null) {
                if (type === "like") return prev + 1;
                if (type === "dislike") return prev - 1;
            }

            if (reaction === "like") {
                if (type === "like") return prev - 1;
                if (type === "dislike") return prev - 2;
            }

            if (reaction === "dislike") {
                if (type === "dislike") return prev + 1;
                if (type === "like") return prev + 2;
            }

            return prev;
        });

        setReaction((prev) => (prev === type ? null : type));

    };



    const displayedLikes = Math.max(0, rawLikes);




    return (

        <ul className={`channel-buttons ${mode ? mode : ""}`} role={isPopover ? "menu" : undefined} id={id}>

            {data && <li className={`like-dislike-button`} role={isPopover ? "none" : undefined} >

                <button role={isPopover ? "menuitem" : undefined} className={`description-like-button ${reaction === "like" ? "animated" : ""}`} onClick={() => toggleReaction("like")}
                    aria-label={`Like video. ${displayedLikes} likes`} aria-pressed={reaction === "like"}>
                    <FontAwesomeIcon icon={faThumbsUp} aria-hidden="true" />
                    <span>{formatCount(displayedLikes)}</span>
                </button>

                <button role={isPopover ? "menuitem" : undefined}
                    className={`description-dislike-button ${reaction === "dislike" ? "animated" : ""}`} onClick={() => toggleReaction("dislike")}
                    aria-label="Dislike video" aria-pressed={reaction === "dislike"}>

                    <FontAwesomeIcon icon={faThumbsDown} aria-hidden="true" />

                </button>

            </li>}

            <li className={`action-subscribe mobileVariant`} role={isPopover ? "none" : undefined} >


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