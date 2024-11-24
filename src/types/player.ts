export interface PlayerMatch {
    metadata: {
      matchId: string;
    };
    info: {
      gameMode: string;
      gameDuration: number;
      participants: Array<{
        puuid: string;
        championName: string;
        championId: number;
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
      }>;
    };
  }
  
  export interface PlayerData {
    gameName: string;
    tagLine: string;
    puuid: string;
    profileIconId?: number;
    summonerLevel?: number;
    recentMatches?: PlayerMatch[];
  }
  
  