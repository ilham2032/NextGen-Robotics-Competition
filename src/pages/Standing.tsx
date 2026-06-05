import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategories } from '../admin/storage'
import { computeStandings, getFinalizedWinners, getPublishedFinalsQualifiers } from '../teamszone/utils/matchStats'
import { isTrackCategory } from '../teamszone/utils/trackCategories'
import {
  FINALISTS_PER_GROUP,
  MAX_TEAMS_PER_GROUP,
  categoryUsesGroups,
  filterMatchesByGroup,
  filterTeamsByGroup,
  formatGroupName,
  getGroupTeamCounts,
  getGroupsFromTeams,
  isGroupFinalsAnnounced,
} from '../teamszone/utils/groupUtils'
import { useLiveCompetitionData } from '../hooks/useLiveCompetitionData'

const Standing = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { categoryId: routeCategoryId } = useParams()
  const categories = getCategories()
  const { teams: allTeams, matchResults, competitionResults } = useLiveCompetitionData()

  const visibleCategories = categories.slice(0, 8)
  const selectedCategory = routeCategoryId
    ? categories.find((category) => category.id === routeCategoryId)
    : undefined

  const categoryTeams = useMemo(
    () => (selectedCategory ? allTeams.filter((team) => team.categoryName?.trim() === selectedCategory.name) : []),
    [allTeams, selectedCategory],
  )
  const categoryMatches = selectedCategory
    ? matchResults.filter((match) => match.categoryId === selectedCategory.id)
    : []
  const groups = useMemo(() => (selectedCategory ? getGroupsFromTeams(categoryTeams) : []), [selectedCategory, categoryTeams])
  const usesGroups = selectedCategory ? categoryUsesGroups(categoryTeams) : false
  const isTrackFormat = selectedCategory ? isTrackCategory(selectedCategory.name) : false
  const [activeGroup, setActiveGroup] = useState(groups[0] ?? '')

  useEffect(() => {
    if (!selectedCategory || groups.length === 0) {
      setActiveGroup('')
      return
    }
    if (!groups.includes(activeGroup)) {
      setActiveGroup(groups[0])
    }
  }, [groups, activeGroup, selectedCategory])

  const groupCounts = getGroupTeamCounts(categoryTeams)
  const displayedTeams = usesGroups && activeGroup ? filterTeamsByGroup(categoryTeams, activeGroup) : []
  const displayedMatches = usesGroups && activeGroup ? filterMatchesByGroup(categoryMatches, activeGroup) : []
  const standings = computeStandings(displayedTeams, displayedMatches, allTeams)
  const publishedFinalists =
    selectedCategory && activeGroup
      ? getPublishedFinalsQualifiers(competitionResults, selectedCategory.id, allTeams, activeGroup)
      : []
  const activeGroupFinalsAnnounced = usesGroups && activeGroup && selectedCategory
    ? isGroupFinalsAnnounced(competitionResults, selectedCategory.id, activeGroup)
    : false
  const trackStandings = selectedCategory && isTrackFormat
    ? getFinalizedWinners(competitionResults, selectedCategory.id, allTeams)
    : []
  const noTeams = selectedCategory ? categoryTeams.length === 0 : false
  const noStandings = selectedCategory ? standings.length === 0 : false

  const allGroupFinalists = useMemo(() => {
    if (!selectedCategory || groups.length === 0) return []
    return groups.map((group) => ({
      group,
      finalists: getPublishedFinalsQualifiers(competitionResults, selectedCategory.id, allTeams, group),
      announced: isGroupFinalsAnnounced(competitionResults, selectedCategory.id, group),
    }))
  }, [allTeams, competitionResults, groups, selectedCategory])

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-blue-900 px-6 py-10 text-white shadow-lg sm:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase">{t('Competition Rankings')}</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{t('Standings')}</h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
            {t('Referees publish standings and finals qualifiers once category results are complete.', {
              max: MAX_TEAMS_PER_GROUP,
              finalists: FINALISTS_PER_GROUP,
            })}
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">{t('Select a Category')}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visibleCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => navigate(`/standings/${category.id}`)}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition-all duration-200 hover:border-blue-200 hover:bg-slate-50"
              >
                <p className="text-base font-semibold text-slate-700">{category.name}</p>
              </button>
            ))}
          </div>
        </div>

        {selectedCategory ? (
          <>
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{t('Category')}</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">{selectedCategory.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/standings')}
                className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200"
              >
                {t('Back to categories')}
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm">
                <p className="text-sm text-slate-500">{t('Teams')}</p>
                <p className="mt-3 text-3xl font-bold text-blue-700">{categoryTeams.length}</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm">
                <p className="text-sm text-slate-500">{t('Groups')}</p>
                <p className="mt-3 text-3xl font-bold text-blue-700">{groups.length}</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-sm">
                <p className="text-sm text-slate-500">{t('Max per group')}</p>
                <p className="mt-3 text-3xl font-bold text-blue-700">{MAX_TEAMS_PER_GROUP}</p>
              </div>
            </div>

            {noTeams ? (
              <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-10 text-center shadow-sm">
                <p className="text-lg font-semibold text-slate-800">{t('No teams registered for this category yet.')}</p>
                <p className="mt-2 text-slate-600">
                  {isTrackFormat
                    ? t('Once teams register, referees will record run times and standings will appear here.')
                    : t('Once teams register, referees will place them into groups and standings will appear here.')}
                </p>
              </div>
            ) : isTrackFormat ? (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800">{t('Track event rankings')}</h2>
                <p className="mt-2 text-slate-600">
                  {t('This category does not use groups. Referees publish official rankings once all track runs are recorded.')}
                </p>

                {trackStandings.length === 0 ? (
                  <div className="mt-8 py-10 text-center">
                    <p className="text-lg font-semibold text-slate-800">{t('Track results are not published yet.')}</p>
                    <p className="mt-2 text-slate-600">
                      {t('Referees will publish the final rankings for this category once all runs have been recorded.')}
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full border-collapse text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">#</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('Team')}</th>
                          <th className="text-right py-3 px-4 font-semibold text-slate-700">{t('Time')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trackStandings.map((result) => (
                          <tr key={result.id} className="border-t border-slate-100">
                            <td className="py-3 px-4 font-medium text-blue-600">{result.position}</td>
                            <td className="py-3 px-4 font-medium text-slate-800">{result.team?.name}</td>
                            <td className="py-3 px-4 text-right text-slate-700">
                              {result.trackFinishTime !== undefined ? `${result.trackFinishTime.toFixed(2)} s` : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mt-8 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-800">{t('Groups')}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {t('After group play, referees publish the top {{count}} teams (by wins/points) for the finals when they are ready.', { count: FINALISTS_PER_GROUP })}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {groups.map((group) => (
                      <button
                        key={group}
                        type="button"
                        onClick={() => setActiveGroup(group)}
                        className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                          activeGroup === group
                            ? 'border-indigo-400 bg-indigo-50 shadow-sm'
                            : 'border-slate-200 bg-slate-50 hover:border-indigo-200'
                        }`}
                      >
                        <p className="text-sm font-semibold text-slate-800">{formatGroupName(group)}</p>
                        <p className="mt-2 text-2xl font-bold text-indigo-700">{groupCounts[group] ?? 0}</p>
                        <p className="text-xs text-slate-500">/ {MAX_TEAMS_PER_GROUP} {t('teams')}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {allGroupFinalists.some((entry) => entry.announced && entry.finalists.length > 0) && (
                  <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-emerald-900">{t('Finals Qualifiers')}</h2>
                    <p className="mt-1 text-sm text-emerald-800">
                      {t('Official list published by referees (top {{count}} per group by wins/points).', { count: FINALISTS_PER_GROUP })}
                    </p>
                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                      {allGroupFinalists
                        .filter((entry) => entry.announced && entry.finalists.length > 0)
                        .map(({ group, finalists: groupFinalists }) => (
                        <div key={group} className="rounded-2xl border border-emerald-200 bg-white p-5">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-slate-800">{formatGroupName(group)}</h3>
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                              {t('Published')}
                            </span>
                          </div>
                          <ol className="mt-3 space-y-2">
                            {groupFinalists.map((entry) => (
                              <li key={entry.team.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                                <span className="font-medium text-slate-800">
                                  {entry.position}. {entry.team.name}
                                </span>
                                <span className="font-semibold text-blue-700">{entry.points} {t('pts')}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeGroup && (
                  <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <h2 className="text-xl font-semibold text-slate-800">
                        {formatGroupName(activeGroup)} {t('Standings')}
                      </h2>
                      <p className={`text-sm ${activeGroupFinalsAnnounced ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {activeGroupFinalsAnnounced
                          ? t('Finals qualifiers published for this group.')
                          : t('Group stage scores update live. Finals list appears once the referee publishes qualifiers.')}
                      </p>
                    </div>

                    {activeGroupFinalsAnnounced && publishedFinalists.length > 0 && (
                      <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
                        <h3 className="text-lg font-semibold text-emerald-800 mb-3">
                          {t('Advancing to Finals')} ({publishedFinalists.length})
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                          {publishedFinalists.map((entry) => (
                            <div key={entry.team.id} className="rounded-xl border border-emerald-200 bg-white p-4 text-center">
                              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                                #{entry.position}
                              </p>
                              <p className="mt-2 text-base font-bold text-slate-800">{entry.team.name}</p>
                              <p className="mt-1 text-sm text-slate-600">{entry.points} {t('pts')}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!activeGroupFinalsAnnounced && !noStandings && (
                      <p className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        {t('Finals qualifiers will be listed here once the referee completes the group stage and publishes the top {{count}} teams.', {
                          count: FINALISTS_PER_GROUP,
                        })}
                      </p>
                    )}

                    {noStandings ? (
                      <div className="py-10 text-center">
                        <p className="text-lg font-semibold text-slate-800">{t('No battles recorded yet for this group.')}</p>
                        <p className="mt-2 text-slate-600">{t('Standings appear after referees enter match scores.')}</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <table className="w-full border-collapse text-sm">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">#</th>
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">{t('Team')}</th>
                              <th className="text-center py-3 px-4 font-semibold text-slate-700">W</th>
                              <th className="text-center py-3 px-4 font-semibold text-slate-700">L</th>
                              <th className="text-center py-3 px-4 font-semibold text-slate-700">D</th>
                              <th className="text-center py-3 px-4 font-semibold text-slate-700">{t('Pts')}</th>
                              <th className="text-center py-3 px-4 font-semibold text-slate-700">{t('Finals')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {standings.map((standing, index) => {
                              const announced = publishedFinalists.some((f) => f.team.id === standing.team.id)
                              return (
                                <tr
                                  key={standing.team.id}
                                  className={`border-t border-slate-100 ${announced ? 'bg-emerald-50/60' : ''}`}
                                >
                                  <td className="py-3 px-4 font-medium text-blue-600">{index + 1}</td>
                                  <td className="py-3 px-4 font-medium text-slate-800">{standing.team.name}</td>
                                  <td className="py-3 px-4 text-center">{standing.wins}</td>
                                  <td className="py-3 px-4 text-center">{standing.losses}</td>
                                  <td className="py-3 px-4 text-center">{standing.draws}</td>
                                  <td className="py-3 px-4 text-center font-semibold text-blue-700">{standing.points}</td>
                                  <td className="py-3 px-4 text-center">
                                    {announced ? (
                                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                                        {t('Qualified')}
                                      </span>
                                    ) : (
                                      <span className="text-slate-400">—</span>
                                    )}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        ) : routeCategoryId ? (
          <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="text-center py-16">
              <p className="text-lg font-semibold text-slate-800">{t('Category not found.')}</p>
              <button
                type="button"
                onClick={() => navigate('/standings')}
                className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {t('Back to all categories')}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Standing
