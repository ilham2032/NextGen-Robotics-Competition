import type { Category, Member, Mentor, Team, Referee, MatchResult, CompetitionResult, TrackResult } from "./types"
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
const TRACK_RESULTS_KEY = "nextgen_track_results"
const SETTINGS_STORAGE_KEY = "nextgen_admin_settings"

const defaultTeams: Team[] = []

const defaultCategories: Category[] = [
  {
    id: "cat-1",
    name: "Mini Sumo",
    description: "Robots battle in a circular arena to push each other out.",
    pdfName: "Mini Sumo Regulations",
    pdfDataUrl: "regs/mini-sumo.pdf",
    maxMembers: 3,
    ageMin: 18,
    ageMax: 30,
  },
  {
    id: "cat-2",
    name: "Mini Sumo Kids",
    description: "Mini Sumo competition designed for younger participants.",
    pdfName: "Mini Sumo Kids Regulations",
    pdfDataUrl: "regs/mini-sumo-kids.pdf",
    maxMembers: 3,
    ageMin: 13,
    ageMax: 17,
  },
  {
    id: "cat-3",
    name: "Mega Sumo",
    description: "Larger robots compete in sumo wrestling matches.",
    pdfName: "Mega Sumo Regulations",
    pdfDataUrl: "regs/mega-sumo.pdf",
    maxMembers: 2,
    ageMin: 18,
    ageMax: 30,
  },
  {
    id: "cat-4",
    name: "Lego Line",
    description: "Robots follow a line course using LEGO components.",
    pdfName: "Lego Line Regulations",
    pdfDataUrl: "regs/lego-line.pdf",
    maxMembers: 3,
    ageMin: 8,
    ageMax: 12,
  },
  {
    id: "cat-5",
    name: "Line Follower",
    description: "Autonomous robots navigate complex line courses.",
    pdfName: "Line Follower Regulations",
    pdfDataUrl: "regs/line-follower.pdf",
    maxMembers: 3,
    ageMin: 13,
    ageMax: 18,
  },
  {
    id: "cat-6",
    name: "1kg Lego Sumo",
    description: "1kg LEGO robots compete in sumo battles.",
    pdfName: "1kg Lego Sumo Regulations",
    pdfDataUrl: "regs/1kg-lego-sumo.pdf",
    maxMembers: 3,
    ageMin: 8,
    ageMax: 12,
  },
  {
    id: "cat-7",
    name: "3kg Lego Sumo",
    description: "3kg LEGO robots compete in sumo battles.",
    pdfName: "3kg Lego Sumo Regulations",
    pdfDataUrl: "regs/3kg-lego-sumo.pdf",
    maxMembers: 3,
    ageMin: 8,
    ageMax: 12,
  },
  {
    id: "cat-8",
    name: "Start Up Senior",
    description: "Senior startup robotics competition.",
    pdfName: "",
    pdfDataUrl: "",
    maxMembers: 3,
    ageMin: 18,
    ageMax: 25,
  },
]

const REMOVED_CATEGORY_NAMES = new Set(["drone", "combat robot", "start up junior"])

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

const hasSupabase = Boolean(
  typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_SUPABASE_URL &&
    import.meta.env?.VITE_SUPABASE_ANON_KEY,
)

const REMOTE_API_URL = typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_REMOTE_API_URL as string) || '' : ''
const ADMIN_TOKEN = typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_ADMIN_RESET_TOKEN as string) || '' : ''

const remoteApiBase = (): string => REMOTE_API_URL.replace(/\/$/, '')

const hasRemoteApi = (): boolean => Boolean(REMOTE_API_URL)

const adminHeaders = (): Record<string, string> => ({
  'Content-Type': 'application/json',
  ...(ADMIN_TOKEN ? { 'X-Admin-Token': ADMIN_TOKEN } : {}),
})

// Try Supabase first (if present), then fallback to optional remote API, then localStorage
export const fetchRemoteTeams = async (): Promise<Team[] | null> => {
  try {
    if (hasSupabase) {
      // dynamic import to avoid static dependency when package missing
      const { getTeamsFromSupabase } = await import('../lib/supabaseClient')
      const teams = await getTeamsFromSupabase()
      if (teams) return teams
    }
  } catch {
    // ignore and fallback
  }

  if (hasRemoteApi()) {
    try {
      const res = await fetch(`${remoteApiBase()}/api/teams`)
      if (!res.ok) return null
      const data = await res.json()
      if (Array.isArray(data)) return data as Team[]
    } catch {
      // ignore
    }
  }

  return null
}

export const fetchRemoteMembers = async (): Promise<Member[] | null> => {
  if (!hasRemoteApi()) return null
  try {
    const res = await fetch(`${remoteApiBase()}/api/members/`)
    if (!res.ok) return null
    const data = await res.json()
    if (Array.isArray(data)) return data as Member[]
  } catch {
    // ignore
  }
  return null
}

