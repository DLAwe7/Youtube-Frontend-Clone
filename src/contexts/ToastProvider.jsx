import { useState, useRef } from "react";
import { ToastContext } from "./ToastContext";
import Toast from "../components/Toast"

export function ToastProvider({ children }) {
    const [message, setMessage] = useState(null);
    const timeoutRef = useRef(null);
    const toastId = "toast-element";

    const showToast = (msg) => {
        setMessage(msg);


        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setMessage(null);
        }, 2000);
    };

    return (
        <ToastContext.Provider value={{ showToast, message, toastId }}>
            {children}
            {message && <Toast message={message} />}
        </ToastContext.Provider>
    );
}