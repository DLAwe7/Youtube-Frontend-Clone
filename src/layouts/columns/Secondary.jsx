import ButtonCarroussel from "../../components/Buttons/ButtonCarroussel"
import ListVideo from "../../components/ListVideo"
import "../../components/ListVideo.css"



function Secondary({ videos, mquery, context, layout }) {

    return <div className={`secondary ${mquery || ""}`}>

        <ButtonCarroussel mquery={mquery} context={context} />
        <ListVideo videos={videos} mquery={mquery} context={context} layout={layout} />

    </div>



}

export default Secondary