export const fetchRemoteMentors = async (): Promise<Mentor[] | null> => {
  if (!hasRemoteApi()) return null
  try {
    const res = await fetch(`${remoteApiBase()}/api/mentors/`)
    if (!res.ok) return null
    const data = await res.json()
    if (Array.isArray(data)) return data as Mentor[]
  } catch {
    // ignore
  }
  return null
}

export const pushMentorsToRemote = async (mentors: Mentor[]): Promise<boolean> => {
  if (!hasRemoteApi() || mentors.length === 0) return false
  try {
    const res = await fetch(`${remoteApiBase()}/api/mentors/sync/`, {
      method: 'POST',
      headers: adminHeaders(),
      body: JSON.stringify(mentors),
    })
    return res.ok
  } catch {
    return false
  }
}

export const pushMembersToRemote = async (members: Member[]): Promise<boolean> => {
  if (!hasRemoteApi() || members.length === 0) return false
  try {
    const res = await fetch(`${remoteApiBase()}/api/members/sync/`, {
      method: 'POST',
      headers: adminHeaders(),
      body: JSON.stringify(members),
    })
    return res.ok
  } catch {
    return false
  }
}

export const pushTeamsToRemote = async (teams: Team[]): Promise<boolean> => {
  try {
    if (hasSupabase) {
      const { pushTeamsToSupabase } = await import('../lib/supabaseClient')
      const ok = await pushTeamsToSupabase(teams)
      if (ok) return true
    }
  } catch {
    // ignore and fallback
  }

  if (hasRemoteApi()) {
    try {
      // Mentors and members must exist before team member references resolve.
      await pushMentorsToRemote(getMentors())
      await pushMembersToRemote(getMembers())

      const res = await fetch(`${remoteApiBase()}/api/teams/sync/`, {
        method: 'POST',
        headers: adminHeaders(),
        body: JSON.stringify(teams),
      })
      return res.ok
    } catch {
      return false
    }
  }

  return false
}

