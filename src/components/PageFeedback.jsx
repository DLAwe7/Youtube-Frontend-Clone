import { Link } from "react-router-dom"
import "./PageFeedback.css"



function PageFeedback({ title, message, actionLabel, onAction, homeLink = false }) {

    return (

        <main className="watch-page-state">


            <div className="page-state">
                <h2>{title}</h2>
                <p>{message}</p>

                <div className="page-state-actions">
                    {actionLabel && onAction && (
                        <button onClick={onAction}>{actionLabel}</button>
                    )}
                    {homeLink && <Link to="/">Go home</Link>}
                </div>
            </div>





        </main>


    )


}



export default PageFeedback