import type { TeamRecord, MatchSlot } from './adminDashboardTypes'

type TeamsPageProps = {
  teams: TeamRecord[]
  matches: MatchSlot[]
  onAddTeam: (newTeam: TeamRecord) => void
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

const TeamsPage = ({ teams, matches, onAddTeam, onDeleteTeam, onToggleCheckIn, onAssignMatch }: TeamsPageProps) => {
  const availableMatches = matches.filter((match) => match.status !== 'Completed')
  return (
    <div className='space-y-8'>
      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-2xl font-semibold text-slate-900'>Team Management</h2>
            <p className='mt-2 text-sm text-slate-600'>Add team details, track check-in status, and assign teams to matches.</p>
          </div>
        </div>

        <div className='mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]'>
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
            <h3 className='text-lg font-semibold text-slate-900'>Add team</h3>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                const target = event.target as typeof event.target & {
                  name: { value: string }
                  organization: { value: string }
                  robotType: { value: string }
                  members: { value: string }
                }

                const team: TeamRecord = {
                  id: `team-${Date.now()}`,
                  name: target.name.value,
                  school: target.organization.value,
                  members: Number(target.members.value) || 3,
                  description: `${target.robotType.value} robot team`,
                  categoryName: 'Qualification',
                  memberNames: [],
                  status: 'checked-in',
                  robotType: target.robotType.value,
                  membersList: [],
                  score: 0,
                  wins: 0,
                  penalties: 0,
                  bonuses: 0,
                }
                onAddTeam(team)
                target.name.value = ''
                target.organization.value = ''
                target.robotType.value = ''
                target.members.value = '3'
              }}
              className='space-y-3'
            >
              <div className='grid gap-3 sm:grid-cols-2'>
                <input name='name' placeholder='Team name' className='rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-500' required />
                <input name='organization' placeholder='School / Org' className='rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-500' required />
              </div>
              <div className='grid gap-3 sm:grid-cols-2'>
                <input name='robotType' placeholder='Robot type' className='rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-500' required />
                <input name='members' type='number' min='1' max='10' placeholder='Members' defaultValue='3' className='rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-cyan-500' required />
              </div>
              <button type='submit' className='inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:bg-cyan-300'>
                Add team
              </button>
            </form>
          </div>

          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
            <h3 className='text-lg font-semibold text-slate-900'>Quick assignments</h3>
            <p className='mt-2 text-sm text-slate-600'>Assign pending teams to active match slots in one click.</p>
            <div className='mt-4 space-y-3'>
              {teams.slice(0, 4).map((team) => (
                <div key={team.id} className='rounded-2xl border border-slate-200 bg-white px-4 py-4'>
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

      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h3 className='text-xl font-semibold text-slate-900'>Team directory</h3>
        <div className='mt-6 overflow-hidden rounded-3xl border border-slate-200'>
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
    </div>
  )
}

export default TeamsPage
