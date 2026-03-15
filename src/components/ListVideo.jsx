import { useState } from "react";
import ListVideoCard from "../components/ListVideoCard"
import "./ListVideo.css"


function ListVideo({ videos, mobileVariant, context, layout }) {

    const [openMenuId, setOpenMenuId] = useState(null);

    const menuConfig =
        context === "secondarySection"
            ? { showMoreButton: true, menuPosition: "outside" }
            : { showMoreButton: true, menuPosition: "inside" };


    const variantClasses = [mobileVariant, layout, context].filter(Boolean).join(" ");


    return (

        <div className="li-vid-wrapper">

            <ul className={`list-video ${variantClasses}`}>

                {(videos ?? []).map((video) => (

                    <ListVideoCard

                        key={video.id}
                        menuId={video.id}
                        video={video}
                        variantClasses={variantClasses}
                        isMenuOpen={openMenuId === video.id}
                        onToggleMenu={() => setOpenMenuId((prev) => (prev === video.id ? null : video.id))}
                        onCloseMenu={() => setOpenMenuId(null)}
                        {...menuConfig}
                    />

                ))}

            </ul>


        </div>

    )
}

export default ListVideo