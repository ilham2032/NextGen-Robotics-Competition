import type { TeamRecord, MatchSlot } from './adminDashboardTypes'

type TeamsPageProps = {
  teams: TeamRecord[]
  matches: MatchSlot[]
  onUpdateTeam: (updatedTeam: TeamRecord) => void
  onDeleteTeam: (teamId: string) => void
  onToggleCheckIn: (teamId: string) => void
  onAssignMatch: (teamId: string, matchId: string) => void
}

const teamStatusStyles: Record<TeamRecord['status'], string> = {
  'checked-in': 'bg-emerald-100 text-emerald-700',
  late: 'bg-amber-100 text-amber-700',
  absent: 'bg-rose-100 text-rose-700',
}

const TeamsPage = ({ teams, matches, onDeleteTeam, onToggleCheckIn, onAssignMatch }: TeamsPageProps) => {
  const availableMatches = matches.filter((match) => match.status !== 'Completed')

  return (
    <div className='space-y-8'>
      <div className='rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.25em] text-cyan-600'>Teams</p>
            <h2 className='mt-2 text-3xl font-semibold text-slate-900'>Competition roster</h2>
            <p className='mt-3 max-w-2xl text-sm text-slate-600'>View all registered teams and assign them to match slots.</p>
          </div>
          <div className='rounded-3xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700'>{teams.length} teams tracked</div>
        </div>
      </div>

      <div className='grid gap-6 xl:grid-cols-[1fr_0.9fr]'>
        <div className='rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm'>
          <h3 className='text-xl font-semibold text-slate-900'>Team directory</h3>
          <div className='mt-6 overflow-hidden rounded-[32px] border border-slate-200'>
            <table className='w-full min-w-180 divide-y divide-slate-200 text-left text-sm'>
              <thead className='bg-slate-50'>
                <tr>
                  <th className='px-4 py-3 font-medium text-slate-600'>Team</th>
                  <th className='px-4 py-3 font-medium text-slate-600'>Category</th>
                  <th className='px-4 py-3 font-medium text-slate-600'>Robot</th>
                  <th className='px-4 py-3 font-medium text-slate-600'>Status</th>
                  <th className='px-4 py-3 font-medium text-slate-600'>Match</th>
                  <th className='px-4 py-3 font-medium text-slate-600'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200 bg-white'>
                {teams.map((team) => (
                  <tr key={team.id}>
                    <td className='px-4 py-4'>
                      <p className='font-semibold text-slate-900'>{team.name}</p>
                      <p className='text-xs text-slate-500'>{team.school}</p>
                    </td>
                    <td className='px-4 py-4 text-slate-600'>{team.categoryName ?? 'Qualification'}</td>
                    <td className='px-4 py-4 text-slate-600'>{team.robotType}</td>
                    <td className='px-4 py-4'>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${teamStatusStyles[team.status]}`}>
                        {team.status}
                      </span>
                    </td>
                    <td className='px-4 py-4 text-slate-600'>
                      {matches.find((match) => match.id === team.matchId)?.arena ?? 'Unassigned'}
                    </td>
                    <td className='px-4 py-4'>
                      <button
                        type='button'
                        onClick={() => onToggleCheckIn(team.id)}
                        className='mr-2 rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-100'
                      >
                        Toggle status
                      </button>
                      <button
                        type='button'
                        onClick={() => onDeleteTeam(team.id)}
                        className='rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100'
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm'>
          <h3 className='text-xl font-semibold text-slate-900'>Quick assignments</h3>
          <p className='mt-2 text-sm text-slate-600'>Assign teams to open match slots quickly.</p>
          <div className='mt-6 space-y-4'>
            {teams.slice(0, 4).map((team) => (
              <div key={team.id} className='rounded-3xl border border-slate-200 bg-slate-50 p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <p className='font-semibold text-slate-900'>{team.name}</p>
                    <p className='text-xs text-slate-500'>{team.school}</p>
                  </div>
                  <span className={`rounded-full px-3 py-[0.35rem] text-xs font-semibold ${teamStatusStyles[team.status]}`}>
                    {team.status}
                  </span>
                </div>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {availableMatches.slice(0, 2).map((match) => (
                    <button
                      key={match.id}
                      type='button'
                      onClick={() => onAssignMatch(team.id, match.id)}
                      className='rounded-full border border-slate-200 px-3 py-2 text-xs text-slate-700 transition hover:bg-slate-100'
                    >
                      {match.round} • {match.arena}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamsPage
