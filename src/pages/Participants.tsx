import { useEffect, useMemo, useState } from "react"
import { getCategories, getTeams } from "../admin/storage"
import type { Category, Team } from "../admin/types"
import { byCountry } from "country-code-lookup"

const getCountryCode = (countryName: string): string | null => {
  if (!countryName) return null
  const result = byCountry(countryName)
  return result ? result.iso2 : null
}

const getCountryFlag = (countryName: string): string => {
  const code = getCountryCode(countryName)
  if (!code) return ""
  
  // Simple flag emoji mapping for common countries
  const flagMap: Record<string, string> = {
    "AZ": "🇦🇿",
    "US": "🇺🇸",
    "TR": "🇹🇷",
    "GB": "🇬🇧",
    "DE": "🇩🇪",
    "FR": "🇫🇷",
    "IT": "🇮🇹",
    "ES": "🇪🇸",
    "RU": "🇷🇺",
    "CN": "🇨🇳",
    "JP": "🇯🇵",
    "KR": "🇰🇷"
  }
  
  return flagMap[code] || ""
}

const Participants = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setTeams(getTeams())
    setCategories(getCategories())
  }, [])

  const stats = useMemo(() => {
    const uniqueCountries = new Set(teams.map(t => t.school).filter(Boolean))
    const totalParticipants = teams.reduce((sum, team) => sum + (team.members || 0), 0)
    return {
      totalTeams: teams.length,
      totalParticipants,
      totalCountries: uniqueCountries.size
    }
  }, [teams])

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase">Competition Overview</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Participants</h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
            Explore registered teams by category and see the growing international robotics community joining NextGen.
          </p>
        </div>
        
        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-blue-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-700">{stats.totalTeams}</p>
            <p className="text-sm text-blue-600 font-semibold">Total Teams</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-700">{stats.totalParticipants}</p>
            <p className="text-sm text-blue-600 font-semibold">Participants</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-700">{stats.totalCountries}</p>
            <p className="text-sm text-blue-600 font-semibold">Countries</p>
          </div>
        </div>

        {categories.map((category) => {
          const categoryTeams = teams.filter((team) => team.categoryName?.trim() === category.name)
          return (
          <div key={category.id} className="mt-8">
            <h2 className="font-display text-2xl font-semibold text-blue-800 sm:text-3xl">{category.name}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {categoryTeams.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
                  No teams registered yet.
                </div>
              ) : (
                categoryTeams.map((team) => {
                  const flagEmoji = getCountryFlag(team.school || "")
                  return (
                  <article key={team.id} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                    <h3 className="text-xl font-semibold text-blue-900 sm:text-2xl">{team.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-slate-700">Country:</span>
                      {flagEmoji && <span className="text-lg">{flagEmoji}</span>}
                      <p className="text-slate-700">{team.school || "N/A"}</p>
                    </div>
                  </article>
                  )
                })
              )}
            </div>
          </div>
          )
        })}
      </div>
    </section>
  )
}

export default Participants