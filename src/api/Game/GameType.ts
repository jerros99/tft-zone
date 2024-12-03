export type Metadata = {
    data_version: string;
    match_id: string;
    participants: string[];
}

export type Info = {
    game_datetime: number;
    game_length: number;
    game_variation: string;
    game_version: string;
    participants: Participant[];
    queue_id: number;
    tft_set_number: number;
}

export type Participant = {
    gold_left: number;
    last_round: number;
    level: number;
    placement: number;
    players_eliminated: number;
    puuid: string;
    riotIdGameName: string;
    riotIdTagline: string;
    time_eliminated: number;
    total_damage_to_players: number;
    traits: Trait[];
    units: Unit[];
}

export type Trait = {
    name: string;
    num_units: number;
    style: number;
    tier_current: number;
    tier_total: number;
}

export type Unit = {
    items: number[];
    character_id: string;
    chosen: string;
    name: string;
    rarity: number;
    tier: number;
}

export type Game = {
    info: Info;
    metadata: Metadata;
}

export type SummonerPlacementData = {
    games: Game[],
    unitPlacement: Map<string, number[]>,
    traitPlacement: Map<string, number[]>,
}

export enum StatisticEnum {
    TRAIT = "TRAIT",
    UNIT = "UNIT",
}

export type Statistic = {
    type: StatisticEnum,
    id: string,
    totalGame: number,
    win: number,
    top: number,
    placement: number,
}

export type SummonerStatistic = {
    games: Game[],
    unitStatistic: Statistic[],
    traitStatistic: Statistic[],
}
