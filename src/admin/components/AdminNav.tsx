import { useState } from 'react'
import { Link } from 'react-router-dom'


type NavItem = {
  id: string
  title: string
  icon: string
  link: string
}

interface AdminNavProps {
  activePage: string
}

const AdminNav = ({ activePage }: AdminNavProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems: NavItem[] = [
    { id: 'dashboard', title: 'Dashboard', icon: '📊', link: 'admin/dashboard' },
    { id: 'users', title: 'Members', icon: '👥', link: 'admin/users' },
    { id: 'teams', title: 'Teams', icon: '🤖', link: 'admin/teams' },
    { id: 'category', title: 'Categories', icon: '📂', link: 'admin/category' },
    { id: 'referees', title: 'Referees', icon: '🏁', link: 'admin/referees' },
    { id: 'schedule', title: 'Schedule', icon: '📅', link: 'admin/schedule' },
    { id: 'profile', title: 'Profile', icon: '⚙️', link: 'admin/profile' },
    { id: 'about-event', title: 'Event Info', icon: 'ℹ️', link: 'admin/about-event' },
  ]

  return (
      <aside className={`sticky top-0 h-screen bg-gradient-to-b from-blue-700 via-blue-600 to-indigo-700 border-r border-white/10 shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="rounded-lg bg-white/15 p-2">
                <p className="font-bold text-white text-lg">NG</p>
              </div>
              {!isCollapsed && (
                <div>
                  <p className="font-semibold text-white text-sm">NextGen</p>
                  <p className="text-xs text-blue-100">Admin</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white hover:bg-white/10 rounded-lg p-1.5 transition"
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                to={`/${item.link || item.id}`}
                key={item.id}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                  activePage === item.id
                    ? 'bg-white text-blue-700 shadow-lg'
                    : 'text-white hover:bg-white/15'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
                title={isCollapsed ? item.title : ''}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className={`border-t border-white/10 p-4 ${isCollapsed ? 'text-center' : ''}`}>
            <p className="text-xs text-blue-100">NextGen Robotics</p>
            <p className="text-xs text-blue-200">Event Manager</p>
          </div>
        </div>
      </aside>
  )
}

export default AdminNav
