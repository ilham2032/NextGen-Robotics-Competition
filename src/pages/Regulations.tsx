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
    <section className="min-h-screen bg-white px-4 py-12 lg:px-6">
      <div className="mx-auto mt-16 max-w-5xl">
        <h1 className="text-center font-display text-4xl font-bold text-blue-700">Regulations</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Categories can be managed from the admin dashboard. Each category includes description and a downloadable PDF file.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const categoryPath = `/regulations/${category.name.toLowerCase().replace(/\s+/g, "-")}`

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
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
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