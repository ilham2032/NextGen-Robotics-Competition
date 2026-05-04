import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentReferee } from '../../referee/auth'
import { getCategories, getTeams } from '../../admin/storage'

const Team3kgSumo = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const referee = getCurrentReferee()
    if (referee) {
      // If user is a referee, redirect to referee dashboard
      navigate('/referee/dashboard')
      return
    }
  }, [navigate])

  const categories = getCategories()
  const allTeams = getTeams()

  const category = categories.find(cat => cat.name === '3kg Lego Sumo')
  const categoryTeams = allTeams.filter(team => team.categoryName?.trim() === '3kg Lego Sumo')

  const uniqueCountries = new Set(categoryTeams.map(t => t.school).filter(Boolean))

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/teamszone"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Teams Zone
          </Link>
          <h1 className="font-display text-3xl font-bold text-orange-700 sm:text-4xl lg:text-5xl mb-2">
            3kg Lego Sumo Teams
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {category?.description || 'LEGO-based sumo competition with 3kg robot limit'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{categoryTeams.length}</div>
            <div className="text-sm text-slate-600 font-medium">Teams</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {categoryTeams.reduce((sum, team) => sum + (team.members || 0), 0)}
            </div>
            <div className="text-sm text-slate-600 font-medium">Participants</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{uniqueCountries.size}</div>
            <div className="text-sm text-slate-600 font-medium">Countries</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">3kg</div>
            <div className="text-sm text-slate-600 font-medium">Robot Weight</div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="mb-8">
          {categoryTeams.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-orange-100">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No Teams Registered Yet</h3>
              <p className="text-slate-600 mb-6">Be the first to register a team in the 3kg Lego Sumo category!</p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
              >
                Register Your Team
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryTeams.map((team) => (
                <article key={team.id} className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-800">{team.name}</h3>
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {team.school || 'Country not specified'}
                    </div>

                    {team.memberNames && team.memberNames.length > 0 && (
                      <div className="flex items-start text-sm text-slate-600">
                        <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <div>
                          <div className="font-medium mb-1">Team Members:</div>
                          <div className="text-xs">{team.memberNames.join(', ')}</div>
                        </div>
                      </div>
                    )}

                    {team.mentorName && (
                      <div className="flex items-center text-sm text-slate-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Mentor: {team.mentorName}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-orange-600 font-medium">
                        {team.members || 0} member{team.members !== 1 ? 's' : ''}
                      </span>
                      <span className="text-slate-500">3kg Lego Sumo</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Category Info */}
        {category && (
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">About 3kg Lego Sumo Competition</h3>
            <p className="text-slate-600 mb-4">{category.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center text-slate-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <Link to="/regulations" className="text-orange-600 hover:text-orange-700">View Regulations</Link>
              </div>
              <div className="flex items-center text-slate-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <Link to={`/rules/3kglegosumo`} className="text-orange-600 hover:text-orange-700">Competition Rules</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Team3kgSumo