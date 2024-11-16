import React, {useEffect} from 'react';
import {Loader} from "../../component/loader/Loader";
import {useParams} from "react-router-dom";
import {useTFTData} from "../../hooks/useTFTData";

export function SummonersPage() {
    const {summonerName} = useParams();
    const {isLoading, analyzePlayerStatistic, loadingPercentage} = useTFTData();

    useEffect(() => {
        if (summonerName) {
            analyzePlayerStatistic(summonerName)
        }
    }, []);

    return (
        <>
            {isLoading && (
                <Loader loadingMessage={`Récupération des données en cours... ${loadingPercentage}%`} />
            )}
            Summoners
        </>
    );
}

