import type { EventSettings } from './adminDashboardTypes'

type SettingsPageProps = {
  settings: EventSettings
  darkMode: boolean
  onToggleDarkMode: () => void
  onUpdateSettings: (settings: EventSettings) => void
}

const SettingsPage = ({ settings, darkMode, onToggleDarkMode, onUpdateSettings }: SettingsPageProps) => {
  return (
    <div className='space-y-8'>
      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h2 className='text-2xl font-semibold text-slate-900'>Event settings</h2>
            <p className='mt-2 text-sm text-slate-600'>Customize event timing, logo, scoring rules, and match duration.</p>
          </div>
          <div className='inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3'>
            <span className='text-sm font-medium text-slate-700'>Dark mode</span>
            <button
              onClick={onToggleDarkMode}
              className={`h-9 w-16 rounded-full ${darkMode ? 'bg-slate-900' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-8 w-8 rounded-full bg-white transition ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        <div className='mt-6 grid gap-4 md:grid-cols-2'>
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
            <label className='block text-sm font-semibold text-slate-700'>Event name</label>
            <input
              value={settings.eventName}
              onChange={(event) => onUpdateSettings({ ...settings, eventName: event.target.value })}
              className='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none'
            />
          </div>
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
            <label className='block text-sm font-semibold text-slate-700'>Event date</label>
            <input
              type='date'
              value={settings.eventDate}
              onChange={(event) => onUpdateSettings({ ...settings, eventDate: event.target.value })}
              className='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none'
            />
          </div>
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
            <label className='block text-sm font-semibold text-slate-700'>Venue</label>
            <input
              value={settings.venue}
              onChange={(event) => onUpdateSettings({ ...settings, venue: event.target.value })}
              className='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none'
            />
          </div>
          <div className='rounded-3xl border border-slate-200 bg-slate-50 p-5'>
            <label className='block text-sm font-semibold text-slate-700'>Match duration</label>
            <input
              type='number'
              min='1'
              value={settings.matchDuration}
              onChange={(event) => onUpdateSettings({ ...settings, matchDuration: Number(event.target.value) })}
              className='mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none'
            />
          </div>
        </div>
      </div>

      <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <h3 className='text-xl font-semibold text-slate-900'>Scoring rules</h3>
            <p className='mt-2 text-sm text-slate-600'>Adjust the event scoring, bonuses, and penalties used for leaderboards.</p>
          </div>
        </div>

        <div className='mt-5 space-y-4'>
          {settings.scoringRules.map((rule) => (
            <div key={rule.id} className='rounded-3xl border border-slate-200 bg-slate-50 p-4'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <p className='font-semibold text-slate-900'>{rule.title}</p>
                  <p className='text-sm text-slate-600'>{rule.description}</p>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900'>{rule.type}</span>
                  <span className='rounded-full bg-cyan-400 px-3 py-1 text-sm font-semibold text-slate-950'>{rule.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
