import { byCountry } from "country-code-lookup"
import type { Team } from "../admin/types"

export const TEAM_REGISTRATION_FEE_AZN = 20

export const getCountryCode = (countryName: string): string | null => {
  if (!countryName) {
    return null
  }
  const result = byCountry(countryName)
  return result ? result.iso2 : null
}

/** Teams without paymentStatus are treated as paid (legacy). */
export const isTeamPublishedOnMain = (team: Team): boolean =>
  !team.paymentStatus || team.paymentStatus === "paid"

export const getTeamPaymentStatus = (team: Team): "paid" | "pending" =>
  team.paymentStatus === "pending" ? "pending" : "paid"
