import React, {ChangeEvent, useState} from 'react';
import {fetchSummoner} from "../../api/Summoner/SummonerApi";

export function Header() {
    const [summonerName, setSummonerName] = useState("");

    const onSummonerNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSummonerName(event.target.value);
    }

    const checkSummoner = (): Object => {
        console.log(summonerName)
        fetchSummoner(summonerName);
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

