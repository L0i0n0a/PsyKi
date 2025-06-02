"use client";
import ColorSlider from "@/components/ui/Button/ColorSlider";

const Prototyp = ({}) => { {/* JSOn inputs */}
    // state management mit useEffect (als effekt anderung einer variable) dann automatisches aktualisieren der states

    //getJSONInput()
    return (
        <div className="fullContainer">
            <div className="prototypContainer">
                {/*  Header dynamisch */}
                {/*  info button Component */}
                {/*  fortschritt Component */}
                <div className="imageContainer">
                   {/*  Image Component */}
                </div>
                <div className="intractionContainer">
                    <ColorSlider initial={30} onChange={(val) => console.log("Sliderwert:", val)}/>
                    {/*  AI empfehlung Component */}
                    {/*  Buttons entscheidung Component */}
                    {/*  Feedback Component */}
                </div>
            </div>
        </div>
        
    )
}
export default Prototyp;