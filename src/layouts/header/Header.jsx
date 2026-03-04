import Start from "./start/Start"
import Center from "./center/Center"
import End from "./end/End"
import "./Header.css"
import SearchBar from "../../components/Searchbar"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function Header() {

    const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);

    return <div className="header">

        {!isSearchbarOpen && <>

            <Start />
            <Center isSearchbarOpen={isSearchbarOpen} setIsSearchbarOpen={setIsSearchbarOpen} />
            <End />


        </>}

        {isSearchbarOpen && <>


            <button className="header-searchbar-btn" onClick={() => setIsSearchbarOpen(false)}>

                <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />

            </button>
            <SearchBar mquery="mquery" />

        </>}

    </div>



}

export default Header