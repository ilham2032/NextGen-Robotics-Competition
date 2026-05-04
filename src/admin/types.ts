export type Team = {
  id: string
  name: string
  school: string
  members: number
  description?: string
  categoryName?: string
  memberIds?: string[]
  memberNames?: string[]
  mentorId?: string
  mentorName?: string
}

export type Category = {
  id: string
  name: string
  description: string
  pdfName: string
  pdfDataUrl: string
  ageMin?: number
  ageMax?: number
}

export type Mentor = {
  id: string
  name: string
  surname: string
  age: number
  email: string
  passwordHash: string
  passwordSalt: string
}

export type Member = {
  id: string
  mentorId: string
  name: string
  surname: string
  age: number
  fin: string
  email: string
  phone: string
}

export type Referee = {
  id: string
  name: string
  surname: string
  email: string
  passwordHash: string
  passwordSalt: string
  role: 'referee' | 'judge' | 'organizer'
}

export type MatchResult = {
  id: string
  categoryId: string
  team1Id: string
  team2Id: string
  team1Score: number
  team2Score: number
  winnerId: string | null // null for draw
  refereeId: string
  round: number
  matchDate: string
  notes?: string
}

export type CompetitionResult = {
  id: string
  categoryId: string
  teamId: string
  position: number // 1st, 2nd, 3rd place
  totalScore: number
  matchesPlayed: number
  refereeId: string
  finalized: boolean
}
