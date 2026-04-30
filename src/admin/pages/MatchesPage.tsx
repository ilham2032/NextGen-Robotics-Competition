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
}

const roundStyles: Record<MatchSlot['round'], string> = {
  Qualification: 'bg-sky-100 text-sky-700',
  'Semi-finals': 'bg-amber-100 text-amber-700',
  Finals: 'bg-rose-100 text-rose-700',
}

const MatchesPage = ({ matches, scoringRules, matchDuration, onGenerateSchedule, onExportCsv }: MatchesPageProps) => {
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
            <p className='mt-3 text-sm text-slate-600'>Scoring rules are customized in settings and apply automatically when results are entered.</p>
          </div>
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
            <h3 className='text-lg font-semibold text-slate-900'>Scoring overview</h3>
            <div className='mt-4 space-y-3'>
              {scoringRules.map((rule) => (
                <div key={rule.id} className='rounded-2xl bg-white p-4 shadow-sm'>
                  <div className='flex items-center justify-between gap-3'>
                    <p className='font-semibold text-slate-900'>{rule.title}</p>
                    <span className='text-sm text-slate-500'>{rule.type}</span>
                  </div>
                  <p className='mt-2 text-sm text-slate-600'>{rule.description}</p>
                  <p className='mt-2 text-xs text-slate-500'>Value: {rule.value}</p>
                </div>
              ))}
            </div>
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
                  <td className='px-4 py-4 text-slate-700'>{match.arena}</td>
                  <td className='px-4 py-4 text-slate-700'>{match.time}</td>
                  <td className='px-4 py-4 text-slate-700'>{match.status}</td>
                  <td className='px-4 py-4 text-slate-700'>
                    {match.scoreA} - {match.scoreB}
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
