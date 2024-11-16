import React from "react"
import bgImage from "../../assets/bg-tft-zone.jpg";

type Props = {
    children: React.ReactNode;
}

export function Content({children}: Props) {
    return (
        <div className="content">
            <div className="content__background">
                <img src={bgImage}/>
            </div>
            {children}
        </div>
    );
}

