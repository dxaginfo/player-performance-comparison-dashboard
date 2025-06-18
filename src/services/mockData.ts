import { Player, PlayerStats } from '@/types/Player';

// Sample mock player data for development
export const mockPlayers: Player[] = [
  {
    id: 'lebron-james',
    name: 'LeBron James',
    firstName: 'LeBron',
    lastName: 'James',
    position: 'F',
    jerseyNumber: '23',
    height: '6\'9"',
    weight: '250 lbs',
    birthdate: '1984-12-30',
    country: 'USA',
    college: 'St. Vincent-St. Mary HS (OH)',
    draftYear: '2003',
    draftRound: '1',
    draftPick: '1',
    teams: [
      {
        teamId: 'lal',
        teamName: 'Los Angeles Lakers',
        teamAbbreviation: 'LAL',
        seasonStart: '2018',
        seasonEnd: null
      },
      {
        teamId: 'cle',
        teamName: 'Cleveland Cavaliers',
        teamAbbreviation: 'CLE',
        seasonStart: '2014',
        seasonEnd: '2018'
      },
      {
        teamId: 'mia',
        teamName: 'Miami Heat',
        teamAbbreviation: 'MIA',
        seasonStart: '2010',
        seasonEnd: '2014'
      },
      {
        teamId: 'cle',
        teamName: 'Cleveland Cavaliers',
        teamAbbreviation: 'CLE',
        seasonStart: '2003',
        seasonEnd: '2010'
      }
    ],
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
    active: true
  },
  {
    id: 'stephen-curry',
    name: 'Stephen Curry',
    firstName: 'Stephen',
    lastName: 'Curry',
    position: 'G',
    jerseyNumber: '30',
    height: '6\'2"',
    weight: '185 lbs',
    birthdate: '1988-03-14',
    country: 'USA',
    college: 'Davidson',
    draftYear: '2009',
    draftRound: '1',
    draftPick: '7',
    teams: [
      {
        teamId: 'gsw',
        teamName: 'Golden State Warriors',
        teamAbbreviation: 'GSW',
        seasonStart: '2009',
        seasonEnd: null
      }
    ],
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png',
    active: true
  },
  {
    id: 'kevin-durant',
    name: 'Kevin Durant',
    firstName: 'Kevin',
    lastName: 'Durant',
    position: 'F',
    jerseyNumber: '7',
    height: '6\'10"',
    weight: '240 lbs',
    birthdate: '1988-09-29',
    country: 'USA',
    college: 'Texas',
    draftYear: '2007',
    draftRound: '1',
    draftPick: '2',
    teams: [
      {
        teamId: 'phx',
        teamName: 'Phoenix Suns',
        teamAbbreviation: 'PHX',
        seasonStart: '2023',
        seasonEnd: null
      },
      {
        teamId: 'bkn',
        teamName: 'Brooklyn Nets',
        teamAbbreviation: 'BKN',
        seasonStart: '2019',
        seasonEnd: '2023'
      },
      {
        teamId: 'gsw',
        teamName: 'Golden State Warriors',
        teamAbbreviation: 'GSW',
        seasonStart: '2016',
        seasonEnd: '2019'
      },
      {
        teamId: 'okc',
        teamName: 'Oklahoma City Thunder',
        teamAbbreviation: 'OKC',
        seasonStart: '2008',
        seasonEnd: '2016'
      },
      {
        teamId: 'sea',
        teamName: 'Seattle SuperSonics',
        teamAbbreviation: 'SEA',
        seasonStart: '2007',
        seasonEnd: '2008'
      }
    ],
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png',
    active: true
  },
  {
    id: 'michael-jordan',
    name: 'Michael Jordan',
    firstName: 'Michael',
    lastName: 'Jordan',
    position: 'G',
    jerseyNumber: '23',
    height: '6\'6"',
    weight: '216 lbs',
    birthdate: '1963-02-17',
    country: 'USA',
    college: 'North Carolina',
    draftYear: '1984',
    draftRound: '1',
    draftPick: '3',
    teams: [
      {
        teamId: 'was',
        teamName: 'Washington Wizards',
        teamAbbreviation: 'WAS',
        seasonStart: '2001',
        seasonEnd: '2003'
      },
      {
        teamId: 'chi',
        teamName: 'Chicago Bulls',
        teamAbbreviation: 'CHI',
        seasonStart: '1995',
        seasonEnd: '1998'
      },
      {
        teamId: 'chi',
        teamName: 'Chicago Bulls',
        teamAbbreviation: 'CHI',
        seasonStart: '1984',
        seasonEnd: '1993'
      }
    ],
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/893.png',
    active: false
  },
  {
    id: 'giannis-antetokounmpo',
    name: 'Giannis Antetokounmpo',
    firstName: 'Giannis',
    lastName: 'Antetokounmpo',
    position: 'F',
    jerseyNumber: '34',
    height: '6\'11"',
    weight: '242 lbs',
    birthdate: '1994-12-06',
    country: 'Greece',
    draftYear: '2013',
    draftRound: '1',
    draftPick: '15',
    teams: [
      {
        teamId: 'mil',
        teamName: 'Milwaukee Bucks',
        teamAbbreviation: 'MIL',
        seasonStart: '2013',
        seasonEnd: null
      }
    ],
    imageUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png',
    active: true
  }
];

