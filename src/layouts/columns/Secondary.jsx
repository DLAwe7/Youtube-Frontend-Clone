import ButtonCarroussel from "../../components/Buttons/ButtonCarroussel"
import ListVideo from "../../components/ListVideo"
import "../../components/ListVideo.css"



function Secondary({ videos, mobileVariant, context, layout }) {

    return <div className={`secondary ${mobileVariant || ""}`}>

        <ButtonCarroussel mobileVariant={mobileVariant} context={context} />
        <ListVideo videos={videos} mobileVariant={mobileVariant} context={context} layout={layout} />

    </div>



}

export default Secondary
