import ListVideoCard from "../components/ListVideoCard"
import { formatCount, timeAgo } from "../utils/formatters";

import "./ListVideo.css"


function ListVideo({ videos, mquery, context, layout }) {



    return (

        <div className="li-vid-wrapper">

            <ul className={`list-video ${mquery ? mquery : ""} ${layout ? layout : ""} ${context ? context : ""}`}>

                {videos.map((video) => (

                    <ListVideoCard

                        key={video.id}
                        thumbnail={video.snippet.thumbnails.medium.url}
                        videoTitle={video.snippet.title}
                        channelName={video.snippet.channelTitle}
                        views={formatCount(video.statistics.viewCount, "views")}
                        publishDate={timeAgo(video.snippet.publishedAt)}
                        videoId={video.id}
                        context={context}
                        layout={layout}
                    >


                    </ListVideoCard>


                ))}

            </ul>



        </div>

    )
}

export default ListVideo