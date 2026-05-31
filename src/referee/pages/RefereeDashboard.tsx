import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOutReferee, getCurrentReferee } from '../auth'
import {
  createId,
  getCategories,
  getTeams,
  saveTeams,
  getMatchResults,
  saveMatchResults,
  getCompetitionResults,
  saveCompetitionResults,
} from '../../admin/storage'
import type { Category, Team, MatchResult, CompetitionResult } from '../../admin/types'
import { computeStandings } from '../../teamszone/utils/matchStats'
import {
  SUMO_MAX_ROUNDS,
  areAllSumoRoundsComplete,
  buildCompetitionResults,
  getCompletedRounds,
  getSuggestedSumoRound,
  isThreeRoundSumoCategory,
} from '../../teamszone/utils/sumoRounds'
import TrackScoringPanel from '../components/TrackScoringPanel'
import { isTrackCategory } from '../../teamszone/utils/trackCategories'
import {
  applyCategoryGroupAssignments,
  assignTeamsToGroups,
  categoryUsesGroups,
  clearCategoryGroupAssignments,
  filterMatchesByGroup,
  filterTeamsByGroup,
  formatGroupName,
  getGroupLabels,
  getGroupTeamCounts,
  getGroupsFromTeams,
  isGroupFinalized,
  recommendGroupCount,
  teamsShareGroup,
  updateTeamGroupInList,
} from '../../teamszone/utils/groupUtils'

