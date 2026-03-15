import { useNavigate, useParams } from "react-router-dom";
import Columns from "../layouts/columns/Columns";
import { useChannel, useVideos } from "../utils/useVideos";
import { videosToFetch } from "../data/videosData";
import { useMemo } from "react";
import { shuffleArray } from "../utils/shuffle";
import ListVideoSkeleton from "../components/ListVideoSkeleton";
import PageFeedback from "../components/PageFeedback";





function WatchPage() {
    const { videoId } = useParams();

    const navigate = useNavigate();

    const mainVideoId = useMemo(
        () => (videoId ? [videoId] : []),
        [videoId]
    );

    const shuffledVideos = useMemo(
        () => shuffleArray(videosToFetch),
        []
    );

    const rightColumnIds = useMemo(
        () =>
            shuffledVideos
                .map(v => v.videoId)
                .filter(id => id !== videoId),
        [videoId, shuffledVideos]
    );

    const {
        data: mainVideoData = [],
        isLoading,
        isError,
    } = useVideos(mainVideoId);

    const mainVideo = mainVideoData?.[0];
    const channelId = mainVideo?.snippet?.channelId;

    const { data: channelData = [] } = useChannel(channelId ? [channelId] : []);

    const { data: relatedVideos = [] } = useVideos(rightColumnIds);

    const channel = channelData?.[0];

    if (isLoading) return <ListVideoSkeleton count={3} />;
    if (isError) return (

        <PageFeedback title="Couldn't load this video" message="Please try again or go back to the homepage. " actionLabel="Go Home"
            onAction={() => navigate("/home")} />
    );


    if (!mainVideo) return <PageFeedback title="Video not found" message="This video may be unavailable or the link may be incorrect."
        actionLabel="Go Home" onAction={() => navigate("/home")} />

    return (
        <Columns
            data={mainVideo}
            channel={channel}
            videos={relatedVideos}
        />
    );
}

export default WatchPage;