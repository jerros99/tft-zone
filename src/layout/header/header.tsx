import React, {ChangeEvent, useContext, useState} from 'react';
import {useTFTData} from "../../hooks/useTFTData";
import {TFTDataContext} from "../../App";

export function Header() {
    const [summonerName, setSummonerName] = useState("");
    const {analyzePlayerStatistic} = useContext(TFTDataContext);
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

