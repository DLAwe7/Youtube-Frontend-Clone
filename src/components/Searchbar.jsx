import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "./Searchbar.css"
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../hooks/useClickOutside';


function SearchBar({ id, mquery }) {


    const [isFocused, setIsFocused] = useState(false);

    const [currentValue, setCurrentValue] = useState("");

    const menuRef = useRef(null);

    const inputRef = useRef(null);

    const navigate = useNavigate();




    const runSearch = () => {

        const trimmedValue = currentValue.trim();


        if (trimmedValue === "") return;


        navigate(`/watch/${trimmedValue}`);

    }



    useClickOutside({
        refs: [menuRef],
        enabled: isFocused,
        onOutside: () => {
            setIsFocused(false);
            setCurrentValue("");
        }
    });






    return <form role='search' className={`searchBar ${mquery ? mquery : ""}`} ref={menuRef} id={id} onSubmit={(e) => {
        e.preventDefault();
        runSearch();
        setCurrentValue("");
        setIsFocused(false);
    }}>

        <div className='input-block'>

            <FontAwesomeIcon icon={faMagnifyingGlass} className={`invisible-magnifying ${isFocused ? "visible" : ""}`} aria-hidden="true" />

            <label htmlFor="search-input" className="sr-only">
                Search videos
            </label>

            <input ref={inputRef} onFocus={() => setIsFocused(true)} id='search-input' value={currentValue}
                onChange={(event) => setCurrentValue(event.target.value)} type='search' placeholder='Search'
                className='searchbar-input' autoComplete='off' />

            <button type="button" onClick={() => { setCurrentValue(""); setIsFocused(false) }} className={`input-clearer-button ${isFocused ? "visible" : ""}`} aria-label='clear search'>
                <FontAwesomeIcon icon={faXmark} className="invisible-Xmark" aria-hidden="true" />
            </button>

        </div>


        <button type="submit" className={`searchbar-button`} aria-label='search'>
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
        </button>

    </form>

}


export default SearchBar