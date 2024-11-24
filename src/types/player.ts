export interface Participant {
    puuid: string;
    summonerName: string;
    championName: string;
    kills: number;
    deaths: number;
    assists: number;
    win: boolean;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
  }
  
  export interface Match {
    metadata: {
      matchId: string;
    };
    info: {
      gameMode: string;
      gameDuration: number;
      participants: Participant[];
    };
  }
  
  export interface RankedInfo {
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
  }
  
  export interface PlayerData {
    gameName: string;
    tagLine: string;
    puuid: string;
    profileIconId: number;
    summonerLevel: number;
    ranks?: RankedInfo[];
    recentMatches?: Match[];
  }
  
  