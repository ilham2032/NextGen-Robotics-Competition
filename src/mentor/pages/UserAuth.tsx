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
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 px-6 py-24">
      <div className="mx-auto max-w-md rounded-3xl border border-white/30 bg-white p-8 shadow-2xl">
        <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase">NextGen Robotics Olympiad</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-blue-900">
          {mode === "signup" ? "Sign In as Mentor" : "Log In"}
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Mentor registration is required before you can add teams to the competition.
        </p>

        <form className="mt-7 space-y-4" onSubmit={onSubmit}>
          {mode === "signup" && (
            <>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
              <input
                type="text"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
                placeholder="Surname"
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
              <input
                type="number"
                min={16}
                max={90}
                value={age}
                onChange={(event) => setAge(Number(event.target.value))}
                placeholder="Age"
                className="w-full rounded-xl border border-blue-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
            </>
          )}

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-blue-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
          <input
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-blue-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? "Please wait..." : mode === "signup" ? "Create Mentor Account" : "Log In"}
          </button>
        </form>

        <button
          onClick={() => {
            setError("")
            setMode((current) => (current === "signup" ? "login" : "signup"))
          }}
          className="mt-5 text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          {mode === "signup" ? "Already have an account? Log in" : "Need an account? Sign in"}
        </button>
      </div>
    </section>
  )
}

export default UserAuth
