import { Link } from "react-router-dom"

const BotsCombat = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-200 mb-4 mt-6">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Bots Combat
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Battle robot competition - Strategy, durability, and combat skill
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
            <li><a href="#arena" className="hover:text-blue-900">3. The Arena</a></li>
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
              The <strong>Bots Combat</strong> category features remote-controlled battle robots equipped 
              with weapons designed to disable or push opponent robots out of the arena. This high-energy 
              competition follows international battle robot standards with strict safety protocols.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="font-semibold text-blue-900">Competition Format</p>
              <p className="text-blue-800">Single elimination bracket. 3-minute matches with knockout or points.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Robot Specifications */}
        <section id="robot-specs" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-600">
            2. Robot Specifications
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="p-4 text-left font-semibold">Parameter</th>
                  <th className="p-4 text-left font-semibold">Requirement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Weight Classes</td>
                  <td className="p-4 text-slate-600">Lightweight (1.5kg), Middleweight (3.5kg), Heavyweight (15kg)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Maximum Dimensions</td>
                  <td className="p-4 text-slate-600">500mm × 500mm × 500mm (L×W×H)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Control</td>
                  <td className="p-4 text-slate-600">Remote control (2.4GHz recommended)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Power Supply</td>
                  <td className="p-4 text-slate-600">Battery powered (max 24V for heavy, 12V for others)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Weapon Types</td>
                  <td className="p-4 text-slate-600">Spinning blades, flippers, hammers, axes, rammers</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Weapon Speed Limit</td>
                  <td className="p-4 text-slate-600">Spinning weapons: 10,000 RPM max</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Safety Switch</td>
                  <td className="p-4 text-slate-600">Kill switch required on all robots</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Radio Frequency</td>
                  <td className="p-4 text-slate-600">2.4GHz or specific competition frequency</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: The Arena */}
        <section id="arena" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-600">
            3. The Arena
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">3.1 Arena Specifications</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Arena Size:</strong> 4m × 4m (minimum) for lightweight, larger for heavier classes</li>
              <li><strong>Walls:</strong> Steel or polycarbonate, minimum 1m height</li>
              <li><strong>Floor:</strong> Non-slip surface (rubber or textured metal)</li>
              <li><strong>Hazards:</strong> Optional hazards (spikes, saws) in designated areas</li>
              <li><strong>Lighting:</strong> Adequate overhead lighting for visibility</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">3.2 Safety Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Safety Fence:</strong> Transparent barrier between arena and audience</li>
              <li><strong>Emergency Stop:</strong> Large red button accessible to judges and operators</li>
              <li><strong>Fire Suppression:</strong> Fire extinguisher and blanket at arena perimeter</li>
              <li><strong>Medical Kit:</strong> First aid supplies near arena</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Match Rules */}
        <section id="match-rules" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-600">
            4. Match Rules
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">4.1 Match Structure</h3>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li><strong>Match Duration:</strong> 3 minutes (may be extended)</li>
              <li><strong>Weight Verification:</strong> Robots weighed before each match</li>
              <li><strong>Weapon Inspection:</strong> All weapons checked for safety compliance</li>
              <li><strong>Radio Check:</strong> Frequency verified to avoid interference</li>
            </ol>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">4.2 Match Procedure</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Robots placed in opposite corners of arena</li>
              <li>Judges conduct "Weapons On" and "Radio Check"</li>
              <li>Countdown: "30 seconds", "10 seconds", "3, 2, 1, FIGHT!"</li>
              <li>Robots engage - pilot controls from designated station</li>
              <li>Match ends at 3 minutes or knockout</li>
              <li>Judges inspect robots for damage after match</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Scoring System */}
        <section id="scoring" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-600">
            5. Scoring System
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="p-4 text-left font-semibold">Result</th>
                  <th className="p-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Knockout (KO)</td>
                  <td className="p-4 text-slate-600">Opponent's robot immobilized or unable to continue</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Technical Knockout (TKO)</td>
                  <td className="p-4 text-slate-600">Opponent cannot return to arena after 30 seconds</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Judges Decision</td>
                  <td className="p-4 text-slate-600">Points based on aggression, control, damage</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Draw</td>
                  <td className="p-4 text-slate-600">Equal points - may have overtime or rematch</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Penalties */}
        <section id="penalties" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-600">
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
                  <td className="p-4">Starting before signal</td>
                  <td className="p-4">Warning, opponent gets +10 points</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4">Leaving arena (non-combat)</td>
                  <td className="p-4">Warning, -1 point</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4">Exceeding weapon RPM</td>
                  <td className="p-4">Disqualification from match</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4">Uncontrolled weapon after match</td>
                  <td className="p-4">Warning, safety inspection required</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">6.2 Disqualification</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Exceeding weight limit (after correction)</li>
              <li>Using illegal weapons (fire, explosives, chemicals)</li>
              <li>Damaging arena or endangering spectators</li>
              <li>Radio interference or jamming</li>
              <li>Unsportsmanlike conduct</li>
            </ul>
          </div>
        </section>

        {/* Section 7: Safety Guidelines */}
        <section id="safety" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-600">
            7. Safety Guidelines
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Kill Switch:</strong> Must be functional and accessible at all times</li>
              <li><strong>Weapon Guards:</strong> Spinning weapons must have proper guards</li>
              <li><strong>Battery Safety:</strong> Securely mounted, protected from damage</li>
              <li><strong>Pilot Safety:</strong> Must wear safety glasses when near active weapons</li>
              <li><strong>Emergency Procedures:</strong> Stop immediately when judge commands</li>
              <li><strong>Fire Safety:</strong> No flammable liquids or open flames</li>
              <li><strong>Weight Verification:</strong> All robots weighed before each match</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about Bots Combat?</h3>
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

export default BotsCombat