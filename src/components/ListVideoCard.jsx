import MoreOptionsButton from "./Buttons/MoreOptionsButton"
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { formatCount, timeAgo } from "../utils/formatters";


function ListVideoCard({ video, variantClasses = "", showMoreButton = false, menuPosition = "inside", isMenuOpen, onToggleMenu, onCloseMenu, menuId }) {




    if (!video || !video.snippet) return null;




    const thumbnail =
        video?.snippet?.thumbnails?.medium?.url ??
        video?.snippet?.thumbnails?.high?.url ??
        video?.snippet?.thumbnails?.default?.url;
    const videoTitle = video.snippet.title;
    const channelName = video.snippet.channelTitle;
    const views = formatCount(video.statistics.viewCount, "views");
    const publishDate = timeAgo(video.snippet.publishedAt);
    const videoId = video.id;

    return (

        <li className={`list-video-card ${variantClasses}`}>

            <Link to={`/watch/${videoId}`} className="list-video-card-link">

                <div className={`li-vid-btn-navigation  ${variantClasses}`}>

                    <div className={`vi-cards-wrapper  ${variantClasses}`}>

                        <div className={`thumbnail-wrapper  ${variantClasses}`}>
                            <img src={thumbnail} alt={videoTitle} />
                        </div>

                        <div className={`list-video-info  ${variantClasses}`}>

                            <div className="title-wrapper">

                                <span className={`video-title  ${variantClasses}`}>{videoTitle}</span>

                                {showMoreButton && menuPosition === "inside" && <MoreOptionsButton menuId={menuId} onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} onCloseMenu={onCloseMenu} variantClasses={variantClasses} />}

                            </div>



                            <span className={`video-channel-name  ${variantClasses}`}>{channelName}</span>

                            <div className={`list-video-views ${variantClasses}`} >

                                <span>{views}</span>
                                <span className={`list-video-date  ${variantClasses}`}> <FontAwesomeIcon icon={faCircle} />{publishDate}</span >

                            </div >


                        </div >




                    </div >

                </div>



            </Link>


            {showMoreButton && menuPosition === "outside" && <MoreOptionsButton menuId={menuId} onToggleMenu={onToggleMenu} isMenuOpen={isMenuOpen} onCloseMenu={onCloseMenu} variant={"big-screen"} variantClasses={variantClasses} />}

        </li >
    );
}

export default ListVideoCard

