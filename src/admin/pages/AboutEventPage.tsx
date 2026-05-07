import { useEffect, useState } from "react"
import { getSettings, saveSettings } from "../../admin/storage"
import type { EventSettings } from "./adminDashboardTypes"

interface AboutEventProps {
  onNotify?: (message: string) => void
}

const AboutEventPage = ({ onNotify }: AboutEventProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState<EventSettings | null>(null)
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventStatus: "Upcoming" as const,
    venue: "",
    matchDuration: 6,
    logoUrl: "",
  })

  useEffect(() => {
    const saved = getSettings()
    if (saved) {
      setSettings(saved)
      setFormData({
        eventName: saved.eventName,
        eventDate: saved.eventDate,
        eventStatus: (saved.eventStatus || "Upcoming") as any,
        venue: saved.venue,
        matchDuration: saved.matchDuration,
        logoUrl: saved.logoUrl,
      })
    }
  }, [])

  const handleSave = () => {
    if (!formData.eventName || !formData.venue) {
      onNotify?.("Please fill in all required fields")
      return
    }

    const updated: EventSettings = {
      eventName: formData.eventName,
      eventDate: formData.eventDate,
      eventStatus: formData.eventStatus,
      venue: formData.venue,
      matchDuration: formData.matchDuration,
      logoUrl: formData.logoUrl,
      scoringRules: settings?.scoringRules || [],
    }

    saveSettings(updated)
    setSettings(updated)
    onNotify?.("Event settings updated")
    setIsEditing(false)
  }

  if (!settings) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 text-center">
        <p className="text-slate-600">Loading event information...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Event Overview */}
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-blue-600 uppercase">Event Details</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{settings.eventName}</h2>
            <p className="mt-1 text-slate-600">
              <span className="font-semibold">Status:</span> {settings.eventStatus} | <span className="font-semibold">Venue:</span> {settings.venue}
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-700/30 transition hover:bg-blue-600"
            >
              ✎ Edit
            </button>
          )}
        </div>

        {settings.logoUrl && (
          <div className="mt-6">
            <img
              src={settings.logoUrl}
              alt="Event Logo"
              className="h-32 w-32 rounded-lg object-cover shadow-md"
            />
          </div>
        )}
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="rounded-3xl border-2 border-blue-200 bg-blue-50 px-6 py-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Edit Event Details</h3>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Event Name</label>
              <input
                type="text"
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Event Date</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">Event Status</label>
                <select
                  value={formData.eventStatus}
                  onChange={(e) => setFormData({ ...formData, eventStatus: e.target.value as any })}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option>Upcoming</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Venue</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="Event location"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Match Duration (minutes)</label>
              <input
                type="number"
                value={formData.matchDuration}
                onChange={(e) => setFormData({ ...formData, matchDuration: parseInt(e.target.value) })}
                min="1"
                max="60"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Logo URL</label>
              <input
                type="url"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                placeholder="https://..."
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-700/30 transition hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Info Cards */}
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Event Date</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {new Date(settings.eventDate).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Status</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{settings.eventStatus}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Match Duration</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{settings.matchDuration} min</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Venue</p>
            <p className="mt-2 text-lg font-bold text-slate-900 truncate">{settings.venue}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AboutEventPage
