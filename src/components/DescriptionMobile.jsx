import { useState } from "react";
import { formatCount, timeAgo } from "../utils/formatters";
import Channel from "./Channel";
import ActionButtonList from "./ActionButtonList";
import ButtonsStorage from "./Buttons/ButtonsStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";




function DescriptionMobile({ channel, data, wrapperRef,
    menuRef, setIsBtnStorage, isBtnStorage, setIsDescriptionOpen, isDescriptionOpen, descriptionRef, isSubscribed, setIsSubscribed }) {



    const [isAnimating, setIsAnimating] = useState(false);

    const openDescription = () => {

        setIsAnimating(true);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsDescriptionOpen(true);
            });
        });

    };

    const closeDescription = () => {
        setIsDescriptionOpen(false);
        setTimeout(() => setIsAnimating(false), 300);
    };

    useLockBodyScroll(isDescriptionOpen);


    return (<div id="description-anchor" ref={wrapperRef}>



        <h2 className="description-header">{data.snippet.title}</h2>

        <div className="channel">

            <div className="channel-container">

                <Channel channel={channel} />

                <button className={`subscribe-button mobile ${isSubscribed ? "animated" : ""}`} aria-pressed={isSubscribed} onClick={() => setIsSubscribed(prev => !prev)}>

                    <span>Subscribe</span>

                </button>

            </div>

            <div className="btn-stor-wrapper" ref={menuRef}>

                <ActionButtonList channel={channel} data={data} mode="main"></ActionButtonList>


                <div className="button-storage-li">

                    <ButtonsStorage isBtnStorage={isBtnStorage} setIsBtnStorage={setIsBtnStorage} />

                </div>

            </div>




        </div>

        <div className="description-preview">

            <p>{data.snippet.description}</p>

            <button onClick={openDescription} aria-controls="mobile-description" aria-expanded={isDescriptionOpen}>...Show more</button>

        </div>


        {isAnimating && (

            <div id="mobile-description" className={`mobile-description-menu ${isDescriptionOpen ? "open" : ""}`} ref={descriptionRef}>

                <div className="mobile-description-btn-wrapper">

                    <button onClick={closeDescription} aria-controls="mobile-description" aria-expanded={isDescriptionOpen}>
                        <FontAwesomeIcon icon={faX} aria-hidden={"true"} />
                    </button>


                </div>

                <div className="description-info mobile">

                    <span>
                        {formatCount(data.statistics.viewCount, "views")}
                    </span>

                    <span>
                        {timeAgo(data.snippet.publishedAt)}
                    </span>

                </div>

                <div className={`description-block mobile`}>



                    <div>{data.snippet.description}</div>


                    <Channel channel={channel} />



                </div>





            </div>

        )}


        {isDescriptionOpen && (
            <div className="sidebar-overlay" aria-hidden="true">

            </div>
        )}



    </div>)
}


export default DescriptionMobile;