import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTowerBroadcast, faFolderPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import "./VideoCreate.css"
import { ToggleButton } from '../ToggleButton';
import { useRef, useState } from 'react';

import { useClickOutside } from "../../hooks/useClickOutside"
import { useEscKeyDown } from "../../hooks/useEscKeyDown"
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { createPortal } from "react-dom";
import { useToast } from '../../contexts/ToastContext';
import { FocusScope } from '@radix-ui/react-focus-scope';
import useAutoFocusOnOpen from '../../hooks/useAutoFocusOnOpen';
import useRestoreFocus from '../../hooks/useRestoreFocus';
import useArrowNavigation from '../../hooks/useArrowNavigation';



function Video() {
    const [isOpen, setIsOpen] = useState(false);

    const { toastId, showToast } = useToast();

    const menuRef = useRef(null);

    const toggle = () => setIsOpen(prev => !prev);

    useLockBodyScroll(isOpen);

    const { refs, floatingStyles } = useFloating({
        placement: "bottom-end",
        middleware: [
            offset(10),
            flip(),
            shift(),
        ],
        whileElementsMounted: autoUpdate,
    });




    useClickOutside({
        refs: [refs.floating, refs.reference],
        enabled: isOpen,
        onOutside: () => {
            setIsOpen(false);
        }
    });


    useEscKeyDown(isOpen, () => {

        setIsOpen(false);

    });

    useAutoFocusOnOpen(isOpen, refs.floating);

    useRestoreFocus(isOpen, refs.reference);

    useArrowNavigation(isOpen, refs.floating);


    return (

        <div className='create-video-wrapper' ref={menuRef}>

            <button ref={refs.setReference} aria-haspopup="true" className={"addVideo-button"} aria-expanded={isOpen} onClick={toggle} aria-controls={"vid-cr-dropdopwn"} aria-label="Upload and or create video">

                <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
                <span aria-hidden="true">Create</span>

            </button>

            {isOpen && createPortal(

                <FocusScope loop trapped>

                    <ul className='video-create-dropdown' id='vid-cr-dropdopwn' ref={refs.setFloating} style={floatingStyles} role='menu'>

                        <li className='video-create-list' role='none'>


                            <button role='menuitem' className={"video-create-list-button"} onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                                <div className='video-create-icon-wrapper'>

                                    <FontAwesomeIcon icon={faUpload} aria-hidden="true" />

                                </div>

                                <span>Upload video</span>

                            </button>

                        </li>

                        <li className='video-create-list' role='none'>

                            <button role='menuitem' className={"video-create-list-button"} onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                                <div className='video-create-icon-wrapper' aria-hidden="true">

                                    <FontAwesomeIcon icon={faTowerBroadcast} aria-hidden="true" />

                                </div>

                                <span>Go live</span>

                            </button>

                        </li>

                        <li className='video-create-list' role='none'>

                            <button role='menuitem' className={"video-create-list-button"} onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                                <div className='video-create-icon-wrapper'>

                                    <FontAwesomeIcon icon={faFolderPlus} aria-hidden="true" />

                                </div>

                                <span>Create post</span>

                            </button>

                        </li>


                    </ul>



                </FocusScope>, document.body


            )}

        </div>


    )


}

export default Video