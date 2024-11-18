import React, {useEffect} from 'react';
import {Loader} from "../../component/loader/Loader";
import {useParams} from "react-router-dom";
import {useTFTData} from "../../hooks/useTFTData";
import {SummonerStatistic} from "../../api/Game/GameType";

export function SummonersPage() {
    const {summonerName} = useParams();
    const {isLoading, getPlayerStatistic, loadingPercentage} = useTFTData();

    useEffect(() => {
        if (summonerName) {
            getPlayerStatistic(summonerName)
                .then((response) => {
                    console.log(response)
                })

        }
    }, []);

    return (
        <div className="summoners-page">
            {isLoading && (
                <Loader loadingMessage={`Récupération des données en cours... ${loadingPercentage}%`}/>
            )}
            <div className="summoners-page__main">
                <div className="summoners-page__history">
                </div>
            </div>
            <div className="summoners-page__details">
                <div className="summoners-page__traits"></div>
                <div className="summoners-page__augments"></div>
                <div className="summoners-page__units"></div>
            </div>
        </div>
    );
}

