import React, {useContext} from 'react';
import bgImage from '../../assets/bg-tft-zone.jpg'
import {TFTDataContext} from "../../App";
import Loader from "../../component/loader/Loader";

type Props = {
    children: React.ReactNode,
}
export function HomePage({children}:Props) {
    const {isLoading, dataCounter, totalGameData} = useContext(TFTDataContext)
    return (
        <div className="home-page">
            <div className="home-page__background">
                <img src={bgImage}/>
            </div>

            {isLoading && (
                <span>
                    <Loader />
                    {`${dataCounter}/${totalGameData}`}
                </span>
            )}
        </div>
    );
}

