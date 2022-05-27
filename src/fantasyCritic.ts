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

export interface LeagueManager {
    leagueID: string;
    leagueName: string;
    userID: string;
    displayName: string;
    removable: boolean;
}

export interface Player {
    leagueID: string;
    leagueName: string;
    userID: string;
    displayName: string;
    removable: boolean;
}

export interface League {
    leagueID: string;
    leagueName: string;
    leagueManager: LeagueManager;
    isManager: boolean;
    players: Player[];
    outstandingInvite?: any;
    years: number[];
    activeYear: number;
    publicLeague: boolean;
    testLeague: boolean;
    archived: boolean;
    userIsInLeague: boolean;
    userIsFollowingLeague: boolean;
    numberOfFollowers: number;
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

export interface Publisher {
    publisherID: string;
    leagueID: string;
    userID: string;
    publisherName: string;
    publisherIcon: string;
    leagueName: string;
    playerName: string;
    year: number;
    draftPosition: number;
    autoDraft: boolean;
    averageCriticScore: number;
    totalFantasyPoints: number;
    totalProjectedPoints: number;
    budget: number;
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

export interface Player2 {
    inviteID?: any;
    inviteName?: any;
    user: User;
    publisher: Publisher;
    totalFantasyPoints: number;
    projectedFantasyPoints: number;
    previousYearWinner: boolean;
    ranking: number;
    projectedRanking: number;
}

export interface MasterGame {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate: string;
    internationalReleaseDate: string;
    announcementDate: string;
    releaseDate: string;
    isReleased: boolean;
    releasingToday: boolean;
    willRelease: boolean;
    delayContention: boolean;
    criticScore?: number;
    fantasyPoints?: number;
    averagedScore: boolean;
    openCriticID?: number;
    ggToken: string;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName: string;
    ggCoverArtFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition?: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    peakHypeFactor: number;
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
    fantasyPoints?: number;
    criticScore?: number;
    masterGame: MasterGame;
    overallDraftPosition?: number;
    bidAmount?: number;
    acquiredInTradeID?: any;
    slotNumber: number;
    linked: boolean;
    released: boolean;
    willRelease: boolean;
    manualCriticScore: boolean;
    manualWillNotRelease: boolean;
    counterPicked: boolean;
    dropBlocked: boolean;
    removedTimestamp?: any;
    removedNote?: any;
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
    announcementDate?: any;
    releaseDate?: any;
    isReleased: boolean;
    releasingToday: boolean;
    willRelease: boolean;
    delayContention: boolean;
    criticScore?: any;
    fantasyPoints: number;
    averagedScore: boolean;
    openCriticID?: any;
    ggToken: string;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName: string;
    ggCoverArtFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    peakHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface FormerGame {
    publisherGameID: string;
    gameName: string;
    timestamp: Date;
    counterPick: boolean;
    estimatedReleaseDate: string;
    releaseDate?: any;
    fantasyPoints: number;
    criticScore?: any;
    masterGame: MasterGame2;
    overallDraftPosition: number;
    bidAmount?: any;
    acquiredInTradeID?: any;
    slotNumber: number;
    linked: boolean;
    released: boolean;
    willRelease: boolean;
    manualCriticScore: boolean;
    manualWillNotRelease: boolean;
    counterPicked: boolean;
    dropBlocked: boolean;
    removedTimestamp: Date;
    removedNote: string;
}

export interface SpecialSlot {
    specialSlotPosition: number;
    requiredTags: string[];
}

export interface MasterGame3 {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate: string;
    internationalReleaseDate: string;
    announcementDate: string;
    releaseDate: string;
    isReleased: boolean;
    releasingToday: boolean;
    willRelease: boolean;
    delayContention: boolean;
    criticScore?: number;
    fantasyPoints?: number;
    averagedScore: boolean;
    openCriticID?: number;
    ggToken: string;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName: string;
    ggCoverArtFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition?: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    peakHypeFactor: number;
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
    fantasyPoints?: number;
    criticScore?: number;
    masterGame: MasterGame3;
    overallDraftPosition?: number;
    bidAmount?: number;
    acquiredInTradeID?: any;
    slotNumber: number;
    linked: boolean;
    released: boolean;
    willRelease: boolean;
    manualCriticScore: boolean;
    manualWillNotRelease: boolean;
    counterPicked: boolean;
    dropBlocked: boolean;
    removedTimestamp?: any;
    removedNote?: any;
}

export interface GameSlot {
    slotNumber: number;
    overallSlotNumber: number;
    counterPick: boolean;
    specialSlot: SpecialSlot;
    publisherGame: PublisherGame;
    eligibilityErrors: string[];
    gameMeetsSlotCriteria: boolean;
    projectedFantasyPoints: number;
}

export interface Publisher2 {
    publisherID: string;
    leagueID: string;
    userID: string;
    publisherName: string;
    publisherIcon: string;
    publisherSlogan?: any;
    leagueName: string;
    playerName: string;
    year: number;
    draftPosition: number;
    autoDraft: boolean;
    games: Game[];
    formerGames: FormerGame[];
    gameSlots: GameSlot[];
    averageCriticScore: number;
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
    superDropsAvailable: number;
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

export interface SpecialSlot2 {
    bannedTags: string[];
    requiredTags: string[];
    counterPick: boolean;
}

export interface SlotInfo {
    overallSlot: OverallSlot;
    regularSlot: RegularSlot;
    specialSlots: SpecialSlot2[];
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

export interface MasterGame5 {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate?: any;
    internationalReleaseDate?: any;
    announcementDate: string;
    releaseDate: string;
    isReleased: boolean;
    releasingToday: boolean;
    willRelease: boolean;
    delayContention: boolean;
    criticScore?: any;
    fantasyPoints?: any;
    averagedScore: boolean;
    openCriticID?: any;
    ggToken?: any;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName?: any;
    ggCoverArtFileName?: any;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    peakHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface MasterGame4 {
    masterGame: MasterGame5;
    counterPick: boolean;
    eligibilityErrors: any[];
}

export interface PublicBiddingGames {
    masterGames: MasterGame4[];
    postedTimestamp: Date;
}

export interface MasterGameYear {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate?: any;
    internationalReleaseDate?: any;
    announcementDate?: any;
    releaseDate: string;
    isReleased: boolean;
    releasingToday: boolean;
    willRelease: boolean;
    delayContention: boolean;
    criticScore: number;
    fantasyPoints: number;
    averagedScore: boolean;
    openCriticID: number;
    ggToken: string;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName?: any;
    ggCoverArtFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    peakHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface ProposerSendGame {
    masterGameYear: MasterGameYear;
    counterPick: boolean;
}

export interface MasterGameYear2 {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate?: any;
    internationalReleaseDate?: any;
    announcementDate?: any;
    releaseDate?: any;
    isReleased: boolean;
    releasingToday: boolean;
    willRelease: boolean;
    delayContention: boolean;
    criticScore?: any;
    fantasyPoints?: any;
    averagedScore: boolean;
    openCriticID?: any;
    ggToken: string;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName?: any;
    ggCoverArtFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    peakHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface CounterPartySendGame {
    masterGameYear: MasterGameYear2;
    counterPick: boolean;
}

export interface ActiveTrade {
    tradeID: string;
    proposerUserID: string;
    proposerPublisherID: string;
    proposerPublisherName: string;
    proposerDisplayName: string;
    counterPartyUserID: string;
    counterPartyPublisherID: string;
    counterPartyPublisherName: string;
    counterPartyDisplayName: string;
    proposerSendGames: ProposerSendGame[];
    counterPartySendGames: CounterPartySendGame[];
    proposerBudgetSendAmount: number;
    counterPartyBudgetSendAmount: number;
    message: string;
    proposedTimestamp: Date;
    acceptedTimestamp?: any;
    completedTimestamp?: any;
    status: string;
    error?: any;
    votes: any[];
}

export interface MasterGame6 {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate?: any;
    internationalReleaseDate: string;
    announcementDate?: any;
    releaseDate: string;
    isReleased: boolean;
    releasingToday: boolean;
    willRelease: boolean;
    delayContention: boolean;
    criticScore?: number;
    fantasyPoints?: any;
    averagedScore: boolean;
    openCriticID?: number;
    ggToken: string;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName: string;
    ggCoverArtFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    peakHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface UpcomingGame {
    masterGame: MasterGame6;
    masterGameID: string;
    gameName: string;
    estimatedReleaseDate: string;
    maximumReleaseDate: string;
    releaseDate: string;
    leagueID: string;
    year: number;
    leagueName: string;
    publisherID: string;
    publisherName: string;
    counterPickPublisherID: string;
    counterPickPublisherName: string;
}

export interface MasterGame7 {
    masterGameID: string;
    year: number;
    gameName: string;
    estimatedReleaseDate: string;
    minimumReleaseDate: string;
    maximumReleaseDate: string;
    earlyAccessReleaseDate: string;
    internationalReleaseDate?: any;
    announcementDate: string;
    releaseDate: string;
    isReleased: boolean;
    releasingToday: boolean;
    willRelease: boolean;
    delayContention: boolean;
    criticScore?: number;
    fantasyPoints?: number;
    averagedScore: boolean;
    openCriticID?: number;
    ggToken: string;
    subGames: any[];
    tags: string[];
    readableTags: string[];
    boxartFileName: string;
    ggCoverArtFileName: string;
    addedTimestamp: Date;
    percentStandardGame: number;
    percentCounterPick: number;
    eligiblePercentStandardGame: number;
    adjustedPercentCounterPick: number;
    averageDraftPosition: number;
    hypeFactor: number;
    dateAdjustedHypeFactor: number;
    peakHypeFactor: number;
    projectedFantasyPoints: number;
    projectedOrRealFantasyPoints: number;
}

export interface RecentGame {
    masterGame: MasterGame7;
    masterGameID: string;
    gameName: string;
    estimatedReleaseDate: string;
    maximumReleaseDate: string;
    releaseDate: string;
    leagueID: string;
    year: number;
    leagueName: string;
    publisherID: string;
    publisherName: string;
    counterPickPublisherID?: any;
    counterPickPublisherName?: any;
}

export interface GameNews {
    upcomingGames: UpcomingGame[];
    recentGames: RecentGame[];
}

export interface FantasyCriticResponse {
    league: League;
    leagueID: string;
    year: number;
    supportedYear: SupportedYear;
    standardGames: number;
    counterPicks: number;
    draftSystem: string;
    pickupSystem: string;
    tiebreakSystem: string;
    scoringSystem: string;
    tradingSystem: string;
    unlinkedGameExists: boolean;
    userIsActive: boolean;
    hasSpecialSlots: boolean;
    oneShotMode: boolean;
    counterPickDeadline: string;
    players: Player2[];
    publishers: Publisher2[];
    eligibilityOverrides: any[];
    tagOverrides: any[];
    slotInfo: SlotInfo;
    playStatus: PlayStatus;
    managerMessages: any[];
    publicBiddingGames: PublicBiddingGames;
    activeTrades: ActiveTrade[];
    activeSpecialAuctions: any[];
    privatePublisherData?: any;
    gameNews: GameNews;
}
