import { useEffect, useMemo, useState } from "react"
import { createId, getMembers, getMentors, getTeams, getSettings, saveTeams } from "../storage"
import type { Member, Mentor, Team } from "../types"
import type { EventSettings, MatchSlot, ScoringRule, TeamRecord, TeamStatus } from "./adminDashboardTypes"
import AdminNav from "../components/AdminNav"
import MatchesPage from "./MatchesPage"
import ProfilePage from "./ProfilePage"
import TeamsPage from "./TeamsPage"
import UsersPage from "./UsersPage"
import CategoryPage from "./CategoryPage"
import AboutEventPage from "./AboutEventPage"

const defaultScoringRules: ScoringRule[] = [
  {
    id: "rule-1",
    title: "Base match score",
    description: "Points awarded for each match win.",
    value: 10,
    type: "Base",
  },
  {
    id: "rule-2",
    title: "Precision bonus",
    description: "Awarded for technical execution and stability.",
    value: 3,
    type: "Bonus",
  },
  {
    id: "rule-3",
    title: "Penalty deduction",
    description: "Points deducted for rule infractions.",
    value: -2,
    type: "Penalty",
  },
]

const defaultSettings: EventSettings = {
  eventName: "NextGen Robotics Championship",
  eventStatus: "Upcoming",
  eventDate: "2026-07-23",
  venue: "Innovation Expo Center",
  matchDuration: 6,
  logoUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  scoringRules: defaultScoringRules,
}

const defaultTeams: TeamRecord[] = [
  {
    id: "team-1",
    name: "Vector Velocity",
    school: "Starlight Technical Academy",
    members: 4,
    description: "Autonomous line-following prototype",
    categoryName: "Line Follower",
    memberNames: ["Alya", "Rian", "Mira", "Kaito"],
    status: "checked-in",
    robotType: "Line Follower",
    membersList: ["Alya", "Rian", "Mira", "Kaito"],
    score: 92,
    wins: 4,
    penalties: 2,
    bonuses: 8,
  },
  {
    id: "team-2",
    name: "Quantum Circuit",
    school: "Nexus Institute",
    members: 3,
    description: "Fast response mini-sumo",
    categoryName: "Mini Sumo",
    memberNames: ["Lina", "Evan", "Theo"],
    status: "checked-in",
    robotType: "Sumo",
    membersList: ["Lina", "Evan", "Theo"],
    score: 85,
    wins: 3,
    penalties: 1,
    bonuses: 10,
  },
  {
    id: "team-3",
    name: "AeroStrikers",
    school: "Pinnacle Academy",
    members: 5,
    description: "High-precision drone navigation",
    categoryName: "Drone",
    memberNames: ["Sofia", "Noel", "Jade", "Mason", "Rhea"],
    status: "late",
    robotType: "Drone",
    membersList: ["Sofia", "Noel", "Jade", "Mason", "Rhea"],
    score: 78,
    wins: 2,
    penalties: 0,
    bonuses: 6,
  },
]

const defaultMatches: MatchSlot[] = [
  {
    id: "match-1",
    round: "Qualification",
    time: "09:00",
    arena: "Arena 1",
    teamA: "Vector Velocity",
    teamB: "Quantum Circuit",
    status: "Pending",
    scoreA: 0,
    scoreB: 0,
    notes: "Opening qualification match",
  },
  {
    id: "match-2",
    round: "Qualification",
    time: "09:20",
    arena: "Arena 2",
    teamA: "AeroStrikers",
    teamB: "TBD",
    status: "Pending",
    scoreA: 0,
    scoreB: 0,
    notes: "Drone elimination round",
  },
]

const navItems = [
  { id: "dashboard", title: "Dashboard" },
  { id: "users", title: "Users" },
  { id: "teams", title: "Teams" },
  { id: "category", title: "Category" },
  { id: "schedule", title: "Schedule" },
  { id: "profile", title: "Profile" },
  { id: "about-event", title: "About Event" },
] as const

type PageId = (typeof navItems)[number]["id"]

const createTeamRecord = (team: Team): TeamRecord => ({
  ...team,
  status: "checked-in",
  robotType: team.description?.split(" ")[0] ?? "Autonomous",
  membersList: team.memberNames ?? [],
  score: 0,
  wins: 0,
  penalties: 0,
  bonuses: 0,
})

