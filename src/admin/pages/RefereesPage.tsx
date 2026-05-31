import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createId, getCategories, getReferees, saveReferees } from '../storage'
import type { Referee } from '../types'
import { createPasswordHash } from '../../mentor/auth'

type RefereesPageProps = {
  onNotify: (message: string) => void
}

const emptyForm = {
  name: '',
  surname: '',
  email: '',
  password: '',
  categoryId: '',
  role: 'referee' as Referee['role'],
}

const RefereesPage = ({ onNotify }: RefereesPageProps) => {
  const categories = getCategories()
  const [referees, setReferees] = useState<Referee[]>(() => getReferees())
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!form.name.trim() || !form.surname.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    if (!form.categoryId) {
      setError('Please assign a competition category.')
      return
    }

    const normalizedEmail = form.email.trim().toLowerCase()
    if (referees.some((referee) => referee.email === normalizedEmail)) {
      setError('A referee with this email already exists.')
      return
    }

    setLoading(true)
    try {
      const { passwordHash, passwordSalt } = await createPasswordHash(form.password)
      const newReferee: Referee = {
        id: createId('referee'),
        name: form.name.trim(),
        surname: form.surname.trim(),
        email: normalizedEmail,
        passwordHash,
        passwordSalt,
        role: form.role,
        categoryId: form.categoryId,
      }

      const nextReferees = [newReferee, ...referees]
      saveReferees(nextReferees)
      setReferees(nextReferees)
      setForm(emptyForm)
      onNotify('Referee account created')
    } catch {
      setError('Failed to create referee account.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (refereeId: string) => {
    if (!window.confirm('Delete this referee account?')) return
    const nextReferees = referees.filter((referee) => referee.id !== refereeId)
    saveReferees(nextReferees)
    setReferees(nextReferees)
    onNotify('Referee removed')
  }

  const getCategoryName = (categoryId?: string) =>
    categoryId ? categories.find((category) => category.id === categoryId)?.name ?? 'Unassigned' : 'Unassigned'

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm">
        <p className="text-xs font-semibold tracking-[0.25em] text-blue-600 uppercase">Teams Zone</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Referee Accounts</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Create login credentials for category referees. Each referee is assigned to one category and can record
          match results at{' '}
          <Link to="/teamszone/referee" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
            /teamszone/referee
          </Link>
          .
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Create Referee</h2>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreate}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
            <input
              value={form.surname}
              onChange={(event) => setForm((current) => ({ ...current, surname: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email (Login)</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              placeholder="referee@nextgen.az"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              placeholder="Set login password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <select
              value={form.categoryId}
              onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
              required
            >
              <option value="">Select category...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
            <select
              value={form.role}
              onChange={(event) => setForm((current) => ({ ...current, role: event.target.value as Referee['role'] }))}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
            >
              <option value="referee">Referee</option>
              <option value="judge">Judge</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          {error && (
            <p className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-700 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Referee Account'}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Existing Referees ({referees.length})</h2>

        {referees.length === 0 ? (
          <p className="text-sm text-slate-500">No referee accounts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Role</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {referees.map((referee) => (
                  <tr key={referee.id} className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {referee.name} {referee.surname}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{referee.email}</td>
                    <td className="py-3 px-4 text-slate-600">{getCategoryName(referee.categoryId)}</td>
                    <td className="py-3 px-4 capitalize text-slate-600">{referee.role}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDelete(referee.id)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default RefereesPage
