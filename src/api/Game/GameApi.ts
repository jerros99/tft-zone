import {API_KEY} from "../ApiConfig";
import {GAME_BASE_URL} from "./GameConfig";

export const fetchGameIdsByPuuid = (puuid: string): void => {
    fetch(`${GAME_BASE_URL}/tft/match/v1/matches/by-puuid/${puuid}/ids`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": API_KEY
        }
    })
        .then((response) => response.json())
        .then((gameIds: string[]) => console.log(gameIds));
}
