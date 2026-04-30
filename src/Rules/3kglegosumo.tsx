import { Link } from "react-router"

const LegoSumo3kg = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-100 mb-4 mt-6">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            LEGO Sumo (3kg)
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            LEGO robot sumo wrestling - Push your opponent out of the ring
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/regulations"
              className="rounded-lg bg-white/10 border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/20 transition"
            >
              ← Back to Regulations
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        
        {/* Table of Contents */}
        <nav className="mb-12 rounded-2xl bg-blue-50 p-6 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Contents</h2>
          <ol className="space-y-2 text-blue-700">
            <li><a href="#overview" className="hover:text-blue-900">1. Overview</a></li>
            <li><a href="#robot-specs" className="hover:text-blue-900">2. Robot Specifications</a></li>
            <li><a href="#dohyo" className="hover:text-blue-900">3. The Dohyo (Ring)</a></li>
            <li><a href="#match-rules" className="hover:text-blue-900">4. Match Rules</a></li>
            <li><a href="#scoring" className="hover:text-blue-900">5. Scoring System</a></li>
            <li><a href="#penalties" className="hover:text-blue-900">6. Penalties & Disqualification</a></li>
            <li><a href="#safety" className="hover:text-blue-900">7. Safety Guidelines</a></li>
          </ol>
        </nav>

        {/* Section 1: Overview */}
        <section id="overview" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-600">
            1. Overview
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4">
              The <strong>LEGO Sumo (3kg)</strong> category challenges teams to build autonomous LEGO robots 
              that push opponent robots out of a circular ring (dohyo). This category follows the international 
              LEGO Sumo standards with a 3kg weight limit, combining mechanical design, programming, and strategy.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="font-semibold text-blue-900">Competition Format</p>
              <p className="text-blue-800">Best of 3 matches per bout. Winner advances through knockout bracket.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Robot Specifications */}
        <section id="robot-specs" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            2. Robot Specifications
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left font-semibold">Parameter</th>
                  <th className="p-4 text-left font-semibold">Requirement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Construction Material</td>
                  <td className="p-4 text-slate-600">LEGO components only (SPIKE, Mindstorms, classic LEGO)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Maximum Weight</td>
                  <td className="p-4 text-slate-600">3.0 kg (including battery)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Maximum Dimensions</td>
                  <td className="p-4 text-slate-600">200mm × 200mm × 200mm (L×W×H)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Control Type</td>
                  <td className="p-4 text-slate-600">Fully autonomous (no remote control)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Programmable Controller</td>
                  <td className="p-4 text-slate-600">LEGO Spike Prime, Mindstorms EV3, or equivalent</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Sensors Allowed</td>
                  <td className="p-4 text-slate-600">Color, distance, force, gyroscope (LEGO sensors only)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Power Supply</td>
                  <td className="p-4 text-slate-600">LEGO rechargeable battery or AA batteries</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Drive System</td>
                  <td className="p-4 text-slate-600">LEGO motors only (max 4 motors)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: The Dohyo */}
        <section id="dohyo" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            3. The Dohyo (Ring)
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">3.1 Ring Specifications</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Dohyo Diameter:</strong> 154cm (outer), 145cm (inner battle zone)</li>
              <li><strong>Surface:</strong> Flat white or light-colored mat</li>
              <li><strong>Border:</strong> Black or dark ring boundary (5cm wide)</li>
              <li><strong>Starting Lines:</strong> Two parallel lines 30cm from center</li>
              <li><strong>Height:</strong> Dohyo elevated 5-10cm from floor</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">3.2 Dohyo Divisions</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dohyo Jonai:</strong> Inner battle area where matches occur</li>
              <li><strong>Dohyo Jogai:</strong> Area outside the ring boundary</li>
              <li><strong>Shikiri-sen:</strong> Starting lines for robot placement</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Match Rules */}
        <section id="match-rules" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            4. Match Rules
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">4.1 Match Structure</h3>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li><strong>Bout:</strong> Best of 3 matches</li>
              <li><strong>Match:</strong> Single round within the dohyo</li>
              <li><strong>Match Duration:</strong> Maximum 3 minutes</li>
              <li><strong>Rest Period:</strong> 2 minutes between matches</li>
            </ol>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">4.2 Match Procedure</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Robots placed on shikiri-sen (starting lines)</li>
              <li>Judge gives "Ready" command</li>
              <li>After 5 seconds, judge gives "Start" signal</li>
              <li>Robots must begin moving within 3 seconds</li>
              <li>Robots battle until one is pushed out of dohyo</li>
              <li>Judge may stop match for violations</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Scoring System */}
        <section id="scoring" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            5. Scoring System
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-4 text-left font-semibold">Result</th>
                  <th className="p-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Yuko (Effective Win)</td>
                  <td className="p-4 text-slate-600">Opponent's robot fully exits dohyo</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Fusensho (Default Win)</td>
                  <td className="p-4 text-slate-600">Opponent fails to start or cannot move</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Torinaoshi (Rematch)</td>
                  <td className="p-4 text-slate-600">Match voided due to external factors</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Draw</td>
                  <td className="p-4 text-slate-600">No winner after 3 minutes - decided by judge</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Penalties */}
        <section id="penalties" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            6. Penalties & Disqualification
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">6.1 Penalties (Hansoku)</h3>
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-4 text-left font-semibold">Violation</th>
                  <th className="p-4 text-left font-semibold">Penalty</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-4">Robot leaves dohyo voluntarily</td>
                  <td className="p-4">Loss of match</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4">Robot becomes immobilized (Shinitai)</td>
                  <td className="p-4">Loss of match after 10 seconds</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4">Starting before signal</td>
                  <td className="p-4">Warning, restart match</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4">Using non-LEGO components</td>
                  <td className="p-4">Disqualification from tournament</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">6.2 Disqualification (Shikkaku)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using remote control or external communication</li>
              <li>Exceeding weight or dimension limits</li>
              <li>Damaging opponent's robot intentionally</li>
              <li>Unsportsmanlike behavior</li>
              <li>Refusing judge's decision</li>
            </ul>
          </div>
        </section>

        {/* Section 7: Safety Guidelines */}
        <section id="safety" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            7. Safety Guidelines
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Weight Limit:</strong> Strictly enforced - robots weighed before each match</li>
              <li><strong>Battery Safety:</strong> Use properly maintained LEGO batteries</li>
              <li><strong>No Sharp Edges:</strong> All robot edges must be smooth and safe</li>
              <li><strong>Emergency Stop:</strong> Judge may stop match at any time</li>
              <li><strong>Workspace:</strong> Keep area around dohyo clear</li>
              <li><strong>First Aid:</strong> First aid station available at venue</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about LEGO Sumo (3kg)?</h3>
          <p className="text-blue-100 mb-6">
            Contact our technical team for clarifications on regulations
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}

export default LegoSumo3kg
