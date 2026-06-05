import { useEffect, useState } from "react"
import { getSettings, saveSettings } from "../../admin/storage"
import type { EventSettings } from "./adminDashboardTypes"
import type { TeamRecord } from "./adminDashboardTypes"
import type { Member, Mentor } from "../types"

const toLocalDatetime = (isoDate?: string) => {
  if (!isoDate) return ""
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ""
  const tzOffsetMs = date.getTimezoneOffset() * 60 * 1000
  return new Date(date.getTime() - tzOffsetMs).toISOString().slice(0, 16)
}

const parseToIsoDatetime = (value: string) => {
  if (!value) return ""
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "" : date.toISOString()
}

interface AboutEventProps {
  onNotify?: (message: string) => void
  teams: TeamRecord[]
  mentors: Mentor[]
  members: Member[]
}

const AboutEventPage = ({ onNotify, teams, mentors, members }: AboutEventProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState<EventSettings | null>(null)
  const [formData, setFormData] = useState<{
    eventName: string
    eventDate: string
    eventStatus: EventSettings['eventStatus']
    venue: string
    matchDuration: number
    logoUrl: string
    registrationOpen: string
    registrationClose: string
  }>({
    eventName: "",
    eventDate: "",
    eventStatus: "Upcoming",
    venue: "",
    matchDuration: 6,
    logoUrl: "",
    registrationOpen: "",
    registrationClose: "",
  })

  useEffect(() => {
    const saved = getSettings()
    if (saved) {
      setSettings(saved)
      setFormData({
        eventName: saved.eventName,
        eventDate: saved.eventDate,
        eventStatus: saved.eventStatus ?? "Upcoming",
        venue: saved.venue,
        matchDuration: saved.matchDuration,
        logoUrl: saved.logoUrl,
        registrationOpen: toLocalDatetime(saved.registrationOpen),
        registrationClose: toLocalDatetime(saved.registrationClose),
      })
    }
  }, [])

  const totalParticipants = members.length
  const totalTeams = teams.length
  const totalMentors = mentors.length
  const totalCategories = new Set(teams.map((team) => team.categoryName).filter(Boolean)).size

  const handleSave = () => {
    if (!formData.eventName || !formData.venue) {
      onNotify?.("Please fill in all required fields")
      return
    }

    const registrationOpenIso = parseToIsoDatetime(formData.registrationOpen)
    const registrationCloseIso = parseToIsoDatetime(formData.registrationClose)

    if (registrationOpenIso && registrationCloseIso) {
      const openDate = new Date(registrationOpenIso)
      const closeDate = new Date(registrationCloseIso)
      if (openDate >= closeDate) {
        onNotify?.("Registration close time must be after the open time")
        return
      }
    }

    const updated: EventSettings = {
      eventName: formData.eventName,
      eventDate: formData.eventDate,
      eventStatus: formData.eventStatus,
      venue: formData.venue,
      matchDuration: formData.matchDuration,
      logoUrl: formData.logoUrl,
      registrationOpen: registrationOpenIso,
      registrationClose: registrationCloseIso,
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

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Teams</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{totalTeams}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Participants</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{totalParticipants}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Mentors</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{totalMentors}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Categories</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{totalCategories}</p>
        </div>
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
                  onChange={(e) => {
                    const status = e.target.value as EventSettings['eventStatus']
                    setFormData({ ...formData, eventStatus: status })
                  }}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700">Registration Open</label>
                <input
                  type="datetime-local"
                  value={formData.registrationOpen}
                  onChange={(e) => setFormData({ ...formData, registrationOpen: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <p className="mt-2 text-sm text-slate-500">Set the date and time when team registration will start.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">Registration Close</label>
                <input
                  type="datetime-local"
                  value={formData.registrationClose}
                  onChange={(e) => setFormData({ ...formData, registrationClose: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <p className="mt-2 text-sm text-slate-500">Set the date and time after which new team registration is blocked.</p>
              </div>
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
          <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Event Date</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {new Date(settings.eventDate).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-cyan-50 to-blue-50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Status</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{settings.eventStatus}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-indigo-50 to-purple-50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Match Duration</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{settings.matchDuration} min</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-blue-50 to-cyan-50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Venue</p>
            <p className="mt-2 text-lg font-bold text-slate-900 truncate">{settings.venue}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-cyan-50 to-blue-50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Registration Open</p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {settings.registrationOpen ? new Date(settings.registrationOpen).toLocaleString() : "Not set"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-violet-50 to-fuchsia-50 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Registration Close</p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {settings.registrationClose ? new Date(settings.registrationClose).toLocaleString() : "Not set"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AboutEventPage
