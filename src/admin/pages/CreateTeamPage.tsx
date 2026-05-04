import { FormEvent, useState } from "react"
import { createId } from "../storage"
import type { TeamRecord } from "./adminDashboardTypes"

type CreateTeamPageProps = {
  onAddTeam: (team: TeamRecord) => void
}

const CreateTeamPage = ({ onAddTeam }: CreateTeamPageProps) => {
  const [name, setName] = useState("")
  const [school, setSchool] = useState("")
  const [robotType, setRobotType] = useState("")
  const [members, setMembers] = useState(3)
  const [category, setCategory] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !school.trim() || !robotType.trim() || !category.trim()) {
      return
    }

    const newTeam: TeamRecord = {
      id: createId("team"),
      name: name.trim(),
      school: school.trim(),
      members,
      description: `${robotType.trim()} robot team`,
      categoryName: category.trim(),
      memberNames: [],
      status: "checked-in",
      robotType: robotType.trim(),
      membersList: [],
      score: 0,
      wins: 0,
      penalties: 0,
      bonuses: 0,
    }

    onAddTeam(newTeam)
    setName("")
    setSchool("")
    setRobotType("")
    setMembers(3)
    setCategory("")
  }

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/20">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-cyan-700 px-8 py-10 text-white">
          <p className="uppercase tracking-[0.3em] text-xs text-slate-200">Create team</p>
          <h1 className="mt-4 text-3xl font-semibold">New team setup</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-200">Build a new team entry with category, roster size and robot details.</p>
        </div>

        <div className="p-8">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Team name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter team name"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">School / organization</span>
                <input
                  value={school}
                  onChange={(event) => setSchool(event.target.value)}
                  placeholder="School name"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500"
                  required
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Robot type</span>
                <input
                  value={robotType}
                  onChange={(event) => setRobotType(event.target.value)}
                  placeholder="Line Follower, Drone..."
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Category</span>
                <input
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="Mini Sumo, Drone..."
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Members</span>
                <input
                  type="number"
                  value={members}
                  onChange={(event) => setMembers(Number(event.target.value))}
                  min={1}
                  max={10}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500"
                  required
                />
              </label>
            </div>

            <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:bg-cyan-300">
              Save new team
            </button>
          </form>
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Need help?</h2>
        <p className="mt-3 text-sm text-slate-600">Teams created here will be added directly to the competition roster and can later be managed on the Teams page.</p>
      </div>
    </div>
  )
}

export default CreateTeamPage
