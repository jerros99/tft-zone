import {SummonerType} from "./SummonerType";

const API_KEY: string = "RGAPI-e04c4ab3-12ff-4f75-b59b-011dbb533a61";// To hide

const BASE_URL: string = "https://europe.api.riotgames.com";

export const fetchSummoner = (summonerName: string): void => {
    fetch(`${BASE_URL}/riot/account/v1/accounts/by-riot-id/${summonerName}/EUW`,{
        method: 'GET',
        headers: {
            "X-Riot-Token": API_KEY
        }
    })
        .then((response) => response.json())
        .then((summonerType: SummonerType) => console.log(summonerType));
}
