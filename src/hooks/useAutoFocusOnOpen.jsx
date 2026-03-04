import { useEffect } from "react";



function useAutoFocusOnOpen(isOpen, containerRef) {
    useEffect(() => {
        if (!isOpen) return;
        const el = containerRef.current;
        if (!el) return;

        const firstFocusable = el.querySelector(
            'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        firstFocusable?.focus();
    }, [isOpen, containerRef]);
}

export default useAutoFocusOnOpen;