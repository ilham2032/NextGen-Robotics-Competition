export type Team = {
  id: string
  name: string
  school: string
  members: number
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
