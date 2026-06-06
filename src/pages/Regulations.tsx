import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategories } from "../admin/storage"
import type { Category } from "../admin/types"
import { useTranslation } from 'react-i18next'
import { resolvePublicUrl } from "../utils/publicAsset"

const Regulations = () => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  const primaryButton = "rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-700/30 transition hover:bg-blue-600"
  const altButton = "rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"

  const categoryOrder = [
    "Mega Sumo",
    "Mini Sumo",
    "Mini Sumo Kids",
    "1kg Lego Sumo",
    "3kg Lego Sumo",
    "Line Follower",
    "Lego Line",
    "Start Up Senior",
  ]

  const fallbackPdfUrls: Record<string, string> = {
    "Mega Sumo": "regs/mega-sumo.pdf",
    "Mini Sumo": "regs/mini-sumo.pdf",
    "Mini Sumo Kids": "regs/mini-sumo-kids.pdf",
    "1kg Lego Sumo": "regs/1kg-lego-sumo.pdf",
    "3kg Lego Sumo": "regs/3kg-lego-sumo.pdf",
    "Line Follower": "regs/line-follower.pdf",
    "Lego Line": "regs/lego-line.pdf",
  }

  const fallbackPdfNames: Record<string, string> = {
    "Mega Sumo": "Mega Sumo Regulations",
    "Mini Sumo": "Mini Sumo Regulations",
    "Mini Sumo Kids": "Mini Sumo Kids Regulations",
    "1kg Lego Sumo": "1kg Lego Sumo Regulations",
    "3kg Lego Sumo": "3kg Lego Sumo Regulations",
    "Line Follower": "Line Follower Regulations",
    "Lego Line": "Lego Line Regulations",
  }

  const categoryStyles: Record<string, { card: string; title: string; description: string; button: string; buttonAlt: string }> = {
      "Mega Sumo": {
      card: "rounded-2xl p-5 shadow-sm border border-slate-200 bg-white",
      title: "text-2xl font-semibold text-slate-900",
      description: "mt-2 text-sm text-slate-600",
      button: primaryButton,
      buttonAlt: altButton,
    },
    "Mini Sumo": {
      card: "rounded-2xl p-5 shadow-sm border border-slate-200 bg-white",
      title: "text-2xl font-semibold text-slate-900",
      description: "mt-2 text-sm text-slate-600",
      button: primaryButton,
      buttonAlt: altButton,
    },
    "Mini Sumo Kids": {
      card: "rounded-2xl p-5 shadow-sm border border-slate-200 bg-white",
      title: "text-2xl font-semibold text-slate-900",
      description: "mt-2 text-sm text-slate-600",
      button: primaryButton,
      buttonAlt: altButton,
    },
    "Line Follower": {
      card: "rounded-2xl p-5 shadow-sm border border-slate-200 bg-white",
      title: "text-2xl font-semibold text-slate-900",
      description: "mt-2 text-sm text-slate-600",
      button: primaryButton,
      buttonAlt: altButton,
    },
    "Lego Line": {
      card: "rounded-2xl p-5 shadow-sm border border-slate-200 bg-white",
      title: "text-2xl font-semibold text-slate-900",
      description: "mt-2 text-sm text-slate-600",
      button: primaryButton,
      buttonAlt: altButton,
    },
    "1kg Lego Sumo": {
      card: "rounded-2xl p-5 shadow-sm border border-slate-200 bg-white",
      title: "text-2xl font-semibold text-slate-900",
      description: "mt-2 text-sm text-slate-600",
      button: primaryButton,
      buttonAlt: altButton,
    },
    "3kg Lego Sumo": {
      card: "rounded-2xl p-5 shadow-sm border border-slate-200 bg-white",
      title: "text-2xl font-semibold text-slate-900",
      description: "mt-2 text-sm text-slate-600",
      button: primaryButton,
      buttonAlt: altButton,
    },
    "Start Up Senior": {
      card: "rounded-2xl p-5 shadow-sm border border-slate-200 bg-white",
      title: "text-2xl font-semibold text-slate-900",
      description: "mt-2 text-sm text-slate-600",
      button: primaryButton,
      buttonAlt: altButton,
    },
  }

  const sortedCategories = [...categories].sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a.name)
    const bIndex = categoryOrder.indexOf(b.name)
    if (aIndex === -1 && bIndex === -1) return 0
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase">{t('Competition Guide')}</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{t('Regulations')}</h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
            {t('Review each category requirements, official details, and downloadable regulation files.')}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedCategories.map((category) => {
            const routeMap: Record<string, string> = {
              "Mini Sumo": "/regulations/mini-sumo",
              "Mini Sumo Kids": "/regulations/mini-sumo-kids",
              "Mega Sumo": "/regulations/mega-sumo",
              "Lego Line": "/regulations/lego-line",
              "Line Follower": "/regulations/line-follower",
              "1kg Lego Sumo": "/regulations/lego-sumo",
              "3kg Lego Sumo": "/regulations/lego-sumo-3kg",
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
                    <Link to={categoryPath} className={`${style.button} text-white`} style={{ color: '#fff' }}>
                    View
                  </Link>

                  {(fallbackPdfUrls[category.name] || category.pdfDataUrl) ? (
                    <a
                      href={resolvePublicUrl(fallbackPdfUrls[category.name] || category.pdfDataUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={fallbackPdfNames[category.name] || category.pdfName}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:shadow-md"
                    >
                      Download PDF
                    </a>
                  ) : (
                    <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900">
                      No PDF
                    </span>
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