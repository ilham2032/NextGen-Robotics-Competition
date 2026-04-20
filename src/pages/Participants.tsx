import { useEffect, useMemo, useState } from "react"
import { getCategories, getTeams } from "../admin/storage"
import type { Category, Team } from "../admin/types"

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
    <section className="min-h-screen bg-white px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-bold text-blue-700 sm:text-4xl">Participants</h1>
        
        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.totalTeams}</p>
            <p className="text-sm text-blue-600 font-semibold">Total Teams</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.totalParticipants}</p>
            <p className="text-sm text-blue-600 font-semibold">Participants</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
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
                <p className="text-sm text-slate-500">No teams registered yet.</p>
              ) : (
                categoryTeams.map((team) => (
                  <article key={team.id} className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                    <h3 className="text-xl font-semibold text-blue-900 sm:text-2xl">Team: {team.name}</h3>
                    <p className="mt-2 text-slate-700">Country: {team.school || "N/A"}</p>
                    {team.memberNames && team.memberNames.length > 0 && (
                      <p className="mt-1 text-sm text-slate-600">Members: {team.memberNames.join(", ")}</p>
                    )}
                    {team.mentorName && (
                      <p className="mt-1 text-sm text-blue-600">Mentor: {team.mentorName}</p>
                    )}
                  </article>
                ))
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