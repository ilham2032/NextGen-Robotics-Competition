import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, getTeams, getMatchResults, getCompetitionResults } from '../../admin/storage'
import { computeStandings, getFinalizedWinners, getPositionLabel } from '../utils/matchStats'
import {
  SUMO_MAX_ROUNDS,
  areAllSumoRoundsComplete,
  getCompletedRounds,
  isThreeRoundSumoCategory,
} from '../utils/sumoRounds'
import {
  categoryUsesGroups,
  getGroupTeamCounts,
  getGroupsFromTeams,
  formatGroupName,
} from '../utils/groupUtils'
import GroupTournamentPanel from './GroupTournamentPanel'

type CategoryTeamsViewProps = {
  categoryName: string
  extraStat?: { label: string; value: string }
}

const CategoryTeamsView = ({ categoryName, extraStat }: CategoryTeamsViewProps) => {
  const categories = getCategories()
  const allTeams = getTeams()
  const matchResults = getMatchResults()
  const competitionResults = getCompetitionResults()

  const category = categories.find((cat) => cat.name === categoryName)
  const categoryTeams = allTeams.filter((team) => team.categoryName?.trim() === categoryName)
  const categoryMatches = category
    ? matchResults.filter((match) => match.categoryId === category.id)
    : []
  const isSumoFormat = isThreeRoundSumoCategory(categoryName)
  const groups = getGroupsFromTeams(categoryTeams)
  const usesGroups = categoryUsesGroups(categoryTeams)
  const groupCounts = getGroupTeamCounts(categoryTeams)
  const [activeGroup, setActiveGroup] = useState(groups[0] ?? 'A')

  useEffect(() => {
    if (groups.length > 0 && !groups.includes(activeGroup)) {
      setActiveGroup(groups[0])
    }
  }, [groups, activeGroup])
  const winners = category ? getFinalizedWinners(competitionResults, category.id, allTeams) : []
  const hasFinalResults = winners.length > 0
  const completedRounds = getCompletedRounds(categoryMatches)
  const roundsComplete = areAllSumoRoundsComplete(categoryMatches)
  const standings = category ? computeStandings(categoryTeams, categoryMatches, allTeams) : []
  const unassignedTeams = categoryTeams.filter((team) => !team.group?.trim())
  const uniqueCountries = new Set(categoryTeams.map((t) => t.school).filter(Boolean))
  const standingByTeamId = new Map(standings.map((s) => [s.team.id, s]))

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
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
            {category?.description || `${categoryName} competition teams and results`}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{categoryTeams.length}</div>
            <div className="text-sm text-slate-600 font-medium">Teams</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {usesGroups ? groups.length : uniqueCountries.size}
            </div>
            <div className="text-sm text-slate-600 font-medium">
              {usesGroups ? 'Groups' : 'Countries'}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{categoryMatches.length}</div>
            <div className="text-sm text-slate-600 font-medium">Battles</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {isSumoFormat && !usesGroups
                ? `${completedRounds.size}/${SUMO_MAX_ROUNDS}`
                : extraStat?.value ?? categoryTeams.reduce((s, t) => s + (t.members || 0), 0)}
            </div>
            <div className="text-sm text-slate-600 font-medium">
              {isSumoFormat && !usesGroups ? 'Rounds Complete' : extraStat?.label ?? 'Participants'}
            </div>
          </div>
        </div>

        {usesGroups && (
          <div className="mb-8 rounded-xl border border-indigo-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Tournament Groups</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4">
              {groups.map((group) => (
                <div key={group} className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4 text-center">
                  <p className="text-sm font-semibold text-indigo-800">{formatGroupName(group)}</p>
                  <p className="text-2xl font-bold text-indigo-700 mt-1">{groupCounts[group] ?? 0}</p>
                  <p className="text-xs text-slate-500">teams</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {groups.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setActiveGroup(group)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeGroup === group
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {formatGroupName(group)} ({groupCounts[group] ?? 0})
                </button>
              ))}
            </div>
          </div>
        )}

        {usesGroups && category && (
          <GroupTournamentPanel
            group={activeGroup}
            categoryId={category.id}
            categoryTeams={categoryTeams}
            allTeams={allTeams}
            categoryMatches={categoryMatches}
            competitionResults={competitionResults}
            isSumoFormat={isSumoFormat}
          />
        )}

        {!usesGroups && (
          <>
            {isSumoFormat && (
              <div className="mb-8 rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Tournament Progress (3 Rounds)</h2>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[1, 2, 3].map((roundNumber) => (
                    <div
                      key={roundNumber}
                      className={`rounded-lg border p-3 text-center ${
                        completedRounds.has(roundNumber)
                          ? 'border-green-200 bg-green-50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <p className="text-xs text-slate-500">Round {roundNumber}</p>
                      <p className={`text-sm font-semibold ${completedRounds.has(roundNumber) ? 'text-green-700' : 'text-slate-500'}`}>
                        {completedRounds.has(roundNumber) ? 'Done' : 'Pending'}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600">
                  {hasFinalResults
                    ? 'All 3 rounds finished. Final winners are published below.'
                    : roundsComplete
                      ? 'All rounds recorded — final results publishing...'
                      : `${completedRounds.size} of ${SUMO_MAX_ROUNDS} rounds complete.`}
                </p>
              </div>
            )}

            {hasFinalResults && (
              <div className="mb-8 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-amber-900 mb-4 flex items-center gap-2">
                  <span>🏆</span> Final Results
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {winners.slice(0, 3).map((entry) => (
                    <article
                      key={entry.id}
                      className="rounded-xl border border-amber-300 bg-white p-4"
                    >
                      <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide">
                        {getPositionLabel(entry.position)}
                      </p>
                      <p className="mt-1 text-lg font-bold text-slate-800">{entry.team?.name}</p>
                      <p className="text-sm text-slate-600">{entry.totalScore} points</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {standings.length > 0 && categoryMatches.length > 0 && (
              <div className="mb-8 bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Standings & Points</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-blue-100">
                        <th className="text-left py-2 px-3 font-semibold text-slate-700">#</th>
                        <th className="text-left py-2 px-3 font-semibold text-slate-700">Team</th>
                        <th className="text-center py-2 px-3 font-semibold text-slate-700">W</th>
                        <th className="text-center py-2 px-3 font-semibold text-slate-700">L</th>
                        <th className="text-center py-2 px-3 font-semibold text-slate-700">D</th>
                        <th className="text-center py-2 px-3 font-semibold text-slate-700">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((standing, index) => (
                        <tr key={standing.team.id} className="border-b border-slate-100">
                          <td className="py-3 px-3 font-medium text-blue-600">{index + 1}</td>
                          <td className="py-3 px-3 font-medium text-slate-800">{standing.team.name}</td>
                          <td className="py-3 px-3 text-center">{standing.wins}</td>
                          <td className="py-3 px-3 text-center">{standing.losses}</td>
                          <td className="py-3 px-3 text-center">{standing.draws}</td>
                          <td className="py-3 px-3 text-center font-semibold text-blue-700">{standing.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mb-8 bg-white rounded-xl shadow-sm border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Robot Battles</h2>
              {categoryMatches.length === 0 ? (
                <p className="text-sm text-slate-500 py-4 text-center">No battles recorded yet.</p>
              ) : (
                <div className="space-y-4">
                  {categoryMatches.map((match) => {
                    const team1 = allTeams.find((t) => t.id === match.team1Id)
                    const team2 = allTeams.find((t) => t.id === match.team2Id)
                    const winner = allTeams.find((t) => t.id === match.winnerId)
                    return (
                      <article key={match.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex justify-between gap-2 mb-2">
                          <span className="font-semibold">{team1?.name} vs {team2?.name}</span>
                          <span className="text-xs text-blue-600 font-semibold">Round {match.round}</span>
                        </div>
                        <p className="text-sm">
                          {match.team1Score} — {match.team2Score}
                          {winner && <span className="text-green-700 font-medium"> · Winner: {winner.name}</span>}
                        </p>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>

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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryTeams.map((team) => {
                    const standing = standingByTeamId.get(team.id)
                    return (
                      <article key={team.id} className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                        <h3 className="text-xl font-semibold text-slate-800">{team.name}</h3>
                        <p className="text-sm text-slate-600 mt-2">{team.school || 'Country not specified'}</p>
                        {standing && (
                          <p className="text-sm text-blue-600 mt-2 font-medium">{standing.points} pts · {standing.wins}W {standing.losses}L</p>
                        )}
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {unassignedTeams.length > 0 && usesGroups && (
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {unassignedTeams.length} team(s) not yet assigned to a group. Referee must complete group setup.
          </div>
        )}

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

export default CategoryTeamsView
