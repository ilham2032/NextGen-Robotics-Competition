import { useMemo, useState } from 'react'
import {
  createId,
  getTrackResults,
  saveTrackResults,
  getCompetitionResults,
  saveCompetitionResults,
} from '../../admin/storage'
import type { Team, TrackResult, CompetitionResult } from '../../admin/types'
import {
  buildTrackCompetitionResults,
  buildTrackRankings,
  formatTrackTime,
  isTrackCategoryFinalized,
} from '../../teamszone/utils/trackCategories'

type TrackScoringPanelProps = {
  categoryId: string
  categoryName: string
  categoryTeams: Team[]
  refereeId: string
}

const TrackScoringPanel = ({
  categoryId,
  categoryName,
  categoryTeams,
  refereeId,
}: TrackScoringPanelProps) => {
  const [trackResults, setTrackResults] = useState<TrackResult[]>(() => getTrackResults())
  const [competitionResults, setCompetitionResults] = useState<CompetitionResult[]>(() => getCompetitionResults())
  const [draftTimes, setDraftTimes] = useState<Record<string, string>>(() => {
    const categoryResults = getTrackResults().filter((r) => r.categoryId === categoryId)
    return Object.fromEntries(
      categoryResults.map((r) => [r.teamId, String(r.finishTime)]),
    )
  })

  const categoryTrackResults = useMemo(
    () => trackResults.filter((r) => r.categoryId === categoryId),
    [trackResults, categoryId],
  )

  const liveRankings = useMemo(
    () => buildTrackRankings(categoryTrackResults, categoryTeams),
    [categoryTeams, categoryTrackResults],
  )

  const isFinalized = isTrackCategoryFinalized(competitionResults, categoryId)
  const scoredCount = categoryTrackResults.length

  const handleTimeChange = (teamId: string, value: string) => {
    setDraftTimes((current) => ({ ...current, [teamId]: value }))
  }

  const handleSaveTeamTime = (teamId: string) => {
    const raw = draftTimes[teamId]?.trim()
    if (!raw) {
      alert('Enter a finish time in seconds.')
      return
    }

    const finishTime = Number(raw)
    if (!Number.isFinite(finishTime) || finishTime < 0) {
      alert('Enter a valid finish time (seconds, 0 or greater).')
      return
    }

    const existing = trackResults.find((r) => r.categoryId === categoryId && r.teamId === teamId)
    const updated: TrackResult = existing
      ? { ...existing, finishTime, recordedAt: new Date().toISOString(), refereeId }
      : {
          id: createId('track'),
          categoryId,
          teamId,
          finishTime,
          refereeId,
          recordedAt: new Date().toISOString(),
        }

    const nextTrackResults = [
      ...trackResults.filter((r) => !(r.categoryId === categoryId && r.teamId === teamId)),
      updated,
    ]
    setTrackResults(nextTrackResults)
    saveTrackResults(nextTrackResults)
  }

  const handleSaveAll = () => {
    let saved = 0
    let nextTrackResults = [...trackResults]

    categoryTeams.forEach((team) => {
      const raw = draftTimes[team.id]?.trim()
      if (!raw) return
      const finishTime = Number(raw)
      if (!Number.isFinite(finishTime) || finishTime < 0) return

      const existing = nextTrackResults.find((r) => r.categoryId === categoryId && r.teamId === team.id)
      const updated: TrackResult = existing
        ? { ...existing, finishTime, recordedAt: new Date().toISOString(), refereeId }
        : {
            id: createId('track'),
            categoryId,
            teamId: team.id,
            finishTime,
            refereeId,
            recordedAt: new Date().toISOString(),
          }

      nextTrackResults = [
        ...nextTrackResults.filter((r) => !(r.categoryId === categoryId && r.teamId === team.id)),
        updated,
      ]
      saved += 1
    })

    if (saved === 0) {
      alert('Enter at least one valid finish time.')
      return
    }

    setTrackResults(nextTrackResults)
    saveTrackResults(nextTrackResults)
    alert(`Saved ${saved} track time(s).`)
  }

  const handlePublishRankings = () => {
    if (categoryTrackResults.length === 0) {
      alert('Record at least one team finish time before publishing.')
      return
    }
    if (!window.confirm('Publish track rankings to Teams Zone? Fastest times rank highest.')) return

    const rankings = buildTrackRankings(categoryTrackResults, categoryTeams)
    const finalized = buildTrackCompetitionResults(categoryId, refereeId, rankings, createId)
    const nextCompetitionResults = [
      ...competitionResults.filter((r) => r.categoryId !== categoryId),
      ...finalized,
    ]
    setCompetitionResults(nextCompetitionResults)
    saveCompetitionResults(nextCompetitionResults)
    alert('Track rankings published to Teams Zone!')
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-emerald-900 mb-2">Track Finish Times</h2>
        <p className="text-sm text-slate-600 mb-4">
          Enter how long each team took to finish the {categoryName} track (in seconds). Lower time = better rank.
        </p>
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-center">
            <p className="text-2xl font-bold text-emerald-700">{scoredCount}/{categoryTeams.length}</p>
            <p className="text-xs text-slate-500">Teams scored</p>
          </div>
          {isFinalized && (
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 flex items-center">
              <span className="text-sm font-semibold text-green-800">Rankings published</span>
            </div>
          )}
        </div>

        {categoryTeams.length === 0 ? (
          <p className="text-sm text-slate-500">No teams registered in this category yet.</p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-4">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Team</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Country</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Finish Time (seconds)</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryTeams.map((team) => {
                    const saved = categoryTrackResults.find((r) => r.teamId === team.id)
                    return (
                      <tr key={team.id} className="border-t border-slate-100">
                        <td className="py-3 px-4 font-medium text-slate-900">{team.name}</td>
                        <td className="py-3 px-4 text-slate-600">{team.school || '—'}</td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            min={0}
                            step={0.01}
                            value={draftTimes[team.id] ?? ''}
                            onChange={(e) => handleTimeChange(team.id, e.target.value)}
                            placeholder="e.g. 45.50"
                            disabled={isFinalized}
                            className="w-full max-w-[140px] rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none disabled:bg-slate-100"
                          />
                          {saved && (
                            <p className="text-xs text-emerald-600 mt-1">Saved: {formatTrackTime(saved.finishTime)}</p>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleSaveTeamTime(team.id)}
                            disabled={isFinalized}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSaveAll}
                disabled={isFinalized}
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                Save All Times
              </button>
              {!isFinalized && liveRankings.length > 0 && (
                <button
                  type="button"
                  onClick={handlePublishRankings}
                  className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
                >
                  Publish Rankings
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {liveRankings.length > 0 && (
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-blue-900 mb-4">
            Live Rankings {isFinalized ? '(Published)' : '(Preview)'}
          </h2>
          <p className="text-xs text-slate-500 mb-4">Sorted by fastest finish time</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-blue-200">
                  <th className="text-left py-2 px-4 font-semibold">Rank</th>
                  <th className="text-left py-2 px-4 font-semibold">Team</th>
                  <th className="text-right py-2 px-4 font-semibold">Finish Time</th>
                </tr>
              </thead>
              <tbody>
                {liveRankings.map((entry, index) => (
                  <tr key={entry.team.id} className="border-b border-slate-100">
                    <td className="py-3 px-4 font-bold text-blue-700">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{entry.team.name}</td>
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
    </div>
  )
}

export default TrackScoringPanel
