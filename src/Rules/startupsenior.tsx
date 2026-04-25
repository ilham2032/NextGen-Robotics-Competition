import { Link } from "react-router"

const StartupSenior = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-blue-800 to-blue-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-32 w-32 rounded-full border border-white"></div>
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full border border-white"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-100 mb-4 mt-6">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display mb-4 text-5xl font-bold text-white md:text-6xl">Start Up Senior</h1>
          <p className="mx-auto max-w-2xl text-xl text-blue-100">
            Advanced innovation category for high-impact robotics ventures and scalable technical solutions.
          </p>
          <div className="mt-8">
            <Link
              to="/regulations"
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              ← Back to Regulations
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <nav className="mb-12 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="mb-4 text-xl font-bold text-blue-900">Contents</h2>
          <ol className="space-y-2 text-blue-700">
            <li>1. Overview</li>
            <li>2. Team and Project Requirements</li>
            <li>3. Submission Package</li>
            <li>4. Pitch and Demo Rules</li>
            <li>5. Judging and Ranking</li>
            <li>6. Intellectual Integrity</li>
            <li>7. Operational Safety</li>
          </ol>
        </nav>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-blue-500 pb-2 text-3xl font-bold text-slate-900">1. Overview</h2>
          <p className="text-slate-700">
            Start Up Senior is designed for experienced teams presenting robotics products with clear technical depth,
            implementation readiness, and measurable business or social impact.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-blue-500 pb-2 text-3xl font-bold text-slate-900">
            2. Team and Project Requirements
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Team size: 2-6 participants.</li>
            <li>One active mentor/advisor per team is allowed.</li>
            <li>Solution must include robotics hardware and control/software logic.</li>
            <li>Project should target real deployment potential.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-blue-500 pb-2 text-3xl font-bold text-slate-900">
            3. Submission Package
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Executive summary and target market/problem.</li>
            <li>System architecture and technical stack.</li>
            <li>Prototype status and validation evidence.</li>
            <li>Business model and adoption strategy.</li>
            <li>Risk assessment and development roadmap.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-blue-500 pb-2 text-3xl font-bold text-slate-900">4. Pitch and Demo Rules</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Pitch duration: 7 minutes + 5 minutes Q&A.</li>
            <li>Live demo is recommended where feasible.</li>
            <li>Backup video demo is allowed for risk-critical systems.</li>
            <li>Teams must explain both technical and commercial aspects.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-blue-500 pb-2 text-3xl font-bold text-slate-900">5. Judging and Ranking</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left">Criteria</th>
                  <th className="p-4 text-left">Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-4">Technical quality and robustness</td>
                  <td className="p-4">30%</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4">Innovation and differentiation</td>
                  <td className="p-4">20%</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4">Market relevance and impact</td>
                  <td className="p-4">20%</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4">Business viability and scalability</td>
                  <td className="p-4">20%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4">Communication and defense</td>
                  <td className="p-4">10%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-blue-500 pb-2 text-3xl font-bold text-slate-900">6. Intellectual Integrity</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>All claims must be supported by prototype evidence or validated data.</li>
            <li>Proper attribution required for external frameworks and prior work.</li>
            <li>Misleading claims may result in score penalties or removal.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display mb-4 border-b-2 border-blue-500 pb-2 text-3xl font-bold text-slate-900">7. Operational Safety</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>All demos must be safe for indoor exhibition spaces.</li>
            <li>High-power modules must include protection and emergency stop.</li>
            <li>Judges and staff may stop unsafe demonstrations immediately.</li>
          </ul>
        </section>
      </div>
    </main>
  )
}

export default StartupSenior
