import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { logoutAdmin } from "../auth"
import { createId, getCategories, getMembers, getTeams, saveTeams, getReferees, saveReferees } from "../storage"
import type { Category, Member, Team, Referee } from "../types"

const AdminDashboard = () => {
  const navigate = useNavigate()

  const [teams, setTeams] = useState<Team[]>(() => getTeams())
  const [members, setMembers] = useState<Member[]>(() => getMembers())
  const [categories, setCategories] = useState<Category[]>(() => getCategories())
  const [referees, setReferees] = useState<Referee[]>(() => getReferees())

  const [teamName, setTeamName] = useState("")
  const [teamSchool, setTeamSchool] = useState("")
  const [teamMembers, setTeamMembers] = useState<number>(3)

  const [refereeName, setRefereeName] = useState("")
  const [refereeSurname, setRefereeSurname] = useState("")
  const [refereeEmail, setRefereeEmail] = useState("")
  const [refereePassword, setRefereePassword] = useState("")
  const [refereeRole, setRefereeRole] = useState<'referee' | 'judge' | 'organizer'>('referee')

  const refreshDashboardData = () => {
    setTeams(getTeams())
    setMembers(getMembers())
    setCategories(getCategories())
    setReferees(getReferees())
  }

  useEffect(() => {
    const handleStorageSync = () => {
      refreshDashboardData()
    }

    window.addEventListener("storage", handleStorageSync)
    const interval = window.setInterval(refreshDashboardData, 5000)

    return () => {
      window.removeEventListener("storage", handleStorageSync)
      window.clearInterval(interval)
    }
  }, [])

  const stats = useMemo(() => {
    const uniqueCountries = new Set(teams.map(t => t.school).filter(Boolean))
    const mentorTeams = teams.filter(t => t.mentorId)
    const adminTeams = teams.filter(t => !t.mentorId)
    return {
      totalTeams: teams.length,
      totalCategories: categories.length,
      totalMembers: members.length,
      totalCountries: uniqueCountries.size,
      mentorTeams: mentorTeams.length,
      adminTeams: adminTeams.length
    }
  }, [teams, categories, members])

  const handleLogout = () => {
    logoutAdmin()
    navigate("/admin/login")
  }

  const handleAddTeam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newTeam: Team = {
      id: createId("team"),
      name: teamName.trim(),
      school: teamSchool.trim(),
      members: teamMembers,
    }

    const nextTeams = [newTeam, ...teams]
    setTeams(nextTeams)
    saveTeams(nextTeams)

    setTeamName("")
    setTeamSchool("")
    setTeamMembers(3)
  }

  const handleRemoveTeam = (teamId: string) => {
    const nextTeams = teams.filter((team) => team.id !== teamId)
    setTeams(nextTeams)
    saveTeams(nextTeams)
  }

  const handleAddReferee = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const existingReferees = getReferees()
    const email = refereeEmail.trim().toLowerCase()

    if (existingReferees.some((referee) => referee.email === email)) {
      alert("A referee with this email already exists.")
      return
    }

    // Simple password hashing (in production, use proper crypto)
    const salt = Math.random().toString(36).substring(2, 15)
    const passwordHash = btoa(refereePassword + salt)

    const newReferee: Referee = {
      id: createId("referee"),
      name: refereeName.trim(),
      surname: refereeSurname.trim(),
      email,
      passwordHash,
      passwordSalt: salt,
      role: refereeRole,
    }

    const nextReferees = [newReferee, ...referees]
    setReferees(nextReferees)
    saveReferees(nextReferees)

    setRefereeName("")
    setRefereeSurname("")
    setRefereeEmail("")
    setRefereePassword("")
    setRefereeRole('referee')
  }

  const handleRemoveReferee = (refereeId: string) => {
    const nextReferees = referees.filter((referee) => referee.id !== refereeId)
    setReferees(nextReferees)
    saveReferees(nextReferees)
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-7 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm tracking-widest text-blue-100 uppercase">NextGen Robotics Control Panel</p>
              <h1 className="mt-1 font-display text-4xl font-bold">Admin Dashboard</h1>
              <p className="mt-2 text-sm text-blue-100">Manage teams, participants, categories, and referee accounts from one secure place.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={refreshDashboardData}
                className="rounded-xl border border-white/50 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Refresh Data
              </button>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-white/50 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Log Out
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <div className="rounded-xl border border-white/40 bg-white/10 px-4 py-3">
              <p className="text-xs tracking-wide text-blue-100 uppercase">Total Teams</p>
              <p className="mt-1 text-2xl font-bold text-white">{stats.totalTeams}</p>
            </div>
            <div className="rounded-xl border border-white/40 bg-white/10 px-4 py-3">
              <p className="text-xs tracking-wide text-blue-100 uppercase">Participants</p>
              <p className="mt-1 text-2xl font-bold text-white">{stats.totalMembers}</p>
            </div>
            <div className="rounded-xl border border-white/40 bg-white/10 px-4 py-3">
              <p className="text-xs tracking-wide text-blue-100 uppercase">Countries</p>
              <p className="mt-1 text-2xl font-bold text-white">{stats.totalCountries}</p>
            </div>
            <div className="rounded-xl border border-white/40 bg-white/10 px-4 py-3">
              <p className="text-xs tracking-wide text-blue-100 uppercase">Categories</p>
              <p className="mt-1 text-2xl font-bold text-white">{stats.totalCategories}</p>
            </div>
            <div className="rounded-xl border border-white/40 bg-white/10 px-4 py-3">
              <p className="text-xs tracking-wide text-blue-100 uppercase">Mentor Teams</p>
              <p className="mt-1 text-2xl font-bold text-white">{stats.mentorTeams}</p>
            </div>
            <div className="rounded-xl border border-white/40 bg-white/10 px-4 py-3">
              <p className="text-xs tracking-wide text-blue-100 uppercase">Admin Teams</p>
              <p className="mt-1 text-2xl font-bold text-white">{stats.adminTeams}</p>
            </div>
            <div className="rounded-xl border border-white/40 bg-white/10 px-4 py-3">
              <p className="text-xs tracking-wide text-blue-100 uppercase">Referees</p>
              <p className="mt-1 text-2xl font-bold text-white">{referees.length}</p>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="font-display text-3xl font-semibold text-slate-900">Team Management</h2>
            <p className="mt-1 text-sm text-slate-600">Create, review, and remove teams.</p>

            <form className="mt-5 space-y-3" onSubmit={handleAddTeam}>
              <input
                type="text"
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
                placeholder="Team name"
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                required
              />
              <input
                type="text"
                value={teamSchool}
                onChange={(event) => setTeamSchool(event.target.value)}
                placeholder="School / Institution"
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                required
              />
              <input
                type="number"
                min={1}
                max={10}
                value={teamMembers}
                onChange={(event) => setTeamMembers(Number(event.target.value))}
                placeholder="Members"
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Add Team
              </button>
            </form>

            <div className="mt-5 space-y-3">
              {teams.length === 0 ? (
                <p className="text-sm text-slate-500">No teams yet.</p>
              ) : (
                teams.map((team) => (
                  <article key={team.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{team.name}</p>
                    <p className="text-sm text-slate-600">{team.school}</p>
                    <p className="text-xs text-slate-600">Category: {team.categoryName ?? "N/A"}</p>
                    <p className="text-xs text-slate-600">Mentor: {team.mentorName ?? "N/A"}</p>
                    <p className="text-xs text-blue-700">Members: {team.members}</p>
                    {team.description && <p className="mt-1 text-xs text-slate-600">Robot details: {team.description}</p>}
                    {team.memberNames && team.memberNames.length > 0 && (
                      <p className="mt-1 text-xs text-slate-600">Team members: {team.memberNames.join(", ")}</p>
                    )}
                    <button
                      onClick={() => handleRemoveTeam(team.id)}
                      className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="font-display text-3xl font-semibold text-slate-900">Participant Registry</h2>
            <p className="mt-1 text-sm text-slate-600">
              All participants registered by mentors are listed here automatically.
            </p>

            <div className="mt-5 space-y-3 max-h-[520px] overflow-auto pr-1">
              {members.length === 0 ? (
                <p className="text-sm text-slate-500">No participants registered yet.</p>
              ) : (
                members.map((member) => (
                  <article key={member.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{member.name} {member.surname}</p>
                    <p className="text-xs text-slate-600">Age: {member.age}</p>
                    <p className="text-xs text-slate-600">Email: {member.email}</p>
                    <p className="text-xs text-slate-600">Phone: {member.phone}</p>
                    <p className="text-xs text-slate-600">FIN: {member.fin}</p>
                    <p className="text-xs text-blue-700">Mentor ID: {member.mentorId}</p>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="font-display text-3xl font-semibold text-slate-900">Referee Accounts</h2>
            <p className="mt-1 text-sm text-slate-600">
              Create and maintain referee, judge, and organizer access for Teams Zone operations.
            </p>

            <form className="mt-5 space-y-3" onSubmit={handleAddReferee}>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={refereeName}
                  onChange={(event) => setRefereeName(event.target.value)}
                  placeholder="First name"
                  className="w-full rounded-xl border border-green-200 px-4 py-2.5 focus:border-green-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  value={refereeSurname}
                  onChange={(event) => setRefereeSurname(event.target.value)}
                  placeholder="Last name"
                  className="w-full rounded-xl border border-green-200 px-4 py-2.5 focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <input
                type="email"
                value={refereeEmail}
                onChange={(event) => setRefereeEmail(event.target.value)}
                placeholder="Email address"
                className="w-full rounded-xl border border-green-200 px-4 py-2.5 focus:border-green-500 focus:outline-none"
                required
              />
              <input
                type="password"
                value={refereePassword}
                onChange={(event) => setRefereePassword(event.target.value)}
                placeholder="Password"
                className="w-full rounded-xl border border-green-200 px-4 py-2.5 focus:border-green-500 focus:outline-none"
                required
                minLength={6}
              />
              <select
                value={refereeRole}
                onChange={(event) => setRefereeRole(event.target.value as 'referee' | 'judge' | 'organizer')}
                className="w-full rounded-xl border border-green-200 px-4 py-2.5 focus:border-green-500 focus:outline-none"
                required
              >
                <option value="referee">Referee</option>
                <option value="judge">Judge</option>
                <option value="organizer">Organizer</option>
              </select>
              <button
                type="submit"
                className="w-full rounded-xl bg-green-600 py-2.5 font-semibold text-white transition hover:bg-green-700"
              >
                Create Referee Account
              </button>
            </form>

            <div className="mt-5 space-y-3">
              {referees.length === 0 ? (
                <p className="text-sm text-slate-500">No referees yet.</p>
              ) : (
                referees.map((referee) => (
                  <article key={referee.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{referee.name} {referee.surname}</p>
                    <p className="text-sm text-slate-600">{referee.email}</p>
                    <p className="text-xs text-green-700 capitalize">Role: {referee.role}</p>
                    <button
                      onClick={() => handleRemoveReferee(referee.id)}
                      className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
