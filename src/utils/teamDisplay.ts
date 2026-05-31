import { byCountry, countries } from "country-code-lookup"
import type { Team } from "../admin/types"

export const TEAM_REGISTRATION_FEE_AZN = 20

export const getCountryCode = (countryName: string): string | null => {
  if (!countryName) {
    return null
  }

  const normalized = countryName.trim()
  const directMatch = byCountry(normalized)
  if (directMatch) {
    return directMatch.iso2
  }

  const fallbackMatch = countries.find((country) => {
    const name = country.country.toLowerCase()
    const value = normalized.toLowerCase()
    return value === name || value.includes(name) || name.includes(value)
  })

  return fallbackMatch ? fallbackMatch.iso2 : null
}

/** All registered teams are now published on the Participants page. */
export const isTeamPublishedOnMain = (_team: Team): boolean => true

export const getTeamPaymentStatus = (team: Team): "paid" | "pending" =>
  team.paymentStatus === "pending" ? "pending" : "paid"
