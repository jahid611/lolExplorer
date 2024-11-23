export interface MatchParticipant {
    summonerName: string;
    championId: string;
    championName: string;
    champLevel: number;
    summoner1Id: number;
    summoner2Id: number;
    items: number[];
    kills: number;
    deaths: number;
    assists: number;
    totalMinionsKilled: number;
    neutralMinionsKilled: number;
    goldEarned: number;
    win: boolean;
    teamId: number;
    championMastery?: {
      level: number;
      points: number;
    };
  }
  
  export interface Match {
    gameId: string;
    gameDuration: number;
    gameCreation: number;
    participants: MatchParticipant[];
    totalGold: {
      team100: number;
      team200: number;
    };
  }
  