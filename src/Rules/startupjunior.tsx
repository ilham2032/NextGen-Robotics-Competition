import { Link } from "react-router"

const StartupJunior = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-700 via-blue-700 to-cyan-800 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-32 w-32 rounded-full border border-white"></div>
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full border border-white"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="mb-4 inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display mb-4 text-5xl font-bold text-white md:text-6xl">Start Up Junior</h1>
          <p className="mx-auto max-w-2xl text-xl text-cyan-100">
            Innovation pitching category for young creators with early-stage robotics ideas.
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
        <nav className="mb-12 rounded-2xl border border-cyan-100 bg-cyan-50 p-6">
          <h2 className="mb-4 text-xl font-bold text-cyan-900">Contents</h2>
          <ol className="space-y-2 text-cyan-700">
            <li>1. Overview</li>
            <li>2. Team and Project Requirements</li>
            <li>3. Submission Format</li>
            <li>4. Presentation Rules</li>
            <li>5. Judging Criteria</li>
            <li>6. Ethics and Fair Play</li>
            <li>7. Safety and Conduct</li>
          </ol>
        </nav>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-cyan-500 pb-2 text-3xl font-bold text-slate-900">1. Overview</h2>
          <p className="text-slate-700">
            Start Up Junior encourages school-level teams to propose practical robotics products or services that solve
            real-world problems in education, environment, mobility, or community life.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-cyan-500 pb-2 text-3xl font-bold text-slate-900">
            2. Team and Project Requirements
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Team size: 2-5 students with one mentor.</li>
            <li>Participants must be in junior age group defined by organizers.</li>
            <li>Project must include a robotics, automation, or mechatronics component.</li>
            <li>Prototype can be physical, simulated, or hybrid.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-cyan-500 pb-2 text-3xl font-bold text-slate-900">3. Submission Format</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Problem statement and target users.</li>
            <li>Technical concept and robotics architecture.</li>
            <li>Prototype evidence (photos, demo video, or live demo).</li>
            <li>Simple business model and impact potential.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-cyan-500 pb-2 text-3xl font-bold text-slate-900">4. Presentation Rules</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Pitch duration: 5 minutes + 3 minutes Q&A.</li>
            <li>At least one team member must present technical details.</li>
            <li>Only team members may answer judges during Q&A.</li>
            <li>Slides are optional but recommended.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-cyan-500 pb-2 text-3xl font-bold text-slate-900">5. Judging Criteria</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-cyan-600 text-white">
                  <th className="p-4 text-left">Criteria</th>
                  <th className="p-4 text-left">Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-4">Innovation and originality</td>
                  <td className="p-4">25%</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4">Technical feasibility</td>
                  <td className="p-4">25%</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4">Problem-solution fit</td>
                  <td className="p-4">20%</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4">Presentation clarity</td>
                  <td className="p-4">15%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4">Team collaboration</td>
                  <td className="p-4">15%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-display mb-4 border-b-2 border-cyan-500 pb-2 text-3xl font-bold text-slate-900">6. Ethics and Fair Play</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Projects must be the original work of the team.</li>
            <li>Use of third-party media/tools must be acknowledged.</li>
            <li>No plagiarism or fabricated prototype claims.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display mb-4 border-b-2 border-cyan-500 pb-2 text-3xl font-bold text-slate-900">7. Safety and Conduct</h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            <li>Electrical and mechanical prototypes must be safe for indoor demo use.</li>
            <li>Teams must follow staff instructions during setup and demo.</li>
            <li>Unsportsmanlike behavior may result in point deductions or disqualification.</li>
          </ul>
        </section>
      </div>
    </main>
  )
}

export default StartupJunior
