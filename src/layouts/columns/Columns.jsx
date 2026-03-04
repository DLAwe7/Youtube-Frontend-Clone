import Primary from "./Primary"
import Secondary from "./Secondary"
import "./Columns.css"



function Columns({ data, videos, channel }) {

    return <div className="columns-wrapper">

        <Primary data={data} channel={channel} videos={videos} />
        <Secondary videos={videos} context={"secondarySection"} />

    </div>

}

export default Columns