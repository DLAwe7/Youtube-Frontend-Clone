import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../hooks/useClickOutside"
import { useEscKeyDown } from "../../hooks/useEscKeyDown"
import "./ButtonCarroussel.css";
import { useToast } from "../../contexts/ToastContext";



function ButtonCarroussel({ mobileVariant, context }) {

    const [activeButtonId, setActiveButtonId] = useState(null);

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const containerRef = useRef(null);
    const scrollRef = useRef(null);


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

    const updateButtons = () => {
        const el = scrollRef.current;
        if (!el) return;

        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        const tolerance = 2;

        setCanScrollPrev(el.scrollLeft > tolerance);
        setCanScrollNext(el.scrollLeft < maxScrollLeft - tolerance);
    };

    const scrollByAmount = (direction) => {
        const el = scrollRef.current;
        if (!el) return;

        const amount = el.clientWidth * 0.7;

        el.scrollBy({
            left: direction === "next" ? amount : -amount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        updateButtons();

        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", updateButtons);
        window.addEventListener("resize", updateButtons);

        return () => {
            el.removeEventListener("scroll", updateButtons);
            window.removeEventListener("resize", updateButtons);
        };
    }, []);


    return (
        <div
            className={`button-carroussel ${mobileVariant ?? ""} ${context ?? ""}`}
            ref={containerRef}
        >
            {canScrollPrev && (
                <button
                    className="directional-button"
                    onClick={() => scrollByAmount("prev")}
                    aria-label="Scroll left"
                >
                    <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />
                </button>
            )}

            <div className="carroussel-button-container" ref={scrollRef}>
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={item.className}
                        onClick={() => {
                            setActiveButtonId((prev) => (prev === item.id ? null : item.id));
                            showToast("🎬 Demo Mode: This feature is not connected to a backend.");
                        }}
                        aria-controls={toastId}
                    >
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>

            {canScrollNext && (
                <button
                    className="directional-button"
                    onClick={() => scrollByAmount("next")}
                    aria-label="Scroll right"
                >
                    <FontAwesomeIcon icon={faAngleRight} aria-hidden="true" />
                </button>
            )}
        </div>
    );
}

export default ButtonCarroussel;