import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { useEscKeyDown } from "../hooks/useEscKeyDown";

function useDescriptionController(data) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isExpandable, setIsExpandable] = useState(false);
    const [isBtnStorage, setIsBtnStorage] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(null);

    const wrapperRef = useRef(null);
    const contentRef = useRef(null);
    const menuRef = useRef(null);
    const subsRef = useRef(null);
    const descriptionRef = useRef(null);

    const toggleDescription = () => {
        const el = wrapperRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const viewportHeight =
            window.innerHeight || document.documentElement.clientHeight;

        const isInViewport =
            rect.top >= 0 && rect.bottom <= viewportHeight;

        if (!isInViewport) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsOpen(false);
            });
        });
    };



    useClickOutside({
        refs: [descriptionRef],
        enabled: isDescriptionOpen,
        onOutside: () => setIsDescriptionOpen(false),
    });


    useEscKeyDown(isDescriptionOpen, () =>
        setIsDescriptionOpen(false)
    );


    useEffect(() => {
        if (!contentRef.current) return;

        const el = contentRef.current;
        const lineHeight = parseFloat(
            getComputedStyle(el).lineHeight
        );
        const maxLines = 5;

        const lines = Math.round(el.scrollHeight / lineHeight);

        setIsExpandable(lines > maxLines);
    }, [data?.snippet?.description]);



    return {

        isOpen,
        isExpandable,
        isBtnStorage,
        isDescriptionOpen,
        isSubscribed,
        setIsOpen,
        setIsBtnStorage,
        toggleDescription,
        setIsDescriptionOpen,
        setIsSubscribed,
        wrapperRef,
        contentRef,
        menuRef,
        subsRef,
        descriptionRef,
    };
}

export default useDescriptionController;