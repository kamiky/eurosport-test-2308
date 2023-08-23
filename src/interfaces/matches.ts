export interface PlayersMatchesStats {
  [key: string]: PlayerMatchesStats;
}

export interface PlayerMatchesStats {
  wins: number;
  losses: number;
  total: number;
  timePlayed: number;
}
