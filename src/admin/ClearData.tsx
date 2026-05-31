import { useEffect, useState } from 'react'
import { clearAllData } from './storage'
import { Link } from 'react-router-dom'

const ClearData = () => {
  const [done, setDone] = useState(false)

  const handleClear = () => {
    clearAllData()
    setDone(true)
  }

  useEffect(() => {
    // no-op
  }, [])

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="text-2xl font-bold mb-4">Clear Stored Data</h1>
          <p className="text-sm text-slate-600 mb-6">This will remove all locally stored teams, mentors, members, referees, and match results from your browser for this site. This action cannot be undone for this browser.</p>

          {done ? (
            <div className="space-y-4">
              <p className="text-green-600 font-medium">All data cleared from localStorage in this browser.</p>
              <Link to="/admin" className="inline-block px-4 py-2 bg-blue-600 text-white rounded">Back to Admin</Link>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={handleClear} className="px-4 py-2 bg-red-600 text-white rounded">Clear Data</button>
              <Link to="/admin" className="inline-block px-4 py-2 bg-slate-200 rounded">Cancel</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ClearData
