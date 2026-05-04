import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createId, getCategories, getMembers, getMentors, getTeams, saveMembers, saveMentors, saveTeams } from "../../admin/storage"
import type { Category, Member, Mentor, Team } from "../../admin/types"
import { getCurrentMentor, signOutMentor } from "../auth"

const UserDashboard = () => {
  const navigate = useNavigate()
  const [mentor, setMentor] = useState<Mentor | null>(() => getCurrentMentor())
  const [allMembers, setAllMembers] = useState<Member[]>(() => getMembers())
  const [allTeams, setAllTeams] = useState<Team[]>(() => getTeams())
  const [categories] = useState<Category[]>(() => getCategories())

  const [memberName, setMemberName] = useState("")
  const [memberSurname, setMemberSurname] = useState("")
  const [memberAge, setMemberAge] = useState(16)
  const [memberFin, setMemberFin] = useState("")
  const [memberEmail, setMemberEmail] = useState("")
  const [memberPhone, setMemberPhone] = useState("")
  const [memberError, setMemberError] = useState("")

  const [teamName, setTeamName] = useState("")
  const [teamCountry, setTeamCountry] = useState("")
  const [teamCategory, setTeamCategory] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])
  const [teamError, setTeamError] = useState("")
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null)
  const [profileName, setProfileName] = useState(mentor?.name ?? "")
  const [profileSurname, setProfileSurname] = useState(mentor?.surname ?? "")
  const [profileEmail, setProfileEmail] = useState(mentor?.email ?? "")
  const [profileError, setProfileError] = useState("")
  const [profileMessage, setProfileMessage] = useState("")
  const [activeTab, setActiveTab] = useState<"users" | "create-team" | "teams" | "schedule" | "profile">("users")
  const countries = [
    "Azerbaijan",
    "Turkey",
    "Kazakhstan",
    "Uzbekistan",
    "Georgia",
    "Russia",
    "United Arab Emirates",
    "Saudi Arabia",
    "Germany",
    "United Kingdom",
    "United States",
    "Other",
  ]

  const navigationTabs = [
    { id: "users", label: "Users" },
    { id: "create-team", label: "Create Team" },
    { id: "teams", label: "Teams" },
    { id: "schedule", label: "Schedule" },
    { id: "profile", label: "Profile" },
  ]

  const mentorMembers = useMemo(
    () => allMembers.filter((member) => member.mentorId && member.mentorId === mentor?.id),
    [allMembers, mentor?.id],
  )

  const mentorTeams = useMemo(
    () => allTeams.filter((team) => team.mentorId && team.mentorId === mentor?.id),
    [allTeams, mentor?.id],
  )

  const handleLogout = () => {
    signOutMentor()
    navigate("/user/auth")
  }

  useEffect(() => {
    setProfileName(mentor?.name ?? "")
    setProfileSurname(mentor?.surname ?? "")
    setProfileEmail(mentor?.email ?? "")
  }, [mentor])

  const updateMentorProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!mentor) {
      setProfileError("Unable to update profile. Mentor session not found.")
      return
    }

    const normalizedEmail = profileEmail.trim().toLowerCase()
    if (!profileName.trim() || !profileSurname.trim() || !normalizedEmail) {
      setProfileError("Please fill in all profile fields.")
      return
    }

    const mentors = getMentors()
    if (mentors.some((item) => item.id !== mentor.id && item.email === normalizedEmail)) {
      setProfileError("This email is already used by another account.")
      return
    }

    const updatedMentor: Mentor = {
      ...mentor,
      name: profileName.trim(),
      surname: profileSurname.trim(),
      email: normalizedEmail,
    }

    const nextMentors = mentors.map((item) => (item.id === mentor.id ? updatedMentor : item))
    saveMentors(nextMentors)
    setMentor(updatedMentor)
    setProfileError("")
    setProfileMessage("Profile updated successfully.")
  }

  const normalizeAndSyncTeams = (teams: Team[], members: Member[]): Team[] =>
    teams.map((team) => {
      const resolvedMembers = members.filter((member) => team.memberIds?.includes(member.id))
      return {
        ...team,
        memberIds: resolvedMembers.map((member) => member.id),
        memberNames: resolvedMembers.map((member) => `${member.name} ${member.surname}`),
        members: resolvedMembers.length,
      }
    })

  const findCategoryByName = (categoryName: string) => categories.find((category) => category.name === categoryName)

  const getCategoryAgeHint = (categoryName: string) => {
    const category = findCategoryByName(categoryName)
    if (!category) {
      return ""
    }
    if (category.ageMin !== undefined && category.ageMax !== undefined) {
      return `Age ${category.ageMin}-${category.ageMax}`
    }
    if (category.ageMin !== undefined) {
      return `Age ${category.ageMin}+`
    }
    if (category.ageMax !== undefined) {
      return `Up to ${category.ageMax} years`
    }
    return ""
  }

  const validateCategoryAgeRules = (selectedMembers: Member[], categoryName: string) => {
    const category = findCategoryByName(categoryName)
    if (!category) {
      return null
    }

    if (category.ageMin !== undefined) {
      const underage = selectedMembers.filter((member) => member.age < category.ageMin)
      if (underage.length > 0) {
        return `All selected members must be at least ${category.ageMin} years old for ${category.name}.`
      }
    }

    if (category.ageMax !== undefined) {
      const overage = selectedMembers.filter((member) => member.age > category.ageMax)
      if (overage.length > 0) {
        return `All selected members must be ${category.ageMax} or younger for ${category.name}.`
      }
    }

    return null
  }

  const addMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!mentor) {
      return
    }

    const normalizedFin = memberFin.trim().toUpperCase()
    const finPattern = /^[A-Z0-9]{7,12}$/
    const phonePattern = /^\+?[0-9]{7,15}$/

    if (!finPattern.test(normalizedFin)) {
      setMemberError("FIN must be 7-12 characters using letters/numbers.")
      return
    }

    if (!phonePattern.test(memberPhone.trim())) {
      setMemberError("Phone must contain 7-15 digits and may start with +.")
      return
    }

    if (mentorMembers.some((member) => member.fin === normalizedFin)) {
      setMemberError("This FIN is already added.")
      return
    }

    if (mentorMembers.some((member) => member.email.toLowerCase() === memberEmail.trim().toLowerCase())) {
      setMemberError("This email is already used by another member.")
      return
    }

    const newMember: Member = {
      id: createId("member"),
      mentorId: mentor.id,
      name: memberName.trim(),
      surname: memberSurname.trim(),
      age: memberAge,
      fin: normalizedFin,
      email: memberEmail.trim().toLowerCase(),
      phone: memberPhone.trim(),
    }

    const nextMembers = [newMember, ...allMembers]
    setAllMembers(nextMembers)
    saveMembers(nextMembers)

    setMemberName("")
    setMemberSurname("")
    setMemberAge(16)
    setMemberFin("")
    setMemberEmail("")
    setMemberPhone("")
    setMemberError("")
  }

  const updateMember = (event: React.FormEvent<HTMLFormElement>, memberId: string) => {
    event.preventDefault()
    if (!mentor) {
      return
    }

    const form = new FormData(event.currentTarget)
    const name = String(form.get("name") ?? "").trim()
    const surname = String(form.get("surname") ?? "").trim()
    const age = Number(form.get("age") ?? 0)
    const fin = String(form.get("fin") ?? "").trim().toUpperCase()
    const email = String(form.get("email") ?? "").trim().toLowerCase()
    const phone = String(form.get("phone") ?? "").trim()

    const finPattern = /^[A-Z0-9]{7,12}$/
    const phonePattern = /^\+?[0-9]{7,15}$/
    if (!name || !surname || age < 6 || !finPattern.test(fin) || !phonePattern.test(phone) || !email) {
      setMemberError("Invalid member data. Please check all fields.")
      return
    }

    const conflict = mentorMembers.some(
      (member) => member.id !== memberId && (member.fin === fin || member.email.toLowerCase() === email),
    )
    if (conflict) {
      setMemberError("FIN or email already exists for another member.")
      return
    }

    const nextMembers = allMembers.map((member) =>
      member.id === memberId ? { ...member, name, surname, age, fin, email, phone } : member,
    )
    setAllMembers(nextMembers)
    saveMembers(nextMembers)

    const syncedTeams = normalizeAndSyncTeams(allTeams, nextMembers)
    setAllTeams(syncedTeams)
    saveTeams(syncedTeams)

    setEditingMemberId(null)
    setMemberError("")
  }

  const removeMember = (memberId: string) => {
    const nextMembers = allMembers.filter((member) => member.id !== memberId)
    setAllMembers(nextMembers)
    saveMembers(nextMembers)

    const syncedTeams = normalizeAndSyncTeams(allTeams, nextMembers)
    setAllTeams(syncedTeams)
    saveTeams(syncedTeams)
  }

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMemberIds((current) =>
      current.includes(memberId) ? current.filter((id) => id !== memberId) : [...current, memberId],
    )
  }

  const addTeam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!mentor) {
      return
    }

    if (!teamCategory) {
      setTeamError("Please choose a category.")
      return
    }

    if (!teamDescription.trim()) {
      setTeamError("Please provide robot description and technical details.")
      return
    }

    if (selectedMemberIds.length === 0) {
      setTeamError("Please select at least one member for the team.")
      return
    }

    const selectedMembers = mentorMembers.filter((member) => selectedMemberIds.includes(member.id))
    if (selectedMembers.length !== selectedMemberIds.length) {
      setTeamError("Invalid member selection.")
      return
    }

    const categoryValidationError = validateCategoryAgeRules(selectedMembers, teamCategory)
    if (categoryValidationError) {
      setTeamError(categoryValidationError)
      return
    }

    const newTeam: Team = {
      id: createId("team"),
      name: teamName.trim(),
      school: teamCountry.trim(),
      members: selectedMembers.length,
      description: teamDescription.trim(),
      categoryName: teamCategory,
      memberIds: selectedMembers.map((member) => member.id),
      memberNames: selectedMembers.map((member) => `${member.name} ${member.surname}`),
      mentorId: mentor.id,
      mentorName: `${mentor.name} ${mentor.surname}`,
    }

    const nextTeams = [newTeam, ...allTeams]
    setAllTeams(nextTeams)
    saveTeams(nextTeams)

    setTeamName("")
    setTeamCountry("")
    setTeamCategory("")
    setTeamDescription("")
    setSelectedMemberIds([])
    setTeamError("")
  }

  const removeTeam = (teamId: string) => {
    const nextTeams = allTeams.filter((team) => team.id !== teamId)
    setAllTeams(nextTeams)
    saveTeams(nextTeams)
  }

  const updateTeam = (event: React.FormEvent<HTMLFormElement>, teamId: string) => {
    event.preventDefault()
    if (!mentor) {
      return
    }

    const form = new FormData(event.currentTarget)
    const name = String(form.get("teamName") ?? "").trim()
    const categoryName = String(form.get("categoryName") ?? "").trim()
    const description = String(form.get("description") ?? "").trim()
    const memberIds = form.getAll("memberIds").map((value) => String(value))

    if (!name || !categoryName || !description || memberIds.length === 0) {
      setTeamError("Team name, category, description, and participants are required.")
      return
    }

    const selectedMembers = mentorMembers.filter((member) => memberIds.includes(member.id))
    if (selectedMembers.length !== memberIds.length) {
      setTeamError("Invalid team members selected.")
      return
    }

    const categoryValidationError = validateCategoryAgeRules(selectedMembers, categoryName)
    if (categoryValidationError) {
      setTeamError(categoryValidationError)
      return
    }

    const nextTeams = allTeams.map((team) =>
      team.id === teamId
        ? {
            ...team,
            name,
            categoryName,
            description,
            memberIds: selectedMembers.map((member) => member.id),
            memberNames: selectedMembers.map((member) => `${member.name} ${member.surname}`),
            members: selectedMembers.length,
          }
        : team,
    )

    setAllTeams(nextTeams)
    saveTeams(nextTeams)
    setEditingTeamId(null)
    setTeamError("")
  }

  return (
    <div className="min-h-screen bg-slate-950/5 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-10 rounded-[2rem] bg-gradient-to-r from-slate-950 via-indigo-950 to-sky-700 p-8 text-white shadow-2xl shadow-slate-950/20 ring-1 ring-white/10 backdrop-blur-sm">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Mentor dashboard</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Welcome back, {mentor?.name ?? "Mentor"}</h1>
              <p className="mt-4 text-sm leading-7 text-slate-200/90">
                Manage your mentor program, register teams, and review progress from a polished center of command built for NextGen competition success.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] bg-white/10 border border-white/15 p-5 shadow-lg shadow-slate-950/20 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Team Members</p>
                <p className="mt-4 text-3xl font-semibold text-white">{mentorMembers.length}</p>
                <p className="mt-2 text-sm text-slate-300">Your active mentees</p>
              </div>
              <div className="rounded-[22px] bg-white/10 border border-white/15 p-5 shadow-lg shadow-slate-950/20 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Registered Teams</p>
                <p className="mt-4 text-3xl font-semibold text-white">{mentorTeams.length}</p>
                <p className="mt-2 text-sm text-slate-300">Teams ready for competition</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.12)]">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Mentor toolkit</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-900">Dashboard navigation</h2>
                <p className="mt-2 text-sm text-slate-600">Quickly move between users, teams, schedule, and profile settings.</p>
              </div>
              <div className="space-y-3">
                {navigationTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex w-full items-center justify-between rounded-3xl px-4 py-3 text-left text-sm font-semibold transition ${
                      activeTab === tab.id
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {tab.label}
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                      activeTab === tab.id ? "bg-cyan-300 text-slate-950" : "bg-slate-200 text-slate-500"
                    }`}>
                      {tab.id === "users" ? "U" : tab.id === "create-team" ? "+" : tab.id === "teams" ? "T" : tab.id === "schedule" ? "S" : "P"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.12)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Live overview</p>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">Performance at a glance</h3>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Current</span>
              </div>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Total members</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{mentorMembers.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Active teams</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{mentorTeams.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Selected category</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{teamCategory || "None"}</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            {/* Add Member Section */}
          <div className={`rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-900/5 overflow-hidden ${activeTab !== "users" ? "hidden" : ""}`}>
            <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Member</h2>
                  <p className="text-sm text-gray-600">Register team members under your mentorship</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-6" onSubmit={addMember}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="memberName" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      id="memberName"
                      type="text"
                      value={memberName}
                      onChange={(event) => setMemberName(event.target.value)}
                      placeholder="Enter first name"
                      className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="memberSurname" className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      id="memberSurname"
                      type="text"
                      value={memberSurname}
                      onChange={(event) => setMemberSurname(event.target.value)}
                      placeholder="Enter last name"
                      className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="memberAge" className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                    <input
                      id="memberAge"
                      type="number"
                      min={6}
                      max={90}
                      value={memberAge}
                      onChange={(event) => setMemberAge(Number(event.target.value))}
                      placeholder="Age"
                      className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="memberFin" className="block text-sm font-medium text-gray-700 mb-2">
                      FIN *
                      <span className="text-xs text-gray-500 ml-1" title="Personal Identification Number - 7-12 alphanumeric characters">ⓘ</span>
                    </label>
                    <input
                      id="memberFin"
                      type="text"
                      value={memberFin}
                      onChange={(event) => setMemberFin(event.target.value)}
                      placeholder="e.g., ABC123456"
                      className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base uppercase"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="memberPhone" className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      id="memberPhone"
                      type="tel"
                      value={memberPhone}
                      onChange={(event) => setMemberPhone(event.target.value)}
                      placeholder="+994 XX XXX XX XX"
                      className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="memberEmail" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    id="memberEmail"
                    type="email"
                    value={memberEmail}
                    onChange={(event) => setMemberEmail(event.target.value)}
                    placeholder="member@example.com"
                    className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    required
                  />
                </div>

                {memberError && (
                  <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-red-700 font-medium">{memberError}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Member
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Create Team Section */}
          <div className={`rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-900/5 overflow-hidden ${activeTab !== "create-team" ? "hidden" : ""}`}>
            <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Create Team</h2>
                  <p className="text-sm text-gray-600">Form a team with selected members</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-6" onSubmit={addTeam}>
                <div>
                  <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">Team Name *</label>
                  <input
                    id="teamName"
                    type="text"
                    value={teamName}
                    onChange={(event) => setTeamName(event.target.value)}
                    placeholder="Enter team name"
                    className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Robot Description and Technical Details *
                  </label>
                  <textarea
                    id="teamDescription"
                    value={teamDescription}
                    onChange={(event) => setTeamDescription(event.target.value)}
                    placeholder="Describe your robot design, materials, sensors, controller, and strategy."
                    rows={4}
                    className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="teamCountry" className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                    <select
                      id="teamCountry"
                      value={teamCountry}
                      onChange={(event) => setTeamCountry(event.target.value)}
                      className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="teamCategory" className="block text-sm font-medium text-gray-700 mb-2">Competition Category *</label>
                    <select
                      id="teamCategory"
                      value={teamCategory}
                      onChange={(event) => setTeamCategory(event.target.value)}
                      className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {teamCategory && (
                      <p className="mt-2 text-sm text-gray-500">{getCategoryAgeHint(teamCategory)}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Participants (Mentor Registered) *
                    <span className="text-sm text-gray-500 ml-2">({selectedMemberIds.length} selected)</span>
                  </label>
                  <div className="border-2 border-gray-200 border-dashed rounded-lg p-4 max-h-48 overflow-y-auto bg-gray-50">
                    {mentorMembers.length === 0 ? (
                      <div className="text-center py-6">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">No members available. Add members first.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {mentorMembers.map((member) => (
                          <label key={member.id} className="flex items-center hover:bg-white p-3 rounded-md border border-transparent hover:border-gray-200 transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedMemberIds.includes(member.id)}
                              onChange={() => toggleMemberSelection(member.id)}
                              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <div className="ml-3 flex-1">
                              <span className="text-sm font-medium text-gray-900">{member.name} {member.surname}</span>
                              <span className="text-sm text-gray-500 ml-2">Age: {member.age}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {teamError && (
                  <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm text-red-700 font-medium">{teamError}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Create Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className={`mt-8 bg-white rounded-lg shadow-sm border border-gray-200 ${activeTab !== "users" ? "hidden" : ""}`}>
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h2 className="text-xl font-semibold text-gray-900">Users</h2>
                  <p className="text-sm text-gray-600">Manage your registered users</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {mentorMembers.length} member{mentorMembers.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          <div className="p-6">
            {mentorMembers.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No members registered</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding your first team member using the form above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mentorMembers.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    {editingMemberId === member.id ? (
                      <form className="space-y-3" onSubmit={(event) => updateMember(event, member.id)}>
                        <div className="grid grid-cols-2 gap-2">
                          <input name="name" defaultValue={member.name} placeholder="First Name" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" required />
                          <input name="surname" defaultValue={member.surname} placeholder="Last Name" className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" required />
                        </div>
                        <input name="age" type="number" min={6} max={90} defaultValue={member.age} placeholder="Age" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" required />
                        <input name="fin" defaultValue={member.fin} placeholder="FIN" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" required />
                        <input name="email" type="email" defaultValue={member.email} placeholder="Email" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" required />
                        <input name="phone" type="tel" defaultValue={member.phone} placeholder="Phone" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" required />
                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="flex-1 bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-700">Save</button>
                          <button type="button" onClick={() => setEditingMemberId(null)} className="flex-1 border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-50">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 text-lg">{member.name} {member.surname}</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Age {member.age}
                          </span>
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="truncate">{member.email}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="font-mono text-xs">{member.fin}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button onClick={() => setEditingMemberId(member.id)} className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <svg className="-ml-1 mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button onClick={() => removeMember(member.id)} className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <svg className="-ml-1 mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Teams List */}
        <div className={`mt-8 bg-white rounded-lg shadow-sm border border-gray-200 ${activeTab !== "teams" ? "hidden" : ""}`}>
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h2 className="text-xl font-semibold text-gray-900">Registered Teams</h2>
                  <p className="text-sm text-gray-600">View and manage your competition teams</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {mentorTeams.length} team{mentorTeams.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          <div className="p-6">
            {mentorTeams.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No teams created</h3>
                <p className="mt-1 text-sm text-gray-500">Create your first team using the form above to enter competitions.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentorTeams.map((team) => (
                  <div key={team.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    {editingTeamId === team.id ? (
                      <form className="space-y-3" onSubmit={(event) => updateTeam(event, team.id)}>
                        <input name="teamName" defaultValue={team.name} placeholder="Team Name" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" required />
                        <select
                          name="categoryName"
                          defaultValue={team.categoryName ?? ""}
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          required
                        >
                          <option value="" disabled>Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                          ))}
                        </select>
                        <textarea
                          name="description"
                          defaultValue={team.description ?? ""}
                          rows={3}
                          placeholder="Robot description and technical details"
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          required
                        />
                        <div className="border border-gray-300 rounded-md p-3 max-h-32 overflow-y-auto">
                          <p className="text-sm font-medium text-gray-700 mb-2">Select Members</p>
                          <div className="space-y-2">
                            {mentorMembers.map((member) => (
                              <label key={member.id} className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="memberIds"
                                  value={member.id}
                                  defaultChecked={team.memberIds?.includes(member.id)}
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">{member.name} {member.surname}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Country: {team.school}</p>
                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="flex-1 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-700">Save</button>
                          <button type="button" onClick={() => setEditingTeamId(null)} className="flex-1 border border-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-50">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 text-lg">{team.name}</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {team.members} member{team.members !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064" />
                            </svg>
                            <span>{team.school || "N/A"}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{team.categoryName ?? "N/A"}</span>
                          </div>
                          {team.description && (
                            <div className="mt-2 rounded-md bg-slate-50 p-2">
                              <p className="text-xs font-semibold text-slate-700">Robot Details</p>
                              <p className="mt-1 text-xs text-slate-600">{team.description}</p>
                            </div>
                          )}
                          {team.memberNames && team.memberNames.length > 0 && (
                            <div className="mt-3">
                              <div className="flex items-center mb-1">
                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                                <span className="text-xs font-medium text-gray-700">Team Members:</span>
                              </div>
                              <p className="text-xs text-gray-500 ml-6">{team.memberNames.join(", ")}</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button onClick={() => setEditingTeamId(team.id)} className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <svg className="-ml-1 mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button onClick={() => removeTeam(team.id)} className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <svg className="-ml-1 mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`mt-8 bg-white rounded-lg shadow-sm border border-gray-200 ${activeTab !== "schedule" ? "hidden" : ""}`}>
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Event Schedule</h2>
                <p className="text-sm text-gray-600">Upcoming registration deadlines and competition milestones.</p>
              </div>
              <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">Live</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Registration deadline</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">May 25, 2026</p>
              <p className="mt-2 text-sm text-slate-600">Complete your team submissions before the final deadline.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Category review</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{teamCategory || "Select a category first"}</p>
              <p className="mt-2 text-sm text-slate-600">Use eligible members to match category rules and maximize your lineup.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Mentor checkpoints</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{mentorTeams.length} team{mentorTeams.length !== 1 ? 's' : ''} registered</p>
              <p className="mt-2 text-sm text-slate-600">Track your active teams and confirm that each team has the right members.</p>
            </div>
          </div>
        </div>

        <div className={`mt-8 bg-white rounded-lg shadow-sm border border-gray-200 ${activeTab !== "profile" ? "hidden" : ""}`}>
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Mentor Profile</h2>
                <p className="text-sm text-gray-600">Review your account and update your mentor details.</p>
              </div>
              <button onClick={handleLogout} className="rounded-2xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200">
                Sign Out
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <form className="grid gap-6 md:grid-cols-2" onSubmit={updateMentorProfile}>
              <div className="rounded-3xl bg-slate-50 p-5">
                <label htmlFor="profileName" className="block text-sm font-medium text-slate-600 mb-2">First Name</label>
                <input
                  id="profileName"
                  type="text"
                  value={profileName}
                  onChange={(event) => setProfileName(event.target.value)}
                  className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <label htmlFor="profileSurname" className="block text-sm font-medium text-slate-600 mb-2">Last Name</label>
                <input
                  id="profileSurname"
                  type="text"
                  value={profileSurname}
                  onChange={(event) => setProfileSurname(event.target.value)}
                  className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="rounded-3xl bg-slate-50 p-5 md:col-span-2">
                <label htmlFor="profileEmail" className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>
                <input
                  id="profileEmail"
                  type="email"
                  value={profileEmail}
                  onChange={(event) => setProfileEmail(event.target.value)}
                  className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                {profileError ? (
                  <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{profileError}</div>
                ) : profileMessage ? (
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700">{profileMessage}</div>
                ) : null}
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Save Profile
                </button>
              </div>
            </form>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Current Name</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{mentor?.name} {mentor?.surname}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Current Email</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{mentor?.email}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Category focus</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{teamCategory || "Not selected"}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Teams managed</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{mentorTeams.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default UserDashboard
