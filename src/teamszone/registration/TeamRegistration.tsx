import { FormEvent, useEffect, useMemo, useState } from "react"
import { createId, getCategories, getSettings } from "../../admin/storage"
import type { Team } from "../../admin/types"

const formatLocalDatetime = (isoDate?: string) => {
  if (!isoDate) return ""
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleString()
}

const TeamRegistration = () => {
  const categories = getCategories()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Team Information
  const [teamName, setTeamName] = useState("")
  const [school, setSchool] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [members, setMembers] = useState<number>(3)

  // Member Information
  const [memberNames, setMemberNames] = useState<string[]>(["", "", ""])
  const [memberAges, setMemberAges] = useState<number[]>([16, 16, 16])
  const [memberEmails, setMemberEmails] = useState<string[]>(["", "", ""])
  const [memberPhones, setMemberPhones] = useState<string[]>(["", "", ""])
  const [memberFINs, setMemberFINs] = useState<string[]>(["", "", ""])
  const [settings, setSettings] = useState<ReturnType<typeof getSettings> | null>(null)

  useEffect(() => {
    setSettings(getSettings())
  }, [])

  const handleMemberChange = (index: number, field: string, value: string | number) => {
    switch (field) {
      case 'name': {
        const newNames = [...memberNames]
        newNames[index] = value as string
        setMemberNames(newNames)
        break
      }
      case 'age': {
        const newAges = [...memberAges]
        newAges[index] = value as number
        setMemberAges(newAges)
        break
      }
      case 'email': {
        const newEmails = [...memberEmails]
        newEmails[index] = value as string
        setMemberEmails(newEmails)
        break
      }
      case 'phone': {
        const newPhones = [...memberPhones]
        newPhones[index] = value as string
        setMemberPhones(newPhones)
        break
      }
      case 'fin': {
        const newFINs = [...memberFINs]
        newFINs[index] = value as string
        setMemberFINs(newFINs)
        break
      }
    }
  }

  const addMember = () => {
    if (members < 10) {
      setMembers(members + 1)
      setMemberNames([...memberNames, ""])
      setMemberAges([...memberAges, 16])
      setMemberEmails([...memberEmails, ""])
      setMemberPhones([...memberPhones, ""])
      setMemberFINs([...memberFINs, ""])
    }
  }

  const removeMember = (index: number) => {
    if (members > 1) {
      setMembers(members - 1)
      setMemberNames(memberNames.filter((_, i) => i !== index))
      setMemberAges(memberAges.filter((_, i) => i !== index))
      setMemberEmails(memberEmails.filter((_, i) => i !== index))
      setMemberPhones(memberPhones.filter((_, i) => i !== index))
      setMemberFINs(memberFINs.filter((_, i) => i !== index))
    }
  }

  const findCategoryByName = (name: string) => {
    const normalized = name.trim().toLowerCase()
    return categories.find((category) => category.name.trim().toLowerCase() === normalized)
  }

  const getCategoryMemberLimitHint = (name: string) => {
    const category = findCategoryByName(name)
    if (!category || category.maxMembers === undefined) {
      return ""
    }
    return `Up to ${category.maxMembers} member${category.maxMembers === 1 ? "" : "s"} per team.`
  }

  const registrationOpenDate = settings?.registrationOpen ? new Date(settings.registrationOpen) : null
  const registrationCloseDate = settings?.registrationClose ? new Date(settings.registrationClose) : null
  const registrationAllowed = useMemo(() => {
    const now = new Date()
    if (registrationOpenDate && now < registrationOpenDate) return false
    if (registrationCloseDate && now > registrationCloseDate) return false
    return true
  }, [registrationOpenDate, registrationCloseDate])

  const validateForm = () => {
    if (!teamName.trim()) return "Team name is required"
    if (!school.trim()) return "School/Institution name is required"
    if (!categoryName) return "Please select a competition category"

    const category = findCategoryByName(categoryName)
    if (!category) return "Please select a valid competition category"
    if (category.maxMembers !== undefined && members > category.maxMembers) {
      return `This category allows up to ${category.maxMembers} member${category.maxMembers === 1 ? "" : "s"} per team.`
    }

    for (let i = 0; i < members; i++) {
      if (!memberNames[i]?.trim()) return `Member ${i + 1} name is required`
      if (!memberEmails[i]?.trim()) return `Member ${i + 1} email is required`
      if (!memberFINs[i]?.trim()) return `Member ${i + 1} FIN is required`
      if (memberAges[i] < 10 || memberAges[i] > 25) return `Member ${i + 1} age must be between 10 and 25`
    }

    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    if (!registrationAllowed) {
      const message = registrationOpenDate && new Date() < registrationOpenDate
        ? `Registration opens on ${formatLocalDatetime(settings?.registrationOpen)}`
        : `Registration has closed and new teams cannot be added.`
      setError(message)
      setLoading(false)
      return
    }

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    try {
      // Create member objects
      const memberObjects = []
      for (let i = 0; i < members; i++) {
        memberObjects.push({
          id: createId("member"),
          mentorId: "", // No mentor assigned for self-registered teams
          name: memberNames[i].trim(),
          surname: "", // Could be expanded to include surname field
          age: memberAges[i],
          fin: memberFINs[i].trim(),
          email: memberEmails[i].trim(),
          phone: memberPhones[i].trim(),
        })
      }

      // Create team object
      const newTeam: Team = {
        id: createId("team"),
        name: teamName.trim(),
        school: school.trim(),
        members: members,
        categoryName: categoryName,
        memberIds: memberObjects.map(m => m.id),
        memberNames: memberObjects.map(m => m.name),
      }

      // Save team and members
      const existingTeams = JSON.parse(localStorage.getItem("nextgen_admin_teams") || "[]")
      const existingMembers = JSON.parse(localStorage.getItem("nextgen_members") || "[]")

      const updatedTeams = [...existingTeams, newTeam]
      const updatedMembers = [...existingMembers, ...memberObjects]

      localStorage.setItem("nextgen_admin_teams", JSON.stringify(updatedTeams))
      localStorage.setItem("nextgen_members", JSON.stringify(updatedMembers))

      setSuccess("Team registered successfully! Your registration is complete and your team will be reviewed for approval.")

      // Reset form
      setTeamName("")
      setSchool("")
      setCategoryName("")
      setMembers(3)
      setMemberNames(["", "", ""])
      setMemberAges([16, 16, 16])
      setMemberEmails(["", "", ""])
      setMemberPhones(["", "", ""])
      setMemberFINs(["", "", ""])

    } catch {
      setError("An error occurred during registration. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-blue-700 sm:text-5xl mb-4">
            Team Registration
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Register your team for the NextGen Robotics Competition. Fill out all required information carefully.
          </p>
        </div>

        {!registrationAllowed ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
            <p className="text-xl font-semibold text-red-700">Registration is not available right now.</p>
            <p className="mt-4 text-slate-600">
              {registrationOpenDate && new Date() < registrationOpenDate
                ? `Registration will open on ${formatLocalDatetime(settings?.registrationOpen)}.`
                : registrationCloseDate && new Date() > registrationCloseDate
                ? `Registration closed on ${formatLocalDatetime(settings?.registrationClose)}.`
                : `New team signups are temporarily unavailable.`}
            </p>
            {registrationOpenDate && new Date() < registrationOpenDate && (
              <p className="mt-3 text-sm text-slate-500">Please return after the opening time to add your team.</p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
          {/* Team Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-6">Team Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">Team Name *</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter team name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">School/Institution *</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter school or institution name"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-blue-900 mb-2">Competition Category *</label>
              <select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full max-w-md rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select a category...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
              {categoryName && (
                <p className="mt-2 text-sm text-slate-500">{getCategoryMemberLimitHint(categoryName)}</p>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-900">Team Members ({members})</h2>
              {members < 10 && (
                <button
                  type="button"
                  onClick={addMember}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                  Add Member
                </button>
              )}
            </div>

            <div className="space-y-6">
              {Array.from({ length: members }, (_, index) => (
                <div key={index} className="border border-blue-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-medium text-blue-900">Member {index + 1}</h3>
                    {members > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={memberNames[index] || ""}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Age *</label>
                      <input
                        type="number"
                        min={10}
                        max={25}
                        value={memberAges[index] || 16}
                        onChange={(e) => handleMemberChange(index, 'age', parseInt(e.target.value) || 16)}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Email *</label>
                      <input
                        type="email"
                        value={memberEmails[index] || ""}
                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={memberPhones[index] || ""}
                        onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className="md:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-medium text-blue-900 mb-2">FIN Code *</label>
                      <input
                        type="text"
                        value={memberFINs[index] || ""}
                        onChange={(e) => handleMemberChange(index, 'fin', e.target.value)}
                        className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter FIN code"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registering Team..." : "Register Team"}
            </button>
          </div>
        </form>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-slate-600">
          <p>* Required fields</p>
          <p className="mt-2">All registrations are subject to approval. You will receive confirmation via email.</p>
          <p className="mt-2">No payment is required during team registration.</p>
        </div>
      </div>
    </section>
  )
}

export default TeamRegistration