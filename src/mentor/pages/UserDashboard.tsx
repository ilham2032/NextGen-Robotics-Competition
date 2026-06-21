import { FormEvent, useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { createId, fetchRemoteTeams, getCategories, getMembers, getMentors, getTeams, saveMembersAndSync, saveMentorsAndSync, saveTeams, saveTeamsAndSync } from "../../admin/storage"
import type { Category, Member, Mentor, Team } from "../../admin/types"
import { createPasswordHash, getCurrentMentor, signOutMentor } from "../auth"
import { formatDateOfBirthInput, isValidDateOfBirth } from "../validation"
import CategoryAgeRequirementsPanel from "../components/CategoryAgeRequirementsPanel"
import { notifyEmailInBackground, sendMemberWelcomeEmail } from "../../lib/emailApi"
import {
  findCategoryByName,
  formatCategoryAgeRequirement,
  isMemberEligibleForCategory,
  validateMembersForCategoryAge,
} from "../../utils/categoryRules"

const UserDashboard = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [mentor, setMentor] = useState<Mentor | null>(() => getCurrentMentor())
  const [allMembers, setAllMembers] = useState<Member[]>(() => getMembers())
  const [allTeams, setAllTeams] = useState<Team[]>(() => getTeams())
  const [categories] = useState<Category[]>(() => getCategories())

  const [memberName, setMemberName] = useState("")
  const [memberSurname, setMemberSurname] = useState("")
  const [memberAgeDate, setMemberAgeDate] = useState("")
  const [memberFin, setMemberFin] = useState("")
  const [memberEmail, setMemberEmail] = useState("")
  const [memberPhone, setMemberPhone] = useState("")
  const [memberError, setMemberError] = useState("")

  const [teamName, setTeamName] = useState("")
  const [teamCategory, setTeamCategory] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])
  const [teamError, setTeamError] = useState("")
  const [teamMessage, setTeamMessage] = useState("")
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null)
  const [showAddParticipantForm, setShowAddParticipantForm] = useState(false)
  const [profileName, setProfileName] = useState(mentor?.name ?? "")
  const [profileSurname, setProfileSurname] = useState(mentor?.surname ?? "")
  const [profileEmail, setProfileEmail] = useState(mentor?.email ?? "")
  const [profileFin, setProfileFin] = useState(mentor?.fin ?? "")
  const [profileDateOfBirth, setProfileDateOfBirth] = useState(mentor?.dateOfBirth ?? "")
  const [profilePhone, setProfilePhone] = useState(mentor?.phone ?? "")
  const [profilePassword, setProfilePassword] = useState("")
  const [profileError, setProfileError] = useState("")
  const [profileMessage, setProfileMessage] = useState("")
  const [activeTab, setActiveTab] = useState<"users" | "create-team" | "teams" | "schedule" | "profile">("users")
  const mentorCountry = mentor?.country?.trim() ?? ""

  useEffect(() => {
    void (async () => {
      const remote = await fetchRemoteTeams()
      if (!remote || remote.length === 0) return
      const local = getTeams()
      const merged = new Map(local.map((team) => [team.id, team]))
      remote.forEach((team) => merged.set(team.id, team))
      const nextTeams = Array.from(merged.values())
      saveTeams(nextTeams)
      setAllTeams(nextTeams)
    })()
  }, [])

  const mentorMembers = useMemo(
    () => allMembers.filter((member) => member.mentorId && member.mentorId === mentor?.id),
    [allMembers, mentor?.id],
  )

  const mentorTeams = useMemo(
    () => allTeams.filter((team) => team.mentorId && team.mentorId === mentor?.id),
    [allTeams, mentor?.id],
  )

  const mentorCategoryCount = useMemo(
    () => new Set(mentorTeams.map((team) => team.categoryName?.trim() || "")).size,
    [mentorTeams],
  )

  const selectedTeamCategory = useMemo(
    () => (teamCategory ? findCategoryByName(categories, teamCategory) : undefined),
    [categories, teamCategory],
  )

  const eligibleMemberCount = useMemo(() => {
    if (!selectedTeamCategory) return mentorMembers.length
    return mentorMembers.filter((member) => isMemberEligibleForCategory(member, selectedTeamCategory)).length
  }, [mentorMembers, selectedTeamCategory])

  const navigationTabs = [
    { id: "users", label: t("Add Participant") },
    { id: "create-team", label: t("Create Team") },
    { id: "teams", label: t("Teams") },
    { id: "schedule", label: t("Event Schedule") },
    { id: "profile", label: t("Mentor Profile") },
  ]

  const handleLogout = () => {
    signOutMentor()
    navigate("/user/auth")
  }

  useEffect(() => {
    setProfileName(mentor?.name ?? "")
    setProfileSurname(mentor?.surname ?? "")
    setProfileEmail(mentor?.email ?? "")
    setProfileFin(mentor?.fin ?? "")
    setProfileDateOfBirth(mentor?.dateOfBirth ?? "")
    setProfilePhone(mentor?.phone ?? "")
    setProfilePassword("")
  }, [mentor])

  useEffect(() => {
    if (activeTab === "teams" || activeTab === "create-team") {
      setAllTeams(getTeams())
    }
  }, [activeTab])

  useEffect(() => {
    if (activeTab !== "users") {
      setShowAddParticipantForm(false)
    }
  }, [activeTab])

  useEffect(() => {
    if (searchParams.get("tab") === "teams") {
      setActiveTab("teams")
    }
  }, [searchParams])

  useEffect(() => {
    if (!selectedTeamCategory) return
    setSelectedMemberIds((ids) =>
      ids.filter((id) => {
        const member = mentorMembers.find((entry) => entry.id === id)
        return member && isMemberEligibleForCategory(member, selectedTeamCategory)
      }),
    )
  }, [teamCategory, selectedTeamCategory, mentorMembers])

  const completeTeamRegistration = (teamId: string) => {
    const teamName = mentorTeams.find((team) => team.id === teamId)?.name ?? "Team"
    setTeamMessage(`${teamName} registration completed and ready for competition.`)
    window.setTimeout(() => setTeamMessage(""), 4000)
  }

  const updateMentorProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!mentor) {
      setProfileError("Unable to update profile. Mentor session not found.")
      return
    }

    const normalizedEmail = profileEmail.trim().toLowerCase()
    const normalizedFin = profileFin.trim().toUpperCase()
    const normalizedDob = profileDateOfBirth.trim()
    const normalizedPhone = profilePhone.trim()
    const finPattern = /^[A-Z0-9]{7,12}$/
    const phonePattern = /^\+?[0-9]{7,15}$/

    if (!profileName.trim() || !profileSurname.trim() || !normalizedEmail || !normalizedFin || !normalizedDob || !normalizedPhone) {
      setProfileError("Please fill in all profile fields.")
      return
    }

    if (!finPattern.test(normalizedFin)) {
      setProfileError("FIN must be 7-12 letters or numbers.")
      return
    }

    if (!isValidDateOfBirth(normalizedDob)) {
      setProfileError("Please enter a valid date of birth in dd/mm/yyyy format.")
      return
    }

    if (!phonePattern.test(normalizedPhone)) {
      setProfileError("Phone must contain 7-15 digits and may start with +.")
      return
    }

    if (profilePassword && profilePassword.length < 8) {
      setProfileError("Password must be at least 8 characters long.")
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
      fin: normalizedFin,
      dateOfBirth: normalizedDob,
      phone: normalizedPhone,
    }

    if (profilePassword) {
      const { passwordHash, passwordSalt } = await createPasswordHash(profilePassword)
      updatedMentor.passwordHash = passwordHash
      updatedMentor.passwordSalt = passwordSalt
    }

    const nextMentors = mentors.map((item) => (item.id === mentor.id ? updatedMentor : item))
    saveMentorsAndSync(nextMentors)
    setMentor(updatedMentor)
    setProfilePassword("")
    setProfileError("")
    setProfileMessage(profilePassword ? "Profile and password updated successfully." : "Profile updated successfully.")
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

  const getCategoryForTeam = (categoryName: string) => findCategoryByName(categories, categoryName)

  const validateCategoryTeamSizeRules = (selectedMembers: Member[], categoryName: string) => {
    const category = getCategoryForTeam(categoryName)
    if (!category || category.maxMembers === undefined) {
      return null
    }

    if (selectedMembers.length > category.maxMembers) {
      return `Selected category only allows ${category.maxMembers} member${category.maxMembers === 1 ? "" : "s"} per team.`
    }

    return null
  }

  const getCategoryMemberLimitHint = (categoryName: string) => {
    const category = getCategoryForTeam(categoryName)
    if (!category || category.maxMembers === undefined) {
      return ""
    }
    return `Up to ${category.maxMembers} member${category.maxMembers === 1 ? "" : "s"} per team.`
  }

  const getAssignedMemberIds = (categoryName: string, excludeTeamId?: string) =>
    allTeams
      .filter((team) => team.id !== excludeTeamId && (team.categoryName?.trim() || "") === categoryName.trim())
      .flatMap((team) => team.memberIds ?? [])

  const addMember = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!mentor) {
      return
    }

    const normalizedFin = memberFin.trim().toUpperCase()
    const finPattern = /^[A-Z0-9]{7,12}$/
    const phonePattern = /^\+?[0-9]{7,15}$/

    if (!memberName.trim() || !memberSurname.trim() || !memberEmail.trim() || !memberAgeDate.trim()) {
      setMemberError("Please fill in all member fields.")
      return
    }

    const dateOfBirth = new Date(memberAgeDate)
    if (Number.isNaN(dateOfBirth.getTime())) {
      setMemberError("Please enter a valid date of birth.")
      return
    }

    const ageDiff = Date.now() - dateOfBirth.getTime()
    const ageFromDate = Math.floor(new Date(ageDiff).getUTCFullYear() - 1970)
    if (ageFromDate < 6) {
      setMemberError("Participants must be at least 6 years old.")
      return
    }

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
      age: ageFromDate,
      fin: normalizedFin,
      email: memberEmail.trim().toLowerCase(),
      phone: memberPhone.trim(),
    }

    const nextMembers = [newMember, ...allMembers]
    setAllMembers(nextMembers)
    saveMembersAndSync(nextMembers)

    notifyEmailInBackground(
      sendMemberWelcomeEmail({
        name: newMember.name,
        surname: newMember.surname,
        email: newMember.email,
        mentorName: `${mentor.name} ${mentor.surname}`,
        age: newMember.age,
      }),
    )

    setMemberName("")
    setMemberSurname("")
    setMemberAgeDate("")
    setMemberFin("")
    setMemberEmail("")
    setMemberPhone("")
    setMemberError("")
    setShowAddParticipantForm(false)
  }

  const updateMember = (event: FormEvent<HTMLFormElement>, memberId: string) => {
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
    saveMembersAndSync(nextMembers)

    const syncedTeams = normalizeAndSyncTeams(allTeams, nextMembers)
    setAllTeams(syncedTeams)
    saveTeamsAndSync(syncedTeams)

    setEditingMemberId(null)
    setMemberError("")
  }

  const removeMember = (memberId: string) => {
    if (!window.confirm("Are you sure you want to remove this participant? This cannot be undone.")) {
      return
    }

    const nextMembers = allMembers.filter((member) => member.id !== memberId)
    setAllMembers(nextMembers)
    saveMembersAndSync(nextMembers)

    const syncedTeams = normalizeAndSyncTeams(allTeams, nextMembers)
    setAllTeams(syncedTeams)
    saveTeamsAndSync(syncedTeams)
  }

  const toggleMemberSelection = (memberId: string) => {
    const member = mentorMembers.find((entry) => entry.id === memberId)
    if (!member) return

    if (selectedMemberIds.includes(memberId)) {
      setSelectedMemberIds((current) => current.filter((id) => id !== memberId))
      return
    }

    if (selectedTeamCategory && !isMemberEligibleForCategory(member, selectedTeamCategory)) {
      const ageLabel = formatCategoryAgeRequirement(selectedTeamCategory)
      setTeamError(
        `${member.name} ${member.surname} (age ${member.age}) is not eligible for ${selectedTeamCategory.name}. Required: ${ageLabel ?? "see category rules"}.`,
      )
      return
    }

    setTeamError("")
    setSelectedMemberIds((current) => [...current, memberId])
  }

  const addTeam = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!mentor) {
      return
    }

    if (!teamName.trim()) {
      setTeamError("Please enter a team name.")
      return
    }

    if (!mentorCountry) {
      setTeamError("Your mentor profile must include a country. Please update your profile before registering teams.")
      return
    }

    if (!teamCategory.trim()) {
      setTeamError("Please choose a category.")
      return
    }

    const selectedCategory = findCategoryByName(categories, teamCategory)
    if (!selectedCategory) {
      setTeamError("Selected category is no longer available. Please choose another category.")
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

    const category = getCategoryForTeam(teamCategory)
    const categoryValidationError = validateMembersForCategoryAge(selectedMembers, category)
    if (categoryValidationError) {
      setTeamError(categoryValidationError)
      return
    }

    const teamSizeValidationError = validateCategoryTeamSizeRules(selectedMembers, teamCategory)
    if (teamSizeValidationError) {
      setTeamError(teamSizeValidationError)
      return
    }

    const assignedMemberIds = getAssignedMemberIds(teamCategory)
    const duplicateMembers = selectedMemberIds.filter((memberId) => assignedMemberIds.includes(memberId))
    if (duplicateMembers.length > 0) {
      setTeamError("One or more selected members are already registered in this category. A participant may join multiple categories, but only once per category.")
      return
    }

    const newTeam: Team = {
      id: createId("team"),
      name: teamName.trim(),
      school: mentorCountry,
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
    saveTeamsAndSync(nextTeams)

    setTeamName("")
    setTeamCategory("")
    setTeamDescription("")
    setSelectedMemberIds([])
    setTeamError("")
    setActiveTab("teams")
    completeTeamRegistration(newTeam.id)
  }

  const removeTeam = (teamId: string) => {
    if (!window.confirm("Are you sure you want to remove this team? This action cannot be undone.")) {
      return
    }

    const nextTeams = allTeams.filter((team) => team.id !== teamId)
    setAllTeams(nextTeams)
    saveTeamsAndSync(nextTeams)
  }

  const updateTeam = (event: FormEvent<HTMLFormElement>, teamId: string) => {
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

    const category = getCategoryForTeam(categoryName)
    const categoryValidationError = validateMembersForCategoryAge(selectedMembers, category)
    if (categoryValidationError) {
      setTeamError(categoryValidationError)
      return
    }

    const teamSizeValidationError = validateCategoryTeamSizeRules(selectedMembers, categoryName)
    if (teamSizeValidationError) {
      setTeamError(teamSizeValidationError)
      return
    }

    const assignedMemberIds = getAssignedMemberIds(categoryName, teamId)
    const duplicateMembers = memberIds.filter((memberId) => assignedMemberIds.includes(memberId))
    if (duplicateMembers.length > 0) {
      setTeamError("One or more selected members are already registered in this category. A participant may join multiple categories, but only once per category.")
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
    saveTeamsAndSync(nextTeams)
    setEditingTeamId(null)
    setTeamError("")
  }

  return (
    <div className="min-h-screen bg-slate-950/5 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-10 rounded-[2.5rem] bg-linear-to-br from-slate-950 via-indigo-950 to-sky-700 px-8 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,0.35)] ring-1 ring-white/10 backdrop-blur-sm sm:px-10 sm:py-12">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">{t("NextGen Robotics Mentor Portal")}</p>
              <h1 className="mt-4 text-3xl font-display font-semibold tracking-tight text-white sm:text-5xl">
                Welcome back, {mentor?.name ?? 'Mentor'}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200/90 sm:text-base">
                Organize participants, build teams, and track competition readiness in one polished mentor dashboard.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('users')
                    setShowAddParticipantForm(true)
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-white/20 transition hover:bg-slate-100"
                >
                  {t("Add Participant")}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('create-team')}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  {t("Create Team")}
                </button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[22px] bg-white/10 border border-white/15 p-5 shadow-lg shadow-slate-950/20 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-300">{t("Participants")}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{mentorMembers.length}</p>
                <p className="mt-2 text-sm text-slate-300">Active team members</p>
              </div>
              <div className="rounded-[22px] bg-white/10 border border-white/15 p-5 shadow-lg shadow-slate-950/20 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-300">{t("Teams")}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{mentorTeams.length}</p>
                <p className="mt-2 text-sm text-slate-300">Competition-ready squads</p>
              </div>
              <div className="rounded-[22px] bg-white/10 border border-white/15 p-5 shadow-lg shadow-slate-950/20 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-300">{t("Categories")}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{mentorCategoryCount}</p>
                <p className="mt-2 text-sm text-slate-300">Event categories used</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:grid md:grid-cols-[280px_1fr] md:gap-8">
          <aside className="space-y-6 md:sticky md:top-8">
            <div className="rounded-4xl border border-slate-200/70 bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.12)]">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Mentor toolkit</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{t("Navigation")}</h2>
              <p className="mt-2 text-sm text-slate-600">Select a section to manage participants, teams, schedule, or profile.</p>
              <nav className="mt-6 space-y-2">
                {navigationTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex w-full items-center justify-between rounded-3xl px-4 py-4 text-left text-sm font-semibold transition ${
                      activeTab === tab.id
                        ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition ${
                      activeTab === tab.id ? "bg-cyan-300 text-slate-950" : "bg-slate-200 text-slate-500"
                    }`}>
                      {tab.label.charAt(0)}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
            <CategoryAgeRequirementsPanel />
          </aside>

          <div className="space-y-6">
            {/* Add Member Section */}
          <div
            id="add-participant-form"
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
              activeTab !== "users" || !showAddParticipantForm ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
            }`}
          >
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setShowAddParticipantForm(false)} />
            <div className="relative w-full max-w-2xl overflow-hidden rounded-[30px] bg-white shadow-2xl ring-1 ring-slate-200">
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900/10 text-cyan-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-display font-semibold text-slate-900">{t("Add Participant")}</h2>
                    <p className="text-sm text-slate-600">Provide participant details for your team roster.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddParticipantForm(false)}
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close participant form"
                >
                  ✕
                </button>
              </div>
            <div className="p-6">
              <form className="space-y-6" onSubmit={addMember}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="memberName" className="block text-sm font-medium text-slate-700 mb-2">{t("First Name")} *</label>
                    <input
                      id="memberName"
                      type="text"
                      value={memberName}
                      onChange={(event) => setMemberName(event.target.value)}
                      placeholder={t("Enter first name")}
                      className="block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="memberSurname" className="block text-sm font-medium text-slate-700 mb-2">{t("Last Name")} *</label>
                    <input
                      id="memberSurname"
                      type="text"
                      value={memberSurname}
                      onChange={(event) => setMemberSurname(event.target.value)}
                      placeholder={t("Enter last name")}
                      className="block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="memberAgeDate" className="block text-sm font-medium text-slate-700 mb-2">{t("Date of Birth")} *</label>
                    <input
                      id="memberAgeDate"
                      type="date"
                      value={memberAgeDate}
                      onChange={(event) => setMemberAgeDate(event.target.value)}
                      placeholder={t("mm/dd/yyyy")}
                      className="block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                      required
                    />
                    <p className="mt-2 text-xs text-indigo-700">
                      Age is calculated from date of birth and must match the competition category (see age requirements in the sidebar).
                    </p>
                  </div>
                  <div>
                    <label htmlFor="memberFin" className="block text-sm font-medium text-slate-700 mb-2">
                      {t("FIN")} *
                      <span className="text-xs text-slate-500 ml-1" title={t("Personal Identification Number - 7-12 alphanumeric characters")}>ⓘ</span>
                    </label>
                    <input
                      id="memberFin"
                      type="text"
                      value={memberFin}
                      onChange={(event) => setMemberFin(event.target.value)}
                      placeholder={t("e.g., ABC123456")}
                      className="block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200 uppercase"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="memberPhone" className="block text-sm font-medium text-slate-700 mb-2">{t("Phone Number")} *</label>
                    <input
                      id="memberPhone"
                      type="tel"
                      value={memberPhone}
                      onChange={(event) => setMemberPhone(event.target.value)}
                      placeholder={t("Enter phone")}
                      className="block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="memberEmail" className="block text-sm font-medium text-gray-700 mb-2">{t("Email Address")} *</label>
                  <input
                    id="memberEmail"
                    type="email"
                    value={memberEmail}
                    onChange={(event) => setMemberEmail(event.target.value)}
                    placeholder={t("member@example.com")}
                    className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    required
                  />
                </div>

                {memberError && (
                  <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                    <div className="flex">
                      <div className="shrink-0">
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
                    {t("Add")} {t("Participants")}
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>

          {/* Create Team Section */}
          <div className={`rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-900/5 overflow-hidden ${activeTab !== "create-team" ? "hidden" : ""}`}>
            <div className="bg-slate-50 px-6 py-5 border-b border-slate-200">
              <div className="flex items-center">
                <div className="shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{t("Create Team")}</h2>
                  <p className="text-sm text-gray-600">{t("Form a team with selected members")}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-6" onSubmit={addTeam}>
                <div>
                  <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">{t("Team Name")} *</label>
                  <input
                    id="teamName"
                    type="text"
                    value={teamName}
                    onChange={(event) => setTeamName(event.target.value)}
                    placeholder={t("Enter team name")}
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
                    placeholder={t("Your Message...")}
                    rows={4}
                    className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-gray-700">
                      Your team country is automatically assigned from your mentor profile: 
                      <span className="font-medium">{mentorCountry || "Not set"}</span>.
                    </p>
                    {!mentorCountry && (
                      <p className="mt-2 text-sm text-red-600">Please update your mentor profile to include a country before creating teams.</p>
                    )}
                  </div>
                </div>
                <div>
                    <label htmlFor="teamCategory" className="block text-sm font-medium text-gray-700 mb-2">{t("Competition Category")} *</label>
                    <select
                      id="teamCategory"
                      value={teamCategory}
                      onChange={(event) => setTeamCategory(event.target.value)}
                      className="block w-full px-4 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
                      required
                    >
                      <option value="">{t("Select a category...")}</option>
                      {categories.map((category) => {
                        const ageLabel = formatCategoryAgeRequirement(category)
                        return (
                          <option key={category.id} value={category.name}>
                            {category.name}
                            {ageLabel ? ` · ${ageLabel}` : ""}
                          </option>
                        )
                      })}
                    </select>
                    {teamCategory && selectedTeamCategory && (
                      <div className="mt-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3">
                        <p className="text-sm font-semibold text-indigo-900">
                          Participant age requirement: {formatCategoryAgeRequirement(selectedTeamCategory)}
                        </p>
                        <p className="mt-1 text-sm text-indigo-800">{getCategoryMemberLimitHint(teamCategory)}</p>
                        <p className="mt-1 text-sm text-indigo-700">
                          {eligibleMemberCount} of {mentorMembers.length} roster member
                          {mentorMembers.length !== 1 ? "s" : ""} eligible for this category.
                        </p>
                      </div>
                    )}
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
                        {mentorMembers.map((member) => {
                          const eligible =
                            !selectedTeamCategory || isMemberEligibleForCategory(member, selectedTeamCategory)
                          return (
                            <label
                              key={member.id}
                              className={`flex items-center p-3 rounded-md border transition-colors ${
                                eligible
                                  ? "hover:bg-white border-transparent hover:border-gray-200 cursor-pointer"
                                  : "bg-slate-100 border-slate-200 opacity-70 cursor-not-allowed"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedMemberIds.includes(member.id)}
                                onChange={() => toggleMemberSelection(member.id)}
                                disabled={!eligible && !selectedMemberIds.includes(member.id)}
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                              />
                              <div className="ml-3 flex-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {member.name} {member.surname}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">Age {member.age}</span>
                                {!eligible && selectedTeamCategory && (
                                  <span className="block text-xs font-medium text-amber-700 mt-0.5">
                                    Not eligible — requires {formatCategoryAgeRequirement(selectedTeamCategory)}
                                  </span>
                                )}
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {teamError && (
                  <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                    <div className="flex">
                      <div className="shrink-0">
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

                <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Team submissions are now registered immediately with no payment required to publish.
                </p>

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

        {/* Members List */}
        <div className={`mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 ${activeTab !== "users" ? "hidden" : ""}`}>
          <div className="px-6 py-5 border-b border-slate-200 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Participants</h2>
              <p className="mt-2 text-sm text-slate-600">Manage your team members with a clean, professional roster.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveTab('users')
                setShowAddParticipantForm(true)
              }}
              className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-sky-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:from-sky-500 hover:to-indigo-700"
            >
              Add participant
            </button>
          </div>
          <div className="p-6 overflow-x-auto">
            <div className="min-w-full">
              <div className="hidden sm:grid grid-cols-[1.8fr_0.7fr_1.3fr_1.8fr_1fr_200px] gap-4 rounded-3xl bg-slate-950/5 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                <span>Name</span>
                <span>Age</span>
                <span>Contact</span>
                <span>Email</span>
                <span>ID / Passport</span>
                <span>Actions</span>
              </div>
              <div className="mt-3 space-y-3">
                {mentorMembers.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-8 py-12 text-center text-sm text-slate-500">
                    No participants registered yet. Add your first participant using the form above.
                  </div>
                ) : (
                  mentorMembers.map((member) => (
                    <div
                      key={member.id}
                      className="grid gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:grid-cols-[1.8fr_0.7fr_1.3fr_1.8fr_1fr_200px] sm:items-center"
                    >
                      {editingMemberId === member.id ? (
                        <div className="col-span-full space-y-4">
                          <form className="grid gap-4 sm:grid-cols-[1.4fr_0.7fr_1.3fr_1.8fr_1fr]" onSubmit={(event) => updateMember(event, member.id)}>
                            <input name="name" defaultValue={member.name} placeholder="First name" className="rounded-2xl border border-slate-300 px-3 py-2 text-sm" required />
                            <input name="surname" defaultValue={member.surname} placeholder="Last name" className="rounded-2xl border border-slate-300 px-3 py-2 text-sm" required />
                            <input name="age" type="number" min={6} defaultValue={member.age} placeholder="Age" className="rounded-2xl border border-slate-300 px-3 py-2 text-sm" required />
                            <input name="phone" defaultValue={member.phone} placeholder="Contact" className="rounded-2xl border border-slate-300 px-3 py-2 text-sm" required />
                            <input name="email" type="email" defaultValue={member.email} placeholder="Email" className="rounded-2xl border border-slate-300 px-3 py-2 text-sm" required />
                            <input name="fin" defaultValue={member.fin} placeholder="ID / Passport" className="rounded-2xl border border-slate-300 px-3 py-2 text-sm col-span-full" required />
                            <div className="col-span-full flex flex-wrap gap-2">
                              <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save</button>
                              <button type="button" onClick={() => setEditingMemberId(null)} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1">
                            <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:hidden">Name</span>
                            <p className="font-semibold text-slate-900">{member.name} {member.surname}</p>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:hidden">Age</span>
                            <div className="text-slate-600">{member.age}</div>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:hidden">Contact</span>
                            <div className="text-slate-600 truncate">{member.phone}</div>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:hidden">Email</span>
                            <div className="text-slate-600 truncate">{member.email}</div>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:hidden">ID / Passport</span>
                            <div className="text-slate-600">{member.fin}</div>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:hidden">Actions</span>
                            <div className="flex flex-wrap gap-2">
                              <button onClick={() => setEditingMemberId(member.id)} className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Edit</button>
                              <button onClick={() => removeMember(member.id)} className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100">Remove</button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Teams List */}
        <div className={`mt-8 bg-white rounded-3xl shadow-sm border border-slate-200 ${activeTab !== "teams" ? "hidden" : ""}`}>
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Registered Teams</h2>
                  <p className="text-sm text-slate-500">All active entries are published immediately to the Participants page.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{mentorTeams.length} team{mentorTeams.length !== 1 ? "s" : ""}</span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{mentorMembers.length} members</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            {teamMessage && (
              <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
                {teamMessage}
              </div>
            )}
            {mentorTeams.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-8 py-14 text-center">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">No teams have been created yet</h3>
                <p className="mt-2 text-sm text-slate-500">Use the Create Team tab to add your first entry and begin tracking team progress.</p>
              </div>
            ) : (
              <div className="grid gap-6 xl:grid-cols-2">
                {mentorTeams.map((team) => (
                  <div key={team.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{team.categoryName || "Uncategorized"}</p>
                        <h3 className="text-2xl font-semibold text-slate-900 truncate">{team.name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                        <span className="rounded-full bg-slate-100 px-3 py-1">{team.members} member{team.members !== 1 ? "s" : ""}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">{team.school || "No school"}</span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">{team.description || "No description provided."}</p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                        <p className="font-semibold text-slate-900">Members</p>
                        <p className="mt-2 text-base text-slate-800">{team.members}</p>
                      </div>
                      <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                        <p className="font-semibold text-slate-900">Category</p>
                        <p className="mt-2 text-base text-slate-800">{team.categoryName || "Uncategorized"}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {editingTeamId === team.id ? (
                        <form
                          className="mt-4 w-full space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4"
                          onSubmit={(event) => updateTeam(event, team.id)}
                        >
                          <input
                            name="teamName"
                            defaultValue={team.name}
                            className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                            required
                          />
                          <select
                            name="categoryName"
                            defaultValue={team.categoryName}
                            className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                            required
                          >
                            <option value="">Select category</option>
                            {categories.map((category) => {
                              const ageLabel = formatCategoryAgeRequirement(category)
                              return (
                                <option key={category.id} value={category.name}>
                                  {category.name}
                                  {ageLabel ? ` · ${ageLabel}` : ""}
                                </option>
                              )
                            })}
                          </select>
                          <textarea
                            name="description"
                            defaultValue={team.description}
                            className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                            rows={2}
                            required
                          />
                          {mentorMembers.map((member) => {
                            const editCategory = getCategoryForTeam(team.categoryName ?? "")
                            const eligible = !editCategory || isMemberEligibleForCategory(member, editCategory)
                            return (
                              <label
                                key={member.id}
                                className={`flex items-center gap-2 text-sm ${eligible ? "text-slate-700" : "text-slate-400"}`}
                              >
                                <input
                                  type="checkbox"
                                  name="memberIds"
                                  value={member.id}
                                  defaultChecked={team.memberIds?.includes(member.id)}
                                  disabled={!eligible && !team.memberIds?.includes(member.id)}
                                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                                />
                                {member.name} {member.surname} (age {member.age})
                                {!eligible && editCategory && (
                                  <span className="text-xs text-amber-700">— needs {formatCategoryAgeRequirement(editCategory)}</span>
                                )}
                              </label>
                            )
                          })}
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="submit"
                              className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                              Save changes
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingTeamId(null)}
                              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setEditingTeamId(team.id)}
                            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                          >
                            Edit Team
                          </button>
                          <button
                            type="button"
                            onClick={() => removeTeam(team.id)}
                            className="inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                          >
                            Remove Team
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`mt-8 bg-white rounded-3xl shadow-sm border border-gray-200 ${activeTab !== "schedule" ? "hidden" : ""}`}>
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
              {teamCategory && selectedTeamCategory && (
                <p className="mt-2 text-sm font-medium text-indigo-800">
                  Required participant ages: {formatCategoryAgeRequirement(selectedTeamCategory)}
                </p>
              )}
              <p className="mt-2 text-sm text-slate-600">Only participants within the category age range can be added to a team.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Mentor checkpoints</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{mentorTeams.length} team{mentorTeams.length !== 1 ? 's' : ''} registered</p>
              <p className="mt-2 text-sm text-slate-600">Track your active teams and confirm that each team has the right members.</p>
            </div>
          </div>
        </div>

        <div className={`mt-8 bg-white rounded-3xl shadow-sm border border-gray-200 ${activeTab !== "profile" ? "hidden" : ""}`}>
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

              <div className="rounded-3xl bg-slate-50 p-5">
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

              <div className="rounded-3xl bg-slate-50 p-5">
                <label htmlFor="profileFin" className="block text-sm font-medium text-slate-600 mb-2">
                  FIN
                  <span className="text-xs text-slate-500 ml-1" title="Personal Identification Number">ⓘ</span>
                </label>
                <input
                  id="profileFin"
                  type="text"
                  value={profileFin}
                  onChange={(event) => setProfileFin(event.target.value)}
                  className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
                  required
                />
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <label htmlFor="profileDateOfBirth" className="block text-sm font-medium text-slate-600 mb-2">Date of Birth</label>
                <input
                  id="profileDateOfBirth"
                  type="text"
                  value={profileDateOfBirth}
                  onChange={(event) => setProfileDateOfBirth(formatDateOfBirthInput(event.target.value))}
                  placeholder="dd/mm/yyyy"
                  className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <label htmlFor="profilePhone" className="block text-sm font-medium text-slate-600 mb-2">Phone Number</label>
                <input
                  id="profilePhone"
                  type="tel"
                  value={profilePhone}
                  onChange={(event) => setProfilePhone(event.target.value)}
                  placeholder="e.g. +994501234567"
                  className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="rounded-3xl bg-slate-50 p-5 md:col-span-2">
                <label htmlFor="profilePassword" className="block text-sm font-medium text-slate-600 mb-2">New Password</label>
                <input
                  id="profilePassword"
                  type="password"
                  value={profilePassword}
                  onChange={(event) => setProfilePassword(event.target.value)}
                  placeholder="Leave blank to keep existing password"
                  className="block w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="mt-2 text-sm text-slate-500">Provide a new password only if you want to update it.</p>
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
                <p className="text-sm text-slate-500">Date of Birth</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{mentor?.dateOfBirth || "Not set"}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">FIN</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{mentor?.fin || "Not set"}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Phone Number</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{mentor?.phone || "Not set"}</p>
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
