import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { resetMentorPassword } from "../auth"

const inputClassName =
  "w-full rounded-[20px] border border-blue-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      const result = await resetMentorPassword(email, password)
      if (!result.ok) {
        setError(result.message)
        return
      }
      setSuccess(result.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-sky-900 px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl rounded-4xl bg-white/95 p-8 shadow-2xl shadow-slate-950/20 border border-white/80 text-slate-900 sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-[0.35em] text-blue-700 uppercase">NextGen Robotics</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Forgot Password</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
            Enter the email address for your mentor account and choose a new password to restore access.
          </p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">New Password</label>
            <input
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 8 characters"
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm Password</label>
            <input
              type="password"
              autoComplete="new-password"
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat password"
              className={inputClassName}
              required
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          {success && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : "Reset password"}
          </button>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => navigate('/user/auth')}
              className="rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Back to login
            </button>
            <button
              type="button"
              onClick={() => navigate('/user/auth')}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Return to mentor portal
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ForgotPassword
