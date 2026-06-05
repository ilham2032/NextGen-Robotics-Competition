import { Link } from 'react-router-dom'
import { getCategories } from '../admin/storage'
import { useLiveCompetitionData } from '../hooks/useLiveCompetitionData'
import { MAX_TEAMS_PER_GROUP, FINALISTS_PER_GROUP } from './utils/groupUtils'

const Teamszone = () => {
  const categories = getCategories()
  const { teams, matchResults } = useLiveCompetitionData()
  const totalBattles = matchResults.length

  const filteredCategories = categories.filter(
    (category) => !['Drone', 'Combat Robot', 'Start Up Junior'].includes(category.name),
  )

  const categoryStats = filteredCategories.map((category) => {
    const categoryTeams = teams.filter((team) => team.categoryName?.trim() === category.name)
    return {
      ...category,
      teamCount: categoryTeams.length,
      totalParticipants: categoryTeams.reduce((sum, team) => sum + (team.members || 0), 0),
    }
  })

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-blue-100 bg-linear-to-r from-blue-800 via-indigo-800 to-blue-900 px-6 py-10 text-center text-white shadow-lg sm:px-10">
          <p className="text-xs font-semibold tracking-[0.28em] text-blue-200 uppercase">Live Competition Hub</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">Teams Zone</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-blue-100 sm:text-base">
            Follow registered teams, group tournaments, and standings. Groups hold up to {MAX_TEAMS_PER_GROUP} teams;
            after first-day group rounds, referees confirm the top {FINALISTS_PER_GROUP} teams per group to advance to finals.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-1">{teams.length}</div>
            <div className="text-sm font-medium text-slate-600">Total Teams</div>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {teams.reduce((sum, team) => sum + (team.members || 0), 0)}
            </div>
            <div className="text-sm font-medium text-slate-600">Participants</div>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-1">{filteredCategories.length}</div>
            <div className="text-sm font-medium text-slate-600">Categories</div>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-1">{totalBattles}</div>
            <div className="text-sm font-medium text-slate-600">Battles Played</div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Competition Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryStats.map((category) => {
              const routeMap: Record<string, string> = {
                'Mini Sumo': '/teamszone/mini-sumo',
                '1kg Lego Sumo': '/teamszone/1kg-lego-sumo',
                '3kg Lego Sumo': '/teamszone/3kg-lego-sumo',
                'Line Follower': '/teamszone/line-follower',
                'Lego Line': '/teamszone/lego-line',
                'Mini Sumo Kids': '/teamszone/mini-sumo-kids',
                'Mega Sumo': '/teamszone/mega-sumo',
                'Start Up Senior': '/teamszone/start-up-senior',
              }

              const routePath =
                routeMap[category.name] || `/teamszone/${category.name.toLowerCase().replace(/\s+/g, '-')}`

              return (
                <Link
                  key={category.id}
                  to={routePath}
                  className="group block rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                      {category.name}
                    </h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      →
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{category.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-indigo-700">{category.teamCount} teams</span>
                    <span className="text-slate-500">{category.totalParticipants} participants</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-blue-100 bg-white p-8 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Mentor Portal</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Register participants and create teams. Published teams appear on the public Participants page for everyone.
            </p>
            <Link
              to="/user/auth"
              className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Open Mentor Portal
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Referee Portal</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Assign groups, record battles, and publish standings. Scores sync for all visitors.
            </p>
            <Link
              to="/teamszone/referee"
              className="inline-flex items-center rounded-xl bg-slate-800 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              Referee Login
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/standings" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">
            View full standings by category →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Teamszone
