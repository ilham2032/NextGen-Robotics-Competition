import { createId, getMentorSession, getMentors, saveMentors, setMentorSession, clearMentorSession } from "../admin/storage"
import type { Mentor } from "../admin/types"

const encoder = new TextEncoder()

const toBase64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes))

const randomSalt = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return toBase64(bytes)
}

const deriveHash = async (password: string, salt: string): Promise<string> => {
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), { name: "PBKDF2" }, false, [
    "deriveBits",
  ])
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  )

  return toBase64(new Uint8Array(derivedBits))
}

type SignUpInput = {
  name: string
  surname: string
  age: number
  email: string
  password: string
}

export const signUpMentor = async (payload: SignUpInput): Promise<{ ok: boolean; message: string }> => {
  const mentors = getMentors()
  const email = payload.email.trim().toLowerCase()

  if (mentors.some((mentor) => mentor.email === email)) {
    return { ok: false, message: "Email already registered." }
  }

  const salt = randomSalt()
  const passwordHash = await deriveHash(payload.password, salt)

  const mentor: Mentor = {
    id: createId("mentor"),
    name: payload.name.trim(),
    surname: payload.surname.trim(),
    age: payload.age,
    email,
    passwordHash,
    passwordSalt: salt,
  }

  saveMentors([mentor, ...mentors])
  setMentorSession(mentor.id)

  return { ok: true, message: "Mentor account created." }
}

export const signInMentor = async (email: string, password: string): Promise<{ ok: boolean; message: string }> => {
  const normalizedEmail = email.trim().toLowerCase()
  const mentor = getMentors().find((item) => item.email === normalizedEmail)

  if (!mentor) {
    return { ok: false, message: "Account not found." }
  }

  const hash = await deriveHash(password, mentor.passwordSalt)
  if (hash !== mentor.passwordHash) {
    return { ok: false, message: "Invalid credentials." }
  }

  setMentorSession(mentor.id)
  return { ok: true, message: "Signed in successfully." }
}

export const getCurrentMentor = (): Mentor | null => {
  const mentorId = getMentorSession()
  if (!mentorId) {
    return null
  }

  return getMentors().find((mentor) => mentor.id === mentorId) ?? null
}

export const isMentorAuthenticated = (): boolean => !!getCurrentMentor()

export const signOutMentor = (): void => {
  clearMentorSession()
}
