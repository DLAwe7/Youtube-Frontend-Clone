import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Logo.css"



function logo() {




    let country = "ES";

    return <div>

        <a className="youtube-icon" href="/home">

            <FontAwesomeIcon icon={faYoutube} className="youtube-logo" />
            <span className="youtube-name">YouTube</span>

            <span className="viewer-country">

                {country}

            </span>

        </a>



    </div>



}

export default logo