import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./MoreOptionsButton.css";
import { useEscKeyDown } from "../../hooks/useEscKeyDown"
import { useToast } from '../../contexts/ToastContext';
import { createPortal } from 'react-dom';
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { FocusScope } from '@radix-ui/react-focus-scope';
import useAutoFocusOnOpen from '../../hooks/useAutoFocusOnOpen';
import useRestoreFocus from '../../hooks/useRestoreFocus';
import useArrowNavigation from '../../hooks/useArrowNavigation';



function MoreOptionsButton({ variantClasses = "", variant, isMenuOpen, onToggleMenu, onCloseMenu, menuId }) {

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

    useLockBodyScroll(isMenuOpen);

    useEscKeyDown(isMenuOpen, () => {

        onCloseMenu();


    });


    useAutoFocusOnOpen(isMenuOpen, refs.floating);
    useRestoreFocus(isMenuOpen, refs.reference);
    useArrowNavigation(isMenuOpen, refs.floating);


    const buttonsList = [{ id: "addtoqueue", title: "Add to queue", }, { id: "savetowatchlater", title: "Save to Watch later", },
    { id: "savetoplaylist", title: "Save to playlist", }, { id: "moreoptionsdownload", title: "Download", }, { id: "moreoptionsshare", title: "Share", },
    { id: "moreoptionsnointerested", title: "Not interested", }, { id: "moreoptionsdontrecommend", title: "Don't recommend channel", },
    { id: "moreoptionsreport", title: "Report", },]




    return (


        <div className={`more-options-wrapper ${variantClasses} ${variant ? variant : ""}`}>

            <button ref={refs.setReference} className={`more-options-button`} aria-expanded={isMenuOpen} onClick={(e) => { e.stopPropagation(); e.preventDefault(); onToggleMenu(); }} aria-controls={`more-options-menu-${menuId}`}
                aria-label="More options button">

                <FontAwesomeIcon icon={faEllipsisVertical} aria-hidden="true" className='mopt-btn-icon' />

            </button >

            {isMenuOpen && createPortal(

                <>

                    <div
                        className="menu-overlay"
                        onClick={(e) => { e.stopPropagation(); onCloseMenu(); }}
                    />

                    <FocusScope loop trapped>

                        <ul role='menu' className={`more-options-container ${variantClasses}`} id={`more-options-menu-${menuId}`} ref={refs.setFloating} style={floatingStyles}>

                            {buttonsList.map((button) => (

                                <li className="more-options-li" role='none' key={button.id}>

                                    <button role='menuitem' className={""} onClick={(e) => { e.stopPropagation(); showToast("🎬 Demo Mode: This feature is not connected to a backend."); onCloseMenu(); }} aria-controls={toastId} >

                                        <span>{button.title}</span>

                                    </button>

                                </li>


                            ))}

                        </ul>


                    </FocusScope>


                </>, document.body

            )


            }

        </div >
    )


}

export default MoreOptionsButton