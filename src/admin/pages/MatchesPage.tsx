import { useState } from "react"
import type { MatchSlot, TeamRecord, ScoringRule } from './adminDashboardTypes'

type MatchesPageProps = {
  matches: MatchSlot[]
  teams: TeamRecord[]
  scoringRules: ScoringRule[]
  matchDuration: number
  onUpdateMatch: (match: MatchSlot) => void
  onAddMatch: (match: MatchSlot) => void
  onGenerateSchedule: () => void
  onExportCsv: () => void
  eventDate: string
  onUpdateEventDate: (date: string) => void
}

const roundStyles: Record<MatchSlot['round'], string> = {
  Qualification: 'bg-sky-100 text-sky-700',
  'Semi-finals': 'bg-amber-100 text-amber-700',
  Finals: 'bg-rose-100 text-rose-700',
}

const MatchesPage = ({ matches, teams, scoringRules, matchDuration, onGenerateSchedule, onExportCsv, eventDate, onUpdateEventDate, onUpdateMatch }: MatchesPageProps) => {
  const [editingMatch, setEditingMatch] = useState<string | null>(null)
  const [matchForm, setMatchForm] = useState({ time: "", arena: "" })
  const [editingEventDate, setEditingEventDate] = useState(false)
  const [eventDateForm, setEventDateForm] = useState(eventDate)

  const handleEditMatch = (match: MatchSlot) => {
    setEditingMatch(match.id)
    setMatchForm({ time: match.time, arena: match.arena })
  }

  const handleSaveMatch = () => {
    if (editingMatch) {
      const match = matches.find(m => m.id === editingMatch)
      if (match) {
        onUpdateMatch({ ...match, time: matchForm.time, arena: matchForm.arena })
      }
    }
    setEditingMatch(null)
  }

  const handleSaveEventDate = () => {
    onUpdateEventDate(eventDateForm)
    setEditingEventDate(false)
  }
  return (
    <div className='space-y-8'>
      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-2xl font-semibold text-slate-900'>Match Scheduling</h2>
            <p className='mt-2 text-sm text-slate-600'>Create qualification, elimination, and final rounds with arena assignments and timeline control.</p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <button
              type='button'
              onClick={onGenerateSchedule}
              className='rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:bg-cyan-300'
            >
              Auto-generate schedule
            </button>
            <button
              type='button'
              onClick={onExportCsv}
              className='rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100'
            >
              Export schedule
            </button>
          </div>
        </div>

        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
            <h3 className='text-lg font-semibold text-slate-900'>Match settings</h3>
            <p className='mt-2 text-sm text-slate-600'>Duration per match: {matchDuration} minutes</p>
            <p className='mt-3 text-sm text-slate-600'>Teams registered: {teams.length}</p>
            <p className='mt-3 text-sm text-slate-600'>Active scoring rules: {scoringRules.length}</p>
            <div className='mt-3 space-y-2'>
              {scoringRules.map((rule) => (
                <div key={rule.id} className='rounded-2xl bg-white px-3 py-2 text-sm text-slate-700 shadow-sm'>
                  <p className='font-semibold text-slate-900'>{rule.title}</p>
                  <p className='text-slate-600'>{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
            <h3 className='text-lg font-semibold text-slate-900'>Event Date</h3>
            {editingEventDate ? (
              <div className='mt-3 space-y-3'>
                <input
                  type='date'
                  value={eventDateForm}
                  onChange={(e) => setEventDateForm(e.target.value)}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm'
                />
                <div className='flex gap-2'>
                  <button
                    onClick={handleSaveEventDate}
                    className='rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:bg-blue-700'
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingEventDate(false)}
                    className='rounded border border-slate-300 bg-white px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-50'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className='mt-3 flex items-center justify-between'>
                <p className='text-sm text-slate-600'>{new Date(eventDate).toLocaleDateString()}</p>
                <button
                  onClick={() => setEditingEventDate(true)}
                  className='rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-200'
                >
                  Edit
                </button>
              </div>
            )}
            <p className='mt-2 text-xs text-slate-500'>This date affects the countdown on the home page</p>
          </div>
        </div>
      </div>

      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h3 className='text-xl font-semibold text-slate-900'>Live match schedule</h3>
        <div className='mt-5 overflow-hidden rounded-3xl border border-slate-200'>
          <table className='min-w-full divide-y divide-slate-200 text-left text-sm'>
            <thead className='bg-slate-50'>
              <tr>
                <th className='px-4 py-3 font-medium text-slate-600'>Match</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Round</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Teams</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Arena</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Time</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Status</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Score</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200 bg-white'>
              {matches.map((match) => (
                <tr key={match.id}>
                  <td className='px-4 py-4 font-semibold text-slate-900'>{match.id}</td>
                  <td className='px-4 py-4'>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${roundStyles[match.round]}`}>
                      {match.round}
                    </span>
                  </td>
                  <td className='px-4 py-4 text-slate-700'>
                    {match.teamA} vs {match.teamB}
                  </td>
                  <td className='px-4 py-4 text-slate-700'>
                    {editingMatch === match.id ? (
                      <input
                        type='text'
                        value={matchForm.arena}
                        onChange={(e) => setMatchForm({ ...matchForm, arena: e.target.value })}
                        className='w-full rounded border border-slate-300 px-2 py-1 text-sm'
                      />
                    ) : (
                      match.arena
                    )}
                  </td>
                  <td className='px-4 py-4 text-slate-700'>
                    {editingMatch === match.id ? (
                      <input
                        type='text'
                        value={matchForm.time}
                        onChange={(e) => setMatchForm({ ...matchForm, time: e.target.value })}
                        className='w-full rounded border border-slate-300 px-2 py-1 text-sm'
                      />
                    ) : (
                      match.time
                    )}
                  </td>
                  <td className='px-4 py-4 text-slate-700'>{match.status}</td>
                  <td className='px-4 py-4 text-slate-700'>
                    {match.scoreA} - {match.scoreB}
                  </td>
                  <td className='px-4 py-4'>
                    {editingMatch === match.id ? (
                      <div className='flex gap-1'>
                        <button
                          onClick={handleSaveMatch}
                          className='rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-white hover:bg-blue-700'
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingMatch(null)}
                          className='rounded border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50'
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditMatch(match)}
                        className='rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-200'
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MatchesPage
