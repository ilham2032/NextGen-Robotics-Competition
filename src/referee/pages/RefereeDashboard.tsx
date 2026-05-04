import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signOutReferee, getCurrentReferee } from "../auth"
import { createId, getCategories, getTeams, getMatchResults, saveMatchResults, getCompetitionResults, saveCompetitionResults } from "../../admin/storage"
import type { Category, Team, MatchResult, CompetitionResult } from "../../admin/types"

const RefereeDashboard = () => {
  const navigate = useNavigate()
  const currentReferee = getCurrentReferee()

  const [categories] = useState<Category[]>(() => getCategories())
  const [teams] = useState<Team[]>(() => getTeams())
  const [matchResults, setMatchResults] = useState<MatchResult[]>(() => getMatchResults())
  const [competitionResults, setCompetitionResults] = useState<CompetitionResult[]>(() => getCompetitionResults())

  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [team1Id, setTeam1Id] = useState<string>("")
  const [team2Id, setTeam2Id] = useState<string>("")
  const [team1Score, setTeam1Score] = useState<number>(0)
  const [team2Score, setTeam2Score] = useState<number>(0)
  const [round, setRound] = useState<number>(1)
  const [notes, setNotes] = useState<string>("")

  const categoryTeams = useMemo(() => {
    if (!selectedCategory) return []
    return teams.filter(team => team.categoryName === categories.find(c => c.id === selectedCategory)?.name)
  }, [selectedCategory, teams, categories])

  const categoryMatches = useMemo(() => {
    return matchResults.filter(match => match.categoryId === selectedCategory)
  }, [matchResults, selectedCategory])

  const categoryStandings = useMemo(() => {
    if (!selectedCategory) return []

    const categoryMatches = matchResults.filter(match => match.categoryId === selectedCategory)
    const teamStats = new Map<string, { wins: number, losses: number, draws: number, points: number }>()

    // Initialize stats for all teams in category
    categoryTeams.forEach(team => {
      teamStats.set(team.id, { wins: 0, losses: 0, draws: 0, points: 0 })
    })

    // Calculate stats from matches
    categoryMatches.forEach(match => {
      const team1Stats = teamStats.get(match.team1Id)
      const team2Stats = teamStats.get(match.team2Id)

      if (!team1Stats || !team2Stats) return

      if (match.winnerId === match.team1Id) {
        team1Stats.wins++
        team2Stats.losses++
        team1Stats.points += 3
      } else if (match.winnerId === match.team2Id) {
        team2Stats.wins++
        team1Stats.losses++
        team2Stats.points += 3
      } else {
        team1Stats.draws++
        team2Stats.draws++
        team1Stats.points += 1
        team2Stats.points += 1
      }
    })

    return Array.from(teamStats.entries())
      .map(([teamId, stats]) => ({
        team: teams.find(t => t.id === teamId)!,
        ...stats
      }))
      .sort((a, b) => b.points - a.points || b.wins - a.wins)
  }, [selectedCategory, matchResults, categoryTeams, teams])

  const handleLogout = () => {
    signOutReferee()
    navigate("/referee/login")
  }

  const handleAddMatchResult = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedCategory || !team1Id || !team2Id || !currentReferee) return

    const winnerId = team1Score > team2Score ? team1Id : team2Score > team1Score ? team2Id : null

    const newMatch: MatchResult = {
      id: createId("match"),
      categoryId: selectedCategory,
      team1Id,
      team2Id,
      team1Score,
      team2Score,
      winnerId,
      refereeId: currentReferee.id,
      round,
      matchDate: new Date().toISOString(),
      notes: notes.trim() || undefined,
    }

    const nextResults = [newMatch, ...matchResults]
    setMatchResults(nextResults)
    saveMatchResults(nextResults)

    // Reset form
    setTeam1Id("")
    setTeam2Id("")
    setTeam1Score(0)
    setTeam2Score(0)
    setRound(1)
    setNotes("")
  }

  const handleFinalizeResults = () => {
    if (!selectedCategory || !currentReferee) return

    const finalizedResults: CompetitionResult[] = categoryStandings.map((standing, index) => ({
      id: createId("result"),
      categoryId: selectedCategory,
      teamId: standing.team.id,
      position: index + 1,
      totalScore: standing.points,
      matchesPlayed: standing.wins + standing.losses + standing.draws,
      refereeId: currentReferee.id,
      finalized: true,
    }))

    const nextCompetitionResults = [...competitionResults.filter(r => r.categoryId !== selectedCategory), ...finalizedResults]
    setCompetitionResults(nextCompetitionResults)
    saveCompetitionResults(nextCompetitionResults)

    alert("Competition results finalized!")
  }

  if (!currentReferee) {
    navigate("/referee/login")
    return null
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 px-4 pb-16 pt-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-700 to-cyan-600 p-7 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm tracking-widest text-blue-100 uppercase">NextGen Robotics Olympiad</p>
              <h1 className="mt-1 font-display text-4xl font-bold">Referee Dashboard</h1>
              <p className="mt-1 text-blue-100">Welcome, {currentReferee.name} {currentReferee.surname}</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/60 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Log Out
            </button>
          </div>
        </header>

        <div className="mt-8 space-y-8">
          {/* Category Selection */}
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-blue-900 mb-4">Select Competition Category</h2>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full max-w-md rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Choose a category...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <>
              {/* Add Match Result */}
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-semibold text-blue-900 mb-4">Record Match Result</h2>

                <form className="space-y-4" onSubmit={handleAddMatchResult}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Team 1</label>
                      <select
                        value={team1Id}
                        onChange={(event) => setTeam1Id(event.target.value)}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        required
                      >
                        <option value="">Select Team 1...</option>
                        {categoryTeams.map((team) => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Team 2</label>
                      <select
                        value={team2Id}
                        onChange={(event) => setTeam2Id(event.target.value)}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        required
                      >
                        <option value="">Select Team 2...</option>
                        {categoryTeams.filter(team => team.id !== team1Id).map((team) => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Team 1 Score</label>
                      <input
                        type="number"
                        min={0}
                        value={team1Score}
                        onChange={(event) => setTeam1Score(Number(event.target.value))}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Team 2 Score</label>
                      <input
                        type="number"
                        min={0}
                        value={team2Score}
                        onChange={(event) => setTeam2Score(Number(event.target.value))}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Round</label>
                      <input
                        type="number"
                        min={1}
                        value={round}
                        onChange={(event) => setRound(Number(event.target.value))}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">Notes (Optional)</label>
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Additional notes about the match..."
                      className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                      rows={3}
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Record Match Result
                  </button>
                </form>
              </div>

              {/* Current Standings */}
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl font-semibold text-blue-900">Current Standings</h2>
                  <button
                    onClick={handleFinalizeResults}
                    className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Finalize Results
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-blue-200">
                        <th className="text-left py-2 px-4 font-semibold text-blue-900">Position</th>
                        <th className="text-left py-2 px-4 font-semibold text-blue-900">Team</th>
                        <th className="text-center py-2 px-4 font-semibold text-blue-900">W</th>
                        <th className="text-center py-2 px-4 font-semibold text-blue-900">L</th>
                        <th className="text-center py-2 px-4 font-semibold text-blue-900">D</th>
                        <th className="text-center py-2 px-4 font-semibold text-blue-900">Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryStandings.map((standing, index) => (
                        <tr key={standing.team.id} className="border-b border-blue-100">
                          <td className="py-3 px-4 font-medium text-blue-900">{index + 1}</td>
                          <td className="py-3 px-4 font-medium">{standing.team.name}</td>
                          <td className="py-3 px-4 text-center">{standing.wins}</td>
                          <td className="py-3 px-4 text-center">{standing.losses}</td>
                          <td className="py-3 px-4 text-center">{standing.draws}</td>
                          <td className="py-3 px-4 text-center font-semibold">{standing.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Match History */}
              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-semibold text-blue-900 mb-4">Match History</h2>

                <div className="space-y-3">
                  {categoryMatches.length === 0 ? (
                    <p className="text-sm text-slate-500">No matches recorded yet.</p>
                  ) : (
                    categoryMatches.map((match) => {
                      const team1 = teams.find(t => t.id === match.team1Id)
                      const team2 = teams.find(t => t.id === match.team2Id)
                      const winner = teams.find(t => t.id === match.winnerId)

                      return (
                        <article key={match.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="font-semibold">{team1?.name} vs {team2?.name}</span>
                              <span className="text-sm text-slate-600">Round {match.round}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{match.team1Score} - {match.team2Score}</p>
                              {winner && <p className="text-sm text-green-700">Winner: {winner.name}</p>}
                              {!winner && <p className="text-sm text-blue-700">Draw</p>}
                            </div>
                          </div>
                          {match.notes && (
                            <p className="mt-2 text-sm text-slate-600">{match.notes}</p>
                          )}
                        </article>
                      )
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default RefereeDashboard