import type { LeaderboardRow } from './adminDashboardTypes'

type SortField = 'score' | 'wins' | 'points' | 'tieBreaker'

type LeaderboardPageProps = {
  leaderboard: LeaderboardRow[]
  sortBy: SortField
  onSort: (field: SortField) => void
}

const LeaderboardPage = ({ leaderboard, sortBy, onSort }: LeaderboardPageProps) => {
  return (
    <div className='space-y-8'>
      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-2xl font-semibold text-slate-900'>Live Leaderboard</h2>
            <p className='mt-2 text-sm text-slate-600'>Rank teams by score, wins, or points and resolve tie-breakers automatically.</p>
          </div>
          <div className='inline-flex flex-wrap gap-2'>
            {(['score', 'wins', 'points', 'tieBreaker'] as const).map((field) => (
              <button
                key={field}
                type='button'
                onClick={() => onSort(field)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${sortBy === field ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Sort by {field}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='overflow-hidden rounded-3xl border border-slate-200'>
          <table className='min-w-full divide-y divide-slate-200 text-left text-sm'>
            <thead className='bg-slate-50'>
              <tr>
                <th className='px-4 py-3 font-medium text-slate-600'>Rank</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Team</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Score</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Wins</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Points</th>
                <th className='px-4 py-3 font-medium text-slate-600'>Tie Break</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200 bg-white'>
              {leaderboard.map((team, index) => (
                <tr key={team.teamId}>
                  <td className='px-4 py-4 font-semibold text-slate-900'>{index + 1}</td>
                  <td className='px-4 py-4 text-slate-700'>{team.teamName}</td>
                  <td className='px-4 py-4 text-slate-700'>{team.score}</td>
                  <td className='px-4 py-4 text-slate-700'>{team.wins}</td>
                  <td className='px-4 py-4 text-slate-700'>{team.points}</td>
                  <td className='px-4 py-4 text-slate-700'>{team.tieBreaker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
