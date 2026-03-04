import MoreOptionsButton from "./Buttons/MoreOptionsButton"
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ListVideoCard({ thumbnail, videoTitle, channelName, views, publishDate, videoId, context, layout }) {



    const variantClasses = `${context ? context : ""} ${layout ? layout : ""}`.trim();

    return (


        <li className={`list-video-card ${variantClasses}`} onClick={() => window.location.href = `/watch/${videoId}`} role="link" tabIndex={0} onKeyDown={(e) => {
            if (e.key === "Enter") window.location.href = `/watch/${videoId}`;
        }} >

            <div className={`li-vid-btn-navigation  ${variantClasses}`}>

                <div className={`vi-cards-wrapper  ${variantClasses}`}>

                    <div className={`thumbnail-wrapper  ${variantClasses}`}>
                        <img src={thumbnail} alt={videoTitle} />
                    </div>

                    <div className={`list-video-info  ${variantClasses}`}>

                        <div className="title-wrapper">

                            <span className={`video-title  ${variantClasses}`}>{videoTitle}</span>

                            {(context !== "secondarySection" && (layout || context)) && <MoreOptionsButton context={context} stopPropagation={true} layout={layout} />}

                        </div>



                        <span className={`video-channel-name  ${variantClasses}`}>{channelName}</span>

                        <div className={`list-video-views ${variantClasses}`} >

                            <span>{views}</span>
                            <span className={`list-video-date  ${variantClasses}`}> <FontAwesomeIcon icon={faCircle} />{publishDate}</span >

                        </div >


                    </div >




                </div >

            </div>


            {context === "secondarySection" && <MoreOptionsButton variant={"big-screen"} context={context} />}





        </li >
    );
}

export default ListVideoCard

