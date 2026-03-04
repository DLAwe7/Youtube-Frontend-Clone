import { useState, useEffect } from "react";


function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQueryList = window.matchMedia(query);

        setMatches(mediaQueryList.matches);

        const listener = (event) => setMatches(event.matches);


        mediaQueryList.addEventListener("change", listener);

        return () => mediaQueryList.removeEventListener("change", listener);
    }, [query]);

    return matches;
}

export default useMediaQuery;