export interface MatchPlayer {
  championId: string;
  championName: string;
  championLevel: number;
  summonerName: string;
  teamId: number;
  kills: number;
  deaths: number;
  assists: number;
  items: number[];
  summoner1Id: number;
  summoner2Id: number;
  win: boolean;
  role: string;
}

export interface Match {
  gameId: string;
  gameType: string;
  gameDuration: number;
  gameCreation: number;
  participants: MatchPlayer[];
}

export interface PlayerStats {
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  winRate: number;
}
