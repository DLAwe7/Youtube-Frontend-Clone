import { ToggleButton } from "../ToggleButton";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../hooks/useClickOutside"
import { useEscKeyDown } from "../../hooks/useEscKeyDown"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./ButtonCarroussel.css";
import { useToast } from "../../contexts/ToastContext";



function ButtonCarroussel({ mquery, context }) {

    const [activeButtonId, setActiveButtonId] = useState(null);


    const [swiperInstance, setSwiperInstance] = useState(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const containerRef = useRef(null);

    const { toastId, showToast } = useToast();



    const items = [
        { id: "all", label: "All", className: "general-carroussel-button" },
        { id: "series", label: "From Series", className: "general-carroussel-button" },
        { id: "source", label: "Source: Channel", className: "general-carroussel-button" },
        { id: "similar", label: "Similar videos", className: "general-carroussel-button" },
        { id: "for-you", label: "For you", className: "general-carroussel-button" },
        { id: "watched", label: "Watched", className: "general-carroussel-button" },
        { id: "recently-uploaded", label: "Recently uploaded", className: "general-carroussel-button" },
    ];


    useClickOutside({
        refs: [containerRef],
        enabled: activeButtonId !== null,
        onOutside: () => {

            setActiveButtonId(null);

        },
    });

    useEscKeyDown(activeButtonId, () => { setActiveButtonId(null); });

    const updateButtons = (swiper = swiperInstance) => {
        if (!swiper) return;
        setCanScrollPrev(!swiper.isBeginning);
        setCanScrollNext(!swiper.isEnd);
    };

    const scrollNext = () => {
        if (!swiperInstance) return;

        const slidesToMove = window.innerWidth < 768 ? 2 : 3;

        const nextIndex = Math.min(
            swiperInstance.activeIndex + slidesToMove,
            swiperInstance.slides.length - 1
        );

        swiperInstance.slideTo(nextIndex);
    };

    const scrollPrev = () => {
        if (!swiperInstance) return;

        const slidesToMove = window.innerWidth < 768 ? 2 : 3;

        const prevIndex = Math.max(
            swiperInstance.activeIndex - slidesToMove,
            0
        );

        swiperInstance.slideTo(prevIndex);
    };


    return (
        <div className={`button-carroussel ${mquery ? mquery : ""} ${context ? context : ""}`} ref={containerRef}>

            {canScrollPrev && <button
                className={`directional-button ${!canScrollPrev ? "disabled" : ""}`}
                onClick={() => scrollPrev()}
                aria-label="directional-arrow-left"
                aria-hidden={!canScrollPrev}
                aria-pressed={"left directional arrow"}

            >

                <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />

            </button>}

            <Swiper
                slidesPerView="auto"
                freeMode={{
                    enabled: true,
                    momentum: false
                }}
                spaceBetween={10}
                className="carroussel-button-container"
                onSwiper={(swiper) => {
                    setSwiperInstance(swiper);
                    updateButtons(swiper);
                }}
                onSlideChange={(swiper) => updateButtons(swiper)}
                onSetTranslate={(swiper) => updateButtons(swiper)}
                onReachBeginning={(swiper) => updateButtons(swiper)}
                onReachEnd={(swiper) => updateButtons(swiper)}>

                {items.map((item) => (
                    <SwiperSlide key={item.id} style={{ width: "max-content" }}>

                        <button
                            className={item.className}
                            onClick={() => { setActiveButtonId(prev => prev === item.id ? null : item.id); showToast("🎬 Demo Mode: This feature is not connected to a backend.") }}
                            aria-controls={toastId}
                        >
                            <span>{item.label}</span>
                        </button>

                    </SwiperSlide>
                ))}

            </Swiper>

            {canScrollNext && <button
                className={`directional-button ${!canScrollNext ? "disabled" : ""}`}
                onClick={() => scrollNext()}
                aria-label="directional-arrow-right"
                aria-hidden={!canScrollNext}
                aria-pressed={"right directional arrow"}
            >
                <FontAwesomeIcon icon={faAngleRight} aria-hidden="true" />
            </button>}




        </div>
    );
}

export default ButtonCarroussel;