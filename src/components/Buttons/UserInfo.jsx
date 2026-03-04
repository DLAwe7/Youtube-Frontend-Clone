import "./UserInfo.css"
import { useState } from 'react';

import { useClickOutside } from "../../hooks/useClickOutside"
import { useEscKeyDown } from "../../hooks/useEscKeyDown"
import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsersRectangle, faChevronRight, faArrowRightToBracket,
    faDollarSign, faShieldHalved, faMoon, faLanguage, faUserSecret,
    faGlobe, faKeyboard, faGear, faQuestion, faMessage
} from '@fortawesome/free-solid-svg-icons';
import { useUser } from "../../hooks/useUser";
import VideoCardSkeleton from "../VideoCardSkeleton";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useToast } from "../../contexts/ToastContext";
import { FocusScope } from '@radix-ui/react-focus-scope';
import useAutoFocusOnOpen from "../../hooks/useAutoFocusOnOpen";
import useRestoreFocus from "../../hooks/useRestoreFocus";
import useArrowNavigation from "../../hooks/useArrowNavigation";




function UserInfo() {

    const { data, isLoading, error } = useUser();

    const user = Array.isArray(data) ? data[0] : data;

    const [isOpen, setIsOpen] = useState(false);

    const { toastId, showToast } = useToast();



    const toggle = () => setIsOpen(prev => !prev);

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



    if (isLoading) return <VideoCardSkeleton count={1} size={"small"} />;
    if (error) return <p>Error: {error.message}</p>;
    if (!user) return <p>No user found.</p>;

    const menuItems = [
        { id: 'google', label: 'Google account', icon: faGoogle },
        { id: 'change-account', label: 'Change account', icon: faUsersRectangle, extraIcon: faChevronRight, className: 'space-between' },
        { id: 'logout', label: 'Log out', icon: faArrowRightToBracket, className: "u-li border-bottom" },
        { id: 'studio', label: 'Youtube Studio', icon: faYoutube },
        { id: 'purchases', label: 'Purchases and subscriptions', icon: faDollarSign, className: "u-li border-bottom" },
        { id: 'data', label: 'Your data in Youtube', icon: faShieldHalved },
        { id: 'theme', label: 'Theme', icon: faMoon },
        { id: 'language', label: 'Language', icon: faLanguage },
        { id: 'restricted', label: 'Restricted mode', icon: faUserSecret },
        { id: 'location', label: 'Location', icon: faGlobe },
        { id: 'key-combos', label: 'Key combinations', icon: faKeyboard, className: "u-li border-bottom" },
        { id: 'settings', label: 'Settings', icon: faGear, className: "u-li border-bottom" },
        { id: 'help', label: 'Help', icon: faQuestion },
        { id: 'suggestions', label: 'Send suggestions', icon: faMessage },
    ];

    return (

        <div className='user-info-wrapper'>

            <button aria-haspopup="true" ref={refs.setReference} className={"userImage-button"} aria-expanded={isOpen} onClick={toggle} aria-controls={"user-settings-dropdown"} aria-label="User settings Menu">

                {user && <img src={user.snippet?.thumbnails?.default?.url} alt="user profile image" className="user-image" aria-hidden="true" />}

            </button>

            {isOpen && createPortal(

                <FocusScope loop trapped>

                    <div className='user-info-dropdown' id='user-settings-dropdown' ref={refs.setFloating} style={floatingStyles} role="menu" >

                        <div className='user-info-block'>

                            {user && <img src={user.snippet?.thumbnails?.default?.url} alt='User Profile Picture' className='dropdown-user-image' aria-hidden="true" />}

                            <div className='user-info-text'>

                                <span>{user.snippet?.title}</span>
                                <span>@{user.snippet?.title}</span>
                                <a href="#">Show your channel</a>

                            </div>

                        </div>

                        <ul className="u-info-li-wrapper">

                            {menuItems.map(item => (

                                <li key={item.id} className={`user-info-card`} role="none">

                                    <button role="menuitem" className={item.className || ''} onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                                        <div>
                                            <FontAwesomeIcon icon={item.icon} aria-hidden="true" className="user-info-icon" />
                                        </div>

                                        <span>{item.label}</span>

                                        {item.extraIcon && (
                                            <div className="extra-icon">
                                                <FontAwesomeIcon icon={item.extraIcon} aria-hidden="true" className="user-info-icon" />
                                            </div>
                                        )}
                                    </button>

                                </li>

                            ))}

                            <li className='user-info-card' role="none">

                                <button role="menuitem" className={""} onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                                    <div className=''>

                                        <FontAwesomeIcon icon={faQuestion} aria-hidden="true" className="user-info-icon" />

                                    </div>

                                    <span>Help</span>

                                </button>

                            </li>

                            <li className='user-info-card' role="none">

                                <button role="menuitem" className={""} onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                                    <div className=''>

                                        <FontAwesomeIcon icon={faMessage} aria-hidden="true" className="user-info-icon" />

                                    </div>

                                    <span>Send suggestions</span>

                                </button>

                            </li>

                        </ul>

                    </div></FocusScope>, document.body
            )}

        </div>
    )
}

export default UserInfo
