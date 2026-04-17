import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { createId, getCategories, getMembers, getTeams, saveMembers, saveTeams } from "../../admin/storage"
import type { Category, Member, Team } from "../../admin/types"
import { getCurrentMentor, signOutMentor } from "../auth"

const UserDashboard = () => {
  const navigate = useNavigate()
  const mentor = getCurrentMentor()
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
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])
  const [teamError, setTeamError] = useState("")
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null)
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

    if (selectedMemberIds.length === 0) {
      setTeamError("Please select at least one member for the team.")
      return
    }

    const selectedMembers = mentorMembers.filter((member) => selectedMemberIds.includes(member.id))
    if (selectedMembers.length !== selectedMemberIds.length) {
      setTeamError("Invalid member selection.")
      return
    }

    const newTeam: Team = {
      id: createId("team"),
      name: teamName.trim(),
      school: teamCountry.trim(),
      members: selectedMembers.length,
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
    const memberIds = form.getAll("memberIds").map((value) => String(value))

    if (!name || !categoryName || memberIds.length === 0) {
      setTeamError("Team name, category, and at least one member are required.")
      return
    }

    const selectedMembers = mentorMembers.filter((member) => memberIds.includes(member.id))
    if (selectedMembers.length !== memberIds.length) {
      setTeamError("Invalid team members selected.")
      return
    }

    const nextTeams = allTeams.map((team) =>
      team.id === teamId
        ? {
            ...team,
            name,
            categoryName,
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
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pb-16 pt-14 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-700 to-cyan-600 p-7 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm tracking-widest text-cyan-100 uppercase">Mentor Dashboard</p>
              <h1 className="mt-1 font-display text-4xl font-bold">Welcome, {mentor?.name ?? "Mentor"}</h1>
            </div>        
              <button
                onClick={handleLogout}
                className="rounded-xl border border-white/60 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Log Out
              </button>
          </div> 
          <p className="mt-4 text-blue-100">Add your teams here. They automatically appear in admin dashboard and participants page.</p>
        </header>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-blue-900">Add Member</h2>
          <p className="mt-1 text-sm text-slate-600">First, register members under your mentor account.</p>
          <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={addMember}>
            <input
              type="text"
              value={memberName}
              onChange={(event) => setMemberName(event.target.value)}
              placeholder="Name"
              className="rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              value={memberSurname}
              onChange={(event) => setMemberSurname(event.target.value)}
              placeholder="Surname"
              className="rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              type="number"
              min={6}
              max={90}
              value={memberAge}
              onChange={(event) => setMemberAge(Number(event.target.value))}
              placeholder="Age"
              className="rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              value={memberFin}
              onChange={(event) => setMemberFin(event.target.value)}
              placeholder="FIN"
              className="rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              type="email"
              value={memberEmail}
              onChange={(event) => setMemberEmail(event.target.value)}
              placeholder="Email"
              className="rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              type="tel"
              value={memberPhone}
              onChange={(event) => setMemberPhone(event.target.value)}
              placeholder="Phone number"
              className="rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              required
            />
            {memberError && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 md:col-span-2">{memberError}</p>
            )}
            <button
              type="submit"
              className="rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 md:col-span-2"
            >
              Add Member
            </button>
          </form>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-blue-900">Create Team</h2>
          <p className="mt-1 text-sm text-slate-600">Choose members + category, then set team name.</p>
          <form className="mt-5 space-y-3" onSubmit={addTeam}>
            <input
              type="text"
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
              placeholder="Team name"
              className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              required
            />
            <select
              value={teamCountry}
              onChange={(event) => setTeamCountry(event.target.value)}
              className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="">Choose country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <select
              value={teamCategory}
              onChange={(event) => setTeamCategory(event.target.value)}
              className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="">Choose category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="rounded-xl border border-blue-100 p-4">
              <p className="text-sm font-semibold text-blue-900">Select members</p>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {mentorMembers.length === 0 ? (
                  <p className="text-sm text-slate-500">No members added yet.</p>
                ) : (
                  mentorMembers.map((member) => (
                    <label key={member.id} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                      <input
                        type="checkbox"
                        checked={selectedMemberIds.includes(member.id)}
                        onChange={() => toggleMemberSelection(member.id)}
                      />
                      <span className="text-sm text-slate-700">{member.name} {member.surname}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            {teamError && <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{teamError}</p>}
            <button type="submit" className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700">
              Create Team
            </button>
          </form>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-blue-900">Your Members</h2>
          <p className="mt-1 text-sm text-slate-600">You can edit all member fields or remove members.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {mentorMembers.length === 0 ? (
              <p className="text-sm text-slate-500">No members added yet.</p>
            ) : (
              mentorMembers.map((member) => (
                <article key={member.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  {editingMemberId === member.id ? (
                    <form className="space-y-2" onSubmit={(event) => updateMember(event, member.id)}>
                      <input name="name" defaultValue={member.name} className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm" required />
                      <input name="surname" defaultValue={member.surname} className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm" required />
                      <input name="age" type="number" min={6} max={90} defaultValue={member.age} className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm" required />
                      <input name="fin" defaultValue={member.fin} className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm" required />
                      <input name="email" type="email" defaultValue={member.email} className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm" required />
                      <input name="phone" type="tel" defaultValue={member.phone} className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm" required />
                      <div className="flex gap-2">
                        <button type="submit" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">Save</button>
                        <button type="button" onClick={() => setEditingMemberId(null)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="font-semibold text-slate-900">{member.name} {member.surname}</p>
                      <p className="text-xs text-slate-600">Age: {member.age}</p>
                      <p className="text-xs text-slate-600">FIN: {member.fin}</p>
                      <p className="text-xs text-slate-600">Email: {member.email}</p>
                      <p className="text-xs text-slate-600">Phone: {member.phone}</p>
                      <div className="mt-2 flex gap-3">
                        <button onClick={() => setEditingMemberId(member.id)} className="text-sm font-semibold text-blue-700 hover:text-blue-800">Edit</button>
                        <button onClick={() => removeMember(member.id)} className="text-sm font-semibold text-red-600 hover:text-red-700">Remove</button>
                      </div>
                    </>
                  )}
                </article>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-blue-900">Your Teams</h2>
          <p className="mt-1 text-sm text-slate-600">You can edit team name, category, and selected members only.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {mentorTeams.length === 0 ? (
              <p className="text-sm text-slate-500">No teams added yet.</p>
            ) : (
              mentorTeams.map((team) => (
                <article key={team.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  {editingTeamId === team.id ? (
                    <form className="space-y-2" onSubmit={(event) => updateTeam(event, team.id)}>
                      <input name="teamName" defaultValue={team.name} className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm" required />
                      <select
                        name="categoryName"
                        defaultValue={team.categoryName ?? ""}
                        className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm"
                        required
                      >
                        <option value="" disabled>Choose category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                      </select>
                      <div className="rounded-lg border border-slate-200 p-2">
                        <p className="mb-2 text-xs font-semibold text-slate-700">Select members</p>
                        <div className="grid gap-1">
                          {mentorMembers.map((member) => (
                            <label key={member.id} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                name="memberIds"
                                value={member.id}
                                defaultChecked={team.memberIds?.includes(member.id)}
                              />
                              <span>{member.name} {member.surname}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">Country remains unchanged: {team.school}</p>
                      <div className="flex gap-2">
                        <button type="submit" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">Save</button>
                        <button type="button" onClick={() => setEditingTeamId(null)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="font-semibold text-slate-900">{team.name}</p>
                      <p className="text-sm text-slate-600">Country: {team.school || "N/A"}</p>
                      <p className="text-xs text-slate-600">Category: {team.categoryName ?? "N/A"}</p>
                      <p className="text-xs text-blue-700">Members: {team.members}</p>
                      {team.memberNames && team.memberNames.length > 0 && (
                        <p className="mt-1 text-xs text-slate-600">Team members: {team.memberNames.join(", ")}</p>
                      )}
                      <div className="mt-2 flex gap-3">
                        <button onClick={() => setEditingTeamId(team.id)} className="text-sm font-semibold text-blue-700 hover:text-blue-800">Edit</button>
                        <button onClick={() => removeTeam(team.id)} className="text-sm font-semibold text-red-600 hover:text-red-700">Remove</button>
                      </div>
                    </>
                  )}
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserDashboard
