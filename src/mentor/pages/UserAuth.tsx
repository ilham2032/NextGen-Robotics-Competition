import { useState } from "react"
import { useNavigate } from "react-router"
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
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 px-4 py-12 sm:px-6 sm:py-20 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-[32px] border border-white/20 bg-white/95 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-sm sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase">NextGen Robotics Olympiad</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {mode === "signup" ? "Sign Up as Mentor" : "Mentor Login"}
          </h1>
          <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
            Mentor registration is required before you can add teams to the competition. Use the form below to continue.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1 text-sm shadow-sm sm:text-base">
          <button
            type="button"
            onClick={() => {
              setError("")
              setMode("signup")
            }}
            className={`rounded-full px-4 py-3 transition ${mode === "signup" ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:bg-slate-200"}`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => {
              setError("")
              setMode("login")
            }}
            className={`rounded-full px-4 py-3 transition ${mode === "login" ? "bg-blue-600 text-white shadow" : "text-slate-600 hover:bg-slate-200"}`}
          >
            Log In
          </button>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          {mode === "signup" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="First name"
                className="w-full rounded-[20px] border border-blue-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
              <input
                type="text"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
                placeholder="Last name"
                className="w-full rounded-[20px] border border-blue-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                className="w-full rounded-[20px] border border-blue-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
            className="w-full rounded-[20px] border border-blue-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
          <input
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-[20px] border border-blue-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />

          {error && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "signup" ? "Create Mentor Account" : "Log In"}
          </button>
        </form>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Mentor accounts are stored locally in this browser/device only. If you switch devices, you will need to sign up again here.
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
                className="font-semibold text-blue-700 hover:text-blue-900"
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
                className="font-semibold text-blue-700 hover:text-blue-900"
              >
                Sign up now
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserAuth
