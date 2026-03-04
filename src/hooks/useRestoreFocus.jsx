import { useEffect, useRef } from "react";


function useRestoreFocus(active, refToRestore) {

    const lastFocusedRef = useRef(null);

    useEffect(() => {
        if (active) {
            lastFocusedRef.current = document.activeElement;
        } else {

            const target = refToRestore?.current || lastFocusedRef.current;
            if (target) {
                requestAnimationFrame(() => {
                    target.focus({ preventScroll: true });
                });
            }
        }
    }, [active, refToRestore]);
}

export default useRestoreFocus;