import { useToast } from "../contexts/ToastContext";
import "./Toast.css"

function Toast({ message }) {

    const { toastId } = useToast();

    if (!message) return null;



    return (
        <div className="toast" role="status" aria-live="polite" aria-atomic="true" id={toastId}>
            {message}
        </div>
    );
}

export default Toast;