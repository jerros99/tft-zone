import React, {ChangeEvent, useState} from 'react';
import {fetchSummonerBySummonerName} from "../../api/Summoner/SummonerApi";
import {SummonerType} from "../../api/Summoner/SummonerType";
import {fetchGameById, fetchGameIdsByPuuid} from "../../api/Game/GameApi";
import {Game, Participant} from "../../api/Game/GameType";

export function Header() {
    const [summonerName, setSummonerName] = useState("");

    const onSummonerNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSummonerName(event.target.value);
    }

    const checkSummoner = (): Object => {
        fetchSummonerBySummonerName(summonerName)
            .then((response: Response) => response.json())
            .then((summoner: SummonerType) => {
                const puuid: string = summoner.puuid;
                fetchGameIdsByPuuid(puuid)
                    .then((response: Response)=> response.json())
                    .then((ids: string[]) => {
                        const gameId1 : string = ids[0]
                        fetchGameById(gameId1).then((response) => response.json())
                            .then((game: Game) => {
                                const participants: Participant[] = game.info.participants;
                                const targetParticipant: Participant | undefined = participants.find((participant: Participant)=> participant.puuid === puuid)
                                console.log(targetParticipant);
                            });
                    });
            });
        return {};
    }

    return (
        <div className="header">
            <div className="title">
                <div className="title__text">TFT ZONE</div>
            </div>
            <div className="navigation">
                {/*<div className="navigation__button">Equipe</div>*/}
                {/*<div className="navigation__button">Champions</div>*/}
                {/*<div className="navigation__button">Objets</div>*/}
                {/*<div className="navigation__button">Augment</div>*/}
                {/*<div className="navigation__button">Charms</div>*/}
                {/*<div className="navigation__button">Statistiques</div>*/}
                {/*<div className="navigation__button">Joueurs</div>*/}
                {/*<div className="navigation__button">Création d'équipe</div>*/}
                <input
                    type="text"
                    value={summonerName}
                    src={summonerName}
                    onChange={onSummonerNameChange}
                />
                <button onClick={checkSummoner}>Go</button>
            </div>
        </div>
    );
}

