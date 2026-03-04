import "./Description.css"
import useDescriptionController from "../hooks/useDescriptionController";
import useMediaQuery from "../hooks/useMediaQuery";
import DescriptionDesktop from "./DescriptionDesktop";
import DescriptionMobile from "./DescriptionMobile";



function Description({ data, channel }) {

    const isMobile = useMediaQuery("(max-width: 768px)");


    const controller = useDescriptionController(data);






    return isMobile ? (<DescriptionMobile {...controller} data={data} channel={channel} />) : (<DescriptionDesktop {...controller} data={data} channel={channel} />);

}

export default Description