const AdminDashboard = () => {
  const [teams, setTeams] = useState<TeamRecord[]>(() => {
    const saved = getTeams()
    return saved.length > 0 ? saved.map(createTeamRecord) : defaultTeams
  })
  const [matches, setMatches] = useState<MatchSlot[]>(defaultMatches)
  const [settings] = useState<EventSettings>(() => {
    const saved = getSettings()
    return saved ?? defaultSettings
  })
  const [mentors] = useState<Mentor[]>(() => getMentors())
  const [members] = useState<Member[]>(() => getMembers())
  const [profile, setProfile] = useState({
    name: "NextGen Admin",
    email: "admin@nextgen-robocomp.com",
    role: "Admin",
    organization: "NextGen Robotics",
    phone: "+994 50 123 45 67",
  })
  const [activePage, setActivePage] = useState<PageId>("dashboard")
  const [toastMessage, setToastMessage] = useState("")
  const [currentRole, setCurrentRole] = useState<"Admin" | "Judge" | "Volunteer">("Admin")
  const [matchTimeLeft, setMatchTimeLeft] = useState(settings.matchDuration * 60)
  const [matchTimerRunning, setMatchTimerRunning] = useState(false)

  const currentMatch = matches.find((match) => match.status === "Live") ?? null

  const notify = (message: string) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(""), 2600)
  }

  useEffect(() => {
    if (!matchTimerRunning || !currentMatch) {
      return
    }

    const interval = window.setInterval(() => {
      setMatchTimeLeft((seconds) => {
        if (seconds <= 1) {
          setMatchTimerRunning(false)
          setMatches((current) =>
            current.map((match) => {
              if (match.id !== currentMatch.id) return match

              const winner = match.scoreA === match.scoreB ? "Draw" : match.scoreA > match.scoreB ? match.teamA : match.teamB
              return { ...match, status: "Completed", winner }
            }),
          )
          notify("Match has ended and results were recorded.")
          return 0
        }
        return seconds - 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [currentMatch, matchTimerRunning])

  useEffect(() => {
    setMatchTimeLeft(settings.matchDuration * 60)
  }, [settings.matchDuration])

  const stats = useMemo(() => {
    const checkedIn = teams.filter((team) => team.status === "checked-in").length
    const late = teams.filter((team) => team.status === "late").length
    const absent = teams.filter((team) => team.status === "absent").length
    const countries = new Set(teams.map((team) => team.school).filter(Boolean)).size
    return { checkedIn, late, absent, countries }
  }, [teams])

  const saveTeamState = (nextTeams: TeamRecord[]) => {
    setTeams(nextTeams)
    saveTeams(nextTeams)
  }



  const handleDeleteTeam = (teamId: string) => {
    saveTeamState(teams.filter((team) => team.id !== teamId))
    notify("Team removed")
  }

  const handleToggleCheckIn = (teamId: string) => {
    const nextTeams = teams.map((team) => {
      if (team.id !== teamId) return team
      const nextStatus: TeamStatus = team.status === "checked-in" ? "late" : team.status === "late" ? "absent" : "checked-in"
      return { ...team, status: nextStatus }
    })
    saveTeamState(nextTeams)
    notify("Team status updated")
  }

  const handleAssignMatch = (teamId: string, matchId: string) => {
    const team = teams.find((target) => target.id === teamId)
    if (!team) {
      notify("Team lookup failed")
      return
    }

    setMatches((currentMatches) =>
      currentMatches.map((match) => {
        if (match.id !== matchId) return match
        if (match.teamA === "TBD") return { ...match, teamA: team.name }
        if (match.teamB === "TBD") return { ...match, teamB: team.name }
        return match
      }),
    )

    saveTeamState(teams.map((target) => (target.id === teamId ? { ...target, matchId } : target)))
    notify(`${team.name} assigned to ${matchId}`)
  }

  const handleGenerateSchedule = () => {
    if (teams.length < 2) {
      notify("Add more teams before generating a schedule.")
      return
    }

    const roster = [...teams].slice(0, 8)
    const generated: MatchSlot[] = [
      {
        id: createId("match"),
        round: "Qualification",
        time: "09:00",
        arena: "Arena 1",
        teamA: roster[0]?.name ?? "TBD",
        teamB: roster[1]?.name ?? "TBD",
        status: "Pending",
        scoreA: 0,
        scoreB: 0,
      },
      {
        id: createId("match"),
        round: "Qualification",
        time: "09:20",
        arena: "Arena 2",
        teamA: roster[2]?.name ?? "TBD",
        teamB: roster[3]?.name ?? "TBD",
        status: "Pending",
        scoreA: 0,
        scoreB: 0,
      },
      {
        id: createId("match"),
        round: "Semi-finals",
        time: "10:00",
        arena: "Arena 1",
        teamA: roster[4]?.name ?? "TBD",
        teamB: roster[5]?.name ?? "TBD",
        status: "Pending",
        scoreA: 0,
        scoreB: 0,
      },
    ]

    setMatches(generated)
    notify("Match schedule generated")
  }

  const handleUpdateMatch = (updatedMatch: MatchSlot) => {
    setMatches((currentMatches) => currentMatches.map((match) => (match.id === updatedMatch.id ? updatedMatch : match)))
    notify("Match updated")
  }

  const handleExportScheduleCsv = () => {
    if (matches.length === 0) {
      notify("No matches to export.")
      return
    }

    const header = ["Match ID", "Round", "Time", "Arena", "Team A", "Team B", "Status", "Score A", "Score B"].join(",")
    const rows = matches.map((match) => [match.id, match.round, match.time, match.arena, match.teamA, match.teamB, match.status, match.scoreA, match.scoreB].join(","))
    const csv = [header, ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "robotics_match_schedule.csv"
    link.click()
    notify("Schedule exported")
  }

  const displayMinutes = Math.floor(matchTimeLeft / 60)
  const displaySeconds = String(matchTimeLeft % 60).padStart(2, "0")

  return (
    <>
      <AdminNav activePage={activePage} onNavigate={(pageId) => setActivePage(pageId as PageId)} />

      <section className="bg-slate-50 min-h-screen px-4 pb-16 pt-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Dashboard Overview Page */}
          {activePage === "dashboard" && (
            <div className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white px-8 py-12 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.25em] text-blue-600 uppercase">Welcome back</p>
                    <h1 className="mt-2 text-4xl font-bold text-slate-900">Admin Dashboard</h1>
                    <p className="mt-3 max-w-2xl text-slate-600">
                      Manage teams, schedule matches, track live scoring and configure event settings for a modern competition experience.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Total Teams</p>
                      <p className="mt-2 text-3xl font-bold text-blue-700">{teams.length}</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Checked In</p>
                      <p className="mt-2 text-3xl font-bold text-cyan-700">{stats.checkedIn}</p>
                    </div>
                    <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Pending Matches</p>
                      <p className="mt-2 text-3xl font-bold text-indigo-700">{matches.filter((m) => m.status === "Pending").length}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Current Role</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">{currentRole}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Event Status</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">{settings.eventStatus}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Event Date</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">{new Date(settings.eventDate).toLocaleDateString()}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Match Duration</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">{settings.matchDuration} min</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900">📊 Live Match Timer</h3>
                  <div className="mt-6 text-center">
                    <p className="text-5xl font-bold text-blue-700">{displayMinutes}:{displaySeconds}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {currentMatch ? `${currentMatch.teamA} vs ${currentMatch.teamB}` : "No active match"}
                    </p>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setMatchTimerRunning(true)}
                      className="flex-1 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
                    >
                      ▶ Start
                    </button>
                    <button
                      onClick={() => setMatchTimerRunning(false)}
                      className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 transition hover:bg-slate-50"
                    >
                      ⏸ Pause
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900">⚙️ Admin Settings</h3>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700">Current Role</label>
                      <select
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value as "Admin" | "Judge" | "Volunteer")}
                        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 outline-none"
                      >
                        <option>Admin</option>
                        <option>Judge</option>
                        <option>Volunteer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "users" && <UsersPage mentors={mentors} members={members} />}

          {activePage === "teams" && (
            <TeamsPage
              teams={teams}
              matches={matches}
              onDeleteTeam={handleDeleteTeam}
              onToggleCheckIn={handleToggleCheckIn}
              onAssignMatch={handleAssignMatch}
            />
          )}

          {activePage === "category" && <CategoryPage onNotify={notify} />}

          {activePage === "schedule" && (
            <MatchesPage
              matches={matches}
              teams={teams}
              scoringRules={settings.scoringRules}
              matchDuration={settings.matchDuration}
              onUpdateMatch={handleUpdateMatch}
              onAddMatch={(match) => setMatches((current) => [match, ...current])}
              onGenerateSchedule={handleGenerateSchedule}
              onExportCsv={handleExportScheduleCsv}
            />
          )}

          {activePage === "profile" && <ProfilePage profile={profile} onUpdateProfile={setProfile} />}

          {activePage === "about-event" && <AboutEventPage onNotify={notify} />}
        </div>

        {toastMessage ? (
          <div className="fixed bottom-5 right-5 z-50 rounded-3xl bg-blue-700 px-6 py-4 text-white shadow-xl shadow-blue-700/30 font-semibold">
            {toastMessage}
          </div>
        ) : null}
      </section>
    </>
  )
}

export default AdminDashboard