// Simplified placeholder for player stats data
export const mockPlayerStats: Record<string, PlayerStats> = {
  'lebron-james': {
    playerId: 'lebron-james',
    seasons: [
      // This would normally have detailed stats for each season
      // This is a simplified placeholder
    ],
    career: {
      gamesPlayed: 1421,
      gamesStarted: 1419,
      traditional: {
        minutes: 38271,
        points: 38652,
        rebounds: 10667,
        assists: 10420,
        steals: 2237,
        blocks: 1094,
        turnovers: 4868,
        personalFouls: 2508,
        fieldGoalsMade: 14040,
        fieldGoalsAttempted: 28001,
        fieldGoalPercentage: 0.501,
        threePointersMade: 2273,
        threePointersAttempted: 6419,
        threePointPercentage: 0.354,
        freeThrowsMade: 8299,
        freeThrowsAttempted: 11026,
        freeThrowPercentage: 0.752,
        offensiveRebounds: 1828,
        defensiveRebounds: 8839,
        plusMinus: 7574
      },
      advanced: {
        playerEfficiencyRating: 27.3,
        winShares: 248.6,
        boxPlusMinus: 8.9,
        valueOverReplacement: 140.0,
        trueShootingPercentage: 0.589,
        effectiveFieldGoalPercentage: 0.542,
        offensiveReboundPercentage: 5.0,
        defensiveReboundPercentage: 19.2,
        totalReboundPercentage: 12.2,
        assistPercentage: 36.9,
        stealPercentage: 2.1,
        blockPercentage: 1.6,
        turnoverPercentage: 13.2,
        usageRate: 31.5,
        offensiveRating: 116.8,
        defensiveRating: 106.0,
        offensiveWinShares: 174.2,
        defensiveWinShares: 74.3,
        winSharesPer48: 0.237,
        offensiveBoxPlusMinus: 6.9,
        defensiveBoxPlusMinus: 2.0
      },
      shooting: {
        fieldGoalsByDistance: {
          zeroToThreeFeet: {
            made: 6230,
            attempted: 9426,
            percentage: 0.661,
            percentageOfTotal: 33.7
          },
          threeToTenFeet: {
            made: 1805,
            attempted: 4106,
            percentage: 0.440,
            percentageOfTotal: 14.7
          },
          tenToSixteenFeet: {
            made: 1471,
            attempted: 3493,
            percentage: 0.421,
            percentageOfTotal: 12.5
          },
          sixteenFeetToThreePoint: {
            made: 2261,
            attempted: 5557,
            percentage: 0.407,
            percentageOfTotal: 19.8
          },
          threePoint: {
            made: 2273,
            attempted: 6419,
            percentage: 0.354,
            percentageOfTotal: 22.9
          }
        },
        shotChart: {
          shots: [],
          zones: []
        },
        assistedFieldGoalPercentage: 0.33,
        dunks: 2187,
        layups: 4043,
        pointsInThePaint: 22572
      },
      perMinute: {
        pointsPerMinute: 1.01,
        reboundsPerMinute: 0.28,
        assistsPerMinute: 0.27,
        stealsPerMinute: 0.06,
        blocksPerMinute: 0.03,
        turnoversPerMinute: 0.13
      },
      per36: {
        points: 27.3,
        rebounds: 7.5,
        assists: 7.4,
        steals: 1.6,
        blocks: 0.8,
        turnovers: 3.4,
        personalFouls: 1.8,
        fieldGoalsMade: 9.9,
        fieldGoalsAttempted: 19.8,
        fieldGoalPercentage: 0.501,
        threePointersMade: 1.6,
        threePointersAttempted: 4.5,
        threePointPercentage: 0.354,
        freeThrowsMade: 5.9,
        freeThrowsAttempted: 7.8,
        freeThrowPercentage: 0.752,
        offensiveRebounds: 1.3,
        defensiveRebounds: 6.2
      },
      per100: {
        points: 36.3,
        rebounds: 10.0,
        assists: 9.8,
        steals: 2.1,
        blocks: 1.0,
        turnovers: 4.6,
        personalFouls: 2.4,
        fieldGoalsMade: 13.2,
        fieldGoalsAttempted: 26.3,
        fieldGoalPercentage: 0.501,
        threePointersMade: 2.1,
        threePointersAttempted: 6.0,
        threePointPercentage: 0.354,
        freeThrowsMade: 7.8,
        freeThrowsAttempted: 10.4,
        freeThrowPercentage: 0.752,
        offensiveRebounds: 1.7,
        defensiveRebounds: 8.3,
        offensiveRating: 116.8,
        defensiveRating: 106.0
      }
    }
  },
  // Add stats for other players here
};

