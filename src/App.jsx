import './App.css'
import Header from './layouts/header/Header'
import Sidebar from './components/Sidebar'
import { SidebarProvider } from "./contexts/SidebarProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "../src/pages/HomePage"
import WatchPage from "../src/pages/WatchPage"
import { UserProvider } from './contexts/UserProvider';
import { useContext } from 'react';
import { SidebarContext } from './contexts/SidebarContext';
import Toast from './components/Toast';
import { ToastProvider } from './contexts/ToastProvider';



const queryClient = new QueryClient();

const defaultChannelId = "UC7kB3-9PF9FlkvoUQHTqp_A";



function App() {
  return (
    <main className="main-wrapper">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UserProvider defaultChannelId={defaultChannelId}>
            <SidebarProvider>
              <ToastProvider>
                <AppLayout />
              </ToastProvider>
            </SidebarProvider>
          </UserProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </main>
  );
}

function AppLayout() {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <>

      <Toast />
      <Sidebar />

      <div inert={isSidebarOpen ? true : false} aria-hidden={isSidebarOpen}>
        <Header />

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/watch/:videoId" element={<WatchPage />} />
          <Route path="*" element={<Navigate to={`/home`} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
