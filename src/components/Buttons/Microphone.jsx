import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faX } from "@fortawesome/free-solid-svg-icons";
import "./Microphone.css"
import { useState } from 'react';
import { useClickOutside } from "../../hooks/useClickOutside"
import { useEscKeyDown } from "../../hooks/useEscKeyDown"
import { ToggleButton } from '../ToggleButton.jsx';
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { createPortal } from "react-dom";
import { FocusScope } from '@radix-ui/react-focus-scope';
import useAutoFocusOnOpen from '../../hooks/useAutoFocusOnOpen.jsx';
import useRestoreFocus from '../../hooks/useRestoreFocus.jsx';



function Microphone() {

    const [isOpen, setIsOpen] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const toggle = () => setIsOpen(prev => !prev);
    const toggleText = () => setShowInfo(prev => !prev);

    const { refs, floatingStyles } = useFloating({
        placement: "bottom-end",
        middleware: [
            offset(8),
            flip(),
            shift(),
        ],
        whileElementsMounted: autoUpdate,
    });


    useClickOutside({
        refs: [refs.reference, refs.floating],
        enabled: isOpen,
        onOutside: () => {
            setIsOpen(false);
            setShowInfo(false);
        }
    });

    useEscKeyDown(isOpen, () => {

        setIsOpen(false);
        setShowInfo(false);

    });

    useAutoFocusOnOpen(isOpen, refs.floating);

    useRestoreFocus(isOpen, refs.reference);

    return (

        <div className='microphone-button-wrapper'>

            <ToggleButton ref={refs.setReference} className={"microphone-button"} isOpen={isOpen} toggle={toggle} controlsId={"microphone-dropdown"} aria-label='Search with voice'>

                <FontAwesomeIcon icon={faMicrophone} aria-hidden="true" />

            </ToggleButton>

            {isOpen && createPortal(<FocusScope loop trapped>

                <div className='microphone-button-dropdown' id='microphone-dropdown' ref={refs.setFloating} style={floatingStyles} role='dialog'
                    aria-modal="false"
                    aria-labelledby="mic-title">

                    <div className='mic-dropd-title'>
                        <span id="mic-title">Search with your voice</span>

                        <ToggleButton className={"mic-closing-button"} isOpen={isOpen} toggle={toggle} controlsId={"microphone-dropdown"} aria-label='Close Menu Button'>

                            <FontAwesomeIcon icon={faX} aria-hidden="true" />

                        </ToggleButton>


                    </div>

                    <div className='mic-dropd-description'>
                        <span>To search by voice, go to your browser settings and allow access to microphone</span>
                    </div>

                    <div className='dropd-button-wrapper'>

                        <ToggleButton className={"mic-dropd-button"} isOpen={showInfo} toggle={toggleText} controlsId={"mic-text"} aria-label='Activate Microphone'>

                            <FontAwesomeIcon icon={faMicrophone} aria-hidden="true" />

                        </ToggleButton>


                        {showInfo && <p className='mock-text' id='mic-text'>This is a mock button!</p>}

                    </div>


                </div>



                <div className="sidebar-overlay" aria-hidden="true">

                </div>
            </FocusScope>, document.body)}






        </div>
    )

}


export default Microphone