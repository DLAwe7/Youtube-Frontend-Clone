import Video from "../../components/Video"
import Description from "../../components/Description"
import Comments from "../../components/CommentSection"
import Secondary from "./Secondary"



function Primary({ data, channel, videos }) {


    return <div className="primary">

        <Video data={data} channel={channel} />
        <Description data={data} channel={channel} />
        <Secondary videos={videos} mquery={"mquery"} layout={"grid"} />
        <Comments data={data} />

    </div>

}

export default Primary