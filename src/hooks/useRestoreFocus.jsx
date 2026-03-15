import { useEffect, useRef } from "react";

function useRestoreFocus(active, refToRestore) {
    const lastFocusedRef = useRef(null);
    const wasActiveRef = useRef(false);

    useEffect(() => {
        if (active) {
            lastFocusedRef.current = document.activeElement;
        }

        if (!active && wasActiveRef.current) {
            const target = refToRestore?.current || lastFocusedRef.current;

            if (target) {
                requestAnimationFrame(() => {
                    target.focus({ preventScroll: true });
                });
            }
        }

        wasActiveRef.current = active;
    }, [active, refToRestore]);
}

export default useRestoreFocus;