const RefereeDashboard = () => {
  const navigate = useNavigate()
  const currentReferee = getCurrentReferee()

  const [categories] = useState<Category[]>(() => getCategories())
  const [teams, setTeams] = useState<Team[]>(() => getTeams())
  const [matchResults, setMatchResults] = useState<MatchResult[]>(() => getMatchResults())
  const [competitionResults, setCompetitionResults] = useState<CompetitionResult[]>(() => getCompetitionResults())

  const assignedCategoryId = currentReferee?.categoryId ?? ''
  const [selectedCategory, setSelectedCategory] = useState<string>(assignedCategoryId)
  const [groupCount, setGroupCount] = useState(2)
  const [selectedGroup, setSelectedGroup] = useState('A')

  const [team1Id, setTeam1Id] = useState('')
  const [team2Id, setTeam2Id] = useState('')
  const [team1Score, setTeam1Score] = useState(0)
  const [team2Score, setTeam2Score] = useState(0)
  const [round, setRound] = useState(1)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (assignedCategoryId) setSelectedCategory(assignedCategoryId)
  }, [assignedCategoryId])

  const selectedCategoryName = categories.find((c) => c.id === selectedCategory)?.name ?? ''
  const isSumoFormat = isThreeRoundSumoCategory(selectedCategoryName)
  const isTrackFormat = isTrackCategory(selectedCategoryName)

  const categoryTeams = useMemo(() => {
    if (!selectedCategoryName) return []
    return teams.filter((team) => team.categoryName?.trim() === selectedCategoryName)
  }, [selectedCategoryName, teams])

  useEffect(() => {
    if (categoryTeams.length > 0) {
      setGroupCount(recommendGroupCount(categoryTeams.length))
    }
  }, [categoryTeams.length, selectedCategory])

  const groups = useMemo(() => getGroupsFromTeams(categoryTeams), [categoryTeams])
  const usesGroups = categoryUsesGroups(categoryTeams)
  const requiresGroups = isSumoFormat && categoryTeams.length >= 2
  const groupLabels = getGroupLabels(groupCount)
  const groupsReady =
    categoryTeams.length >= 2 &&
    categoryTeams.every((team) => Boolean(team.group?.trim())) &&
    groups.length >= Math.min(groupCount, recommendGroupCount(categoryTeams.length))

  useEffect(() => {
    if (groups.length > 0 && !groups.includes(selectedGroup)) {
      setSelectedGroup(groups[0])
    }
  }, [groups, selectedGroup])

  const activeGroup = usesGroups ? selectedGroup : undefined

  const groupTeams = useMemo(() => {
    if (!activeGroup) return categoryTeams
    return filterTeamsByGroup(categoryTeams, activeGroup)
  }, [categoryTeams, activeGroup])

  const categoryMatches = useMemo(
    () => matchResults.filter((match) => match.categoryId === selectedCategory),
    [matchResults, selectedCategory],
  )

  const groupMatches = useMemo(() => {
    if (!activeGroup) return categoryMatches
    return filterMatchesByGroup(categoryMatches, activeGroup)
  }, [categoryMatches, activeGroup])

  const groupStandings = useMemo(
    () => computeStandings(groupTeams, groupMatches, teams),
    [groupTeams, groupMatches, teams],
  )

  const isCategoryLocked = Boolean(assignedCategoryId)
  const isGroupDone = activeGroup
    ? isGroupFinalized(competitionResults, selectedCategory, activeGroup)
    : competitionResults.some((r) => r.categoryId === selectedCategory && r.finalized && !r.group)

  const completedRounds = useMemo(() => getCompletedRounds(groupMatches), [groupMatches])
  const groupCounts = getGroupTeamCounts(categoryTeams)

  const persistTeams = (nextTeams: Team[]) => {
    setTeams(nextTeams)
    saveTeams(nextTeams)
  }

  const publishResults = useCallback(
    (
      standings: ReturnType<typeof computeStandings>,
      categoryId: string,
      refereeId: string,
      existingResults: CompetitionResult[],
      group?: string,
    ) => {
      const finalizedResults = buildCompetitionResults(categoryId, refereeId, standings, createId, group)
      const nextCompetitionResults = [
        ...existingResults.filter(
          (r) => !(r.categoryId === categoryId && (group ? r.group === group : !r.group)),
        ),
        ...finalizedResults,
      ]
      setCompetitionResults(nextCompetitionResults)
      saveCompetitionResults(nextCompetitionResults)
      return nextCompetitionResults
    },
    [],
  )

  const tryAutoPublishGroup = useCallback(
    (matches: MatchResult[], standings: ReturnType<typeof computeStandings>, group?: string) => {
      if (!selectedCategory || !currentReferee || !isSumoFormat) return
      if (!group && usesGroups) return
      if (group && isGroupFinalized(competitionResults, selectedCategory, group)) return
      if (!group && isGroupFinalized(competitionResults, selectedCategory, '')) return
      if (!areAllSumoRoundsComplete(matches) || standings.length === 0) return

      publishResults(standings, selectedCategory, currentReferee.id, competitionResults, group)
    },
    [selectedCategory, currentReferee, isSumoFormat, usesGroups, competitionResults, publishResults],
  )

  useEffect(() => {
    if (!selectedCategory || !isSumoFormat || !currentReferee) return
    setRound(getSuggestedSumoRound(groupMatches))

    if (usesGroups) {
      groups.forEach((group) => {
        const gTeams = filterTeamsByGroup(categoryTeams, group)
        const gMatches = filterMatchesByGroup(categoryMatches, group)
        const gStandings = computeStandings(gTeams, gMatches, teams)
        if (!isGroupFinalized(getCompetitionResults(), selectedCategory, group)) {
          tryAutoPublishGroup(gMatches, gStandings, group)
        }
      })
    } else {
      const freshResults = getCompetitionResults()
      const alreadyFinalized = freshResults.some(
        (r) => r.categoryId === selectedCategory && r.finalized && !r.group,
      )
      if (!alreadyFinalized && areAllSumoRoundsComplete(categoryMatches)) {
        const standings = computeStandings(categoryTeams, categoryMatches, teams)
        if (standings.length > 0) {
          publishResults(standings, selectedCategory, currentReferee.id, freshResults)
        }
      }
    }
  }, [
    selectedCategory,
    isSumoFormat,
    currentReferee,
    groupMatches,
    categoryMatches,
    categoryTeams,
    teams,
    usesGroups,
    groups,
    publishResults,
    tryAutoPublishGroup,
  ])

  const handleAutoSplitGroups = () => {
    if (categoryTeams.length < 2) {
      alert('Need at least 2 teams to create groups.')
      return
    }
    if (!window.confirm(`Split ${categoryTeams.length} teams evenly into ${groupCount} groups?`)) return

    const assigned = assignTeamsToGroups(categoryTeams, groupCount)
    const nextTeams = applyCategoryGroupAssignments(teams, selectedCategoryName, assigned)
    persistTeams(nextTeams)
    setSelectedGroup(getGroupLabels(groupCount)[0])
  }

  const handleClearGroups = () => {
    if (!window.confirm('Remove all group assignments for this category?')) return
    persistTeams(clearCategoryGroupAssignments(teams, selectedCategoryName))
  }

  const handleTeamGroupChange = (teamId: string, group: string) => {
    persistTeams(updateTeamGroupInList(teams, teamId, group))
  }

  const handleLogout = () => {
    signOutReferee()
    navigate('/teamszone/referee')
  }

  const handleAddMatchResult = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedCategory || !team1Id || !team2Id || !currentReferee) return

    if (requiresGroups && !groupsReady) {
      alert('Please set up groups before recording battles.')
      return
    }
    if (isGroupDone) {
      alert(activeGroup ? `${formatGroupName(activeGroup)} results are already published.` : 'Results already published.')
      return
    }
    if (team1Id === team2Id) {
      alert('Please select two different teams.')
      return
    }
    if (usesGroups && activeGroup && !teamsShareGroup(categoryTeams, team1Id, team2Id)) {
      alert('Both teams must be in the same group.')
      return
    }
    if (isSumoFormat && (round < 1 || round > SUMO_MAX_ROUNDS)) {
      alert(`Sumo categories use rounds 1–${SUMO_MAX_ROUNDS} only.`)
      return
    }

    const winnerId = team1Score > team2Score ? team1Id : team2Score > team1Score ? team2Id : null
    const matchGroup = usesGroups ? activeGroup : undefined

    const newMatch: MatchResult = {
      id: createId('match'),
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
      group: matchGroup,
    }

    const nextResults = [newMatch, ...matchResults]
    const nextGroupMatches = matchGroup
      ? [...filterMatchesByGroup(nextResults.filter((m) => m.categoryId === selectedCategory), matchGroup)]
      : nextResults.filter((m) => m.categoryId === selectedCategory)

    setMatchResults(nextResults)
    saveMatchResults(nextResults)

    setTeam1Id('')
    setTeam2Id('')
    setTeam1Score(0)
    setTeam2Score(0)
    setNotes('')

    const nextStandings = computeStandings(groupTeams, nextGroupMatches, teams)

    if (isSumoFormat) {
      setRound(getSuggestedSumoRound(nextGroupMatches))
      if (areAllSumoRoundsComplete(nextGroupMatches) && nextStandings.length > 0) {
        publishResults(nextStandings, selectedCategory, currentReferee.id, competitionResults, matchGroup)
        alert(
          matchGroup
            ? `All 3 rounds complete for ${formatGroupName(matchGroup)}! Winners published automatically.`
            : 'All 3 rounds complete! Winners published automatically.',
        )
      }
    } else {
      setRound((current) => current + 1)
    }
  }

  const handleFinalizeResults = () => {
    if (!selectedCategory || !currentReferee) return
    if (!window.confirm('Announce final winners? Results will appear publicly in Teams Zone.')) return
    publishResults(groupStandings, selectedCategory, currentReferee.id, competitionResults, activeGroup)
    alert('Winners announced!')
  }

  if (!currentReferee) {
    navigate('/teamszone/referee')
    return null
  }

  const canRecordBattles = !isGroupDone && (!requiresGroups || groupsReady)

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 px-4 pb-16 pt-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-700 to-cyan-600 p-7 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm tracking-widest text-blue-100 uppercase">Teams Zone Referee</p>
              <h1 className="mt-1 font-display text-4xl font-bold">Match Control Panel</h1>
              <p className="mt-1 text-blue-100">
                {currentReferee.name} {currentReferee.surname}
                {selectedCategoryName ? ` · ${selectedCategoryName}` : ''}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/teamszone" className="rounded-xl border border-white/60 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15">
                View Teams Zone
              </Link>
              <button onClick={handleLogout} className="rounded-xl border border-white/60 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15">
                Log Out
              </button>
            </div>
          </div>
        </header>

        <div className="mt-8 space-y-8">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-blue-900 mb-4">Your Category</h2>
            {isCategoryLocked ? (
              <p className="text-slate-700">
                Assigned category: <span className="font-semibold text-blue-700">{selectedCategoryName}</span>
                {isSumoFormat && <span className="ml-2 text-sm text-slate-500">· 3-round sumo · groups</span>}
                {isTrackFormat && <span className="ml-2 text-sm text-slate-500">· track finish times</span>}
              </p>
            ) : (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full max-w-md rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Choose a category...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
          </div>

          {selectedCategory && requiresGroups && (
            <div className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-semibold text-indigo-900 mb-2">Group Setup</h2>
              <p className="text-sm text-slate-600 mb-4">
                Split teams into groups before recording battles. Example: 20 teams → 10 in Group A, 10 in Group B.
                Each group runs its own 3-round tournament.
              </p>

              <div className="flex flex-wrap items-end gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Number of Groups</label>
                  <select
                    value={groupCount}
                    onChange={(e) => setGroupCount(Number(e.target.value))}
                    className="rounded-xl border border-slate-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none"
                    disabled={usesGroups && categoryMatches.length > 0}
                  >
                    {[2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n} groups ({getGroupLabels(n).join(', ')})</option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleAutoSplitGroups}
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Auto-Split Teams Evenly
                </button>
                {usesGroups && (
                  <button
                    type="button"
                    onClick={handleClearGroups}
                    className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Clear Groups
                  </button>
                )}
              </div>

              {usesGroups ? (
                <>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                    {groups.map((group) => (
                      <div key={group} className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-center">
                        <p className="font-semibold text-indigo-800">{formatGroupName(group)}</p>
                        <p className="text-2xl font-bold text-indigo-700">{groupCounts[group] ?? 0}</p>
                        <p className="text-xs text-slate-500">teams</p>
                      </div>
                    ))}
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold">Team</th>
                          <th className="text-left py-3 px-4 font-semibold">Country</th>
                          <th className="text-left py-3 px-4 font-semibold">Group</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryTeams.map((team) => (
                          <tr key={team.id} className="border-t border-slate-100">
                            <td className="py-2 px-4 font-medium">{team.name}</td>
                            <td className="py-2 px-4 text-slate-600">{team.school || '—'}</td>
                            <td className="py-2 px-4">
                              <select
                                value={team.group ?? ''}
                                onChange={(e) => handleTeamGroupChange(team.id, e.target.value)}
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                              >
                                <option value="">Unassigned</option>
                                {groupLabels.map((label) => (
                                  <option key={label} value={label}>{formatGroupName(label)}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <p className="text-sm text-amber-700 bg-amber-50 rounded-lg px-4 py-3">
                  {categoryTeams.length} teams registered. Click &quot;Auto-Split Teams Evenly&quot; to create groups.
                </p>
              )}
            </div>
          )}

          {selectedCategory && usesGroups && (
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-700 mb-3">Active Group</p>
              <div className="flex flex-wrap gap-2">
                {groups.map((group) => {
                  const done = isGroupFinalized(competitionResults, selectedCategory, group)
                  return (
                    <button
                      key={group}
                      type="button"
                      onClick={() => setSelectedGroup(group)}
                      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                        selectedGroup === group
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {formatGroupName(group)} ({groupCounts[group] ?? 0})
                      {done && ' ✓'}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {selectedCategory && isTrackFormat && currentReferee && (
            <TrackScoringPanel
              categoryId={selectedCategory}
              categoryName={selectedCategoryName}
              categoryTeams={categoryTeams}
              refereeId={currentReferee.id}
            />
          )}

          {selectedCategory && !isTrackFormat && (
            <>
              {isSumoFormat && (
                <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                  <h2 className="font-display text-xl font-semibold text-blue-900 mb-2">
                    Tournament Rounds{activeGroup ? ` · ${formatGroupName(activeGroup)}` : ''}
                  </h2>
                  <p className="text-sm text-slate-600 mb-4">
                    Record battles for Round 1, 2, and 3. Winners publish automatically when all 3 rounds are complete
                    {activeGroup ? ` for ${formatGroupName(activeGroup)}` : ''}.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((roundNumber) => {
                      const done = completedRounds.has(roundNumber)
                      return (
                        <div
                          key={roundNumber}
                          className={`rounded-xl border p-4 text-center ${
                            done ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50'
                          }`}
                        >
                          <p className="text-xs uppercase tracking-wide text-slate-500">Round</p>
                          <p className="text-2xl font-bold">{roundNumber}</p>
                          <p className={`text-xs font-medium mt-1 ${done ? 'text-green-700' : 'text-slate-500'}`}>
                            {done ? 'Complete' : 'Pending'}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                  {isGroupDone && (
                    <p className="mt-4 rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
                      {activeGroup ? `${formatGroupName(activeGroup)} winners published.` : 'Winners published.'}
                    </p>
                  )}
                </div>
              )}

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-semibold text-blue-900 mb-2">
                  Record Robot Battle{activeGroup ? ` · ${formatGroupName(activeGroup)}` : ''}
                </h2>
                {!canRecordBattles && requiresGroups && !groupsReady && (
                  <p className="text-sm text-amber-700 bg-amber-50 rounded-lg px-4 py-3 mb-4">
                    Set up groups first before recording battles.
                  </p>
                )}

                <form className="space-y-4" onSubmit={handleAddMatchResult}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Team 1</label>
                      <select
                        value={team1Id}
                        onChange={(e) => setTeam1Id(e.target.value)}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        required
                        disabled={!canRecordBattles}
                      >
                        <option value="">Select Team 1...</option>
                        {groupTeams.map((team) => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Team 2</label>
                      <select
                        value={team2Id}
                        onChange={(e) => setTeam2Id(e.target.value)}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        required
                        disabled={!canRecordBattles}
                      >
                        <option value="">Select Team 2...</option>
                        {groupTeams.filter((t) => t.id !== team1Id).map((team) => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Team 1 Points</label>
                      <input type="number" min={0} value={team1Score} onChange={(e) => setTeam1Score(Number(e.target.value))}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5" required disabled={!canRecordBattles} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Team 2 Points</label>
                      <input type="number" min={0} value={team2Score} onChange={(e) => setTeam2Score(Number(e.target.value))}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5" required disabled={!canRecordBattles} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Round</label>
                      {isSumoFormat ? (
                        <select value={round} onChange={(e) => setRound(Number(e.target.value))}
                          className="w-full rounded-xl border border-blue-200 px-4 py-2.5" required disabled={!canRecordBattles}>
                          {[1, 2, 3].map((n) => (
                            <option key={n} value={n}>Round {n}{completedRounds.has(n) ? ' ✓' : ''}</option>
                          ))}
                        </select>
                      ) : (
                        <input type="number" min={1} value={round} onChange={(e) => setRound(Number(e.target.value))}
                          className="w-full rounded-xl border border-blue-200 px-4 py-2.5" required disabled={!canRecordBattles} />
                      )}
                    </div>
                  </div>

                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)"
                    className="w-full rounded-xl border border-blue-200 px-4 py-2.5" rows={2} disabled={!canRecordBattles} />

                  <button type="submit" disabled={!canRecordBattles}
                    className="rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isGroupDone ? 'Results Published' : 'Record Battle Result'}
                  </button>
                </form>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className="font-display text-2xl font-semibold text-blue-900">
                    Standings{activeGroup ? ` · ${formatGroupName(activeGroup)}` : ''}
                  </h2>
                  {!isSumoFormat && !isGroupDone && groupStandings.length > 0 && (
                    <button onClick={handleFinalizeResults} className="rounded-xl bg-amber-500 px-4 py-2 font-semibold text-white hover:bg-amber-600">
                      Announce Winners
                    </button>
                  )}
                  {isGroupDone && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {isSumoFormat ? 'Auto-Published' : 'Published'}
                    </span>
                  )}
                </div>

                {groupTeams.length === 0 ? (
                  <p className="text-sm text-slate-500">No teams in this group.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-blue-200">
                          <th className="text-left py-2 px-4 font-semibold">#</th>
                          <th className="text-left py-2 px-4 font-semibold">Team</th>
                          <th className="text-center py-2 px-4 font-semibold">W</th>
                          <th className="text-center py-2 px-4 font-semibold">L</th>
                          <th className="text-center py-2 px-4 font-semibold">D</th>
                          <th className="text-center py-2 px-4 font-semibold">Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupStandings.map((s, i) => (
                          <tr key={s.team.id} className="border-b border-blue-100">
                            <td className="py-3 px-4 font-medium">{i + 1}</td>
                            <td className="py-3 px-4">{s.team.name}</td>
                            <td className="py-3 px-4 text-center">{s.wins}</td>
                            <td className="py-3 px-4 text-center">{s.losses}</td>
                            <td className="py-3 px-4 text-center">{s.draws}</td>
                            <td className="py-3 px-4 text-center font-semibold">{s.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <h2 className="font-display text-2xl font-semibold text-blue-900 mb-4">
                  Battle History{activeGroup ? ` · ${formatGroupName(activeGroup)}` : ''}
                </h2>
                {groupMatches.length === 0 ? (
                  <p className="text-sm text-slate-500">No battles recorded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {groupMatches.map((match) => {
                      const team1 = teams.find((t) => t.id === match.team1Id)
                      const team2 = teams.find((t) => t.id === match.team2Id)
                      const winner = teams.find((t) => t.id === match.winnerId)
                      return (
                        <article key={match.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex justify-between gap-2">
                            <span className="font-semibold">{team1?.name} vs {team2?.name}</span>
                            <span className="text-sm text-blue-600 font-medium">Round {match.round}</span>
                          </div>
                          <p className="mt-1 text-sm">
                            {match.team1Score} - {match.team2Score}
                            {winner && <span className="text-green-700"> · Winner: {winner.name}</span>}
                          </p>
                        </article>
                      )
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default RefereeDashboard