// Generate simple mock stats for other players
for (const player of mockPlayers) {
  if (!mockPlayerStats[player.id]) {
    mockPlayerStats[player.id] = {
      playerId: player.id,
      seasons: [],
      career: {
        gamesPlayed: Math.floor(Math.random() * 1000) + 300,
        gamesStarted: Math.floor(Math.random() * 900) + 200,
        traditional: {
          minutes: Math.floor(Math.random() * 30000) + 5000,
          points: Math.floor(Math.random() * 20000) + 5000,
          rebounds: Math.floor(Math.random() * 8000) + 1000,
          assists: Math.floor(Math.random() * 5000) + 500,
          steals: Math.floor(Math.random() * 1500) + 100,
          blocks: Math.floor(Math.random() * 1000) + 50,
          turnovers: Math.floor(Math.random() * 2000) + 500,
          personalFouls: Math.floor(Math.random() * 2000) + 500,
          fieldGoalsMade: Math.floor(Math.random() * 7000) + 2000,
          fieldGoalsAttempted: Math.floor(Math.random() * 15000) + 4000,
          fieldGoalPercentage: Math.random() * 0.2 + 0.4,
          threePointersMade: Math.floor(Math.random() * 2000) + 100,
          threePointersAttempted: Math.floor(Math.random() * 5000) + 300,
          threePointPercentage: Math.random() * 0.2 + 0.3,
          freeThrowsMade: Math.floor(Math.random() * 4000) + 1000,
          freeThrowsAttempted: Math.floor(Math.random() * 5000) + 1200,
          freeThrowPercentage: Math.random() * 0.2 + 0.7,
          offensiveRebounds: Math.floor(Math.random() * 2000) + 200,
          defensiveRebounds: Math.floor(Math.random() * 6000) + 800,
          plusMinus: Math.floor(Math.random() * 4000) - 2000
        },
        advanced: {
          playerEfficiencyRating: Math.random() * 15 + 10,
          winShares: Math.random() * 150 + 20,
          boxPlusMinus: Math.random() * 10 - 2,
          valueOverReplacement: Math.random() * 70 + 10,
          trueShootingPercentage: Math.random() * 0.15 + 0.5,
          effectiveFieldGoalPercentage: Math.random() * 0.15 + 0.45,
          offensiveReboundPercentage: Math.random() * 10 + 1,
          defensiveReboundPercentage: Math.random() * 20 + 5,
          totalReboundPercentage: Math.random() * 15 + 3,
          assistPercentage: Math.random() * 30 + 5,
          stealPercentage: Math.random() * 3 + 0.5,
          blockPercentage: Math.random() * 5 + 0.2,
          turnoverPercentage: Math.random() * 15 + 8,
          usageRate: Math.random() * 15 + 15,
          offensiveRating: Math.random() * 20 + 100,
          defensiveRating: Math.random() * 15 + 100,
          offensiveWinShares: Math.random() * 100 + 10,
          defensiveWinShares: Math.random() * 50 + 10,
          winSharesPer48: Math.random() * 0.2 + 0.05,
          offensiveBoxPlusMinus: Math.random() * 8 - 2,
          defensiveBoxPlusMinus: Math.random() * 6 - 3
        },
        shooting: {
          fieldGoalsByDistance: {
            zeroToThreeFeet: {
              made: Math.floor(Math.random() * 3000) + 500,
              attempted: Math.floor(Math.random() * 5000) + 1000,
              percentage: Math.random() * 0.2 + 0.5,
              percentageOfTotal: Math.random() * 20 + 20
            },
            threeToTenFeet: {
              made: Math.floor(Math.random() * 1000) + 200,
              attempted: Math.floor(Math.random() * 2500) + 500,
              percentage: Math.random() * 0.2 + 0.3,
              percentageOfTotal: Math.random() * 10 + 10
            },
            tenToSixteenFeet: {
              made: Math.floor(Math.random() * 1000) + 200,
              attempted: Math.floor(Math.random() * 2500) + 500,
              percentage: Math.random() * 0.2 + 0.3,
              percentageOfTotal: Math.random() * 10 + 10
            },
            sixteenFeetToThreePoint: {
              made: Math.floor(Math.random() * 1000) + 200,
              attempted: Math.floor(Math.random() * 2500) + 500,
              percentage: Math.random() * 0.2 + 0.3,
              percentageOfTotal: Math.random() * 15 + 10
            },
            threePoint: {
              made: Math.floor(Math.random() * 1500) + 100,
              attempted: Math.floor(Math.random() * 4000) + 300,
              percentage: Math.random() * 0.2 + 0.3,
              percentageOfTotal: Math.random() * 20 + 15
            }
          },
          shotChart: {
            shots: [],
            zones: []
          },
          assistedFieldGoalPercentage: Math.random() * 0.5 + 0.2,
          dunks: Math.floor(Math.random() * 1000) + 50,
          layups: Math.floor(Math.random() * 2000) + 500,
          pointsInThePaint: Math.floor(Math.random() * 10000) + 2000
        },
        perMinute: {
          pointsPerMinute: Math.random() * 0.8 + 0.2,
          reboundsPerMinute: Math.random() * 0.3 + 0.1,
          assistsPerMinute: Math.random() * 0.3 + 0.05,
          stealsPerMinute: Math.random() * 0.1 + 0.01,
          blocksPerMinute: Math.random() * 0.1 + 0.01,
          turnoversPerMinute: Math.random() * 0.15 + 0.05
        },
        per36: {
          points: Math.random() * 25 + 5,
          rebounds: Math.random() * 10 + 2,
          assists: Math.random() * 8 + 1,
          steals: Math.random() * 2 + 0.5,
          blocks: Math.random() * 2 + 0.2,
          turnovers: Math.random() * 3 + 1,
          personalFouls: Math.random() * 3 + 1,
          fieldGoalsMade: Math.random() * 10 + 2,
          fieldGoalsAttempted: Math.random() * 20 + 5,
          fieldGoalPercentage: Math.random() * 0.2 + 0.4,
          threePointersMade: Math.random() * 3 + 0.5,
          threePointersAttempted: Math.random() * 8 + 1,
          threePointPercentage: Math.random() * 0.2 + 0.3,
          freeThrowsMade: Math.random() * 6 + 1,
          freeThrowsAttempted: Math.random() * 8 + 1.5,
          freeThrowPercentage: Math.random() * 0.2 + 0.7,
          offensiveRebounds: Math.random() * 3 + 0.5,
          defensiveRebounds: Math.random() * 7 + 1.5
        },
        per100: {
          points: Math.random() * 35 + 10,
          rebounds: Math.random() * 15 + 3,
          assists: Math.random() * 12 + 2,
          steals: Math.random() * 3 + 0.5,
          blocks: Math.random() * 3 + 0.3,
          turnovers: Math.random() * 5 + 1.5,
          personalFouls: Math.random() * 5 + 1.5,
          fieldGoalsMade: Math.random() * 15 + 3,
          fieldGoalsAttempted: Math.random() * 30 + 7,
          fieldGoalPercentage: Math.random() * 0.2 + 0.4,
          threePointersMade: Math.random() * 5 + 0.5,
          threePointersAttempted: Math.random() * 12 + 1.5,
          threePointPercentage: Math.random() * 0.2 + 0.3,
          freeThrowsMade: Math.random() * 10 + 2,
          freeThrowsAttempted: Math.random() * 12 + 3,
          freeThrowPercentage: Math.random() * 0.2 + 0.7,
          offensiveRebounds: Math.random() * 5 + 0.5,
          defensiveRebounds: Math.random() * 10 + 2.5,
          offensiveRating: Math.random() * 20 + 100,
          defensiveRating: Math.random() * 15 + 100
        }
      }
    };
  }
}