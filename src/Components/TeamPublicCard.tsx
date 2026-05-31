import ReactCountryFlag from "react-country-flag"
import type { Team } from "../admin/types"
import { getCountryCode } from "../utils/teamDisplay"

type TeamPublicCardProps = {
  team: Team
  className?: string
}

const TeamPublicCard = ({ team, className = "" }: TeamPublicCardProps) => {
  const country = team.school?.trim() || "N/A"
  const countryCode = getCountryCode(country)

  return (
    <article
      className={`flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <div className="min-w-0 space-y-3 text-sm sm:text-base">
        <p className="text-slate-700">
          <span>Team: </span>
          <span className="font-bold text-slate-900">{team.name}</span>
        </p>
        <p className="text-slate-700">
          <span>Country: </span>
          <span className="font-bold text-slate-900">{country}</span>
        </p>
      </div>

      {countryCode ? (
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          aria-label={`${country} flag`}
          className="shrink-0 overflow-hidden rounded border border-slate-200 shadow-sm"
          style={{ width: "3.25rem", height: "2.1rem" }}
        />
      ) : (
        <div
          className="flex h-[2.1rem] w-13 shrink-0 items-center justify-center rounded border border-dashed border-slate-300 bg-white text-xs text-slate-400"
          aria-hidden
        >
          —
        </div>
      )}
    </article>
  )
}

export default TeamPublicCard
