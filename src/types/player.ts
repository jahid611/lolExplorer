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
  totalDamageDealtToChampions?: number;
  totalDamageTaken?: number;
  totalMinionsKilled?: number;
  neutralMinionsKilled?: number;
  visionScore?: number;
  teamId: number;
  summoner1Id: number;
  summoner2Id: number;
  perks?: {
    styles: Array<{
      style: number;
      selections: Array<{
        perk: number;
        var1: number;
        var2: number;
        var3: number;
      }>;
    }>;
  };
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
interface TeamObjectives {
  kills: number; // Vous pouvez ajouter d'autres propriétés si nécessaire
}


interface Team {
  objectives: {
    dragon: TeamObjectives;
    baron: TeamObjectives;
    tower: TeamObjectives;
    inhibitor: TeamObjectives;
    riftHerald: TeamObjectives;
    voidgrub?: TeamObjectives; // Facultatif
    champion: TeamObjectives;
  };
}
