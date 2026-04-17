import { Link } from "react-router"

const Home = () => {
  const categories = [
    {
      title: "Mini Sumo",
      description:
        "Autonomous robots face off in an intense arena challenge where strategy and mechanical precision decide the winner.",
      route: "/regulations/mini-sumo",
    },
    {
      title: "Mini Sumo Kids",
      description:
        "A beginner-friendly category for younger innovators to learn engineering, coding, and teamwork through competition.",
      route: "/regulations/mini-sumo-kids",
    },
    {
      title: "Innovation Showcase",
      description:
        "Teams present creative robotics projects that solve everyday problems with practical and impactful solutions.",
      route: "/participants",
    },
  ]

  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 pb-24 pt-28 md:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.35),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,.2),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="opacity-0 animate-fade-in-up text-center lg:text-left" style={{ animationDelay: "0.1s" }}>
            <p className="animate-fade-in-left text-lg font-medium tracking-[0.35em] text-cyan-300 uppercase" style={{ animationDelay: "0.25s" }}>
              1st Edition
            </p>
            <h1 className="animate-fade-in-left mt-3 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text font-display text-5xl leading-tight font-bold text-transparent md:text-7xl" style={{ animationDelay: "0.4s" }}>
              NextGen
              <br />
              Robotics Competition
            </h1>
            <p className="animate-fade-in-left mt-5 text-xl font-medium text-blue-100 md:text-2xl" style={{ animationDelay: "0.55s" }}>
              July 23-24 - Build, Battle, and Innovate
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                to="/participants"
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Register Team
              </Link>
              <Link
                to="/regulations"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                View Regulations
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-cyan-400/35 via-blue-500/30 to-purple-500/35 blur-2xl" />
            <img
              className="relative h-[280px] w-full rounded-[1.5rem] border border-white/20 object-cover shadow-2xl md:h-[360px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Sum%C3%B4Rob%C3%B4-ThundeRatz.jpg/500px-Sum%C3%B4Rob%C3%B4-ThundeRatz.jpg"
              alt="Competition robot preparing for a mini sumo match"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-8 px-6 md:px-10 lg:grid-cols-3 lg:px-16">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <p className="text-4xl font-bold text-blue-700">300+</p>
          <p className="mt-2 text-sm tracking-wide text-slate-600 uppercase">Expected Participants</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <p className="text-4xl font-bold text-blue-700">20+</p>
          <p className="mt-2 text-sm tracking-wide text-slate-600 uppercase">Schools and Teams</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <p className="text-4xl font-bold text-blue-700">2 Days</p>
          <p className="mt-2 text-sm tracking-wide text-slate-600 uppercase">Competition and Exhibition</p>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl items-center gap-10 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">What is NextGen Competition?</h2>
          <p className="mt-5 font-poppins text-lg leading-relaxed text-slate-600">
            The NextGen Robotics Competition brings together students and robotics enthusiasts to design, program, and test
            robots in a collaborative and competitive environment. It is where innovation, creativity, and teamwork turn ideas
            into real engineering solutions.
          </p>
          <div className="mt-7">
            <Link
              to="/about"
              className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-300/40 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
          <h3 className="text-2xl font-semibold text-slate-900">Why Join?</h3>
          <ul className="mt-5 space-y-3 text-slate-600">
            <li>- Build practical robotics and coding skills.</li>
            <li>- Solve real-world challenges with your team.</li>
            <li>- Present your work to judges and industry mentors.</li>
            <li>- Connect with a community of young innovators.</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6 md:px-10 lg:px-16">
        <h2 className="text-center font-display text-4xl font-bold text-slate-900 md:text-5xl">Our Mission</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="mission-card opacity-0 animate-scale-in" style={{ animationDelay: "0.25s" }}>
            <h3 className="font-poppins text-2xl font-bold text-white">Innovating for Real-World Impact</h3>
            <p className="mt-4 font-poppins leading-relaxed text-blue-50">
              We challenge teams to create smart and efficient robots that address everyday problems while sharpening critical
              thinking and engineering discipline.
            </p>
          </div>
          <div className="mission-card opacity-0 animate-scale-in" style={{ animationDelay: "0.45s" }}>
            <h3 className="font-poppins text-2xl font-bold text-white">Inspiring Future Technologists</h3>
            <p className="mt-4 font-poppins leading-relaxed text-blue-50">
              Through competition and collaboration, participants gain confidence, teamwork experience, and a stronger foundation
              to shape tomorrow's technology.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6 pb-8 md:px-10 lg:px-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">Categories</h2>
          <Link to="/regulations" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
            See all details
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-slate-900">{category.title}</h3>
              <p className="mt-3 text-slate-600">{category.description}</p>
              <Link
                to={category.route}
                className="mt-5 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                Learn category
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 mb-4 max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-8 py-10 text-center text-white shadow-xl">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Ready to Compete?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Gather your team, review the regulations, and take your place in the first edition of the NextGen Robotics
            Competition.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              to="/participants"
              className="rounded-full bg-white px-6 py-3 font-semibold text-blue-800 transition hover:bg-blue-50"
            >
              Join Now
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Organizer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home