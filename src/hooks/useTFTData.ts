import {useState} from 'react';
import {fetchSummonerBySummonerName} from "../api/Summoner/SummonerApi";
import {fetchGameById, fetchGameIdsByPuuid} from "../api/Game/GameApi";
import {Game, Participant, PlayerStatistic, Statistic, StatisticEnum, Trait, Unit} from "../api/Game/GameType";
import {SummonerType} from "../api/Summoner/SummonerType";
import {delay} from "../utils/utils";


export function useTFTData() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [loadingPercentage, setLoadingPercentage] = useState(0);

    // Data about a summoner
    const [unitData, setUnitData] = useState(new Map<string, number[]>());
    const [augmentData, setAugmentData] = useState(new Map<string, number[]>());
    const [traitData, setTraitData] = useState(new Map<string, number[]>());
    const [playerStatistic, setPlayerStatistic] = useState<PlayerStatistic>();

    const addUnitData = (champion: string, placement: number): void => {
        const existingPlacements: number[] = unitData.get(champion) || [];
        const analyserMap: Map<string, number[]> = unitData.set(champion, [...existingPlacements, placement]);
        setUnitData(analyserMap);
    }

    const addAugmentData = (augment: string, placement: number): void => {
        const existingPlacements: number[] = augmentData.get(augment) || [];
        const analyserMap: Map<string, number[]> = augmentData.set(augment, [...existingPlacements, placement]);
        setAugmentData(analyserMap);
    }

    const addTraitData = (trait: string, placement: number): void => {
        const existingPlacements: number[] = traitData.get(trait) || [];
        const analyserMap: Map<string, number[]> = traitData.set(trait, [...existingPlacements, placement]);
        setTraitData(analyserMap);
    }

    const getDataStatistic = (data:  Map<string, number[]>, dataType: StatisticEnum): Statistic[] => {
        const statistics: Statistic[] = []
        data.forEach((value: number[], key: string)=> {
            const stat: Statistic = {
                type: dataType,
                id: key,
                totalGame: value.length,
                top: value.filter((placement: number) => placement <= 4).length,
                win: value.filter((placement: number) => placement === 1).length,
                placement: value.reduce((accumulator: number, placement: number) => accumulator + placement, 0)/ value.length,
            };
            statistics.push(stat)
        })
        return statistics;
    }

    async function analyzePlayerStatistic(summonnerName: string) {
        await fetchGameData(summonnerName);

        const playerStat: PlayerStatistic = {
            augmentStatistic: getDataStatistic(augmentData, StatisticEnum.AUGMENT),
            traitStatistic: getDataStatistic(traitData, StatisticEnum.TRAIT),
            unitStatistic: getDataStatistic(unitData, StatisticEnum.UNIT),
        }

        setPlayerStatistic(playerStat);
    }

    async function fetchGameData(summonerName: string): Promise<void> {
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

                await delay(250);  // Delay applied between requests

                const participant = game.info.participants.find(
                    (participant: Participant) => participant.puuid === puuid
                );

                if (participant) {
                    const placement: number = participant?.placement;
                    participant.augments.forEach((augment: string) => addAugmentData(augment, placement))
                    participant.units.forEach((unit: Unit) => addUnitData(unit.character_id, placement))
                    participant.traits.forEach((trait: Trait) => trait.tier_current > 0 && addTraitData(trait.name, placement))
                }
            }
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setLoadingPercentage(0);
            setIsLoading(false);
        }
    }

    return {
        analyzePlayerStatistic,
        playerStatistic,
        loadingPercentage,
        isLoading,
        error,
    };
}

