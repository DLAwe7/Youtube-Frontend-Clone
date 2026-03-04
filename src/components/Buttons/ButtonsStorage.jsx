
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./ButtonsStorage.css"
import ActionButtonList from '../ActionButtonList';
import { useClickOutside } from "../../hooks/useClickOutside"
import { useEscKeyDown } from "../../hooks/useEscKeyDown"
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useToast } from '../../contexts/ToastContext';
import { FocusScope } from '@radix-ui/react-focus-scope';
import useRestoreFocus from '../../hooks/useRestoreFocus';
import useAutoFocusOnOpen from '../../hooks/useAutoFocusOnOpen';
import useArrowNavigation from '../../hooks/useArrowNavigation';


function ButtonsStorage({ isBtnStorage, setIsBtnStorage, data }) {

    const { showToast } = useToast()

    const toggle = () => setIsBtnStorage(prev => !prev);

    const { refs, floatingStyles } = useFloating({
        placement: "bottom-end",
        middleware: [
            offset(8),
            flip(),
            shift(),
        ],
        whileElementsMounted: autoUpdate,
    });


    useLockBodyScroll(isBtnStorage);

    useClickOutside({
        refs: [refs.floating, refs.reference],
        enabled: isBtnStorage,
        onOutside: () => {
            setIsBtnStorage(false);

        }
    });


    useEscKeyDown(isBtnStorage, () => {

        setIsBtnStorage(false);

    });

    useAutoFocusOnOpen(isBtnStorage, refs.floating);

    useRestoreFocus(isBtnStorage, refs.reference);

    useArrowNavigation(isBtnStorage, refs.floating);



    return (


        <div className='button-storage-wrapper' >

            <button ref={refs.setReference} className="button-storage" onClick={toggle} aria-controls='buttons-storage-dropdown' aria-expanded={isBtnStorage}>

                <FontAwesomeIcon icon={faEllipsis} />

            </button>

            {isBtnStorage &&

                createPortal(

                    <FocusScope loop trapped>

                        <div ref={refs.setFloating} style={{
                            ...floatingStyles,
                            display: "inline-block",
                            width: "max-content",
                            zIndex: 1000
                        }}>
                            <ActionButtonList
                                isPopover={true}
                                stopPropagation={true}
                                id={"buttons-storage-dropdown"} mode={"dropdown"} className={"isBtnStorage"}
                                isBtnStorage={isBtnStorage} data={data} toggleDiv={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")}>
                            </ActionButtonList>
                        </div></FocusScope>
                    ,
                    document.body)

            }

        </div>



    )


}

export default ButtonsStorage
