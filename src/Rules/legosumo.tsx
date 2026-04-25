import { Link } from "react-router"

const LegoSumo = () => {
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
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-100 mb-4">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            LEGO Sumo (Standard)
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Standard LEGO robot sumo - The classic sumo competition
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
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            1. Overview
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="mb-4">
              The <strong>LEGO Sumo (Standard)</strong> category is the classic LEGO robot sumo competition 
              where two autonomous LEGO robots battle in a dohyo (ring), attempting to push each other out. 
              This category follows international sumo robot standards and is perfect for teams new to 
              competitive robotics.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="font-semibold text-blue-900">Competition Format</p>
              <p className="text-blue-800">Best of 3 matches per bout. Knockout bracket with consolation rounds.</p>
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
                  <td className="p-4 text-slate-600">LEGO components only (any LEGO system)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Maximum Weight</td>
                  <td className="p-4 text-slate-600">1.0 kg (including battery)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Maximum Dimensions</td>
                  <td className="p-4 text-slate-600">150mm × 150mm × 150mm (L×W×H)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Control Type</td>
                  <td className="p-4 text-slate-600">Fully autonomous (no remote control)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Programmable Controller</td>
                  <td className="p-4 text-slate-600">Any LEGO controller (SPIKE, EV3, NXT, etc.)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Sensors Allowed</td>
                  <td className="p-4 text-slate-600">Any LEGO sensors (color, ultrasonic, touch, gyro)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Power Supply</td>
                  <td className="p-4 text-slate-600">LEGO battery pack or AA batteries (max 9V)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Drive System</td>
                  <td className="p-4 text-slate-600">LEGO motors only (max 3 motors)</td>
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
              <li><strong>Dohyo Diameter:</strong> 100cm (outer), 90cm (inner battle zone)</li>
              <li><strong>Surface:</strong> White or light-colored smooth surface</li>
              <li><strong>Border:</strong> Black line (3cm wide) marking boundary</li>
              <li><strong>Starting Lines:</strong> Two parallel lines 20cm from center</li>
              <li><strong>Platform:</strong> Elevated 3-5cm from ground</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">3.2 Match Areas</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dohyo Jonai:</strong> Inner circle where battle takes place</li>
              <li><strong>Dohyo Jogai:</strong> Outside the boundary line</li>
              <li><strong>Shikiri-sen:</strong> Starting positions for robots</li>
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
              <li><strong>Bout:</strong> Best of 3 matches (first to 2 wins)</li>
              <li><strong>Match Duration:</strong> Maximum 2 minutes</li>
              <li><strong>Rest Time:</strong> 1 minute between matches</li>
              <li><strong>Inspection:</strong> Robots checked before each bout</li>
            </ol>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">4.2 Match Procedure</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Robots placed on opposite shikiri-sen lines</li>
              <li>Judge announces "Ready"</li>
              <li>3-second countdown to "Start"</li>
              <li>Robots must start within 3 seconds of signal</li>
              <li>Battle continues until robot exits dohyo</li>
              <li>Judge declares winner or calls for rematch</li>
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
                  <td className="p-4 font-semibold text-slate-700">Yuko</td>
                  <td className="p-4 text-slate-600">Full win - opponent exits dohyo</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Fusensho</td>
                  <td className="p-4 text-slate-600">Default win - opponent cannot start</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Keikoku</td>
                  <td className="p-4 text-slate-600">Warning - minor violation</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Hansoku-Make</td>
                  <td className="p-4 text-slate-600">Loss due to violation (serious)</td>
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
            <h3 className="text-xl font-semibold text-slate-900 mb-3">6.1 Penalties</h3>
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-4 text-left font-semibold">Violation</th>
                  <th className="p-4 text-left font-semibold">Penalty</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-4">False start (before signal)</td>
                  <td className="p-4">Warning, match restart</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4">Robot exits dohyo voluntarily</td>
                  <td className="p-4">Automatic loss</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4">Immobilized for 10+ seconds</td>
                  <td className="p-4">Match loss</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4">Non-LEGO parts detected</td>
                  <td className="p-4">Disqualification</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">6.2 Disqualification</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using any non-LEGO components</li>
              <li>Remote control or wireless communication</li>
              <li>Intentional damage to opponent</li>
              <li>Abuse of officials or other teams</li>
              <li>Weight/dimension violation after correction</li>
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
              <li><strong>Weight Inspection:</strong> All robots weighed before matches</li>
              <li><strong>Safe Construction:</strong> No sharp edges or protruding parts</li>
              <li><strong>Battery Handling:</strong> Use only undamaged LEGO batteries</li>
              <li><strong>Clear Area:</strong> Keep space around dohyo clear</li>
              <li><strong>Judge Authority:</strong> Follow all judge instructions immediately</li>
              <li><strong>First Aid:</strong> Medical assistance available at venue</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about LEGO Sumo?</h3>
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

export default LegoSumo
