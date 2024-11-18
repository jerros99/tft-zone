import React, {useEffect, useState} from 'react';
import {Loader} from "../../component/loader/Loader";
import {useParams} from "react-router-dom";
import {useTFTData} from "../../hooks/useTFTData";
import {Game, Participant, SummonerStatistic} from "../../api/Game/GameType";

export function SummonersPage() {
    const {summonerName} = useParams();
    const {isLoading, getSummonerStatistic, loadingPercentage} = useTFTData();

    const [summonerStatistic, setSummonerStatistic] = useState<SummonerStatistic | undefined>(undefined);

    useEffect(() => {
        if (summonerName) {
            getSummonerStatistic(summonerName)
                .then(setSummonerStatistic)
        }
    }, []);

    const getStage = (rounds: number): string => {
        const stage = Math.floor((rounds) / 7) + 1;
        const roundStage = ((rounds) % 7) + 1;

        return `${stage}-${roundStage}`;
    };

    return (
        <>
            {isLoading && (
                <Loader loadingMessage={`Récupération des données en cours... ${loadingPercentage}%`}/>
            )}
            <div className="summoners-page">

                {!isLoading && summonerStatistic && (
                    <>
                        <div className="summoners-page__history">
                            {summonerStatistic.games.map((game: Game) => {
                                const participant: Participant = game.info.participants.find((participant: Participant) => participant.riotIdGameName === summonerName)!
                                return (
                                    <div className="summoners-page__game" key={game.metadata.match_id}>
                                        <div className="summoners-page__game-header">
                                            <div>{participant.placement <= 4 ? "Victoire" : "Défaite"}</div>
                                            <div>{participant.last_round}</div>
                                            <div>{getStage(participant.last_round)}</div>
                                            <div>{participant.gold_left}</div>
                                            <div>{participant.total_damage_to_players}</div>
                                        </div>
                                        <div className="summoners-page__game-content">
                                            <div>{participant.placement}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="summoners-page__details">
                            <div className="summoners-page__traits"></div>
                            <div className="summoners-page__augments"></div>
                            <div className="summoners-page__units"></div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

