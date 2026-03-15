import useMediaQuery from "../hooks/useMediaQuery";
import SkeletonDesktop from "./SkeletonDesktop";
import SkeletonMobile from "./SkeletonMobile";
import "./VideoCardSkeleton.css"


function VideoCardSkeleton() {

    const isMobile = useMediaQuery("(max-width: 900px)")

    return isMobile ? (<SkeletonMobile />) : (<SkeletonDesktop />);
}

export default VideoCardSkeleton