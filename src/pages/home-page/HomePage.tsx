import React, {useContext} from 'react';
import {TFTDataContext} from "../../App";
import {Loader} from "../../component/loader/Loader";

export function HomePage() {
    const {isLoading, dataCounter, totalGameData} = useContext(TFTDataContext)

    const getLoadingPercentage = () => {
        return Math.round((dataCounter / totalGameData) * 100);
    }

    return (
        <>
            {isLoading && (
                <span>
                    <Loader loadingMessage={`Récupération des données en cours... ${getLoadingPercentage()}%`}/>
                </span>
            )}
        </>
    );
}

