import React, {ChangeEvent, useContext, useState} from 'react';
import {TFTDataContext} from "../../App";
import {useNavigate} from "react-router-dom";
import {summonerPath} from "../../routes/Routes";

export function Header() {
    const navigate = useNavigate();
    const [summonerName, setSummonerName] = useState("");

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
                <button onClick={() => navigate(summonerPath(summonerName))}>Go</button>
            </div>
        </div>
    );
}

