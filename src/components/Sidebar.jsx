import {
    faHouse, faThumbsUp, faBarsStaggered, faClockRotateLeft, faClock, faPlay, faCirclePlay, faGamepad,
    faFire, faMusic, faClapperboard, faTowerBroadcast, faPodcast, faNewspaper, faTrophy, faLightbulb,
    faBolt, faGear, faQuestion, faExclamation, faChevronRight, faFlag
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faSquareYoutube } from '@fortawesome/free-brands-svg-icons';
import "./Sidebar.css"
import Logo from './Logo';
import HamburguerMenu from "./Buttons/Hamburguer"
import { useRef } from 'react';
import { useSidebar } from '../hooks/useSidebar';
import { channelsToFetch } from '../data/videosData';
import { useChannel } from '../utils/useVideos';
import { useInert } from '../hooks/useInert';
import { useClickOutside } from '../hooks/useClickOutside';
import { useEscKeyDown } from '../hooks/useEscKeyDown';
import ListVideoSkeleton from './ListVideoSkeleton';
import { useToast } from '../contexts/ToastContext';
import { FocusScope } from '@radix-ui/react-focus-scope';
import useAutoFocusOnOpen from '../hooks/useAutoFocusOnOpen';
import useArrowNavigation from '../hooks/useArrowNavigation';


