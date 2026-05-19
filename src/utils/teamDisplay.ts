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

/** All registered teams are now published on the Participants page. */
export const isTeamPublishedOnMain = (_team: Team): boolean => true

export const getTeamPaymentStatus = (team: Team): "paid" | "pending" =>
  team.paymentStatus === "pending" ? "pending" : "paid"
