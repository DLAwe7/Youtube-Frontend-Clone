import { useState } from "react";
import { SidebarContext } from "./SidebarContext";

import { useLockBodyScroll } from "../hooks/useLockBodyScroll"

export function SidebarProvider({ children }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    useLockBodyScroll(isSidebarOpen);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}
