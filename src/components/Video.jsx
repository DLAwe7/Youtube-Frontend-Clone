import "./Video.css"

function Video({ data }) {


    return <div className="video-wrapper">

        <iframe

            src={`https://www.youtube.com/embed/${data.id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="embedded-video">


        </iframe>

    </div>
}

export default Video