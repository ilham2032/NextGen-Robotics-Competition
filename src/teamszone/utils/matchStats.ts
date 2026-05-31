import type { MatchResult, Team, CompetitionResult } from '../../admin/types'

export type TeamStanding = {
  team: Team
  wins: number
  losses: number
  draws: number
  points: number
  matchesPlayed: number
}

export const computeStandings = (
  categoryTeams: Team[],
  categoryMatches: MatchResult[],
  allTeams: Team[],
): TeamStanding[] => {
  const teamStats = new Map<string, { wins: number; losses: number; draws: number; points: number }>()

  categoryTeams.forEach((team) => {
    teamStats.set(team.id, { wins: 0, losses: 0, draws: 0, points: 0 })
  })

  categoryMatches.forEach((match) => {
    const team1Stats = teamStats.get(match.team1Id)
    const team2Stats = teamStats.get(match.team2Id)
    if (!team1Stats || !team2Stats) return

    if (match.winnerId === match.team1Id) {
      team1Stats.wins++
      team2Stats.losses++
      team1Stats.points += 3
    } else if (match.winnerId === match.team2Id) {
      team2Stats.wins++
      team1Stats.losses++
      team2Stats.points += 3
    } else {
      team1Stats.draws++
      team2Stats.draws++
      team1Stats.points += 1
      team2Stats.points += 1
    }
  })

  return Array.from(teamStats.entries())
    .map(([teamId, stats]) => ({
      team: allTeams.find((t) => t.id === teamId)!,
      ...stats,
      matchesPlayed: stats.wins + stats.losses + stats.draws,
    }))
    .filter((standing) => standing.team)
    .sort((a, b) => b.points - a.points || b.wins - a.wins)
}

export const getFinalizedWinners = (
  competitionResults: CompetitionResult[],
  categoryId: string,
  allTeams: Team[],
  group?: string,
) =>
  competitionResults
    .filter((result) => {
      if (result.categoryId !== categoryId || !result.finalized) return false
      if (group) return result.group === group
      return !result.group
    })
    .sort((a, b) => a.position - b.position)
    .map((result) => ({
      ...result,
      team: allTeams.find((t) => t.id === result.teamId),
    }))
    .filter((entry) => entry.team)

export const getFinalizedWinnersByGroup = (
  competitionResults: CompetitionResult[],
  categoryId: string,
  allTeams: Team[],
  groups: string[],
) =>
  groups.map((group) => ({
    group,
    winners: getFinalizedWinners(competitionResults, categoryId, allTeams, group),
  }))

export const getPositionLabel = (position: number): string => {
  if (position === 1) return '1st Place'
  if (position === 2) return '2nd Place'
  if (position === 3) return '3rd Place'
  return `${position}th Place`
}
