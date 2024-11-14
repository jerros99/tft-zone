import {SUMMONER_BASE_URL} from "./SummonerConfig";
import {API_KEY} from "../ApiConfig";


export const fetchSummonerBySummonerName = (summonerName: string): Promise<Response> => {
    return fetch(`${SUMMONER_BASE_URL}/riot/account/v1/accounts/by-riot-id/${summonerName}/EUW`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": API_KEY
        }
    })
}
