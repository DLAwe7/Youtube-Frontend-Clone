import "./VideoCardSkeleton.css"


function VideoCardSkeleton() {
    return (
        <div className="list-video-card skeleton">
            <div className="thumbnail-wrapper skeleton-box" />
            <div className="list-video-info">
                <div className="skeleton-line title" />
                <div className="skeleton-line channel" />
            </div>
        </div>
    );
}

export default VideoCardSkeleton