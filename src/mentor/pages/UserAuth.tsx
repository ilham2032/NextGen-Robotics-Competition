import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { COUNTRIES } from "../../data/countries"
import { signInMentor, signUpMentor } from "../auth"
import { formatDateOfBirthInput, isValidDateOfBirth } from "../validation"

const inputClassName =
  "w-full rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"

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
    <section className="min-h-screen bg-slate-950 text-white px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl shadow-slate-950/10 border border-slate-200/80 text-slate-900 sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">Mentor portal</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {mode === "signup" ? "Sign up" : "Log in"}
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            {mode === "signup"
              ? "Create your mentor account, then continue to your dashboard."
              : "Sign in with the email and password you used when registering."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1 text-sm">
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`rounded-full px-4 py-2.5 font-medium transition ${mode === "signup" ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-200"}`}
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`rounded-full px-4 py-2.5 font-medium transition ${mode === "login" ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-200"}`}
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

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "signup" ? "Register and continue" : "Log in"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default UserAuth
