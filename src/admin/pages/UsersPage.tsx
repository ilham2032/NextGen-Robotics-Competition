import type { Member, Mentor } from "../types"

type UsersPageProps = {
  mentors: Mentor[]
  members: Member[]
}

const UsersPage = ({ mentors, members }: UsersPageProps) => {
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
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{mentor.name} {mentor.surname}</p>
                      <p className="text-sm text-slate-500">{mentor.email}</p>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p>Age: {mentor.age}</p>
                      <p>Mentor ID: {mentor.id}</p>
                    </div>
                  </div>
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
                  <p className="font-semibold text-slate-900">{member.name} {member.surname}</p>
                  <p className="text-sm text-slate-500">Age {member.age} • {member.email}</p>
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
