export type TeamPaymentStatus = "pending" | "paid"

export type TeamPaymentMethod = "card" | "bank_transfer"

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
  paymentStatus?: TeamPaymentStatus
  paymentAmount?: number
  paymentMethod?: TeamPaymentMethod
  paidAt?: string
  /** Tournament group label, e.g. "A" or "B" */
  group?: string
}

export type Category = {
  id: string
  name: string
  description: string
  pdfName: string
  pdfDataUrl: string
  ageMin?: number
  ageMax?: number
  maxMembers?: number
}

export type Mentor = {
  id: string
  name: string
  surname: string
  fin: string
  email: string
  dateOfBirth: string
  country: string
  registeredAt: string
  phone?: string
  /** @deprecated Legacy accounts only */
  age?: number
  passwordHash?: string
  passwordSalt?: string
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
  categoryId?: string
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
  /** Tournament group this battle belongs to */
  group?: string
}

export type TrackResult = {
  id: string
  categoryId: string
  teamId: string
  /** Time to finish the track in seconds — lower is better */
  finishTime: number
  refereeId: string
  recordedAt: string
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
  /** Tournament group for grouped categories */
  group?: string
  /** Finish time in seconds for track categories */
  trackFinishTime?: number
}
