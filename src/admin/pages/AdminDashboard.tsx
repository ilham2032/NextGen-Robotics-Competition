import { useEffect, useMemo, useState } from "react"
import { createId, getTeams, saveTeams } from "../storage"
import type { Team } from "../types"
import type { EventSettings, LeaderboardRow, MatchSlot, ScoringRule, TeamRecord, TeamStatus } from "./adminDashboardTypes"
import LeaderboardPage from "./LeaderboardPage"
import MatchesPage from "./MatchesPage"
import SettingsPage from "./SettingsPage"
import TeamsPage from "./TeamsPage"

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
  eventDate: "2025-08-16",
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
  { id: "overview", title: "Overview" },
  { id: "teams", title: "Teams" },
  { id: "matches", title: "Matches" },
  { id: "leaderboard", title: "Leaderboard" },
  { id: "settings", title: "Settings" },
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
  const [settings, setSettings] = useState<EventSettings>(defaultSettings)
  const [activePage, setActivePage] = useState<PageId>("overview")
  const [sortBy, setSortBy] = useState<"score" | "wins" | "points" | "tieBreaker">("score")
  const [toastMessage, setToastMessage] = useState("")
  const [darkMode, setDarkMode] = useState(false)
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

  const leaderboard = useMemo(() => {
    const rows: LeaderboardRow[] = teams.map((team) => ({
      teamId: team.id,
      teamName: team.name,
      score: team.score,
      wins: team.wins,
      points: team.score + team.bonuses + team.penalties,
      tieBreaker: team.wins * 10 + team.score,
    }))

    return rows.sort((a, b) => {
      if (b[sortBy] !== a[sortBy]) return b[sortBy] - a[sortBy]
      return b.tieBreaker - a.tieBreaker
    })
  }, [teams, sortBy])

  const saveTeamState = (nextTeams: TeamRecord[]) => {
    setTeams(nextTeams)
    saveTeams(nextTeams)
  }

  const handleAddTeam = (team: TeamRecord) => {
    saveTeamState([team, ...teams])
    notify(`Added ${team.name}`)
  }

  const handleUpdateTeam = (updatedTeam: TeamRecord) => {
    saveTeamState(teams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team)))
    notify(`Updated ${updatedTeam.name}`)
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

  const handleUpdateSettings = (nextSettings: EventSettings) => {
    setSettings(nextSettings)
    notify("Settings updated")
  }

  const handleExportLeaderboard = () => {
    const report = leaderboard
      .map((entry, index) => `${index + 1}. ${entry.teamName} — ${entry.score} pts`)
      .join("\n")
    const blob = new Blob([`Leaderboard report:\n\n${report}`], { type: "text/plain;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "robotics_leaderboard_report.txt"
    link.click()
    notify("Leaderboard exported")
  }

  const displayMinutes = Math.floor(matchTimeLeft / 60)
  const displaySeconds = String(matchTimeLeft % 60).padStart(2, "0")

  return (
    <section className={`${darkMode ? "dark bg-slate-950" : "bg-slate-50"} min-h-screen px-4 pb-16 pt-14 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm transition dark:border-slate-700 dark:bg-slate-900 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">NextGen Robotics Admin</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Event Operations Dashboard</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Manage teams, schedule matches, track live scoring and configure event settings for a modern competition experience.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Current role</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{currentRole}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Checks in</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{stats.checkedIn}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Pending matches</p>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{matches.filter((match) => match.status === "Pending").length}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePage(item.id)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${activePage === item.id ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/30" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_420px]">
          <main className="space-y-8">
            {activePage === "overview" && (
              <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Live event summary</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Scheduled teams</p>
                      <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{teams.length}</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Live match</p>
                      <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{currentMatch ? currentMatch.id : "None"}</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Venue</p>
                      <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{settings.venue}</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Score rule count</p>
                      <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{settings.scoringRules.length}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Quick actions</h2>
                  <div className="mt-6 space-y-4">
                    <button
                      type="button"
                      onClick={handleGenerateSchedule}
                      className="w-full rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:bg-cyan-300"
                    >
                      Auto-generate match schedule
                    </button>
                    <button
                      type="button"
                      onClick={handleExportScheduleCsv}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      Export schedule CSV
                    </button>
                    <button
                      type="button"
                      onClick={handleExportLeaderboard}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      Export leaderboard report
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePage === "teams" && (
              <TeamsPage
                teams={teams}
                matches={matches}
                onAddTeam={handleAddTeam}
                onUpdateTeam={handleUpdateTeam}
                onDeleteTeam={handleDeleteTeam}
                onToggleCheckIn={handleToggleCheckIn}
                onAssignMatch={handleAssignMatch}
              />
            )}

            {activePage === "matches" && (
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

            {activePage === "leaderboard" && (
              <LeaderboardPage leaderboard={leaderboard} sortBy={sortBy} onSort={(field) => setSortBy(field)} />
            )}

            {activePage === "settings" && (
              <SettingsPage
                settings={settings}
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode((current) => !current)}
                onUpdateSettings={handleUpdateSettings}
              />
            )}
          </main>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">Live match timer</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{displayMinutes}:{displaySeconds}</p>
                </div>
                <div className="rounded-3xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {currentMatch?.status ?? "Idle"}
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                Current match: {currentMatch ? `${currentMatch.teamA} vs ${currentMatch.teamB}` : "No active match selected."}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setMatchTimerRunning(true)}
                  className="rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:bg-cyan-300"
                >
                  Start timer
                </button>
                <button
                  type="button"
                  onClick={() => setMatchTimerRunning(false)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Pause timer
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Event controls</h2>
              <div className="mt-4 space-y-3">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Event day</p>
                  <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{settings.eventDate}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Venue</p>
                  <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{settings.venue}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Match length</p>
                  <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{settings.matchDuration} minutes</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">Role selector</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{currentRole}</p>
                </div>
                <select
                  value={currentRole}
                  onChange={(event) => setCurrentRole(event.target.value as "Admin" | "Judge" | "Volunteer")}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option>Admin</option>
                  <option>Judge</option>
                  <option>Volunteer</option>
                </select>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Role mode updates interface behavior to help with event preparation and access scope simulations.</p>
            </section>
          </aside>
        </div>
      </div>

      {toastMessage ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-3xl bg-cyan-400 px-5 py-3 text-sm text-slate-950 shadow-xl shadow-cyan-400/30">
          {toastMessage}
        </div>
      ) : null}
    </section>
  )
}

export default AdminDashboard
