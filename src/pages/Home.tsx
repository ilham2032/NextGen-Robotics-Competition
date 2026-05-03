import { Link } from "react-router"
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { getSettings } from '../admin/storage'
import type { EventSettings } from '../admin/pages/adminDashboardTypes'
import Countdown from '../Components/Countdown'

const Home = () => {
  const { t } = useTranslation()
  const [settings, setSettings] = useState<EventSettings | null>(null)

  useEffect(() => {
    const loadedSettings = getSettings()
    setSettings(loadedSettings)
  }, [])

  const categories = [
    {
      title: t("Mini Sumo"),
      description: t("Autonomous robots face off in an intense arena challenge where strategy and mechanical precision decide the winner."),
      route: "/regulations/mini-sumo",
    },
    {
      title: t("Mini Sumo Kids"),
      description: t("A beginner-friendly category for younger innovators to learn engineering, coding, and teamwork through competition."),
      route: "/regulations/mini-sumo-kids",
    },
    {
      title: t("Innovation Showcase"),
      description: t("Teams present creative robotics projects that solve everyday problems with practical and impactful solutions."),
      route: "/participants",
    },
  ]

  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 pb-32 pt-30 md:px-10 lg:px-16 ">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.4),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,.25),transparent_45%),radial-gradient(circle_at_center,rgba(147,51,234,.1),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="opacity-0 animate-fade-in-up text-center lg:text-left" style={{ animationDelay: "0.1s" }}>
            <p className="animate-fade-in-left text-lg font-medium tracking-[0.35em] text-cyan-300 uppercase MT-7" style={{ animationDelay: "0.25s" }}>
              {t('1st Edition')}
            </p>
            <h1 className="animate-fade-in-left mt-3 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text font-display text-5xl leading-tight font-bold text-transparent md:text-7xl lg:text-6xl" style={{ animationDelay: "0.4s" }}>
              {t('NextGen Robotics Competition')}
            </h1>
            <p className="animate-fade-in-left mt-5 text-xl font-medium text-blue-100 md:text-2xl lg:text-xl" style={{ animationDelay: "0.55s" }}>
              {t('July 23-24 - Build, Battle, and Innovate')}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start text-white">
              <Link
                to="/participants"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-400/40"
              >
                <span className="relative z-10">{t('Register Team')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
              <Link
                to="/regulations"
                className="group rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:border-white/50"
              >
                {t('View Regulations')}
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

      {settings?.eventDate && (
        <section className="mx-auto mt-16 max-w-4xl px-6 md:px-10 lg:px-16">
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-black md:text-5xl font-display">{t('Event Starts In')}</h2>
            </div>
            <div className="scale-125 ">
              <Countdown targetDate={settings.eventDate} />
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto mt-20 grid max-w-6xl items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-display text-4xl font-bold text-slate-900 md:text-5xl lg:text-4xl">
            {t('What is NextGen Competition?')}
          </h2>
          <p className="mt-6 font-poppins text-lg leading-relaxed text-slate-600 lg:text-base">
            {t('The NextGen Robotics Competition brings together students and robotics enthusiasts to design, program, and test robots in a collaborative and competitive environment. It is where innovation, creativity, and teamwork turn ideas into real engineering solutions.')}
          </p>
          <div className="mt-8">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-300/50 hover:from-blue-700 hover:to-indigo-700"
            >
              <span className="text-white">{t('Learn More')}</span>
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 lg:p-10">
          <h3 className="text-2xl font-semibold text-slate-900 lg:text-xl">{t('Why Join?')}</h3>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
              <span>{t('Build practical robotics and coding skills.')}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
              <span>{t('Solve real-world challenges with your team.')}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
              <span>{t('Present your work to judges and industry mentors.')}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
              <span>{t('Connect with a community of young innovators.')}</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold text-slate-900 md:text-5xl lg:text-4xl">{t('Our Mission')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {t('Empowering the next generation of engineers and innovators through robotics competition')}
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="mission-card group opacity-0 animate-scale-in relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl" style={{ animationDelay: "0.25s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-poppins text-2xl font-bold lg:text-xl">{t('Innovating for Real-World Impact')}</h3>
              <p className="mt-4 font-poppins leading-relaxed text-blue-50">
                {t('We challenge teams to create smart and efficient robots that address everyday problems while sharpening critical thinking and engineering discipline.')}
              </p>
            </div>
          </div>
          <div className="mission-card group opacity-0 animate-scale-in relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-8 text-white shadow-xl" style={{ animationDelay: "0.45s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-poppins text-2xl font-bold lg:text-xl">{t('Inspiring Future Technologists')}</h3>
              <p className="mt-4 font-poppins leading-relaxed text-blue-50">
                {t('Through competition and collaboration, participants gain confidence, teamwork experience, and a stronger foundation to shape tomorrow\'s technology.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6 pb-12 md:px-10 lg:px-16">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-bold text-slate-900 md:text-5xl lg:text-4xl">{t('Categories')}</h2>
            <p className="mt-2 text-lg text-slate-600">{t('Explore different competition categories')}</p>
          </div>
          <Link to="/regulations" className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
            <span>{t('See all details')}</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <article
              key={category.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-slate-900 lg:text-xl">{category.title}</h3>
                <p className="mt-4 text-slate-600 leading-relaxed">{category.description}</p>
                <Link
                  to={category.route}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors group/link"
                >
                  <span>{t('Learn category')}</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 mb-8 max-w-6xl px-6 md:px-10 lg:px-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-10 py-16 text-center text-white shadow-2xl lg:px-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-4xl">{t('Ready to Compete?')}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100 lg:text-lg">
              {t('Gather your team, review the regulations, and take your place in the first edition of the NextGen Robotics Competition.')}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <Link
                to="/participants"
                className="group rounded-full border-2 border-white/60 px-10 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/80"
              >
                <span className="relative z-10">{t('Join Now')}</span>
                <div className="absolute inset-0 bg-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
              <Link
                to="/contact"
                className="group rounded-full border-2 border-white/60 px-10 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/80"
              >
                {t('Contact Organizer')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home