import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear } from '@fortawesome/free-solid-svg-icons';
import "./BellButton.css"
import { useState } from 'react';
import { ToggleButton } from '../ToggleButton';
import { useClickOutside } from "../../hooks/useClickOutside"
import { useEscKeyDown } from "../../hooks/useEscKeyDown"
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useToast } from '../../contexts/ToastContext';
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { createPortal } from "react-dom";
import { FocusScope } from '@radix-ui/react-focus-scope';
import useAutoFocusOnOpen from '../../hooks/useAutoFocusOnOpen';
import useRestoreFocus from '../../hooks/useRestoreFocus';
import useArrowNavigation from '../../hooks/useArrowNavigation';


function BellButton() {

  const [isOpen, setIsOpen] = useState(false);



  const toggle = () => setIsOpen(prev => !prev);

  useLockBodyScroll(isOpen);

  const { showToast, toastId } = useToast();

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
    }
  });


  useEscKeyDown(isOpen, () => {

    setIsOpen(false);

  });

  useAutoFocusOnOpen(isOpen, refs.floating);
  useRestoreFocus(isOpen, refs.reference);
  useArrowNavigation(isOpen, refs.floating)

  const notificationsLi = [];

  return (

    <div className="bell-wrapper">

      <button ref={refs.setReference} className={"bell-button"} aria-haspopup="true" aria-expanded={isOpen} onClick={toggle} aria-controls={"notifications-list-wrapper"} aria-label="Notifications Menu">

        <FontAwesomeIcon icon={faBell} aria-hidden="true" />

      </button>


      {isOpen && createPortal(

        <FocusScope loop trapped>

          <div className='notifications-dropdown' id='notifications-list-wrapper' ref={refs.setFloating} style={floatingStyles}>

            <div className='notifications-header-wrapper'>

              <h2>Notifications</h2>

              <button className={"notifications-header-button"} onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                <FontAwesomeIcon icon={faGear} aria-hidden="true" />

              </button>

            </div>




            {notificationsLi.length > 0 &&

              <ul>


                {notificationsLi.map(card => (

                  <li className='notifications-li' key={card.id}>

                    <ToggleButton className={"notifications-li-btn"} isOpen={card.isOpen} toggle={card.toggle} controlsId={card.id}>

                      <FontAwesomeIcon icon={card.icon} aria-hidden="true" />
                      <span>{card.text}</span>

                    </ToggleButton>

                  </li>

                ))}


              </ul>
            }

            {notificationsLi.length === 0 &&


              <div className='empty-notifications-list'>



                <FontAwesomeIcon icon={faBell} aria-hidden="true" />



                <div className='empty-notf-text'>

                  <span>Your notifications live here</span>
                  <p>Subscribe to your favorite channels to get notified abouyt their latest videos.</p>


                </div>



              </div>


            }


          </div></FocusScope>, document.body

      )}

    </div>
  );
}

export default BellButton;