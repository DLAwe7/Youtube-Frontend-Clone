import { useRef } from "react";
import { formatCount, timeAgo } from "../utils/formatters";
import Channel from "./Channel";
import { ToggleButton } from "./ToggleButton";
import ActionButtonList from "./ActionButtonList";
import ButtonsStorage from "./Buttons/ButtonsStorage";






function DescriptionDesktop({

    isOpen,
    isExpandable,
    isBtnStorage,
    isSubscribed,
    setIsOpen,
    setIsBtnStorage,
    setIsSubscribed,
    toggleDescription,
    wrapperRef,
    contentRef,
    menuRef,
    data,
    channel,
}) {


    const descriptionRef = useRef(null);

    return (<div id="description-anchor" ref={wrapperRef}>



        <h2 className="description-header">{data.snippet.title}</h2>

        <div className="channel">

            <div className="channel-container">

                <Channel channel={channel} />

                <button className={`subscribe-button desktop ${isSubscribed ? "animated" : ""}`} aria-pressed={isSubscribed} onClick={() => setIsSubscribed(prev => !prev)}>

                    <span>Subscribe</span>

                </button>

            </div>

            <div className="btn-stor-wrapper" ref={menuRef}>

                <ActionButtonList data={data} mode="main"></ActionButtonList>


                <div className="button-storage-li">

                    <ButtonsStorage isBtnStorage={isBtnStorage} setIsBtnStorage={setIsBtnStorage} />

                </div>




            </div>


        </div>

        <div ref={descriptionRef} className={`description ${isOpen ? "" : "closed"}`}

            role="button"
            tabIndex={isOpen ? -1 : 0}
            aria-expanded={isOpen}
            aria-controls="video-description"
            onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !isOpen) setIsOpen(true);
            }}
            onClick={(e) => {

                if (!isExpandable) return;
                e.stopPropagation();
                setIsOpen(true);


            }} id="video-description">

            <div className="description-info">

                <span>
                    {formatCount(data.statistics.viewCount, "views")}
                </span>

                <span>
                    {timeAgo(data.snippet.publishedAt)}
                </span>

            </div>





            <div className={`description-block`} ref={contentRef}>



                <div>{data.snippet.description}</div>


                <Channel channel={channel} tabIndex={isOpen ? 0 : -1} />



            </div>

            {isExpandable && <span className={`show-more-span ${isOpen ? "" : "open"}`}>...Show more</span>}

            {isOpen && isExpandable &&

                (

                    <ToggleButton className={"show-less-button"} isOpen={isOpen} toggle={toggleDescription} controlsId={"video-description"}>

                        <span>Show less</span>

                    </ToggleButton>
                )}

        </div>

    </div>
    );


}


export default DescriptionDesktop;