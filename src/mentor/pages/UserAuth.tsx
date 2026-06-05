import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { COUNTRIES } from "../../data/countries"
import { signInMentor, signUpMentor } from "../auth"
import { formatDateOfBirthInput, isValidDateOfBirth } from "../validation"

const inputClassName =
  "w-full rounded-[20px] border border-blue-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"

const UserAuth = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState<"signup" | "login">("signup")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [fin, setFin] = useState("")
  const [email, setEmail] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [country, setCountry] = useState("")
  const [password, setPassword] = useState("")

  const goToDashboard = () => {
    navigate("/user/dashboard", { replace: true })
  }

  const switchMode = (next: "signup" | "login") => {
    setError("")
    setPassword("")
    setMode(next)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "login") {
        const result = await signInMentor(email, password)
        if (!result.ok) {
          setError(result.message)
          return
        }
        goToDashboard()
        return
      }

      if (!isValidDateOfBirth(dateOfBirth)) {
        setError("Please enter a valid date of birth in dd/mm/yyyy format.")
        return
      }

      if (!country) {
        setError("Please select your country.")
        return
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters.")
        return
      }

      const result = await signUpMentor({ name, surname, fin, email, dateOfBirth, country, password })
      if (!result.ok) {
        setError(result.message)
        return
      }

      goToDashboard()
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-sky-900 px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl rounded-4xl bg-white/95 p-8 shadow-2xl shadow-slate-950/20 border border-white/80 text-slate-900 sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-[0.35em] text-blue-700 uppercase">NextGen Robotics</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {mode === "signup" ? "Mentor Sign Up" : "Mentor Log In"}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
            {mode === "signup"
              ? "Join the NextGen Robotics Competition mentor portal to register your team and access the competition dashboard."
              : "Enter your mentor credentials to continue managing your team and submitting registration details."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-blue-100/50 p-1 text-sm shadow-inner shadow-sky-900/5">
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`rounded-full px-4 py-2.5 font-medium transition ${mode === "signup" ? "bg-blue-950 text-white shadow-lg shadow-blue-500/20" : "text-slate-700 hover:bg-white hover:text-slate-900"}`}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`rounded-full px-4 py-2.5 font-medium transition ${mode === "login" ? "bg-blue-950 text-white shadow-lg shadow-blue-500/20" : "text-slate-700 hover:bg-white hover:text-slate-900"}`}
          >
            Log in
          </button>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          {mode === "signup" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name"
                    className={inputClassName}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Surname</label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(event) => setSurname(event.target.value)}
                    placeholder="Surname"
                    className={inputClassName}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">FIN</label>
                <input
                  type="text"
                  value={fin}
                  onChange={(event) => setFin(event.target.value.toUpperCase())}
                  placeholder="FIN"
                  className={inputClassName}
                  required
                />
              </div>
            </>
          )}

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

          {mode === "signup" && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Date of birth</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={dateOfBirth}
                  onChange={(event) => setDateOfBirth(formatDateOfBirthInput(event.target.value))}
                  placeholder="dd/mm/yyyy"
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Country</label>
                <select
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  className={inputClassName}
                  required
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
              className={inputClassName}
              required
            />
          </div>

          {mode === "login" && (
            <div className="text-right text-sm">
              <button
                type="button"
                onClick={() => navigate('/user/forgot-password')}
                className="font-semibold text-blue-700 transition hover:text-blue-900"
              >
                Forgot password?
              </button>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "signup" ? "Register and continue" : "Log in"}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-4 w-full rounded-2xl border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Return to main page
          </button>
        </form>
      </div>
    </section>
  )
}

export default UserAuth
