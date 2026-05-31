import type { CompetitionResult, MatchResult } from '../../admin/types'
import type { TeamStanding } from './matchStats'

export const SUMO_MAX_ROUNDS = 3

export const THREE_ROUND_SUMO_CATEGORIES = [
  'Mini Sumo Kids',
  'Mini Sumo',
  'Mega Sumo',
  '1kg Lego Sumo',
  '3kg Lego Sumo',
] as const

export type ThreeRoundSumoCategory = (typeof THREE_ROUND_SUMO_CATEGORIES)[number]

export const isThreeRoundSumoCategory = (categoryName: string): boolean =>
  THREE_ROUND_SUMO_CATEGORIES.some(
    (name) => name.toLowerCase() === categoryName.trim().toLowerCase(),
  )

export const getCompletedRounds = (matches: MatchResult[]): Set<number> =>
  new Set(matches.map((match) => match.round).filter((round) => round >= 1 && round <= SUMO_MAX_ROUNDS))

export const areAllSumoRoundsComplete = (matches: MatchResult[]): boolean => {
  const completed = getCompletedRounds(matches)
  return [1, 2, 3].every((round) => completed.has(round))
}

export const getSuggestedSumoRound = (matches: MatchResult[]): number => {
  for (let round = 1; round <= SUMO_MAX_ROUNDS; round += 1) {
    if (!matches.some((match) => match.round === round)) {
      return round
    }
  }
  return SUMO_MAX_ROUNDS
}

export const buildCompetitionResults = (
  categoryId: string,
  refereeId: string,
  standings: TeamStanding[],
  createId: (prefix: string) => string,
  group?: string,
): CompetitionResult[] =>
  standings.map((standing, index) => ({
    id: createId('result'),
    categoryId,
    teamId: standing.team.id,
    position: index + 1,
    totalScore: standing.points,
    matchesPlayed: standing.matchesPlayed,
    refereeId,
    finalized: true,
    group,
  }))
