import { useState } from "react"
import { useNavigate } from "react-router"
import { loginAdmin } from "../auth"

const AdminLogin = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isLoggedIn = loginAdmin(username.trim(), password)
    if (!isLoggedIn) {
      setError("Invalid credentials. Please try again.")
      return
    }

    setError("")
    navigate("/admin")
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 px-6 py-24">
      <div className="mx-auto max-w-md rounded-3xl border border-white/30 bg-white p-8 shadow-2xl">
        <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase">NextGen Robotics Olympiad</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-blue-900">Admin Login</h1>
        <p className="mt-3 text-sm text-slate-600">Sign in to manage teams and competition categories.</p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-blue-900">Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-blue-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-blue-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-blue-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500">Demo credential: admin / nextgen2026</p>
      </div>
    </section>
  )
}

export default AdminLogin
