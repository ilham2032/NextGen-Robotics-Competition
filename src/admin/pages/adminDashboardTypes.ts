import type { Team as BaseTeam } from '../types'

export type TeamStatus = 'checked-in' | 'late' | 'absent'

export type TeamRecord = BaseTeam & {
  status: TeamStatus
  robotType: string
  membersList: string[]
  matchId?: string
  score: number
  wins: number
  penalties: number
  bonuses: number
}

export type MatchRound = 'Qualification' | 'Semi-finals' | 'Finals'

export type MatchSlot = {
  id: string
  round: MatchRound
  time: string
  arena: string
  teamA: string
  teamB: string
  status: 'Pending' | 'Live' | 'Completed' | 'Delayed'
  scoreA: number
  scoreB: number
  winner?: string
  notes?: string
}

export type ScoringRule = {
  id: string
  title: string
  description: string
  value: number
  type: 'Base' | 'Bonus' | 'Penalty'
}

export type LeaderboardRow = {
  teamId: string
  teamName: string
  score: number
  wins: number
  points: number
  tieBreaker: number
}

export type EventSettings = {
  eventName: string
  eventStatus: 'Upcoming' | 'Live' | 'Finished'
  eventDate: string
  venue: string
  matchDuration: number
  logoUrl: string
  scoringRules: ScoringRule[]
}
