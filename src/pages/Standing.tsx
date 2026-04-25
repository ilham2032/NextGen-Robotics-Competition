const Standing = () => {
  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 px-6 py-10 text-white shadow-lg sm:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase">Competition Rankings</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Standings</h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
            Official rankings and category scoreboards will appear here after referee verification.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-800">Standings are not published yet.</p>
          <p className="mt-2 text-slate-600">Please check back after match results are finalized.</p>
        </div>
      </div>
    </section>
  )
}

export default Standing

