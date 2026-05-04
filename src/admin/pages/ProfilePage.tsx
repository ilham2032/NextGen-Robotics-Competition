import { useState } from "react"

type ProfilePageProps = {
  profile: {
    name: string
    email: string
    role: string
    organization: string
    phone: string
  }
  onUpdateProfile: (profile: { name: string; email: string; role: string; organization: string; phone: string }) => void
}

const ProfilePage = ({ profile, onUpdateProfile }: ProfilePageProps) => {
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [role, setRole] = useState(profile.role)
  const [organization, setOrganization] = useState(profile.organization)
  const [phone, setPhone] = useState(profile.phone)

  const handleSave = () => {
    onUpdateProfile({ name, email, role, organization, phone })
  }

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/20">
        <div className="bg-gradient-to-r from-cyan-700 via-blue-900 to-slate-900 px-8 py-10 text-white">
          <p className="uppercase tracking-[0.3em] text-xs text-cyan-200">Profile</p>
          <h1 className="mt-4 text-3xl font-semibold">Admin account</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-200">Manage your account information and preferences for the NextGen admin console.</p>
        </div>

        <div className="p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_0.7fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold text-slate-900">Profile details</h2>
                <div className="mt-5 space-y-4">
                  <label className="block text-sm font-medium text-slate-700">Full name</label>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none"
                  />
                  <label className="block text-sm font-medium text-slate-700">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none"
                  />
                  <label className="block text-sm font-medium text-slate-700">Phone number</label>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <label className="block text-sm font-medium text-slate-700">Role</label>
                <select value={role} onChange={(event) => setRole(event.target.value)} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none">
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Coordinator</option>
                </select>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <label className="block text-sm font-medium text-slate-700">Organization</label>
                <input
                  value={organization}
                  onChange={(event) => setOrganization(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none"
                />
              </div>

              <button onClick={handleSave} className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:bg-cyan-300">
                Save profile
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500 text-3xl font-bold text-white">N</div>
                <div>
                  <p className="text-base font-semibold text-slate-900">NextGen Admin</p>
                  <p className="mt-1 text-sm text-slate-500">Your profile badge for the competition control room.</p>
                </div>
              </div>
              <div className="mt-8 space-y-4 text-sm text-slate-600">
                <div>
                  <p className="font-semibold text-slate-900">Access</p>
                  <p>Full access to user management, scheduling, teams, and event settings.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Style</p>
                  <p>Modern, event-grade admin console crafted for NextGen Robotics.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Security</p>
                  <p>Update your profile info before important event days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
