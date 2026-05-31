import type { CompetitionResult, TrackResult, Team } from '../../admin/types'

export const TRACK_CATEGORIES = ['Line Follower', 'Lego Line'] as const

export type TrackCategory = (typeof TRACK_CATEGORIES)[number]

export const isTrackCategory = (categoryName: string): boolean =>
  TRACK_CATEGORIES.some((name) => name.toLowerCase() === categoryName.trim().toLowerCase())

export const formatTrackTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return '—'
  return `${seconds.toFixed(2)} s`
}

export const getTrackResultsForCategory = (
  trackResults: TrackResult[],
  categoryId: string,
): TrackResult[] => trackResults.filter((result) => result.categoryId === categoryId)

export const getTrackResultForTeam = (
  trackResults: TrackResult[],
  categoryId: string,
  teamId: string,
): TrackResult | undefined =>
  trackResults.find((result) => result.categoryId === categoryId && result.teamId === teamId)

export type TrackRankingEntry = {
  team: Team
  finishTime: number
  trackResult: TrackResult
}

export const buildTrackRankings = (
  categoryTrackResults: TrackResult[],
  allTeams: Team[],
): TrackRankingEntry[] =>
  categoryTrackResults
    .map((trackResult) => ({
      team: allTeams.find((t) => t.id === trackResult.teamId)!,
      finishTime: trackResult.finishTime,
      trackResult,
    }))
    .filter((entry) => entry.team)
    .sort((a, b) => a.finishTime - b.finishTime)

export const buildTrackCompetitionResults = (
  categoryId: string,
  refereeId: string,
  rankings: TrackRankingEntry[],
  createId: (prefix: string) => string,
): CompetitionResult[] =>
  rankings.map((entry, index) => ({
    id: createId('result'),
    categoryId,
    teamId: entry.team.id,
    position: index + 1,
    totalScore: entry.finishTime,
    trackFinishTime: entry.finishTime,
    matchesPlayed: 1,
    refereeId,
    finalized: true,
  }))

export const isTrackCategoryFinalized = (
  competitionResults: CompetitionResult[],
  categoryId: string,
): boolean => competitionResults.some((r) => r.categoryId === categoryId && r.finalized && r.trackFinishTime !== undefined)
