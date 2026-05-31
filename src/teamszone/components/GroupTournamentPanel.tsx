import type { Team, MatchResult, CompetitionResult } from '../../admin/types'
import { computeStandings, getFinalizedWinners, getPositionLabel } from '../utils/matchStats'
import {
  SUMO_MAX_ROUNDS,
  areAllSumoRoundsComplete,
  getCompletedRounds,
} from '../utils/sumoRounds'
import { filterMatchesByGroup, filterTeamsByGroup, formatGroupName } from '../utils/groupUtils'

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
  const winners = getFinalizedWinners(competitionResults, categoryId, allTeams, group)
  const hasFinalResults = winners.length > 0
  const completedRounds = getCompletedRounds(groupMatches)
  const roundsComplete = areAllSumoRoundsComplete(groupMatches)
  const standingByTeamId = new Map(standings.map((s) => [s.team.id, s]))

  return (
    <div className="mb-10 rounded-2xl border border-blue-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-4">
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
              {hasFinalResults
                ? 'Winners published for this group.'
                : roundsComplete
                  ? 'All rounds complete — results publishing...'
                  : `${completedRounds.size}/${SUMO_MAX_ROUNDS} rounds recorded.`}
            </p>
          </div>
        )}

        {hasFinalResults && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h3 className="text-sm font-semibold text-amber-900 mb-3">🏆 {formatGroupName(group)} Winners</h3>
            <div className="grid gap-2 sm:grid-cols-3">
              {winners.slice(0, 3).map((entry) => (
                <div key={entry.id} className="rounded-lg bg-white border border-amber-200 p-3">
                  <p className="text-xs font-semibold text-amber-700 uppercase">{getPositionLabel(entry.position)}</p>
                  <p className="font-bold text-slate-800">{entry.team?.name}</p>
                  <p className="text-xs text-slate-600">{entry.totalScore} pts</p>
                </div>
              ))}
            </div>
          </div>
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
                    <tr key={standing.team.id} className="border-t border-slate-100">
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
                const winner = allTeams.find((t) => t.id === match.winnerId)
                return (
                  <article key={match.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                    <div className="flex flex-wrap justify-between gap-2">
                      <span className="font-medium">{team1?.name} vs {team2?.name}</span>
                      <span className="text-blue-600 font-semibold">Round {match.round}</span>
                    </div>
                    <p className="mt-1 text-slate-700">
                      Score: {match.team1Score} — {match.team2Score}
                      {winner && <span className="text-green-700 font-medium"> · Winner: {winner.name}</span>}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Teams in {formatGroupName(group)}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {groupTeams.map((team) => {
              const standing = standingByTeamId.get(team.id)
              return (
                <article key={team.id} className="rounded-lg border border-blue-100 p-4">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-slate-800">{team.name}</h4>
                    {standing && standing.points > 0 && (
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        {standing.points} pts
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{team.school || 'Country N/A'}</p>
                  {standing && (
                    <p className="text-xs text-slate-600 mt-2">
                      {standing.wins}W · {standing.losses}L · {standing.draws}D
                    </p>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupTournamentPanel
