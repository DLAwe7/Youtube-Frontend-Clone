import VideoCardSkeleton from "./VideoCardSkeleton";


function ListVideoSkeleton({ count, size }) {
    return (
        <div className={`list-video ${size}-size`}>
            {Array.from({ length: count }).map((_, i) => (
                <VideoCardSkeleton key={i} />
            ))}
        </div>
    );
}

export default ListVideoSkeleton