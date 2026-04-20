interface Stat {
  value: string
  label: string
}

interface StatsGridProps {
  stats: Stat[]
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <section className="mx-auto mt-16 grid max-w-6xl gap-8 px-6 md:px-10 lg:grid-cols-3 lg:px-16">
      {stats.map((stat, index) => (
        <div key={index} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <p className="text-4xl font-bold text-blue-700">{stat.value}</p>
          <p className="mt-2 text-sm tracking-wide text-slate-600 uppercase">{stat.label}</p>
        </div>
      ))}
    </section>
  )
}

export default StatsGrid

