import { Link } from 'react-router-dom'
import { getCategories, getTeams, getTrackResults } from '../../admin/storage'
import {
  buildTrackRankings,
  formatTrackTime,
  getTrackResultsForCategory,
} from '../utils/trackCategories'

type TrackCategoryViewProps = {
  categoryName: string
}

const TrackCategoryView = ({ categoryName }: TrackCategoryViewProps) => {
  const categories = getCategories()
  const allTeams = getTeams()
  const trackResults = getTrackResults()

  const category = categories.find((cat) => cat.name === categoryName)
  const categoryTeams = allTeams.filter((team) => team.categoryName?.trim() === categoryName)
  const categoryTrackResults = category ? getTrackResultsForCategory(trackResults, category.id) : []
  const rankings = category ? buildTrackRankings(categoryTrackResults, allTeams) : []
  const rankingByTeamId = new Map(rankings.map((entry, index) => [entry.team.id, { ...entry, rank: index + 1 }]))

  const uniqueCountries = new Set(categoryTeams.map((t) => t.school).filter(Boolean))

  return (
    <section className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <Link
            to="/teamszone"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Teams Zone
          </Link>
          <h1 className="font-display text-3xl font-bold text-blue-700 sm:text-4xl lg:text-5xl mb-2">
            {categoryName} Teams
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {category?.description || `${categoryName} track results and rankings`}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{categoryTeams.length}</div>
            <div className="text-sm text-slate-600 font-medium">Teams</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{categoryTrackResults.length}</div>
            <div className="text-sm text-slate-600 font-medium">Times Recorded</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{uniqueCountries.size}</div>
            <div className="text-sm text-slate-600 font-medium">Countries</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {rankings[0] ? formatTrackTime(rankings[0].finishTime) : '—'}
            </div>
            <div className="text-sm text-slate-600 font-medium">Best Time</div>
          </div>
        </div>


        {rankings.length > 0 && (
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Track Rankings</h2>
            <p className="text-sm text-slate-500 mb-4">Fastest finish time wins. Lower seconds = better placement.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-blue-100 bg-slate-50">
                    <th className="text-left py-3 px-4 font-semibold">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold">Team</th>
                    <th className="text-left py-3 px-4 font-semibold">Country</th>
                    <th className="text-right py-3 px-4 font-semibold">Finish Time</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((entry, index) => (
                    <tr key={entry.team.id} className="border-b border-slate-100">
                      <td className="py-3 px-4 font-bold text-blue-700">{index + 1}</td>
                      <td className="py-3 px-4 font-medium text-slate-800">{entry.team.name}</td>
                      <td className="py-3 px-4 text-slate-600">{entry.team.school || '—'}</td>
                      <td className="py-3 px-4 text-right font-semibold text-emerald-700">
                        {formatTrackTime(entry.finishTime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Registered Teams</h2>
          {categoryTeams.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-blue-100">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No Teams Registered Yet</h3>
              <Link to="/user/auth" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                Register via Mentor Portal
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryTeams.map((team) => {
                const ranked = rankingByTeamId.get(team.id)
                return (
                  <article key={team.id} className="bg-white rounded-xl shadow-sm border border-blue-100 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-slate-800">{team.name}</h3>
                      {ranked && (
                        <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                          #{ranked.rank}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{team.school || 'Country not specified'}</p>
                    {ranked ? (
                      <p className="mt-3 text-sm font-semibold text-emerald-700">
                        Track finish: {formatTrackTime(ranked.finishTime)}
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-slate-400">Awaiting track time</p>
                    )}
                    {team.memberNames && team.memberNames.length > 0 && (
                      <p className="mt-2 text-xs text-slate-500">{team.memberNames.join(', ')}</p>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </div>

        {category && (
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">About {categoryName}</h3>
            <p className="text-slate-600 mb-4">{category.description}</p>
            <Link to="/regulations" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Regulations →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default TrackCategoryView
