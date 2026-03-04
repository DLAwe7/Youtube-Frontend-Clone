import { useEffect } from "react";

export function useClickOutside({ refs, enabled, onOutside }) {
    useEffect(() => {
        if (!enabled) return;

        const refArray = Array.isArray(refs) ? refs : [refs];

        function handler(e) {
            const inside = refArray.some(ref => {
                const el = ref?.current;
                return (
                    el instanceof HTMLElement &&
                    (el === e.target || el.contains(e.target))
                );
            });

            if (!inside) onOutside();
        }

        document.addEventListener("mousedown", handler);
        return () =>
            document.removeEventListener("mousedown", handler);
    }, [enabled, onOutside, refs]);
}