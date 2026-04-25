import { useEffect, useState } from "react"
import { Link } from "react-router"
import { getCategories } from "../admin/storage"
import type { Category } from "../admin/types"

const Regulations = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 text-white shadow-lg sm:p-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase">Competition Guide</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Regulations</h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
            Review each category requirements, official details, and downloadable regulation files.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const routeMap: Record<string, string> = {
              "Mini Sumo": "/regulations/mini-sumo",
              "Mini Sumo Kids": "/regulations/mini-sumo-kids",
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

            return (
              <article
                key={category.id}
                className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm"
              >
                <h2 className="text-2xl font-semibold text-blue-900">{category.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{category.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to={categoryPath}
                    className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                  >
                    View
                  </Link>

                  {category.pdfDataUrl ? (
                    <a
                      href={category.pdfDataUrl}
                      download={category.pdfName}
                      className="rounded-lg border border-blue-300 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      Download PDF
                    </a>
                  ) : (
                    <span className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500">No PDF</span>
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