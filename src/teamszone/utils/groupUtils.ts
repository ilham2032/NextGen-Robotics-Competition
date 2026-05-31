import type { Team, MatchResult, CompetitionResult } from '../../admin/types'

export const GROUP_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export const getGroupLabels = (count: number): string[] =>
  GROUP_LABELS.slice(0, Math.max(1, Math.min(count, GROUP_LABELS.length)))

export const recommendGroupCount = (teamCount: number): number => {
  if (teamCount <= 1) return 1
  if (teamCount <= 12) return 2
  return Math.min(4, Math.ceil(teamCount / 10))
}

export const getGroupsFromTeams = (teams: Team[]): string[] => {
  const groups = new Set(
    teams.map((team) => team.group?.trim()).filter((group): group is string => Boolean(group)),
  )
  return Array.from(groups).sort()
}

export const categoryUsesGroups = (teams: Team[]): boolean => getGroupsFromTeams(teams).length > 0

export const filterTeamsByGroup = (teams: Team[], group: string): Team[] =>
  teams.filter((team) => team.group?.trim() === group)

export const filterMatchesByGroup = (matches: MatchResult[], group: string): MatchResult[] =>
  matches.filter((match) => match.group?.trim() === group)

export const getTeamGroup = (teams: Team[], teamId: string): string | undefined =>
  teams.find((team) => team.id === teamId)?.group?.trim()

export const teamsShareGroup = (teams: Team[], team1Id: string, team2Id: string): boolean => {
  const group1 = getTeamGroup(teams, team1Id)
  const group2 = getTeamGroup(teams, team2Id)
  if (!group1 || !group2) return false
  return group1 === group2
}

export const allTeamsAssignedToGroups = (teams: Team[], expectedGroups: string[]): boolean => {
  if (teams.length === 0 || expectedGroups.length === 0) return false
  return teams.every((team) => {
    const group = team.group?.trim()
    return group && expectedGroups.includes(group)
  })
}

/** Evenly split teams into groups (e.g. 20 teams → 10 in A, 10 in B). */
export const assignTeamsToGroups = (teams: Team[], groupCount: number): Team[] => {
  if (groupCount < 1) return teams

  const labels = getGroupLabels(groupCount)
  const sorted = [...teams].sort((a, b) => a.name.localeCompare(b.name))
  const perGroup = Math.ceil(sorted.length / groupCount)

  return sorted.map((team, index) => ({
    ...team,
    group: labels[Math.min(Math.floor(index / perGroup), groupCount - 1)],
  }))
}

export const updateTeamGroupInList = (
  allTeams: Team[],
  teamId: string,
  group: string,
): Team[] =>
  allTeams.map((team) => (team.id === teamId ? { ...team, group: group.trim() || undefined } : team))

export const applyCategoryGroupAssignments = (
  allTeams: Team[],
  categoryName: string,
  assignedTeams: Team[],
): Team[] => {
  const assignedById = new Map(assignedTeams.map((team) => [team.id, team]))
  return allTeams.map((team) => {
    if (team.categoryName?.trim() !== categoryName) return team
    const assigned = assignedById.get(team.id)
    return assigned ? { ...team, group: assigned.group } : team
  })
}

export const clearCategoryGroupAssignments = (allTeams: Team[], categoryName: string): Team[] =>
  allTeams.map((team) =>
    team.categoryName?.trim() === categoryName ? { ...team, group: undefined } : team,
  )

export const isGroupFinalized = (
  results: CompetitionResult[],
  categoryId: string,
  group: string,
): boolean =>
  results.some(
    (result) => result.categoryId === categoryId && result.group === group && result.finalized,
  )

export const getGroupTeamCounts = (teams: Team[]): Record<string, number> => {
  const counts: Record<string, number> = {}
  teams.forEach((team) => {
    const group = team.group?.trim()
    if (group) counts[group] = (counts[group] ?? 0) + 1
  })
  return counts
}

export const formatGroupName = (group: string): string => `Group ${group}`
