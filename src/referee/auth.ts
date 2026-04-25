import { getRefereeSession, getReferees, setRefereeSession, clearRefereeSession } from "../admin/storage"
import type { Referee } from "../admin/types"

const encoder = new TextEncoder()

const toBase64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes))

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

export const signInReferee = async (email: string, password: string): Promise<{ ok: boolean; message: string }> => {
  const normalizedEmail = email.trim().toLowerCase()
  const referee = getReferees().find((item) => item.email === normalizedEmail)

  if (!referee) {
    return { ok: false, message: "Account not found." }
  }

  const hash = await deriveHash(password, referee.passwordSalt)
  if (hash !== referee.passwordHash) {
    return { ok: false, message: "Invalid credentials." }
  }

  setRefereeSession(referee.id)
  return { ok: true, message: "Signed in successfully." }
}

export const getCurrentReferee = (): Referee | null => {
  const refereeId = getRefereeSession()
  if (!refereeId) {
    return null
  }

  return getReferees().find((referee) => referee.id === refereeId) ?? null
}

export const isRefereeAuthenticated = (): boolean => !!getCurrentReferee()

export const signOutReferee = (): void => {
  clearRefereeSession()
}