function Sidebar() {

    const { isSidebarOpen: isOpen, setIsSidebarOpen: setIsOpen } = useSidebar();


    const menuRef = useRef(null);
    const { toastId, showToast } = useToast();




    useInert(menuRef, !isOpen);

    useClickOutside({
        refs: [menuRef],
        enabled: isOpen,
        onOutside: () => {
            setIsOpen(false);
        }
    });


    useEscKeyDown(isOpen, () => {

        setIsOpen(false);

    });

    useAutoFocusOnOpen(isOpen, menuRef);

    useArrowNavigation(isOpen, menuRef);


    const firstLiSet = [
        { id: "home", label: "Home", icon: faHouse },
        { id: "shorts", label: "Shorts", icon: faBolt },
        { id: "subscriptions", label: "Subscriptions", icon: faCirclePlay },
    ];

    const secondLiSet = [

        { id: "history", label: "History", icon: faClockRotateLeft },
        { id: "playlists", label: "Playlists", icon: faBarsStaggered },
        { id: "your-videos", label: "Your videos", icon: faPlay },
        { id: "for-later", label: "For later", icon: faClock },
        { id: "videos-i-love", label: "Videos I love", icon: faThumbsUp },

    ];

    const channelIds = channelsToFetch.map(channel => channel.channelId);

    const { data: channelsData = [], isError, isLoading, error } = useChannel(channelIds);


    const thirdLiSet = channelsData.map(channel => {

        return { id: channel.id, label: channel.snippet.title, image: channel.snippet.thumbnails.default.url };

    });

    const forthLiSet = [
        { id: "tendencies", label: "Tendencies", icon: faFire },
        { id: "music", label: "Music", icon: faMusic },
        { id: "movies-tv", label: "Movies and TV shows", icon: faClapperboard },
        { id: "direct", label: "Direct", icon: faTowerBroadcast },
        { id: "videogames", label: "Videogames", icon: faGamepad },
        { id: "news", label: "News", icon: faNewspaper },
        { id: "sports", label: "Sports", icon: faTrophy },
        { id: "culture", label: "Culture", icon: faLightbulb },
        { id: "mode-beauty", label: "Mode and beauty", icon: faFire },
        { id: "podcasts", label: "Podcasts", icon: faPodcast },
    ];

    const fifthLiSet = [
        { id: "youtube-premium", label: "Youtube Premium", icon: faYoutube },
        { id: "youtube-studio", label: "Youtube Studio", icon: faSquareYoutube },
        { id: "youtube-music", label: "Youtube Music", icon: faYoutube },
        { id: "youtube-kids", label: "Youtube Kids", icon: faSquareYoutube },
    ];

    const sixthLiSet = [
        { id: "settings", label: "Settings", icon: faGear },
        { id: "feedback-history", label: "Feedback History", icon: faFlag },
        { id: "help", label: "Help", icon: faQuestion },
        { id: "send-comments", label: "Send comments", icon: faExclamation },


    ];

    if (isLoading) return <ListVideoSkeleton count={1} size={"long"} />;
    if (isError) return <p>Error: {error.message}</p>;

    return <FocusScope loop trapped={isOpen} disabled={!isOpen}>

        <aside className={`sidebar ${isOpen ? "open" : ""}`} ref={menuRef} id='main-sidebar'>

            <div className='sidebar-ytLogo'>

                <HamburguerMenu />
                <Logo />

            </div>



            <ul className='sidebar-container'>

                <li className="sidebar-list">

                    <ul className="sidebar-sublist-container">

                        {firstLiSet.map((item) => (

                            <li key={item.id} className="sidebar-list-component">


                                <button

                                    className={"sidebar-li-btn"}
                                    onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")}
                                    aria-controls={toastId}>

                                    <div className='sidebar-icon-wrapper'>

                                        <FontAwesomeIcon icon={item.icon} aria-hidden="true" />

                                    </div>


                                    <span>{item.label}</span>

                                </button>

                            </li>
                        ))}



                    </ul>

                </li>


                <li className="sidebar-list">

                    <ul className="sidebar-sublist-container">

                        <li className="sidebar-list-component you-arrow">

                            <button className={"sidebar-li-btn"} onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")} aria-controls={toastId}>

                                <span>You</span>


                                <div className='sidebar-icon-wrapper'>

                                    <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />

                                </div>




                            </button>

                        </li>

                        {secondLiSet.map((item) => (

                            <li key={item.id} className="sidebar-list-component">


                                <button

                                    className={"sidebar-li-btn"}
                                    onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")}
                                    aria-controls={toastId}>

                                    <div className='sidebar-icon-wrapper'>

                                        <FontAwesomeIcon icon={item.icon} aria-hidden="true" />

                                    </div>


                                    <span>{item.label}</span>

                                </button>




                            </li>
                        ))}

                    </ul>

                </li>


                <li className="sidebar-list">

                    <h3 className='sidebar-list-header sidebar-title'>Subscriptions</h3>

                    <ul className="sidebar-sublist-container">


                        {thirdLiSet.map((item) => (

                            <li key={item.id} className="sidebar-list-btn">

                                <a className='sidebar-channels-anchor' href={`https://www.youtube.com/channel/${item.id}`} target='_blank'>


                                    <div className='sidebar-image-wrapper'>
                                        <img className="sidebar-channels-image" src={item.image} alt={item.label} />
                                    </div>



                                    <span>{item.label}</span>

                                </a>


                            </li>
                        ))}


                    </ul>


                </li>

                <li className="sidebar-list">

                    <h3 className="sidebar-list-header">Explorer</h3>

                    <ul className="sidebar-sublist-container">

                        {forthLiSet.map((item) => (

                            <li key={item.id} className="sidebar-list-component">


                                <button

                                    className={"sidebar-li-btn"}
                                    onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")}
                                    aria-controls={toastId}>

                                    <div className='sidebar-icon-wrapper'>

                                        <FontAwesomeIcon icon={item.icon} aria-hidden="true" />

                                    </div>


                                    <span>{item.label}</span>

                                </button>

                            </li>
                        ))}

                    </ul>

                </li>



                <li className="sidebar-list">

                    <h3 className="sidebar-list-header sidebar-title">Other youtube content</h3>

                    <ul className="sidebar-sublist-container">

                        {fifthLiSet.map((item) => (

                            <li key={item.id} className="sidebar-list-component">


                                <button

                                    className={"sidebar-li-btn"}
                                    onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")}
                                    aria-controls={toastId}>

                                    <div className='sidebar-icon-wrapper'>

                                        <FontAwesomeIcon icon={item.icon} aria-hidden="true" />

                                    </div>


                                    <span>{item.label}</span>

                                </button>

                            </li>
                        ))}


                    </ul>

                </li>

                <li className="sidebar-list">

                    <ul className="sidebar-sublist-container">

                        {sixthLiSet.map((item) => (

                            <li key={item.id} className="sidebar-list-component">


                                <button

                                    className={"sidebar-li-btn"}
                                    onClick={() => showToast("🎬 Demo Mode: This feature is not connected to a backend.")}
                                    aria-controls={toastId}>

                                    <div className='sidebar-icon-wrapper'>

                                        <FontAwesomeIcon icon={item.icon} aria-hidden="true" />

                                    </div>


                                    <span>{item.label}</span>

                                </button>

                            </li>
                        ))}


                    </ul>

                </li>


            </ul>



        </aside>


        {isOpen && (
            <div className="sidebar-overlay" aria-hidden="true">

            </div>
        )}

    </FocusScope>




}

export default Sidebar