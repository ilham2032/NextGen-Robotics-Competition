import type { Team, MatchResult, CompetitionResult } from '../../admin/types'
import { computeStandings, getPublishedFinalsQualifiers } from '../utils/matchStats'
import {
  SUMO_MAX_ROUNDS,
  areAllSumoRoundsComplete,
  getCompletedRounds,
} from '../utils/sumoRounds'
import {
  filterMatchesByGroup,
  filterTeamsByGroup,
  formatGroupName,
  FINALISTS_PER_GROUP,
  isGroupFinalsAnnounced,
} from '../utils/groupUtils'

type GroupTournamentPanelProps = {
  group: string
  categoryId: string
  categoryTeams: Team[]
  allTeams: Team[]
  categoryMatches: MatchResult[]
  competitionResults: CompetitionResult[]
  isSumoFormat: boolean
}

const GroupTournamentPanel = ({
  group,
  categoryId,
  categoryTeams,
  allTeams,
  categoryMatches,
  competitionResults,
  isSumoFormat,
}: GroupTournamentPanelProps) => {
  const groupTeams = filterTeamsByGroup(categoryTeams, group)
  const groupMatches = filterMatchesByGroup(categoryMatches, group)
  const standings = computeStandings(groupTeams, groupMatches, allTeams)
  const finalsAnnounced = isGroupFinalsAnnounced(competitionResults, categoryId, group)
  const publishedFinalists = getPublishedFinalsQualifiers(competitionResults, categoryId, allTeams, group)
  const completedRounds = getCompletedRounds(groupMatches)
  const roundsComplete = areAllSumoRoundsComplete(groupMatches)

  return (
    <div className="mb-10 rounded-2xl border border-blue-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-linear-to-r from-blue-700 to-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">{formatGroupName(group)}</h2>
        <p className="text-sm text-blue-100 mt-1">
          {groupTeams.length} team{groupTeams.length !== 1 ? 's' : ''}
          {isSumoFormat ? ' · 3-round format' : ''}
        </p>
      </div>

      <div className="p-6 space-y-8">
        {isSumoFormat && (
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Round Progress</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((roundNumber) => (
                <div
                  key={roundNumber}
                  className={`rounded-lg border p-2 text-center text-sm ${
                    completedRounds.has(roundNumber)
                      ? 'border-green-200 bg-green-50 text-green-800'
                      : 'border-slate-200 bg-white text-slate-500'
                  }`}
                >
                  Round {roundNumber}: {completedRounds.has(roundNumber) ? 'Done' : 'Pending'}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-600">
              {roundsComplete
                ? 'All rounds complete — waiting for referee confirmation.'
                : `${completedRounds.size}/${SUMO_MAX_ROUNDS} rounds recorded.`}
            </p>
          </div>
        )}



        {finalsAnnounced && publishedFinalists.length > 0 && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <h3 className="text-sm font-semibold text-emerald-800 mb-2">
              Finals qualifiers (published by referee)
            </h3>
            <ol className="space-y-1 text-sm text-emerald-900">
              {publishedFinalists.map((entry) => (
                <li key={entry.team.id}>
                  {entry.position}. {entry.team.name} — {entry.points} pts
                </li>
              ))}
            </ol>
          </div>
        )}
        {!finalsAnnounced && groupMatches.length > 0 && (
          <p className="text-sm text-slate-500 rounded-lg bg-slate-50 px-3 py-2">
            Finals qualifiers will appear after the referee publishes the top {FINALISTS_PER_GROUP} teams per group.
          </p>
        )}

        {standings.length > 0 && groupMatches.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Standings</h3>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-2 px-3 font-semibold">#</th>
                    <th className="text-left py-2 px-3 font-semibold">Team</th>
                    <th className="text-center py-2 px-3 font-semibold">W</th>
                    <th className="text-center py-2 px-3 font-semibold">L</th>
                    <th className="text-center py-2 px-3 font-semibold">D</th>
                    <th className="text-center py-2 px-3 font-semibold">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((standing, index) => (
                    <tr
                      key={standing.team.id}
                      className={`border-t border-slate-100 ${publishedFinalists.some((f) => f.team.id === standing.team.id) ? 'bg-emerald-50/60' : ''}`}
                    >
                      <td className="py-2 px-3 text-blue-600 font-medium">{index + 1}</td>
                      <td className="py-2 px-3">{standing.team.name}</td>
                      <td className="py-2 px-3 text-center">{standing.wins}</td>
                      <td className="py-2 px-3 text-center">{standing.losses}</td>
                      <td className="py-2 px-3 text-center">{standing.draws}</td>
                      <td className="py-2 px-3 text-center font-semibold text-blue-700">{standing.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {groupMatches.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Battles</h3>
            <div className="space-y-3">
              {groupMatches.map((match) => {
                const team1 = allTeams.find((t) => t.id === match.team1Id)
                const team2 = allTeams.find((t) => t.id === match.team2Id)
                return (
                  <article key={match.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                    <div className="flex flex-wrap justify-between gap-2">
                      <span className="font-medium">{team1?.name} vs {team2?.name}</span>
                      <span className="text-blue-600 font-semibold">Round {match.round}</span>
                    </div>
                    <p className="mt-1 text-slate-700">Score: {match.team1Score} — {match.team2Score}</p>
                  </article>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default GroupTournamentPanel
