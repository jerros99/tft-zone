import {GAME_BASE_URL} from "./GameConfig";

export const fetchGameIdsByPuuid = (puuid: string): Promise<Response> => {
    return fetch(`${GAME_BASE_URL}/tft/match/v1/matches/by-puuid/${puuid}/ids`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": process.env["REACT_APP_API_KEY"]!
        }
    })
}


export const fetchGameById = (matchId: string): Promise<Response> => {
    return fetch(`${GAME_BASE_URL}/tft/match/v1/matches/${matchId}`, {
        method: 'GET',
        headers: {
            "X-Riot-Token": process.env["REACT_APP_API_KEY"]!
        }
    });
}
