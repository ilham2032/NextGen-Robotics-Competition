import { useState } from "react"
import { createId, saveMembers, saveMentors } from "../storage"
import type { Member, Mentor } from "../types"
import { exportMentorsExcel, exportMentorsPdf } from "../utils/mentorExport"

type UsersPageProps = {
  mentors: Mentor[]
  members: Member[]
  onMentorsChange: (mentors: Mentor[]) => void
  onMembersChange: (members: Member[]) => void
}

const formatRegisteredAt = (value: string): string => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString()
}

const UsersPage = ({ mentors, members, onMentorsChange, onMembersChange }: UsersPageProps) => {
  const [editingMentor, setEditingMentor] = useState<string | null>(null)
  const [editingMember, setEditingMember] = useState<string | null>(null)
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [mentorForm, setMentorForm] = useState({
    name: "",
    surname: "",
    fin: "",
    email: "",
    dateOfBirth: "",
    country: "",
  })
  const [memberForm, setMemberForm] = useState({ name: "", surname: "", email: "", age: 0, phone: "", fin: "" })
  const [memberError, setMemberError] = useState("")

  const handleEditMentor = (mentor: Mentor) => {
    setEditingMentor(mentor.id)
    setMentorForm({
      name: mentor.name,
      surname: mentor.surname,
      fin: mentor.fin ?? "",
      email: mentor.email,
      dateOfBirth: mentor.dateOfBirth ?? "",
      country: mentor.country ?? "",
    })
  }

  const handleSaveMentor = () => {
    if (!editingMentor) {
      return
    }

    const nextMentors = mentors.map((mentor) =>
      mentor.id === editingMentor
        ? {
            ...mentor,
            name: mentorForm.name.trim(),
            surname: mentorForm.surname.trim(),
            fin: mentorForm.fin.trim().toUpperCase(),
            email: mentorForm.email.trim().toLowerCase(),
            dateOfBirth: mentorForm.dateOfBirth.trim(),
            country: mentorForm.country,
          }
        : mentor,
    )

    saveMentors(nextMentors)
    onMentorsChange(nextMentors)
    setEditingMentor(null)
  }

  const handleEditMember = (member: Member) => {
    setEditingMember(member.id)
    setMemberForm({ name: member.name, surname: member.surname, email: member.email, age: member.age, phone: member.phone, fin: member.fin })
    setMemberError("")
  }

  const handleSaveMember = () => {
    if (!editingMember) {
      return
    }

    if (!memberForm.name.trim() || !memberForm.surname.trim() || !memberForm.email.trim() || !memberForm.fin.trim()) {
      setMemberError("Please complete all participant fields.")
      return
    }

    const nextMembers = members.map((member) =>
      member.id === editingMember
        ? {
            ...member,
            name: memberForm.name.trim(),
            surname: memberForm.surname.trim(),
            age: memberForm.age,
            email: memberForm.email.trim().toLowerCase(),
            phone: memberForm.phone.trim(),
            fin: memberForm.fin.trim().toUpperCase(),
          }
        : member,
    )

    saveMembers(nextMembers)
    onMembersChange(nextMembers)
    setEditingMember(null)
    setMemberError("")
  }

  const handleDeleteMember = (memberId: string) => {
    if (!window.confirm("Delete this participant? This action cannot be undone.")) {
      return
    }

    const nextMembers = members.filter((member) => member.id !== memberId)
    saveMembers(nextMembers)
    onMembersChange(nextMembers)
    if (editingMember === memberId) {
      setEditingMember(null)
    }
  }

  const handleAddMember = () => {
    if (!memberForm.name.trim() || !memberForm.surname.trim() || !memberForm.email.trim() || !memberForm.fin.trim()) {
      setMemberError("Please complete all participant fields before adding.")
      return
    }

    const newMember: Member = {
      id: createId("member"),
      mentorId: "",
      name: memberForm.name.trim(),
      surname: memberForm.surname.trim(),
      age: memberForm.age,
      fin: memberForm.fin.trim().toUpperCase(),
      email: memberForm.email.trim().toLowerCase(),
      phone: memberForm.phone.trim(),
    }

    const nextMembers = [newMember, ...members]
    saveMembers(nextMembers)
    onMembersChange(nextMembers)
    setMemberForm({ name: "", surname: "", email: "", age: 0, phone: "", fin: "" })
    setIsAddingMember(false)
    setMemberError("")
  }

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/20">
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 px-8 py-10 text-white">
          <p className="uppercase tracking-[0.3em] text-xs text-slate-300">NextGen Admin</p>
          <h1 className="mt-4 text-3xl font-semibold">User Center</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-200">Manage mentors, participants and access for the event platform.</p>
        </div>

        <div className="p-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">Mentor registrations</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{mentors.length}</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">Registered members</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{members.length}</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">Countries represented</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {new Set(mentors.map((mentor) => mentor.country).filter(Boolean)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_0.7fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Mentor registrations</h2>
              <p className="mt-2 text-sm text-slate-600">Mentors who signed up through the registration form appear here.</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => exportMentorsPdf(mentors)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                PDF
              </button>
              <button
                type="button"
                onClick={() => exportMentorsExcel(mentors)}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Excel
              </button>
            </div>
          </div>

          {mentors.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
              <p className="text-lg font-semibold text-slate-900">No mentor registrations yet</p>
              <p className="mt-3 text-sm text-slate-500">New mentor sign-ups will appear here automatically.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  {editingMentor === mentor.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700">Name</label>
                          <input
                            type="text"
                            value={mentorForm.name}
                            onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700">Surname</label>
                          <input
                            type="text"
                            value={mentorForm.surname}
                            onChange={(e) => setMentorForm({ ...mentorForm, surname: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700">FIN</label>
                          <input
                            type="text"
                            value={mentorForm.fin}
                            onChange={(e) => setMentorForm({ ...mentorForm, fin: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700">Email</label>
                          <input
                            type="email"
                            value={mentorForm.email}
                            onChange={(e) => setMentorForm({ ...mentorForm, email: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700">Date of birth</label>
                          <input
                            type="text"
                            value={mentorForm.dateOfBirth}
                            onChange={(e) => setMentorForm({ ...mentorForm, dateOfBirth: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700">Country</label>
                          <input
                            type="text"
                            value={mentorForm.country}
                            onChange={(e) => setMentorForm({ ...mentorForm, country: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveMentor}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingMentor(null)}
                          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">
                          {mentor.name} {mentor.surname}
                        </p>
                        <p className="text-sm text-slate-500">{mentor.email}</p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                        <div className="grid gap-1 text-sm text-slate-600 sm:grid-cols-2 sm:gap-x-6">
                          <p>
                            <span className="font-medium text-slate-700">FIN:</span> {mentor.fin || "—"}
                          </p>
                          <p>
                            <span className="font-medium text-slate-700">Date of birth:</span>{" "}
                            {mentor.dateOfBirth || (mentor.age ? String(mentor.age) : "—")}
                          </p>
                          <p>
                            <span className="font-medium text-slate-700">Country:</span> {mentor.country || "—"}
                          </p>
                          <p>
                            <span className="font-medium text-slate-700">Registered:</span>{" "}
                            {mentor.registeredAt ? formatRegisteredAt(mentor.registeredAt) : "—"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleEditMentor(mentor)}
                          className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Participants</h3>
                <p className="mt-2 text-sm text-slate-600">Participant records for registered teams are listed here with quick action controls.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingMember((current) => !current)}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {isAddingMember ? "Close form" : "Add Participant"}
              </button>
            </div>

            {isAddingMember && (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">First Name</label>
                    <input
                      type="text"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Last Name</label>
                    <input
                      type="text"
                      value={memberForm.surname}
                      onChange={(e) => setMemberForm({ ...memberForm, surname: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm"
                      placeholder="Last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Age</label>
                    <input
                      type="number"
                      min={6}
                      value={memberForm.age}
                      onChange={(e) => setMemberForm({ ...memberForm, age: parseInt(e.target.value, 10) || 0 })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm"
                      placeholder="Age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Phone</label>
                    <input
                      type="tel"
                      value={memberForm.phone}
                      onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm"
                      placeholder="Contact number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">ID / Passport</label>
                    <input
                      type="text"
                      value={memberForm.fin}
                      onChange={(e) => setMemberForm({ ...memberForm, fin: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm"
                      placeholder="FIN or passport"
                    />
                  </div>
                </div>
                {memberError && (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {memberError}
                  </div>
                )}
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Save Participant
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 overflow-x-auto">
              <div className="min-w-full">
                <div className="hidden sm:grid grid-cols-[1.6fr_0.6fr_1.4fr_1.8fr_1fr_180px] gap-4 rounded-3xl bg-slate-50 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                  <span>Name</span>
                  <span>Age</span>
                  <span>Contact</span>
                  <span>Email</span>
                  <span>ID / Passport</span>
                  <span>Actions</span>
                </div>
                <div className="mt-3 space-y-3">
                  {members.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                      No participants have been registered yet.
                    </div>
                  ) : (
                    members.map((member) => (
                      <div
                        key={member.id}
                        className="grid gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:grid-cols-[1.6fr_0.6fr_1.4fr_1.8fr_1fr_180px] sm:items-center"
                      >
                        {editingMember === member.id ? (
                          <div className="col-span-full grid gap-4 md:grid-cols-[1.5fr_0.7fr_1.2fr]">
                            <input
                              type="text"
                              value={memberForm.name}
                              onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                              className="rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                              placeholder="First name"
                            />
                            <input
                              type="text"
                              value={memberForm.surname}
                              onChange={(e) => setMemberForm({ ...memberForm, surname: e.target.value })}
                              className="rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                              placeholder="Last name"
                            />
                            <input
                              type="number"
                              min={6}
                              value={memberForm.age}
                              onChange={(e) => setMemberForm({ ...memberForm, age: parseInt(e.target.value, 10) || 0 })}
                              className="rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                              placeholder="Age"
                            />
                            <input
                              type="text"
                              value={memberForm.phone}
                              onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                              className="rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                              placeholder="Phone"
                            />
                            <input
                              type="email"
                              value={memberForm.email}
                              onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                              className="rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                              placeholder="Email"
                            />
                            <input
                              type="text"
                              value={memberForm.fin}
                              onChange={(e) => setMemberForm({ ...memberForm, fin: e.target.value })}
                              className="rounded-2xl border border-slate-300 px-3 py-2 text-sm"
                              placeholder="ID / Passport"
                            />
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={handleSaveMember}
                                className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingMember(null)}
                                className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-1 text-slate-900">
                              <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:hidden">Name</span>
                              <p className="font-semibold">{member.name} {member.surname}</p>
                              <p className="text-sm text-slate-500 sm:hidden">{member.age} years</p>
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
                                <button
                                  type="button"
                                  onClick={() => handleEditMember(member)}
                                  className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMember(member.id)}
                                  className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                                >
                                  Remove
                                </button>
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

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Quick summary</h3>
            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Total registration</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{mentors.length + members.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Latest mentor sign-up</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {mentors[0]?.registeredAt
                    ? formatRegisteredAt(mentors[0].registeredAt)
                    : mentors[0]
                      ? `${mentors[0].name} ${mentors[0].surname}`
                      : "None yet"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage
