import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { getCategories, saveCategories } from "../../admin/storage"
import type { Category } from "../../admin/types"
import { createId } from "../../admin/storage"

interface CategoryPageProps {
  onNotify?: (message: string) => void
}

const CategoryPage = ({ onNotify }: CategoryPageProps) => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<Category[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", description: "", pdfName: "", pdfDataUrl: "" })

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  const handleAdd = () => {
    if (!formData.name || !formData.description) {
      onNotify?.("Please fill in name and description")
      return
    }

    const newCategory: Category = {
      id: createId("category"),
      name: formData.name,
      description: formData.description,
      pdfName: formData.pdfName || "",
      pdfDataUrl: formData.pdfDataUrl || "",
    }

    const updated = [...categories, newCategory]
    setCategories(updated)
    saveCategories(updated)
    onNotify?.(`Added category: ${formData.name}`)
    setFormData({ name: "", description: "", pdfName: "", pdfDataUrl: "" })
    setIsAdding(false)
  }

  const handleEdit = (categoryId: string) => {
    setIsAdding(false)
    setEditingId(categoryId)

    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) {
      onNotify?.("Category not found")
      return
    }

    setFormData({
      name: category.name,
      description: category.description,
      pdfName: category.pdfName || "",
      pdfDataUrl: category.pdfDataUrl || "",
    })
  }

  const handleSaveEdit = () => {
    if (!formData.name || !formData.description) {
      onNotify?.("Please fill in name and description")
      return
    }

    const updated = categories.map((cat) =>
      cat.id === editingId
        ? {
            ...cat,
            name: formData.name,
            description: formData.description,
            pdfName: formData.pdfName || "",
            pdfDataUrl: formData.pdfDataUrl || "",
          }
        : cat,
    )
    setCategories(updated)
    saveCategories(updated)
    onNotify?.("Category updated")
    setEditingId(null)
    setFormData({ name: "", description: "", pdfName: "", pdfDataUrl: "" })
  }

  const handleDelete = (id: string) => {
    const updated = categories.filter((cat) => cat.id !== id)
    setCategories(updated)
    saveCategories(updated)
    onNotify?.("Category deleted")
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({ name: "", description: "", pdfName: "", pdfDataUrl: "" })
  }

  useEffect(() => {
    if (editingId) {
      const formSection = document.getElementById("category-form")
      formSection?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [editingId])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setFormData({ ...formData, pdfName: file.name, pdfDataUrl: dataUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm sm:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t("Category Management")}</h2>
            <p className="mt-1 text-sm text-slate-600">{t("Create, edit, and manage competition categories")}</p>
          </div>

          {!isAdding && !editingId && (
            <button
              onClick={() => setIsAdding(true)}
              className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-700/30 transition hover:bg-blue-600"
            >
              {t("+ Add Category")}
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <div id="category-form" className="mt-6 space-y-4 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6">
            <h3 className="font-semibold text-slate-900">
              {editingId ? t("Edit Event Details") : t("Create Category")}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700">{t("Category")}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mini Sumo"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">{t("Description")}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t("Your Message...")}
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">PDF {t("Name")}</label>
                  <input
                    type="text"
                    value={formData.pdfName}
                    onChange={(e) => setFormData({ ...formData, pdfName: e.target.value })}
                    placeholder="e.g., rules.pdf"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">{t("Upload")} PDF</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-blue-700 file:hover:bg-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">PDF URL/Data (or leave blank if using file upload)</label>
                <input
                  type="text"
                  value={formData.pdfDataUrl}
                  onChange={(e) => setFormData({ ...formData, pdfDataUrl: e.target.value })}
                  placeholder="PDF link or data URL"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              {editingId ? (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
                  >
                    {t("Save")}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    {t("Cancel")}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleAdd}
                    className="flex-1 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
                  >
                    {t("Create Category")}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    {t("Cancel")}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Categories List */}
      <div className="grid gap-4">
        {categories.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-12 text-center">
            <p className="text-slate-600">{t("No teams have been created yet")}</p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{category.description}</p>
                  {category.pdfName && (
                    <p className="mt-2 text-xs text-slate-500">PDF: {category.pdfName}</p>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-200"
                  >
                    ✎ {t("Edit")}
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                  >
                    🗑 {t("Delete")}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CategoryPage
