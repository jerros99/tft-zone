import React, {ChangeEvent, useEffect, useState} from 'react';
import {useTFTData} from "../../hooks/useTFTData";

export function Header() {
    const [summonerName, setSummonerName] = useState("");
    const {analyzePlayerStatistic, playerStatistic, dataCounter} = useTFTData();
    const updateSummonerName = (event: ChangeEvent<HTMLInputElement>): void => {
        setSummonerName(event.target.value);
    }

    return (
        <div className="header">
            <div className="title">
                <div className="title__text">TFT ZONE</div>
            </div>
            <div className="navigation">
                <input
                    type="text"
                    value={summonerName}
                    src={summonerName}
                    onChange={updateSummonerName}
                />
                <button onClick={() => analyzePlayerStatistic(summonerName)}>Go</button>
            </div>
        </div>
    );
}

