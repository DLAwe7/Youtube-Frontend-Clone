import { useEffect, useState } from "react";

function useMediaQuery(query) {
    const getMatches = () => {
        if (typeof window === "undefined") return false;
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState(getMatches);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const mediaQueryList = window.matchMedia(query);

        const handleChange = (event) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener("change", handleChange);

        return () => {
            mediaQueryList.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
}

export default useMediaQuery;