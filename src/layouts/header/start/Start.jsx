import Logo from "../../../components/Logo"
import HamburguerButton from "../../../components/Buttons/Hamburguer"
import { useSidebar } from "../../../hooks/useSidebar"
import useRestoreFocus from "../../../hooks/useRestoreFocus";
import { useRef } from "react";



function Start() {

    const { isSidebarOpen: isOpen } = useSidebar();

    const openSidebarButtonRef = useRef(null);

    useRestoreFocus(isOpen, openSidebarButtonRef);



    return <div className="start">

        <HamburguerButton ref={openSidebarButtonRef} />
        <Logo />


    </div>



}

export default Start