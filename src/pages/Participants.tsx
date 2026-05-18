import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { getCategories, getTeams } from "../admin/storage"
import type { Category, Team } from "../admin/types"
import TeamPublicCard from "../Components/TeamPublicCard"
import { isTeamPublishedOnMain } from "../utils/teamDisplay"

const Participants = () => {
  const { t } = useTranslation()
  const [teams, setTeams] = useState<Team[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setTeams(getTeams().filter(isTeamPublishedOnMain))
    setCategories(getCategories())
  }, [])

  const stats = useMemo(() => {
    const uniqueCountries = new Set(teams.map((team) => team.school).filter(Boolean))
    const totalParticipants = teams.reduce((sum, team) => sum + (team.members || 0), 0)
    return {
      totalTeams: teams.length,
      totalParticipants,
      totalCountries: uniqueCountries.size,
    }
  }, [teams])

  const categorySections = useMemo(() => {
    if (categories.length === 0) {
      return teams.length > 0 ? [{ id: "all", name: t("Registered Teams"), teams }] : []
    }

    const sections = categories.map((category) => ({
      id: category.id,
      name: category.name,
      teams: teams.filter((team) => team.categoryName?.trim() === category.name),
    }))

    const listedIds = new Set(sections.flatMap((section) => section.teams.map((team) => team.id)))
    const uncategorized = teams.filter((team) => !listedIds.has(team.id))

    if (uncategorized.length > 0) {
      sections.push({ id: "other", name: t("Other Categories"), teams: uncategorized })
    }

    return sections
  }, [categories, teams, t])

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase">{t("Competition Overview")}</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{t("Participants")}</h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
            {t("Explore registered teams by category and see the growing international robotics community joining NextGen.")}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-blue-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-700">{stats.totalTeams}</p>
            <p className="text-sm font-semibold text-blue-600">{t("Total Teams")}</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-700">{stats.totalParticipants}</p>
            <p className="text-sm font-semibold text-blue-600">{t("Participants")}</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-700">{stats.totalCountries}</p>
            <p className="text-sm font-semibold text-blue-600">{t("Countries")}</p>
          </div>
        </div>

        {categorySections.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            No teams registered yet.
          </div>
        ) : (
          categorySections.map((section) => (
            <div key={section.id} className="mt-8">
              <h2 className="font-display text-2xl font-semibold text-blue-800 sm:text-3xl">{section.name}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {section.teams.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
                    No teams registered yet.
                  </div>
                ) : (
                  section.teams.map((team) => <TeamPublicCard key={team.id} team={team} />)
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Participants