// Wipe all teams/members/mentors from the shared backend (admin "Clear All Data")
export const resetRemoteData = async (): Promise<boolean> => {
  if (!hasRemoteApi()) return false

  const adminToken = typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_ADMIN_RESET_TOKEN as string) || '' : ''

  try {
    const res = await fetch(`${remoteApiBase()}/api/reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(adminToken ? { 'X-Admin-Token': adminToken } : {}),
      },
    })
    return res.ok
  } catch {
    return false
  }
}

// Backwards-compatible: save locally and attempt background sync when configured
export const saveTeamsAndSync = (teams: Team[]): void => {
  saveTeams(teams)
  void pushTeamsToRemote(teams)
}

export const saveMembersAndSync = (members: Member[]): void => {
  saveMembers(members)
  void pushMembersToRemote(members)
}

export const saveMentorsAndSync = (mentors: Mentor[]): void => {
  saveMentors(mentors)
  void pushMentorsToRemote(mentors)
}

export const getCategories = (): Category[] => {
  const stored = parseStoredList<Category>(localStorage.getItem(CATEGORY_STORAGE_KEY))
  if (stored && stored.length > 0) {
    // Migrate stored categories by filling missing `maxMembers` from defaults
    const migrated = stored.map((cat) => {
      let updatedCat = cat

      if (updatedCat.pdfDataUrl?.startsWith('/regs/')) {
        updatedCat = { ...updatedCat, pdfDataUrl: updatedCat.pdfDataUrl.replace(/^\//, '') }
      }

      const def = defaultCategories.find(
        (d) => d.id === cat.id || d.name.trim().toLowerCase() === (cat.name || "").trim().toLowerCase(),
      )
      if (def) {
        if (def.maxMembers !== undefined && updatedCat.maxMembers === undefined) {
          updatedCat = { ...updatedCat, maxMembers: def.maxMembers }
        }
        if (def.ageMin !== undefined) {
          updatedCat = { ...updatedCat, ageMin: def.ageMin }
        }
        if (def.ageMax !== undefined) {
          updatedCat = { ...updatedCat, ageMax: def.ageMax }
        }

        if ((!updatedCat.pdfName || updatedCat.pdfName.trim() === "") && def.pdfName) {
          updatedCat = { ...updatedCat, pdfName: def.pdfName }
        }

        const lowerName = (updatedCat.name || "").trim().toLowerCase()
        if (def.pdfDataUrl && (lowerName === "mega sumo" || lowerName === "3kg lego sumo")) {
          if (!updatedCat.pdfDataUrl || updatedCat.pdfDataUrl.trim() === "" || updatedCat.pdfDataUrl !== def.pdfDataUrl) {
            updatedCat = { ...updatedCat, pdfDataUrl: def.pdfDataUrl }
          }
        } else if ((!updatedCat.pdfDataUrl || updatedCat.pdfDataUrl.trim() === "") && def.pdfDataUrl) {
          updatedCat = { ...updatedCat, pdfDataUrl: def.pdfDataUrl }
        }
      }

      // Heuristic fallback: infer sensible defaults from category name when no exact default found
      if (updatedCat.maxMembers === undefined && updatedCat.name) {
        const lower = updatedCat.name.trim().toLowerCase()
        if (lower.includes("drone")) return { ...updatedCat, maxMembers: 1 }
        if (lower.includes("mega")) return { ...updatedCat, maxMembers: 2 }
        if (lower.includes("combat")) return { ...updatedCat, maxMembers: 2 }
        if (lower.includes("mini") || lower.includes("sumo") || lower.includes("lego") || lower.includes("line") || lower.includes("start")) {
          return { ...updatedCat, maxMembers: 3 }
        }
        return { ...updatedCat, maxMembers: 3 }
      }

      return updatedCat
    })

    const sanitized = migrated.filter(
      (cat) => !REMOVED_CATEGORY_NAMES.has((cat.name || "").trim().toLowerCase()),
    )

    // Persist migration if anything changed
    try {
      const changed = JSON.stringify(sanitized) !== JSON.stringify(stored)
      if (changed) localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(sanitized))
    } catch {
      // ignore serialization errors and return stored as-is
    }

    return sanitized
  }

  const sanitizedDefaults = defaultCategories.filter(
    (cat) => !REMOVED_CATEGORY_NAMES.has((cat.name || "").trim().toLowerCase()),
  )

  // Save defaults to localStorage if nothing is stored
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(sanitizedDefaults))
  return sanitizedDefaults
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

export const fetchRemoteMatchResults = async (): Promise<MatchResult[] | null> => {
  if (!hasSupabase) return null
  try {
    const { getMatchResultsFromSupabase } = await import("../lib/supabaseClient")
    return await getMatchResultsFromSupabase()
  } catch {
    return null
  }
}

export const pushMatchResultsToRemote = async (results: MatchResult[]): Promise<boolean> => {
  if (!hasSupabase) return false
  try {
    const { pushMatchResultsToSupabase } = await import("../lib/supabaseClient")
    return await pushMatchResultsToSupabase(results)
  } catch {
    return false
  }
}

export const saveMatchResultsAndSync = (results: MatchResult[]): void => {
  saveMatchResults(results)
  void pushMatchResultsToRemote(results)
}

export const getCompetitionResults = (): CompetitionResult[] => parseStoredList<CompetitionResult>(localStorage.getItem(COMPETITION_RESULTS_KEY)) ?? []

export const saveCompetitionResults = (results: CompetitionResult[]): void => {
  localStorage.setItem(COMPETITION_RESULTS_KEY, JSON.stringify(results))
}

export const fetchRemoteCompetitionResults = async (): Promise<CompetitionResult[] | null> => {
  if (!hasSupabase) return null
  try {
    const { getCompetitionResultsFromSupabase } = await import("../lib/supabaseClient")
    return await getCompetitionResultsFromSupabase()
  } catch {
    return null
  }
}

export const pushCompetitionResultsToRemote = async (results: CompetitionResult[]): Promise<boolean> => {
  if (!hasSupabase) return false
  try {
    const { pushCompetitionResultsToSupabase } = await import("../lib/supabaseClient")
    return await pushCompetitionResultsToSupabase(results)
  } catch {
    return false
  }
}

export const saveCompetitionResultsAndSync = (results: CompetitionResult[]): void => {
  saveCompetitionResults(results)
  void pushCompetitionResultsToRemote(results)
}

export const getTrackResults = (): TrackResult[] =>
  parseStoredList<TrackResult>(localStorage.getItem(TRACK_RESULTS_KEY)) ?? []

export const saveTrackResults = (results: TrackResult[]): void => {
  localStorage.setItem(TRACK_RESULTS_KEY, JSON.stringify(results))
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

export const clearAllData = async (): Promise<boolean> => {
  // Clear all user/member related data locally
  localStorage.removeItem(TEAM_STORAGE_KEY)
  localStorage.removeItem(MENTOR_STORAGE_KEY)
  localStorage.removeItem(MEMBER_STORAGE_KEY)
  localStorage.removeItem(REFEREE_STORAGE_KEY)
  localStorage.removeItem(MENTOR_SESSION_KEY)
  localStorage.removeItem(REFEREE_SESSION_KEY)
  localStorage.removeItem(MATCH_RESULTS_KEY)
  localStorage.removeItem(COMPETITION_RESULTS_KEY)
  localStorage.removeItem(TRACK_RESULTS_KEY)

  // Also wipe the shared backend so other devices/sites see the reset
  return resetRemoteData()
}
