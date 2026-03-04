import { useEffect } from "react";


export function useEscKeyDown(isOpen, callback) {

    useEffect(() => {

        if (!isOpen) return;

        function handleEsc(event) {

            if (event.key === "Escape" || event.key === "Esc") {
                callback();
            }

        }

        document.addEventListener("keydown", handleEsc);

        return () => document.removeEventListener("keydown", handleEsc);

    }, [isOpen, callback]);
}
