import { createId, getMentorSession, getMentors, saveMentorsAndSync, setMentorSession, clearMentorSession } from "../admin/storage"
import type { Mentor } from "../admin/types"
import { notifyEmailInBackground, sendMentorWelcomeEmail } from "../lib/emailApi"

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

export type SignUpMentorInput = {
  name: string
  surname: string
  fin: string
  email: string
  dateOfBirth: string
  country: string
  password: string
  phone?: string
}

export const createPasswordHash = async (password: string): Promise<{ passwordHash: string; passwordSalt: string }> => {
  const salt = randomSalt()
  const passwordHash = await deriveHash(password, salt)
  return { passwordHash, passwordSalt: salt }
}

export const signUpMentor = async (payload: SignUpMentorInput): Promise<{ ok: boolean; message: string }> => {
  const mentors = getMentors()
  const email = payload.email.trim().toLowerCase()
  const fin = payload.fin.trim().toUpperCase()

  if (mentors.some((mentor) => mentor.email === email)) {
    return { ok: false, message: "This email is already registered." }
  }

  if (mentors.some((mentor) => mentor.fin && mentor.fin === fin)) {
    return { ok: false, message: "This FIN is already registered." }
  }

  const { passwordHash, passwordSalt } = await createPasswordHash(payload.password)

  const mentor: Mentor = {
    id: createId("mentor"),
    name: payload.name.trim(),
    surname: payload.surname.trim(),
    fin,
    email,
    dateOfBirth: payload.dateOfBirth.trim(),
    country: payload.country,
    registeredAt: new Date().toISOString(),
    phone: payload.phone?.trim() ?? "",
    passwordHash,
    passwordSalt,
  }

  saveMentorsAndSync([mentor, ...mentors])
  setMentorSession(mentor.id)

  notifyEmailInBackground(
    sendMentorWelcomeEmail({
      name: mentor.name,
      surname: mentor.surname,
      email: mentor.email,
    }),
  )

  return { ok: true, message: "Registration successful! A confirmation email has been sent to your inbox." }
}

export const signInMentor = async (email: string, password: string): Promise<{ ok: boolean; message: string }> => {
  const normalizedEmail = email.trim().toLowerCase()
  const mentor = getMentors().find((item) => item.email === normalizedEmail)

  if (!mentor) {
    return { ok: false, message: "Account not found." }
  }

  if (!mentor.passwordHash || !mentor.passwordSalt) {
    return { ok: false, message: "This account has no password set. Please register again or contact organizers." }
  }

  const hash = await deriveHash(password, mentor.passwordSalt)
  if (hash !== mentor.passwordHash) {
    return { ok: false, message: "Invalid email or password." }
  }

  setMentorSession(mentor.id)
  return { ok: true, message: "Signed in successfully." }
}

export const resetMentorPassword = async (
  email: string,
  newPassword: string,
): Promise<{ ok: boolean; message: string }> => {
  const normalizedEmail = email.trim().toLowerCase()
  const mentors = getMentors()
  const mentor = mentors.find((item) => item.email === normalizedEmail)

  if (!mentor) {
    return { ok: false, message: "Account not found." }
  }

  if (newPassword.length < 8) {
    return { ok: false, message: "Password must be at least 8 characters." }
  }

  const { passwordHash, passwordSalt } = await createPasswordHash(newPassword)
  const updatedMentor: Mentor = {
    ...mentor,
    passwordHash,
    passwordSalt,
  }

  saveMentorsAndSync(mentors.map((item) => (item.id === mentor.id ? updatedMentor : item)))
  return { ok: true, message: "Password updated successfully. You can now log in with your new password." }
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
