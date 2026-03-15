import ListVideoCard from "../components/ListVideoCard"
import "./ListVideo.css"



function ShortsListVideo({ videos, layout }) {




    return (

        <div className="li-vid-wrapper">

            <ul className={`list-video  ${layout ? layout : ""} `}>

                {videos.map((video) => (

                    <ListVideoCard
                        key={video.id}
                        video={video}
                        variantClasses={layout}
                        showMoreButton={true}
                    />

                ))}

            </ul>

        </div>




    )
}

export default ShortsListVideo