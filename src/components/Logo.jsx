import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Logo.css"
import { Link } from 'react-router-dom';




function Logo() {




    let country = "ES";

    return <div>

        <Link to="/home" className="youtube-icon" >

            <FontAwesomeIcon icon={faYoutube} className="youtube-logo" />
            <span className="youtube-name">YouTube</span>

            <span className="viewer-country">

                {country}

            </span>

        </Link>



    </div>



}

export default Logo