"use client";
import ColorSlider from "@/components/ui/Button/ColorSlider";
import Button from "@/components/ui/Button/Button";

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
                    <Button text="Orange" variant="orange"/>
                    <Button text="Blau" variant="blue"/>
                    {/*  AI empfehlung Component */}
                    {/*  Buttons entscheidung Component */}
                    {/*  Feedback Component */}
                </div>
            </div>
        </div>
        
    )
}
export default Prototyp;