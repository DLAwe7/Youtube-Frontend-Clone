import { useMemo } from "react";
import { shuffleArray } from "../utils/shuffle"
import { shortsToFetch, videosToFetch } from "../data/videosData";
import ListVideo from "../components/ListVideo";
import { useVideos } from "../utils/useVideos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import ButtonCarroussel from "../components/Buttons/ButtonCarroussel";
import ShortsListVideo from "../components/ShortsListVideo";
import ListVideoSkeleton from "../components/ListVideoSkeleton";
import PageFeedback from "../components/PageFeedback";

const FIRST_ROW_COUNT = 3;





function HomePage() {

    const shuffledVideos = useMemo(
        () => shuffleArray(videosToFetch).map(v => v.videoId),
        []
    );

    const shuffledShorts = useMemo(
        () => shuffleArray(shortsToFetch).map(v => v.videoId),
        []
    );

    const {
        data: homeVideos = [],
        isLoading,
        isError,
        refetch: refetchVideos,
    } = useVideos(shuffledVideos);

    const { data: homeShorts = [], } = useVideos(shuffledShorts);

    const firstRowVideos = useMemo(
        () => homeVideos.slice(0, FIRST_ROW_COUNT),
        [homeVideos]
    );

    const remainingVideos = useMemo(
        () => homeVideos.slice(FIRST_ROW_COUNT),
        [homeVideos]
    );




    if (isLoading) return <ListVideoSkeleton count={FIRST_ROW_COUNT} />;
    if (isError) {
        return (
            <PageFeedback
                title="Couldn't load videos"
                message="Please try again."
                actionLabel="Retry"
                onAction={() => refetchVideos()}
            />
        );
    }


    return (



        <main className="home-grid">


            <div className="home-carroussel-wrapper">

                <ButtonCarroussel context={"home"} />

            </div>


            <ListVideo videos={firstRowVideos} layout="horizontal" context="home" />

            <div className="home-shorts-divisor"><FontAwesomeIcon icon={faYoutube} /><span>Shorts</span></div>

            <ShortsListVideo videos={homeShorts} layout="shorts" />

            <ListVideo videos={remainingVideos} layout="grid" context="home" />


        </main>


    )

}

export default HomePage