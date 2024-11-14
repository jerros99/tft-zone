import {SUMMONER_BASE_URL} from "./SummonerConfig";


export const fetchSummonerBySummonerName = (summonerName: string): Promise<Response> => {
    console.log( process.env["REACT_APP_API_KEY"])
    return fetch(`${SUMMONER_BASE_URL}/riot/account/v1/accounts/by-riot-id/${summonerName}/EUW`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": process.env["REACT_APP_API_KEY"]!
        }
    })
}
