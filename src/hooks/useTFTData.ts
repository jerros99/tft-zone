import {useState} from 'react';
import {fetchSummonerBySummonerName} from "../api/Summoner/SummonerApi";
import {fetchGameById, fetchGameIdsByPuuid} from "../api/Game/GameApi";
import {
    Game,
    Participant,
    PlayerPlacementData,
    PlayerStatistic,
    Statistic,
    StatisticEnum,
    Trait,
    Unit
} from "../api/Game/GameType";
import {SummonerType} from "../api/Summoner/SummonerType";
import {delay} from "../utils/utils";

export function useTFTData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [loadingPercentage, setLoadingPercentage] = useState(0);

    const getStatistic = (placementsMap: Map<string, number[]>, dataType: StatisticEnum): Statistic[] => {
        const statistics: Statistic[] = []
        placementsMap.forEach((value: number[], key: string) => {
            const stat: Statistic = {
                type: dataType,
                id: key,
                totalGame: value.length,
                top: value.filter((placement: number) => placement <= 4).length,
                win: value.filter((placement: number) => placement === 1).length,
                placement: value.reduce((accumulator: number, placement: number) => accumulator + placement, 0) / value.length,
            };
            statistics.push(stat)
        })
        return statistics;
    }

    async function getPlayerStatistic(summonerName: string): Promise<PlayerStatistic | undefined> {
        const playerAnalyticsData: PlayerPlacementData | undefined = await getGameData(summonerName);

        if (playerAnalyticsData) {
            return {
                games: playerAnalyticsData?.games,
                augmentStatistic: getStatistic(playerAnalyticsData?.augmentPlacement, StatisticEnum.AUGMENT),
                traitStatistic: getStatistic(playerAnalyticsData?.traitPlacement, StatisticEnum.TRAIT),
                unitStatistic: getStatistic(playerAnalyticsData?.unitPlacement, StatisticEnum.UNIT),
            };

        }

        return undefined;
    }

    async function getGameData(summonerName: string): Promise<PlayerPlacementData | undefined> {
        const games: Game[] = [];
        let unitPlacements: Map<string, number[]> = new Map<string, number[]>();
        let augmentPlacements: Map<string, number[]> = new Map<string, number[]>();
        let traitPlacements: Map<string, number[]> = new Map<string, number[]>();
        try {
            if (isLoading) {
                return;
            }
            setIsLoading(true);
            setError(null);

            const response: Response = await fetchSummonerBySummonerName(summonerName);
            const summoner: SummonerType = await response.json();
            const puuid: string = summoner.puuid;

            const gamesResponse = await fetchGameIdsByPuuid(puuid);
            const gameIds: string[] = await gamesResponse.json();
            let gameCounter: number = 0;

            for (const gameId of gameIds) {
                gameCounter = gameCounter + 1;
                setLoadingPercentage(Math.round((gameCounter / gameIds.length) * 100));
                const response: Response = await fetchGameById(gameId);
                const game: Game = await response.json();
                games.push(game);
                await delay(250);  // Delay applied between requests

                const participant = game.info.participants.find(
                    (participant: Participant) => participant.puuid === puuid
                );

                if (participant) {
                    const placement: number = participant?.placement;
                    participant.augments.forEach((augment: string) => {
                        const existingPlacementsList: number[] = augmentPlacements.get(augment) || [];
                        augmentPlacements = augmentPlacements.set(augment, [...existingPlacementsList, placement]);
                    })

                    participant.units.forEach((unit: Unit) => {
                        const existingPlacementsList: number[] = unitPlacements.get(unit.character_id) || [];
                        unitPlacements = unitPlacements.set(unit.character_id, [...existingPlacementsList, placement]);
                    })

                    participant.traits.forEach((trait: Trait) => {
                        if (trait.tier_current > 0) {
                            const existingPlacementsList: number[] = augmentPlacements.get(trait.name) || [];
                            traitPlacements = traitPlacements.set(trait.name, [...existingPlacementsList, placement]);
                        }
                    })
                }
            }
            setLoadingPercentage(0);
            setIsLoading(false);
            return {
                games: games,
                augmentPlacement: augmentPlacements,
                traitPlacement: traitPlacements,
                unitPlacement: unitPlacements,
            }
        } catch (err) {
            setError('Error fetching data');
            return undefined;
        }
    }

    return {
        getPlayerStatistic,
        loadingPercentage,
        isLoading,
        error,
    };
}

