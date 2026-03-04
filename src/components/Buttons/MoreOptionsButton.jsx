import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./MoreOptionsButton.css";
import { ToggleButton } from '../ToggleButton';
import { useState } from 'react';
import { useClickOutside } from "../../hooks/useClickOutside"
import { useEscKeyDown } from "../../hooks/useEscKeyDown"
import { useToast } from '../../contexts/ToastContext';
import { createPortal } from 'react-dom';
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { FocusScope } from '@radix-ui/react-focus-scope';
import useAutoFocusOnOpen from '../../hooks/useAutoFocusOnOpen';
import useRestoreFocus from '../../hooks/useRestoreFocus';
import useArrowNavigation from '../../hooks/useArrowNavigation';



function MoreOptionsButton({ context, variant, layout }) {


    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(prev => !prev);

    const { toastId, showToast } = useToast();

    const { refs, floatingStyles } = useFloating({
        placement: "bottom-end",
        middleware: [
            offset(10),
            flip(),
            shift(),
        ],
        whileElementsMounted: autoUpdate,
    });

    useLockBodyScroll(isOpen);


    useClickOutside({
        refs: [refs.reference, refs.floating],
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
    useArrowNavigation(isOpen, refs.floating)

    return (


        <div className={`more-options-wrapper ${context ? context : ""} ${variant ? variant : ""}`} role='menu'>

            <ToggleButton ref={refs.setReference} className={"more-options-button"} isOpen={isOpen} toggle={toggle} controlsId={"more-options-menu"} aria-label="More options button" stopPropagation={true}>

                <FontAwesomeIcon icon={faEllipsisVertical} aria-hidden="true" className='mopt-btn-icon' />

            </ToggleButton>

            {isOpen && createPortal(

                <FocusScope loop trapped>

                    <ul className={`more-options-container ${layout ? layout : ""}`} id='more-options-menu' ref={refs.setFloating} style={floatingStyles}>

                        <li className="more-options-li" role='none'>

                            <button role='menuitem' className={""} onClick={(e) => { e.stopPropagation(); showToast("🎬 Demo Mode: This feature is not connected to a backend."); }} aria-controls={toastId} >

                                <span aria-hidden="true">Add to queue</span>

                            </button>

                        </li>

                        <li className="more-options-li" role='none'>

                            <button role='menuitem' className={""} onClick={(e) => { e.stopPropagation(); showToast("🎬 Demo Mode: This feature is not connected to a backend."); }} aria-controls={toastId} >

                                <span aria-hidden="true">Save to Watch later</span>

                            </button>

                        </li>


                        <li className="more-options-li" role='none'>

                            <button role='menuitem' className={""} onClick={(e) => { e.stopPropagation(); showToast("🎬 Demo Mode: This feature is not connected to a backend."); }} aria-controls={toastId} >



                                <span aria-hidden="true">Save to playlist</span>

                            </button>

                        </li>

                        <li className="more-options-li" role='none'>

                            <button role='menuitem' className={""} onClick={(e) => { e.stopPropagation(); showToast("🎬 Demo Mode: This feature is not connected to a backend."); }} aria-controls={toastId} >


                                <span aria-hidden="true">Download</span>

                            </button>

                        </li>


                        <li className="more-options-li" role='none'>

                            <button role='menuitem' className={""} onClick={(e) => { e.stopPropagation(); showToast("🎬 Demo Mode: This feature is not connected to a backend."); }} aria-controls={toastId}>


                                <span aria-hidden="true">Share</span>

                            </button>

                        </li>


                        <li className="more-options-li" role='none'>

                            <button role='menuitem' className={""} onClick={(e) => { e.stopPropagation(); showToast("🎬 Demo Mode: This feature is not connected to a backend."); }} aria-controls={toastId}>



                                <span aria-hidden="true">Not interested</span>

                            </button>

                        </li>


                        <li className="more-options-li" role='none'>

                            <button role='menuitem' className={""} onClick={(e) => { e.stopPropagation(); showToast("🎬 Demo Mode: This feature is not connected to a backend."); }} aria-controls={toastId} >



                                <span aria-hidden="true">Don't recommend channel</span>

                            </button>

                        </li>


                        <li className="more-options-li" role='none'>

                            <button role='menuitem' className={""} onClick={(e) => { e.stopPropagation(); showToast("🎬 Demo Mode: This feature is not connected to a backend."); }} aria-controls={toastId} >

                                <span aria-hidden="true">Report</span>

                            </button>

                        </li>

                    </ul>


                </FocusScope>, document.body)



            }



        </div>













    )


}

export default MoreOptionsButton