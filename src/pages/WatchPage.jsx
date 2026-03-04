import { useParams } from "react-router-dom";
import Columns from "../layouts/columns/Columns";
import { useChannel, useVideos } from "../utils/useVideos";
import { videosToFetch } from "../data/videosData";
import { useMemo } from "react";
import { shuffleArray } from "../utils/shuffle";
import ListVideoSkeleton from "../components/ListVideoSkeleton";



function WatchPage() {
    const { videoId } = useParams();

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
        error,
    } = useVideos(mainVideoId, { enabled: mainVideoId.length > 0 });

    const mainVideo = mainVideoData?.[0];
    const channelId = mainVideo?.snippet?.channelId;

    const { data: channelData = [] } = useChannel(channelId ? [channelId] : []);

    const { data: relatedVideos = [] } = useVideos(rightColumnIds);

    const channel = channelData?.[0];

    if (isLoading) return <ListVideoSkeleton count={3} />;
    if (isError) return <p>Error: {error.message}</p>;
    if (!mainVideo) return <p>Video not found.</p>;

    return (
        <Columns
            data={mainVideo}
            channel={channel}
            videos={relatedVideos}
        />
    );
}

export default WatchPage;