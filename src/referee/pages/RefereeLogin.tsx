import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInReferee } from "../auth"

const RefereeLogin = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await signInReferee(email.trim(), password)

      if (!result.ok) {
        setError(result.message)
        return
      }

      setSuccess("Signed in successfully!")
        setTimeout(() => navigate("/referee/dashboard"), 1000)
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 px-6 py-24">
      <div className="mx-auto max-w-md rounded-3xl border border-white/30 bg-white p-8 shadow-2xl">
        <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase">NextGen Robotics Olympiad</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-blue-900">Referee Login</h1>
        <p className="mt-3 text-sm text-slate-600">
          Sign in to access team information and manage competition results.
        </p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-blue-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-blue-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="referee@nextgen.az"
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

          {success && (
            <p className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-xs text-slate-500 text-center">
          Access restricted to authorized referees, judges, and organizers only.<br/>
          Contact administrators to request access.
        </p>
      </div>
    </section>
  )
}

export default RefereeLogin