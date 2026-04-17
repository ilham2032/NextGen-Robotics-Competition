import { useEffect, useState } from "react"
import { getCategories, getTeams } from "../admin/storage"
import type { Category, Team } from "../admin/types"

const Participants = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setTeams(getTeams())
    setCategories(getCategories())
  }, [])

  return (
    <section className="min-h-screen bg-white px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-bold text-blue-700 sm:text-4xl">Participants</h1>
        <p className="mt-2 text-slate-600">Teams grouped by competition category.</p>

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
                    <h3 className="text-xl font-semibold text-blue-900 sm:text-2xl"> Team name: {team.name}</h3>
                    <p className="mt-2 text-slate-700">Country: {team.school || "N/A"}</p>
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