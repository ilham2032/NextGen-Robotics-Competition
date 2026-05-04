import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategories } from "../admin/storage"
import type { Category } from "../admin/types"
import { useTranslation } from 'react-i18next'

const Regulations = () => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  const categoryStyles: Record<string, { card: string; title: string; description: string; button: string; buttonAlt: string }> = {
    "Mini Sumo": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-blue-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
    "Mini Sumo Kids": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-sky-700 via-sky-600 to-sky-800",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-sky-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
    "Line Follower": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-cyan-700 via-cyan-600 to-sky-700",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-cyan-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
    "Lego Line": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-amber-700 via-amber-600 to-orange-700",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-amber-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
    "Drone": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-sky-800 via-sky-700 to-indigo-800",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-sky-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
    "1kg Lego Sumo": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-violet-700 via-indigo-600 to-violet-800",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-violet-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
    "3kg Lego Sumo": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-blue-800 via-indigo-700 to-purple-800",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-blue-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
    "Combat Robot": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-red-800 via-red-700 to-rose-800",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-rose-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
    "Mega Sumo": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-indigo-900 via-blue-800 to-violet-900",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-blue-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
    "Start Up Junior": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-blue-800 via-blue-700 to-slate-900",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-blue-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
    "Start Up Senior": {
      card: "rounded-2xl p-5 shadow-sm bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-900",
      title: "text-2xl font-semibold text-white",
      description: "mt-2 text-sm text-slate-100",
      button: "rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
      buttonAlt: "rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20",
    },
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase">{t('Competition Guide')}</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{t('Regulations')}</h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
            {t('Review each category requirements, official details, and downloadable regulation files.')}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const routeMap: Record<string, string> = {
              "Mini Sumo": "/regulations/mini-sumo",
              "Mini Sumo Kids": "/regulations/mini-sumo-kids",
              "Mega Sumo": "/regulations/mega-sumo",
              "Lego Line": "/regulations/lego-line",
              "Line Follower": "/regulations/line-follower",
              "Drone": "/regulations/drone-race",
              "1kg Lego Sumo": "/regulations/1kg-lego-sumo",
              "3kg Lego Sumo": "/regulations/3kg-lego-sumo",
              "Combat Robot": "/regulations/combat-robot",
              "Start Up Junior": "/regulations/start-up-junior",
              "Start Up Senior": "/regulations/start-up-senior",
            }

            const categoryPath =
              routeMap[category.name] ?? `/regulations/${category.name.toLowerCase().replace(/\s+/g, "-")}`
            const style = categoryStyles[category.name] ?? categoryStyles["Mini Sumo"]

            return (
              <article key={category.id} className={style.card}>
                <h2 className={style.title}>{category.name}</h2>
                <p className={style.description}>{category.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to={categoryPath} className={style.button}>
                    View
                  </Link>

                  {category.pdfDataUrl ? (
                    <a href={category.pdfDataUrl} download={category.pdfName} className={style.buttonAlt}>
                      Download PDF
                    </a>
                  ) : (
                    <span className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white/80">No PDF</span>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Regulations