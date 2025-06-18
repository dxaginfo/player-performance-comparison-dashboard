export interface Player {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  jerseyNumber: string;
  height: string;
  weight: string;
  birthdate: string;
  country: string;
  college?: string;
  draftYear?: string;
  draftRound?: string;
  draftPick?: string;
  teams: TeamHistory[];
  imageUrl?: string;
  active: boolean;
  rookie?: boolean;
}

export interface TeamHistory {
  teamId: string;
  teamName: string;
  teamAbbreviation: string;
  seasonStart: string;
  seasonEnd: string | null; // null if current team
}

export interface PlayerStats {
  playerId: string;
  seasons: SeasonStats[];
  career: CareerStats;
}

export interface SeasonStats {
  season: string;
  team: string;
  gamesPlayed: number;
  gamesStarted: number;
  traditional: TraditionalStats;
  advanced: AdvancedStats;
  shooting: ShootingStats;
  perMinute: PerMinuteStats;
  per36: Per36Stats;
  per100: Per100Stats;
}

export interface CareerStats {
  gamesPlayed: number;
  gamesStarted: number;
  traditional: TraditionalStats;
  advanced: AdvancedStats;
  shooting: ShootingStats;
  perMinute: PerMinuteStats;
  per36: Per36Stats;
  per100: Per100Stats;
}

export interface TraditionalStats {
  minutes: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  personalFouls: number;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  fieldGoalPercentage: number;
  threePointersMade: number;
  threePointersAttempted: number;
  threePointPercentage: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  freeThrowPercentage: number;
  offensiveRebounds: number;
  defensiveRebounds: number;
  plusMinus?: number;
}

export interface AdvancedStats {
  playerEfficiencyRating: number;
  winShares: number;
  boxPlusMinus: number;
  valueOverReplacement: number;
  trueShootingPercentage: number;
  effectiveFieldGoalPercentage: number;
  offensiveReboundPercentage: number;
  defensiveReboundPercentage: number;
  totalReboundPercentage: number;
  assistPercentage: number;
  stealPercentage: number;
  blockPercentage: number;
  turnoverPercentage: number;
  usageRate: number;
  offensiveRating: number;
  defensiveRating: number;
  offensiveWinShares: number;
  defensiveWinShares: number;
  winSharesPer48: number;
  offensiveBoxPlusMinus: number;
  defensiveBoxPlusMinus: number;
}

export interface ShootingStats {
  fieldGoalsByDistance: FieldGoalsByDistance;
  shotChart: ShotChartData;
  assistedFieldGoalPercentage: number;
  dunks: number;
  layups: number;
  pointsInThePaint: number;
}

export interface FieldGoalsByDistance {
  zeroToThreeFeet: ZoneStats;
  threeToTenFeet: ZoneStats;
  tenToSixteenFeet: ZoneStats;
  sixteenFeetToThreePoint: ZoneStats;
  threePoint: ZoneStats;
}

export interface ZoneStats {
  made: number;
  attempted: number;
  percentage: number;
  percentageOfTotal: number; // what % of shots were from this distance
}

export interface ShotChartData {
  shots: ShotAttempt[];
  zones: CourtZone[];
}

export interface ShotAttempt {
  x: number;
  y: number;
  made: boolean;
  value: 2 | 3;
  gameId?: string;
  gameDate?: string;
  quarter?: number;
  minutesRemaining?: number;
  secondsRemaining?: number;
}

export interface CourtZone {
  name: string;
  made: number;
  attempted: number;
  percentage: number;
  points: number;
  frequency: number;
  league_avg_percentage: number;
  points_per_shot: number;
}

export interface PerMinuteStats {
  pointsPerMinute: number;
  reboundsPerMinute: number;
  assistsPerMinute: number;
  stealsPerMinute: number;
  blocksPerMinute: number;
  turnoversPerMinute: number;
}

export interface Per36Stats extends Omit<TraditionalStats, 'minutes'> {
  // All traditional stats calculated per 36 minutes
}

export interface Per100Stats extends Omit<TraditionalStats, 'minutes'> {
  // All traditional stats calculated per 100 possessions
  offensiveRating: number;
  defensiveRating: number;
}

export interface StatCategory {
  id: string;
  name: string;
  category: 'scoring' | 'rebounds' | 'playmaking' | 'defense' | 'efficiency' | 'other';
}