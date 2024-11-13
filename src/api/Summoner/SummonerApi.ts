import {SummonerType} from "./SummonerType";
import {SUMMONER_BASE_URL} from "./SummonerConfig";
import {API_KEY} from "../ApiConfig";


export const fetchSummoner = (summonerName: string): void => {
    fetch(`${SUMMONER_BASE_URL}/riot/account/v1/accounts/by-riot-id/${summonerName}/EUW`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": API_KEY
        }
    })
        .then((response) => response.json())
        .then((summonerType: SummonerType) => console.log(summonerType));
}
