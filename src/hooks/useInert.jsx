import { useEffect } from "react";

export function useInert(ref, inert) {
    useEffect(() => {
        if (!ref.current) return;

        if (inert) {

            const focused = document.activeElement;
            if (focused && ref.current.contains(focused)) {
                focused.blur();
            }
            ref.current.setAttribute("inert", "");
        } else {
            ref.current.removeAttribute("inert");

        }
    }, [ref, inert]);
}