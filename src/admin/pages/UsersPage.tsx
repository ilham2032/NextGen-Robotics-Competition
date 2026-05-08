import { useState } from "react"
import type { Member, Mentor } from "../types"

type UsersPageProps = {
  mentors: Mentor[]
  members: Member[]
}

const UsersPage = ({ mentors, members }: UsersPageProps) => {
  const [editingMentor, setEditingMentor] = useState<string | null>(null)
  const [editingMember, setEditingMember] = useState<string | null>(null)
  const [mentorForm, setMentorForm] = useState({ name: "", surname: "", email: "", age: 0 })
  const [memberForm, setMemberForm] = useState({ name: "", surname: "", email: "", age: 0 })

  const handleEditMentor = (mentor: Mentor) => {
    setEditingMentor(mentor.id)
    setMentorForm({ name: mentor.name, surname: mentor.surname, email: mentor.email, age: mentor.age })
  }

  const handleSaveMentor = () => {
    // In a real app, this would update the mentor in storage/database
    console.log("Saving mentor:", mentorForm)
    setEditingMentor(null)
  }

  const handleEditMember = (member: Member) => {
    setEditingMember(member.id)
    setMemberForm({ name: member.name, surname: member.surname, email: member.email, age: member.age })
  }

  const handleSaveMember = () => {
    // In a real app, this would update the member in storage/database
    console.log("Saving member:", memberForm)
    setEditingMember(null)
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
              <p className="text-sm font-medium text-slate-500">Mentor accounts</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{mentors.length}</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">Registered members</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{members.length}</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">Active groups</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{Math.max(mentors.length, 1)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_0.7fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Mentor directory</h2>
              <p className="mt-2 text-sm text-slate-600">Review mentor accounts that have registered on the platform.</p>
            </div>
          </div>

          {mentors.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
              <p className="text-lg font-semibold text-slate-900">No mentor accounts yet</p>
              <p className="mt-3 text-sm text-slate-500">Mentor registrations will appear here once they sign up.</p>
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
                          <label className="block text-sm font-semibold text-slate-700">Email</label>
                          <input
                            type="email"
                            value={mentorForm.email}
                            onChange={(e) => setMentorForm({ ...mentorForm, email: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700">Age</label>
                          <input
                            type="number"
                            value={mentorForm.age}
                            onChange={(e) => setMentorForm({ ...mentorForm, age: parseInt(e.target.value) })}
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
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">{mentor.name} {mentor.surname}</p>
                        <p className="text-sm text-slate-500">{mentor.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="space-y-1 text-sm text-slate-600">
                          <p>Age: {mentor.age}</p>
                          <p>Mentor ID: {mentor.id}</p>
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
            <h3 className="text-xl font-semibold text-slate-900">Member overview</h3>
            <p className="mt-2 text-sm text-slate-600">Participant profiles and contact details in one place.</p>
            <div className="mt-6 grid gap-4">
              {members.slice(0, 4).map((member) => (
                <div key={member.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  {editingMember === member.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700">Name</label>
                          <input
                            type="text"
                            value={memberForm.name}
                            onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                            className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700">Surname</label>
                          <input
                            type="text"
                            value={memberForm.surname}
                            onChange={(e) => setMemberForm({ ...memberForm, surname: e.target.value })}
                            className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700">Email</label>
                          <input
                            type="email"
                            value={memberForm.email}
                            onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                            className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700">Age</label>
                          <input
                            type="number"
                            value={memberForm.age}
                            onChange={(e) => setMemberForm({ ...memberForm, age: parseInt(e.target.value) })}
                            className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveMember}
                          className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingMember(null)}
                          className="rounded border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{member.name} {member.surname}</p>
                        <p className="text-sm text-slate-500">Age {member.age} • {member.email}</p>
                      </div>
                      <button
                        onClick={() => handleEditMember(member)}
                        className="rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-200"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {members.length === 0 && <p className="text-sm text-slate-500">No member records available yet.</p>}
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
                <p className="text-sm text-slate-500">Engagement</p>
                <p className="mt-1 text-xl font-semibold text-slate-900">{members.length > 0 ? Math.round((members.length / Math.max(mentors.length, 1)) * 100) : 0}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage
