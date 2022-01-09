
import { getYear } from 'date-fns';
import fetch from 'cross-fetch';

// import testDataHasBids from "./testData-hasBids.json";
// import testDataNoBids from "./testData-noBids.json";

export const getLeague = async (leagueId: string) => {
    var year = getYear(Date.now());
    const URL = `https://www.fantasycritic.games/api/League/GetLeagueYear?leagueID=${leagueId}&year=${year}`
    var response = await fetch(URL);
    if (response.status != 200)
        return null;

    let data = (await response.json()) as FantasyCriticResponse;
    return data;
}



export interface SupportedYear {
    year: number;
    openForCreation: boolean;
    openForPlay: boolean;
    startDate: Date;
    finished: boolean;
}

export interface User {
    leagueID: string;
    leagueName: string;
    userID: string;
    displayName: string;
    removable: boolean;
}

export interface MasterGame {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate?: any;
    internationalReleaseDate?: any;
    releaseDate: string;
    isReleased: boolean;
    willRelease: boolean;
    criticScore?: any;
    averagedScore: boolean;
    openCriticID?: number;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface Game {
    publisherGameID: string;
    gameName: string;
    timestamp: Date;
    counterPick: boolean;
    estimatedReleaseDate: string;
    releaseDate?: Date;
    fantasyPoints?: any;
    criticScore?: any;
    masterGame: MasterGame;
    overallDraftPosition: number;
    slotNumber: number;
    linked: boolean;
    released: boolean;
    willRelease: boolean;
    manualCriticScore: boolean;
    manualWillNotRelease: boolean;
    dropBlocked: boolean;
}

export interface SpecialSlot {
    specialSlotPosition: number;
    requiredTags: string[];
}

export interface MasterGame2 {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate?: any;
    internationalReleaseDate?: any;
    releaseDate: string;
    isReleased: boolean;
    willRelease: boolean;
    criticScore?: any;
    averagedScore: boolean;
    openCriticID?: number;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface PublisherGame {
    publisherGameID: string;
    gameName: string;
    timestamp: Date;
    counterPick: boolean;
    estimatedReleaseDate: string;
    releaseDate?: Date;
    fantasyPoints?: any;
    criticScore?: any;
    masterGame: MasterGame2;
    overallDraftPosition: number;
    slotNumber: number;
    linked: boolean;
    released: boolean;
    willRelease: boolean;
    manualCriticScore: boolean;
    manualWillNotRelease: boolean;
    dropBlocked: boolean;
}

export interface GameSlot {
    slotNumber: number;
    overallSlotNumber: number;
    counterPick: boolean;
    specialSlot: SpecialSlot;
    publisherGame: PublisherGame;
    eligibilityErrors: any[];
    gameMeetsSlotCriteria: boolean;
    simpleProjectedFantasyPoints: number;
    advancedProjectedFantasyPoints: number;
}

export interface Publisher {
    publisherID: string;
    leagueID: string;
    userID: string;
    publisherName: string;
    leagueName: string;
    playerName: string;
    year: number;
    draftPosition: number;
    autoDraft: boolean;
    games: Game[];
    gameSlots: GameSlot[];
    averageCriticScore?: any;
    totalFantasyPoints: number;
    totalProjectedPoints: number;
    budget: number;
    nextToDraft: boolean;
    userIsInLeague: boolean;
    publicLeague: boolean;
    outstandingInvite: boolean;
    gamesReleased: number;
    gamesWillRelease: number;
    freeGamesDropped: number;
    willNotReleaseGamesDropped: number;
    willReleaseGamesDropped: number;
    freeDroppableGames: number;
    willNotReleaseDroppableGames: number;
    willReleaseDroppableGames: number;
}

export interface Player {
    inviteID: string;
    inviteName?: any;
    user: User;
    publisher: Publisher;
    totalFantasyPoints: number;
    simpleProjectedFantasyPoints: number;
    advancedProjectedFantasyPoints: number;
    previousYearWinner: boolean;
}

export interface MasterGame3 {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate?: any;
    internationalReleaseDate?: any;
    releaseDate: string;
    isReleased: boolean;
    willRelease: boolean;
    criticScore?: any;
    averagedScore: boolean;
    openCriticID?: number;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface Game2 {
    publisherGameID: string;
    gameName: string;
    timestamp: Date;
    counterPick: boolean;
    estimatedReleaseDate: string;
    releaseDate?: Date;
    fantasyPoints?: any;
    criticScore?: any;
    masterGame: MasterGame3;
    overallDraftPosition: number;
    slotNumber: number;
    linked: boolean;
    released: boolean;
    willRelease: boolean;
    manualCriticScore: boolean;
    manualWillNotRelease: boolean;
    dropBlocked: boolean;
}

export interface SpecialSlot2 {
    specialSlotPosition: number;
    requiredTags: string[];
}

export interface MasterGame4 {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate?: any;
    internationalReleaseDate?: any;
    releaseDate: string;
    isReleased: boolean;
    willRelease: boolean;
    criticScore?: any;
    averagedScore: boolean;
    openCriticID?: number;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface PublisherGame2 {
    publisherGameID: string;
    gameName: string;
    timestamp: Date;
    counterPick: boolean;
    estimatedReleaseDate: string;
    releaseDate?: Date;
    fantasyPoints?: any;
    criticScore?: any;
    masterGame: MasterGame4;
    overallDraftPosition: number;
    slotNumber: number;
    linked: boolean;
    released: boolean;
    willRelease: boolean;
    manualCriticScore: boolean;
    manualWillNotRelease: boolean;
    dropBlocked: boolean;
}

export interface GameSlot2 {
    slotNumber: number;
    overallSlotNumber: number;
    counterPick: boolean;
    specialSlot: SpecialSlot2;
    publisherGame: PublisherGame2;
    eligibilityErrors: any[];
    gameMeetsSlotCriteria: boolean;
    simpleProjectedFantasyPoints: number;
    advancedProjectedFantasyPoints: number;
}

export interface Publisher2 {
    publisherID: string;
    leagueID: string;
    userID: string;
    publisherName: string;
    leagueName: string;
    playerName: string;
    year: number;
    draftPosition: number;
    autoDraft: boolean;
    games: Game2[];
    gameSlots: GameSlot2[];
    averageCriticScore?: any;
    totalFantasyPoints: number;
    totalProjectedPoints: number;
    budget: number;
    nextToDraft: boolean;
    userIsInLeague: boolean;
    publicLeague: boolean;
    outstandingInvite: boolean;
    gamesReleased: number;
    gamesWillRelease: number;
    freeGamesDropped: number;
    willNotReleaseGamesDropped: number;
    willReleaseGamesDropped: number;
    freeDroppableGames: number;
    willNotReleaseDroppableGames: number;
    willReleaseDroppableGames: number;
}

export interface OverallSlot {
    bannedTags: string[];
    requiredTags: any[];
    counterPick: boolean;
}

export interface RegularSlot {
    bannedTags: string[];
    requiredTags: any[];
    counterPick: boolean;
}

export interface SpecialSlot3 {
    bannedTags: string[];
    requiredTags: string[];
    counterPick: boolean;
}

export interface CounterPickSlot {
    bannedTags?: any;
    requiredTags?: any;
    counterPick: boolean;
}

export interface SlotInfo {
    overallSlot: OverallSlot;
    regularSlot: RegularSlot;
    specialSlots: SpecialSlot3[];
    counterPickSlot: CounterPickSlot;
}

export interface PlayStatus {
    playStatus: string;
    readyToSetDraftOrder: boolean;
    readyToDraft: boolean;
    playStarted: boolean;
    draftIsActive: boolean;
    draftIsPaused: boolean;
    draftFinished: boolean;
    draftingCounterPicks: boolean;
    startDraftErrors: any[];
}

export interface PublicBiddingGame {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate: string;
    internationalReleaseDate?: any;
    releaseDate: string;
    isReleased: boolean;
    willRelease: boolean;
    criticScore?: any;
    averagedScore: boolean;
    openCriticID?: number;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick?: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface FantasyCriticResponse {
    leagueID: string;
    year: number;
    supportedYear: SupportedYear;
    standardGames: number;
    gamesToDraft: number;
    counterPicks: number;
    draftSystem: string;
    pickupSystem: string;
    scoringSystem: string;
    unlinkedGameExists: boolean;
    userIsActive: boolean;
    hasSpecialSlots: boolean;
    players: Player[];
    publishers: Publisher2[];
    eligibilityOverrides: any[];
    tagOverrides: any[];
    slotInfo: SlotInfo;
    userPublisher?: any;
    playStatus: PlayStatus;
    managerMessages: any[];
    publicBiddingGames: PublicBiddingGame[];
}


