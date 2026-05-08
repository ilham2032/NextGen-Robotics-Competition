import type { Category, Member, Mentor, Team, Referee, MatchResult, CompetitionResult } from "./types"
import type { EventSettings } from "./pages/adminDashboardTypes"

const TEAM_STORAGE_KEY = "nextgen_admin_teams"
const CATEGORY_STORAGE_KEY = "nextgen_admin_categories"
const MENTOR_STORAGE_KEY = "nextgen_mentors"
const MENTOR_SESSION_KEY = "nextgen_mentor_session"
const MEMBER_STORAGE_KEY = "nextgen_members"
const REFEREE_STORAGE_KEY = "nextgen_referees"
const REFEREE_SESSION_KEY = "nextgen_referee_session"
const MATCH_RESULTS_KEY = "nextgen_match_results"
const COMPETITION_RESULTS_KEY = "nextgen_competition_results"
const SETTINGS_STORAGE_KEY = "nextgen_admin_settings"

const defaultTeams: Team[] = []

const defaultCategories: Category[] = []

const parseStoredList = <T,>(raw: string | null): T[] | null => {
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as T[]) : null
  } catch {
    return null
  }
}

export const getTeams = (): Team[] => {
  const stored = parseStoredList<Team>(localStorage.getItem(TEAM_STORAGE_KEY))
  return stored && stored.length > 0 ? stored : defaultTeams
}

export const saveTeams = (teams: Team[]): void => {
  localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teams))
}

export const getCategories = (): Category[] => {
  const stored = parseStoredList<Category>(localStorage.getItem(CATEGORY_STORAGE_KEY))
  return stored && stored.length > 0 ? stored : defaultCategories
}

export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories))
}

export const createId = (prefix: string): string =>
  `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`

export const getMentors = (): Mentor[] => parseStoredList<Mentor>(localStorage.getItem(MENTOR_STORAGE_KEY)) ?? []

export const saveMentors = (mentors: Mentor[]): void => {
  localStorage.setItem(MENTOR_STORAGE_KEY, JSON.stringify(mentors))
}

export const setMentorSession = (mentorId: string): void => {
  localStorage.setItem(MENTOR_SESSION_KEY, mentorId)
}

export const getMentorSession = (): string | null => localStorage.getItem(MENTOR_SESSION_KEY)

export const clearMentorSession = (): void => {
  localStorage.removeItem(MENTOR_SESSION_KEY)
}

export const getMembers = (): Member[] => parseStoredList<Member>(localStorage.getItem(MEMBER_STORAGE_KEY)) ?? []

export const saveMembers = (members: Member[]): void => {
  localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(members))
}

export const getReferees = (): Referee[] => parseStoredList<Referee>(localStorage.getItem(REFEREE_STORAGE_KEY)) ?? []

export const saveReferees = (referees: Referee[]): void => {
  localStorage.setItem(REFEREE_STORAGE_KEY, JSON.stringify(referees))
}

export const setRefereeSession = (refereeId: string): void => {
  localStorage.setItem(REFEREE_SESSION_KEY, refereeId)
}

export const getRefereeSession = (): string | null => localStorage.getItem(REFEREE_SESSION_KEY)

export const clearRefereeSession = (): void => {
  localStorage.removeItem(REFEREE_SESSION_KEY)
}

export const getMatchResults = (): MatchResult[] => parseStoredList<MatchResult>(localStorage.getItem(MATCH_RESULTS_KEY)) ?? []

export const saveMatchResults = (results: MatchResult[]): void => {
  localStorage.setItem(MATCH_RESULTS_KEY, JSON.stringify(results))
}

export const getCompetitionResults = (): CompetitionResult[] => parseStoredList<CompetitionResult>(localStorage.getItem(COMPETITION_RESULTS_KEY)) ?? []

export const saveCompetitionResults = (results: CompetitionResult[]): void => {
  localStorage.setItem(COMPETITION_RESULTS_KEY, JSON.stringify(results))
}

export const getSettings = (): EventSettings | null => {
  const stored = localStorage.getItem(SETTINGS_STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export const saveSettings = (settings: EventSettings): void => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
}

export const clearAllData = (): void => {
  // Clear all user/member related data
  localStorage.removeItem(TEAM_STORAGE_KEY)
  localStorage.removeItem(MENTOR_STORAGE_KEY)
  localStorage.removeItem(MEMBER_STORAGE_KEY)
  localStorage.removeItem(REFEREE_STORAGE_KEY)
  localStorage.removeItem(MENTOR_SESSION_KEY)
  localStorage.removeItem(REFEREE_SESSION_KEY)
  localStorage.removeItem(MATCH_RESULTS_KEY)
  localStorage.removeItem(COMPETITION_RESULTS_KEY)
}
