import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInMentor, signUpMentor } from "../auth"

const UserAuth = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState<"signup" | "login">("signup")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [age, setAge] = useState<number>(18)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "signup") {
        const result = await signUpMentor({ name, surname, age, email, password })
        if (!result.ok) {
          setError(result.message)
          return
        }
      } else {
        const result = await signInMentor(email, password)
        if (!result.ok) {
          setError(result.message)
          return
        }
      }

      navigate("/user/dashboard")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/40 ring-1 ring-white/10 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-800/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-300 shadow-inner shadow-slate-950/20">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              Mentor Portal Access
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">NextGen Robotics</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Professional mentor onboarding, built for competition readiness.</h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                Create accounts, register members and teams, and manage your competition progress from one beautiful dashboard designed for mentors.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-slate-950/70 border border-white/10 p-5">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">Secure workflow</p>
                <p className="mt-3 text-lg font-semibold text-white">Local browser storage</p>
                <p className="mt-2 text-sm text-slate-400">Your mentor profile is stored securely on this device for a fast sign-in experience.</p>
              </div>
              <div className="rounded-[24px] bg-slate-950/70 border border-white/10 p-5">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">Competition ready</p>
                <p className="mt-3 text-lg font-semibold text-white">Team registration simplified</p>
                <p className="mt-2 text-sm text-slate-400">Prepare and submit robots, members, and categories with clarity and confidence.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-8 shadow-2xl shadow-slate-950/10 border border-slate-200/80 text-slate-900">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">Mentor login</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{mode === "signup" ? "Create your mentor account" : "Sign in to your dashboard"}</h2>
            <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
              {mode === "signup"
                ? "Register as a mentor to manage teams, members, and competition registrations."
                : "Use your mentor email and password to access the portal."}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1 text-sm shadow-sm sm:text-base">
            <button
              type="button"
              onClick={() => {
                setError("")
                setMode("signup")
              }}
              className={`rounded-full px-4 py-3 transition ${mode === "signup" ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-200"}`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                setError("")
                setMode("login")
              }}
              className={`rounded-full px-4 py-3 transition ${mode === "login" ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-200"}`}
            >
              Log In
            </button>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            {mode === "signup" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="First name"
                  className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  required
                />
                <input
                  type="text"
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
                  placeholder="Last name"
                  className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  required
                />
                <input
                  type="number"
                  inputMode="numeric"
                  min={16}
                  max={90}
                  value={age}
                  onChange={(event) => setAge(Number(event.target.value))}
                  placeholder="Age"
                  className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  required
                />
              </div>
            )}

            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required
            />
            <input
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              required
            />

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Please wait..." : mode === "signup" ? "Create Mentor Account" : "Log In"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
            Mentor accounts are stored locally on this browser/device only. If you change devices, you will need to sign up again.
          </div>

          <div className="mt-5 text-center text-sm text-slate-600">
            {mode === "signup" ? (
              <>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setError("")
                    setMode("login")
                  }}
                  className="font-semibold text-slate-900 hover:text-slate-700"
                >
                  Log in instead
                </button>
              </>
            ) : (
              <>
                Need a mentor account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setError("")
                    setMode("signup")
                  }}
                  className="font-semibold text-slate-900 hover:text-slate-700"
                >
                  Sign up now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserAuth
