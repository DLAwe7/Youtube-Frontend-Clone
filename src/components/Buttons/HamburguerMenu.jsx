import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "./Hamburguer.css"
import { useSidebar } from '../../hooks/useSidebar';
import { forwardRef } from 'react';


const HamburguerMenu = forwardRef((props, ref) => {

    const { isSidebarOpen, toggleSidebar } = useSidebar();

    return (
        <button
            {...props}
            ref={ref}
            className="hamburguer-menu"
            aria-expanded={isSidebarOpen}
            onClick={() => toggleSidebar()}
            aria-controls="main-sidebar"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
            <FontAwesomeIcon icon={faBars} aria-hidden="true" />
        </button>
    );
});

export default HamburguerMenu;
