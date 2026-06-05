import { CATEGORY_AGE_REQUIREMENTS_LIST } from '../../utils/categoryRules'

const CategoryAgeRequirementsPanel = () => (
  <div className="rounded-4xl border border-indigo-100 bg-indigo-50/80 p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Age requirements</p>
    <p className="mt-2 text-sm text-indigo-900/90">
      Each participant&apos;s age (from date of birth) must match the category you register for.
    </p>
    <ul className="mt-4 space-y-2 text-sm">
      {CATEGORY_AGE_REQUIREMENTS_LIST.map((item) => (
        <li
          key={item.name}
          className="flex items-center justify-between gap-2 rounded-xl bg-white/80 px-3 py-2 text-slate-800"
        >
          <span className="font-medium">{item.name}</span>
          <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
            {item.ageMin}–{item.ageMax}
          </span>
        </li>
      ))}
    </ul>
  </div>
)

export default CategoryAgeRequirementsPanel
