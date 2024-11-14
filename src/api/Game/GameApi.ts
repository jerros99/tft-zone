import {GAME_BASE_URL} from "./GameConfig";
import {Game, Participant} from "./GameType";

export const fetchGameIdsByPuuid = (puuid: string): Promise<Response> => {
    return fetch(`${GAME_BASE_URL}/tft/match/v1/matches/by-puuid/${puuid}/ids`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": process.env["REACT_APP_API_KEY"]!
        }
    })
}


export const fetchGameById = (matchId: string): Promise<Response> => {
    console.log( process.env["REACT_APP_API_KEY"])
    return fetch(`${GAME_BASE_URL}/tft/match/v1/matches/${matchId}`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": process.env["REACT_APP_API_KEY"]!
        }
    });
}
