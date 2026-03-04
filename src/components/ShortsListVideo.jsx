import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListVideoCard from "../components/ListVideoCard"
import { formatCount, timeAgo } from "../utils/formatters";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { ToggleButton } from "./ToggleButton";
import "./ListVideo.css"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";


function ShortsListVideo({ videos, mquery, context, layout }) {

    const [swiperInstance, setSwiperInstance] = useState(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const updateButtons = (swiper = swiperInstance) => {
        if (!swiper) return;
        setCanScrollPrev(!swiper.isBeginning);
        setCanScrollNext(!swiper.isEnd);
    };

    const scrollNext = () => {
        if (!swiperInstance) return;

        const slidesToMove = window.innerWidth < 600 ? 1 : 3;

        const nextIndex = Math.min(
            swiperInstance.activeIndex + slidesToMove,
            swiperInstance.slides.length - 1
        );

        swiperInstance.slideTo(nextIndex);
    };

    const scrollPrev = () => {
        if (!swiperInstance) return;

        const slidesToMove = window.innerWidth < 600 ? 1 : 3;

        const prevIndex = Math.max(
            swiperInstance.activeIndex - slidesToMove,
            0
        );

        swiperInstance.slideTo(prevIndex);
    };


    return (

        <div className="li-vid-wrapper">

            <Swiper className={`list-video ${mquery ? mquery : ""} ${layout ? layout : ""} ${context ? context : ""}`} slidesPerView="auto"
                freeMode={{
                    enabled: true,
                    momentum: false
                }}
                spaceBetween={16}
                onSwiper={(swiper) => {
                    setSwiperInstance(swiper);
                    updateButtons(swiper);
                }}
                onSlideChange={(swiper) => updateButtons(swiper)}
                onSetTranslate={(swiper) => updateButtons(swiper)}
                onReachBeginning={(swiper) => updateButtons(swiper)}
                onReachEnd={(swiper) => updateButtons(swiper)}>

                {videos.map((video) => (

                    <SwiperSlide key={video.id} className={`list-video-card ${context ?? ""} ${layout ?? ""}`} style={{ width: "max-content" }}>

                        <ListVideoCard

                            thumbnail={video.snippet.thumbnails.medium.url}
                            videoTitle={video.snippet.title}
                            channelName={video.snippet.channelTitle}
                            views={formatCount(video.statistics.viewCount, "views")}
                            publishDate={timeAgo(video.snippet.publishedAt)}
                            videoId={video.id}
                            context={context}
                            layout={layout}
                        >



                        </ListVideoCard>

                    </SwiperSlide>


                ))}

            </Swiper>

            <div className="directional-arrows-container">

                <div className="directional-arrows-wrapper">

                    {canScrollPrev && <button
                        className={`directional-button ${!canScrollPrev ? "disabled" : ""} shorts left-arrow`}
                        onClick={() => scrollPrev()}
                        aria-label="directional-arrow-left"
                        aria-hidden={!canScrollPrev}
                        aria-pressed={"left directional arrow"}

                    >

                        <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />

                    </button>}

                </div>

                <div className="directional-arrows-wrapper">

                    {canScrollNext && <button
                        className={`directional-button ${!canScrollNext ? "disabled" : ""} shorts right-arrow`}
                        onClick={() => scrollNext()}
                        aria-label="directional-arrow-right"
                        aria-hidden={!canScrollNext}
                        aria-pressed={"right directional arrow"}
                    >
                        <FontAwesomeIcon icon={faAngleRight} aria-hidden="true" />
                    </button>}

                </div>

            </div>



        </div>




    )
}

export default ShortsListVideo