import { Link } from 'react-router-dom'
import { getCategories, getTeams } from '../admin/storage'

const Teamszone = () => {
  const categories = getCategories()
  const teams = getTeams()

  const categoryStats = categories.map(category => {
    const categoryTeams = teams.filter(team => team.categoryName?.trim() === category.name)
    return {
      ...category,
      teamCount: categoryTeams.length,
      totalParticipants: categoryTeams.reduce((sum, team) => sum + (team.members || 0), 0)
    }
  })

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-blue-700 sm:text-5xl lg:text-6xl mb-4">
            TEAMS ZONE
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Referee operations area for reviewing category participation and team statistics.
            Competition joining and team creation are handled through the mentor portal.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{teams.length}</div>
            <div className="text-sm text-slate-600 font-medium">Total Teams</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {teams.reduce((sum, team) => sum + (team.members || 0), 0)}
            </div>
            <div className="text-sm text-slate-600 font-medium">Participants</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{categories.length}</div>
            <div className="text-sm text-slate-600 font-medium">Categories</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {new Set(teams.map(t => t.school).filter(Boolean)).size}
            </div>
            <div className="text-sm text-slate-600 font-medium">Countries</div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Choose a Competition Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryStats.map((category) => {
              // Map category names to route paths
              const routeMap: { [key: string]: string } = {
                'Mini Sumo': '/teamszone/mini-sumo',
                '1kg Lego Sumo': '/teamszone/1kg-lego-sumo',
                '3kg Lego Sumo': '/teamszone/3kg-lego-sumo',
                'Line Follower': '/teamszone/line-follower',
                'Lego Line': '/teamszone/lego-line',
                'Drone': '/teamszone/drone',
                'Mini Sumo Kids': '/teamszone/start-up-junior',
                'Combat Robot': '/teamszone/start-up-senior'
              }

              const routePath = routeMap[category.name] || `/teamszone/${category.name.toLowerCase().replace(/\s+/g, '-')}`

              return (
                <Link
                  key={category.id}
                  to={routePath}
                  className="group bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 block"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{category.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 font-medium">{category.teamCount} teams</span>
                    <span className="text-slate-500">{category.totalParticipants} participants</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Portal Guidance */}
        <div className="text-center bg-white rounded-xl shadow-sm border border-blue-100 p-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-3">Team Registration is in Mentor Portal</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Participants and mentors should create teams from the mentor account page, not from Teams Zone.
          </p>
          <Link
            to="/user/auth"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Open Mentor Portal
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Teamszone