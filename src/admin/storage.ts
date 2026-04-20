import type { Category, Member, Mentor, Team } from "./types"

const TEAM_STORAGE_KEY = "nextgen_admin_teams"
const CATEGORY_STORAGE_KEY = "nextgen_admin_categories"
const MENTOR_STORAGE_KEY = "nextgen_mentors"
const MENTOR_SESSION_KEY = "nextgen_mentor_session"
const MEMBER_STORAGE_KEY = "nextgen_members"

const defaultTeams: Team[] = []

const defaultCategories: Category[] = [
  {
    id: "category-1",
    name: "Mini Sumo",
    description: "500g autonomous robot battle regulations.",
    pdfName: "mini-sumo.pdf",
    pdfDataUrl: "",
  },
  {
    id: "category-2",
    name: "Mini Sumo Kids",
    description: "Beginner robotics rules for young participants.",
    pdfName: "mini-sumo-kids.pdf",
    pdfDataUrl: "",
  },
  {
    id: "category-3",
    name: "Line Follower",
    description: "Autonomous line tracking challenge regulations.",
    pdfName: "line-follower.pdf",
    pdfDataUrl: "",
  },
  {
    id: "category-4",
    name: "Lego Line",
    description: "LEGO-based line follower competition rules.",
    pdfName: "lego-line.pdf",
    pdfDataUrl: "",
  },
  {
    id: "category-5",
    name: "Combat Robot",
    description: "Robot combat arena safety and battle regulations.",
    pdfName: "combat-robot.pdf",
    pdfDataUrl: "",
  },
  {
    id: "category-6",
    name: "1kg Lego Sumo",
    description: "LEGO sumo category with 1kg robot limit.",
    pdfName: "1kg-lego-sumo.pdf",
    pdfDataUrl: "",
  },
  {
    id: "category-7",
    name: "3kg Lego Sumo",
    description: "Advanced LEGO sumo category with 3kg robot limit.",
    pdfName: "3kg-lego-sumo.pdf",
    pdfDataUrl: "",
  },
  {
    id: "category-8",
    name: "Drone",
    description: "UAV flight and mission challenge regulations.",
    pdfName: "drone.pdf",
    pdfDataUrl: "",
  },
  {
    id: "category-9",
    name: "Start Up Junior",
    description: "Junior startup and innovation pitching challenge.",
    pdfName: "start-up-junior.pdf",
    pdfDataUrl: "",
  },
  {
    id: "category-10",
    name: "Start Up Senior",
    description: "Senior startup and innovation pitching challenge.",
    pdfName: "start-up-senior.pdf",
    pdfDataUrl: "",
  },
]

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
