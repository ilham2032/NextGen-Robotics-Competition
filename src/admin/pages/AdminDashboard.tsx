import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { logoutAdmin } from "../auth"
import { createId, getCategories, getTeams, saveCategories, saveTeams } from "../storage"
import type { Category, Team } from "../types"

const AdminDashboard = () => {
  const navigate = useNavigate()

  const [teams, setTeams] = useState<Team[]>(() => getTeams())
  const [categories, setCategories] = useState<Category[]>(() => getCategories())

  const [teamName, setTeamName] = useState("")
  const [teamSchool, setTeamSchool] = useState("")
  const [teamMembers, setTeamMembers] = useState<number>(3)

  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [categoryPdfName, setCategoryPdfName] = useState("")
  const [categoryPdfDataUrl, setCategoryPdfDataUrl] = useState("")
  const [categoryError, setCategoryError] = useState("")

  const stats = useMemo(
    () => [
      { label: "Total Teams", value: teams.length },
      { label: "Total Categories", value: categories.length },
    ],
    [teams.length, categories.length],
  )

  const handleLogout = () => {
    logoutAdmin()
    navigate("/admin/login")
  }

  const handleAddTeam = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newTeam: Team = {
      id: createId("team"),
      name: teamName.trim(),
      school: teamSchool.trim(),
      members: teamMembers,
    }

    const nextTeams = [newTeam, ...teams]
    setTeams(nextTeams)
    saveTeams(nextTeams)

    setTeamName("")
    setTeamSchool("")
    setTeamMembers(3)
  }

  const handleRemoveTeam = (teamId: string) => {
    const nextTeams = teams.filter((team) => team.id !== teamId)
    setTeams(nextTeams)
    saveTeams(nextTeams)
  }

  const onPickPdf = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setCategoryError("")

    if (!selectedFile) {
      setCategoryPdfName("")
      setCategoryPdfDataUrl("")
      return
    }

    if (selectedFile.type !== "application/pdf") {
      setCategoryError("Only PDF files are allowed.")
      setCategoryPdfName("")
      setCategoryPdfDataUrl("")
      event.target.value = ""
      return
    }

    setCategoryPdfName(selectedFile.name)

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCategoryPdfDataUrl(reader.result)
      }
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleAddCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!categoryPdfName || !categoryPdfDataUrl) {
      setCategoryError("Please upload a PDF regulation file for the category.")
      return
    }

    const newCategory: Category = {
      id: createId("category"),
      name: categoryName.trim(),
      description: categoryDescription.trim(),
      pdfName: categoryPdfName,
      pdfDataUrl: categoryPdfDataUrl,
    }

    const nextCategories = [newCategory, ...categories]
    setCategories(nextCategories)
    saveCategories(nextCategories)

    setCategoryName("")
    setCategoryDescription("")
    setCategoryPdfName("")
    setCategoryPdfDataUrl("")
    setCategoryError("")
  }

  const handleRemoveCategory = (categoryId: string) => {
    const nextCategories = categories.filter((category) => category.id !== categoryId)
    setCategories(nextCategories)
    saveCategories(nextCategories)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pb-16 pt-14 lg:px-10">
      <div className="mx-auto max-w-6xl mb-9">
        <header className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-700 to-cyan-600 p-7 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm tracking-widest text-cyan-100 uppercase">NextGen Robotics Olympiad</p>
              <h1 className="mt-1 font-display text-4xl font-bold">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/60 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Log Out
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {stats.map((item) => (
              <div key={item.label} className="rounded-xl border border-white/35 bg-white/10 px-4 py-3">
                <p className="text-xs tracking-wide text-blue-100 uppercase">{item.label}</p>
                <p className="mt-1 text-2xl font-bold text-white">{item.value}</p>
              </div>
            ))}
            <p className="text-sm text-white">Use the forms below to add teams and categories. Changes are saved automatically and reflected on the public participants and regulations pages.</p>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="font-display text-3xl font-semibold text-blue-900">Control Teams</h2>
            <p className="mt-1 text-sm text-slate-600">Add and manage participating teams.</p>

            <form className="mt-5 space-y-3" onSubmit={handleAddTeam}>
              <input
                type="text"
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
                placeholder="Team name"
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                required
              />
              <input
                type="text"
                value={teamSchool}
                onChange={(event) => setTeamSchool(event.target.value)}
                placeholder="School / Institution"
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                required
              />
              <input
                type="number"
                min={1}
                max={10}
                value={teamMembers}
                onChange={(event) => setTeamMembers(Number(event.target.value))}
                placeholder="Members"
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Add Team
              </button>
            </form>

            <div className="mt-5 space-y-3">
              {teams.length === 0 ? (
                <p className="text-sm text-slate-500">No teams yet.</p>
              ) : (
                teams.map((team) => (
                  <article key={team.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{team.name}</p>
                    <p className="text-sm text-slate-600">{team.school}</p>
                    <p className="text-xs text-slate-600">Category: {team.categoryName ?? "N/A"}</p>
                    <p className="text-xs text-slate-600">Mentor: {team.mentorName ?? "N/A"}</p>
                    <p className="text-xs text-blue-700">Members: {team.members}</p>
                    {team.memberNames && team.memberNames.length > 0 && (
                      <p className="mt-1 text-xs text-slate-600">Team members: {team.memberNames.join(", ")}</p>
                    )}
                    <button
                      onClick={() => handleRemoveTeam(team.id)}
                      className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </article>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="font-display text-3xl font-semibold text-blue-900">Add Categories</h2>
            <p className="mt-1 text-sm text-slate-600">Provide category name, description, and PDF file.</p>

            <form className="mt-5 space-y-3" onSubmit={handleAddCategory}>
              <input
                type="text"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                placeholder="Category name"
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                required
              />
              <textarea
                value={categoryDescription}
                onChange={(event) => setCategoryDescription(event.target.value)}
                placeholder="Category description"
                className="h-28 w-full rounded-xl border border-blue-200 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
                required
              />
              <input
                type="file"
                accept="application/pdf"
                onChange={onPickPdf}
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                required
              />
              {categoryPdfName && <p className="text-xs text-blue-700">Selected PDF: {categoryPdfName}</p>}
              {categoryError && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{categoryError}</p>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Add Category
              </button>
            </form>

            <div className="mt-5 space-y-3">
              {categories.length === 0 ? (
                <p className="text-sm text-slate-500">No categories yet.</p>
              ) : (
                categories.map((category) => (
                  <article key={category.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{category.name}</p>
                    <p className="mt-1 text-sm text-slate-600">{category.description}</p>
                    <p className="mt-1 text-xs text-blue-700">PDF: {category.pdfName || "No file"}</p>
                    <button
                      onClick={() => handleRemoveCategory(category.id)}
                      className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
