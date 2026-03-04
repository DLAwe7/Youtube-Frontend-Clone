import Microphone from "../../../components/Buttons/Microphone"
import SearchBar from "../../../components/Searchbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useId } from "react";



function Center({ isSearchbarOpen, setIsSearchbarOpen }) {

    const searchbarId = useId();

    return <div className={`center`}>

        <SearchBar id={searchbarId} />

        <button className="conditional-searchbar-btn" onClick={() => setIsSearchbarOpen(true)} aria-controls={searchbarId} aria-expanded={isSearchbarOpen} aria-label="Close searchbar button">

            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />

        </button>

        <Microphone />

    </div >

}

export default Center