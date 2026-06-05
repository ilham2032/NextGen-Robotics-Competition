import type { CompetitionResult, MatchResult, Team } from '../../admin/types'
import type { TeamStanding } from './matchStats'
import { allGroupTeamsHavePlayed, getAdvancingFinalists, getFinalsQualifierCount } from './groupUtils'

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

/** Referee publishes top teams (by points) as official finals qualifiers for a group. */
export const buildFinalsQualifierResults = (
  categoryId: string,
  refereeId: string,
  standings: TeamStanding[],
  createId: (prefix: string) => string,
  group: string,
): CompetitionResult[] => {
  const announcedAt = new Date().toISOString()
  const qualifiers = getAdvancingFinalists(standings, getFinalsQualifierCount(standings.length))

  return qualifiers.map((standing, index) => ({
    id: createId('result'),
    categoryId,
    teamId: standing.team.id,
    position: index + 1,
    totalScore: standing.points,
    matchesPlayed: standing.matchesPlayed,
    refereeId,
    finalized: true,
    qualifiedForFinals: true,
    announcedAt,
    group,
  }))
}

export const isGroupStageComplete = (
  groupTeams: Team[],
  groupMatches: MatchResult[],
  isSumoFormat: boolean,
): boolean => {
  if (groupTeams.length === 0 || groupMatches.length === 0) return false
  if (!allGroupTeamsHavePlayed(groupTeams, groupMatches)) return false
  if (isSumoFormat && !areAllSumoRoundsComplete(groupMatches)) return false
  return true
}

/** @deprecated Use buildFinalsQualifierResults for group finals */
export const buildCompetitionResults = (
  categoryId: string,
  refereeId: string,
  standings: TeamStanding[],
  createId: (prefix: string) => string,
  group?: string,
): CompetitionResult[] =>
  buildFinalsQualifierResults(categoryId, refereeId, standings, createId, group ?? '')
