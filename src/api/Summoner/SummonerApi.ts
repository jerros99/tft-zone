import {SUMMONER_BASE_URL} from "./SummonerConfig";


export const fetchSummonerBySummonerName = (summonerName: string): Promise<Response> => {
    return fetch(`${SUMMONER_BASE_URL}/riot/account/v1/accounts/by-riot-id/${summonerName}/EUW`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": process.env["REACT_APP_API_KEY"]!
        }
    })
}
