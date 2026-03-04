import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "./Hamburguer.css"
import { ToggleButton } from '../ToggleButton';
import { useSidebar } from '../../hooks/useSidebar';
import { forwardRef } from 'react';


const HamburguerMenu = forwardRef((props, ref) => {

    const { isSidebarOpen, toggleSidebar } = useSidebar();

    return (
        <ToggleButton
            ref={ref}
            className="hamburguer-menu"
            isOpen={isSidebarOpen}
            toggle={toggleSidebar}
            controlsId="main-sidebar"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            {...props}
        >
            <FontAwesomeIcon icon={faBars} aria-hidden="true" />
        </ToggleButton>
    );
});

export default HamburguerMenu;
