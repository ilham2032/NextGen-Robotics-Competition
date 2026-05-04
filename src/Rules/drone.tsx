import { Link } from "react-router-dom"

const Drone = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20">
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
            Drone Race
          </h1>
          <p className="text-xl text-blue-300 max-w-2xl mx-auto">
            FPV drone racing competition - Speed, agility, and piloting skill
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
        <nav className="mb-12 rounded-2xl bg-blue-100 p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Contents</h2>
          <ol className="space-y-2 text-blue-700">
            <li><a href="#overview" className="hover:text-blue-900">1. Overview</a></li>
            <li><a href="#drone-specs" className="hover:text-blue-900">2. Drone Specifications</a></li>
            <li><a href="#course" className="hover:text-blue-900">3. Race Course</a></li>
            <li><a href="#race-rules" className="hover:text-blue-900">4. Race Rules</a></li>
            <li><a href="#scoring" className="hover:text-blue-900">5. Scoring System</a></li>
            <li><a href="#penalties" className="hover:text-blue-900">6. Penalties & Disqualification</a></li>
            <li><a href="#safety" className="hover:text-blue-900">7. Safety Guidelines</a></li>
          </ol>
        </nav>

        {/* Section 1: Overview */}
        <section id="overview" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-blue-900 mb-6 pb-3 border-b-2 border-blue-600">
            1. Overview
          </h2>
          <div className="prose prose-lg max-w-none text-blue-700">
            <p className="mb-4">
              The <strong>Drone Race</strong> category tests pilots' abilities to navigate FPV (First Person View) 
              drones through a challenging obstacle course at high speed. This competition follows international 
              drone racing standards, combining technical drone building skills with expert piloting abilities.
            </p>
            <div className="bg-blue-100 border-l-4 border-blue-600 p-4 my-6">
              <p className="font-semibold text-blue-900">Competition Format</p>
              <p className="text-blue-700">Time trials with knockout rounds. Fastest times advance to finals.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Drone Specifications */}
        <section id="drone-specs" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-blue-900 mb-6 pb-3 border-b-2 border-blue-600">
            2. Drone Specifications
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
                <tr className="border-b border-blue-200">
                  <td className="p-4 font-semibold text-blue-700">Frame Size (Wheelbase)</td>
                  <td className="p-4 text-blue-600">120mm - 250mm</td>
                </tr>
                <tr className="border-b border-blue-200 bg-blue-50">
                  <td className="p-4 font-semibold text-blue-700">Weight (with battery)</td>
                  <td className="p-4 text-blue-600">No limit (recommended under 500g)</td>
                </tr>
                <tr className="border-b border-blue-200">
                  <td className="p-4 font-semibold text-blue-700">Motor Size</td>
                  <td className="p-4 text-blue-600">Up to 2306 or equivalent</td>
                </tr>
                <tr className="border-b border-blue-200 bg-blue-50">
                  <td className="p-4 font-semibold text-blue-700">Propeller Size</td>
                  <td className="p-4 text-blue-600">Up to 5 inches</td>
                </tr>
                <tr className="border-b border-blue-200">
                  <td className="p-4 font-semibold text-blue-700">Battery</td>
                  <td className="p-4 text-blue-600">LiPo 3S-6S (11.1V - 22.2V)</td>
                </tr>
                <tr className="border-b border-blue-200 bg-blue-50">
                  <td className="p-4 font-semibold text-blue-700">Video Transmitter</td>
                  <td className="p-4 text-blue-600">Max 25mW (VTX) - Race frequency bands only</td>
                </tr>
                <tr className="border-b border-blue-200">
                  <td className="p-4 font-semibold text-blue-700">FPV Camera</td>
                  <td className="p-4 text-blue-600">Any standard FPV camera (analog/digital)</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="p-4 font-semibold text-blue-700">Receiver</td>
                  <td className="p-4 text-blue-600">Any protocol (ELRS, Crossfire, SBUS, etc.)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Race Course */}
        <section id="course" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-blue-900 mb-6 pb-3 border-b-2 border-blue-600">
            3. Race Course
          </h2>
          <div className="prose prose-lg max-w-none text-blue-700">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">3.1 Course Layout</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Course Type:</strong> Multi-gate obstacle course</li>
              <li><strong>Number of Gates:</strong> 8-12 gates depending on difficulty</li>
              <li><strong>Gate Size:</strong> Standard race gates (1m × 1m minimum)</li>
              <li><strong>Course Length:</strong> 50-100 meters</li>
              <li><strong>Altitude:</strong> 3-8 meters flight height</li>
              <li><strong>Obstacles:</strong> Gates, tunnels, slalom poles, and timing arches</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-900 mb-3">3.2 Gate Requirements</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gates must be clearly visible (LED illuminated preferred)</li>
              <li>Gates numbered in sequence for course navigation</li>
              <li>Start and finish gates equipped with timing system</li>
              <li>Alternative "rescue" gates may be available</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Race Rules */}
        <section id="race-rules" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-blue-900 mb-6 pb-3 border-b-2 border-blue-600">
            4. Race Rules
          </h2>
          <div className="prose prose-lg max-w-none text-blue-700">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">4.1 Race Format</h3>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li><strong>Qualifying Round:</strong> Time trials - each pilot flies 2-3 laps</li>
              <li><strong>Semi-Finals:</strong> Top times from qualifying advance</li>
              <li><strong>Finals:</strong> Head-to-head races or final time trials</li>
              <li><strong>Heat Structure:</strong> 4-6 pilots per heat</li>
            </ol>

            <h3 className="text-xl font-semibold text-blue-900 mb-3">4.2 Race Procedure</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pilots must be at the pilot station 15 minutes before their heat</li>
              <li>Pre-race frequency scan to avoid interference</li>
              <li>Judge gives "Pilots Ready" command</li>
              <li>3-second countdown, then "GO" signal</li>
              <li>Pilots launch on the signal</li>
              <li>Complete all gates in correct order</li>
              <li>Cross finish line to complete lap</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Scoring System */}
        <section id="scoring" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-blue-900 mb-6 pb-3 border-b-2 border-blue-600">
            5. Scoring System
          </h2>
          <div className="prose prose-lg max-w-none text-blue-700">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="p-4 text-left font-semibold">Criteria</th>
                  <th className="p-4 text-left font-semibold">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-200">
                  <td className="p-4 font-semibold text-blue-700">Lap Time</td>
                  <td className="p-4 text-blue-600">Primary ranking (lower is better)</td>
                </tr>
                <tr className="border-b border-blue-200 bg-blue-50">
                  <td className="p-4 font-semibold text-blue-700">Gate Completion</td>
                  <td className="p-4 text-blue-600">All gates must be passed in order</td>
                </tr>
                <tr className="border-b border-blue-200">
                  <td className="p-4 font-semibold text-blue-700">Crash Penalty</td>
                  <td className="p-4 text-blue-600">+2 seconds per gate missed/skipped</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="p-4 font-semibold text-blue-700">Tiebreaker</td>
                  <td className="p-4 text-blue-600">Best single lap time</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Penalties */}
        <section id="penalties" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-blue-900 mb-6 pb-3 border-b-2 border-blue-600">
            6. Penalties & Disqualification
          </h2>
          <div className="prose prose-lg max-w-none text-blue-700">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">6.1 Penalties</h3>
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="p-4 text-left font-semibold">Violation</th>
                  <th className="p-4 text-left font-semibold">Penalty</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-200">
                  <td className="p-4">Missing a gate</td>
                  <td className="p-4">+5 seconds to lap time</td>
                </tr>
                <tr className="border-b border-blue-200 bg-blue-50">
                  <td className="p-4">Flying out of bounds</td>
                  <td className="p-4">+3 seconds, warning</td>
                </tr>
                <tr className="border-b border-blue-200">
                  <td className="p-4">Landing before finish (intentional)</td>
                  <td className="p-4">Lap disqualified</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="p-4">Interfering with other pilots</td>
                  <td className="p-4">Disqualification from heat</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-semibold text-blue-900 mb-3">6.2 Disqualification</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Exceeding power output limits (25mW VTX)</li>
              <li>Flying outside designated airspace</li>
              <li>Unsafe flying behavior endangering others</li>
              <li>Using prohibited frequencies</li>
              <li>Unsportsmanlike conduct</li>
            </ul>
          </div>
        </section>

        {/* Section 7: Safety Guidelines */}
        <section id="safety" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-blue-900 mb-6 pb-3 border-b-2 border-blue-600">
            7. Safety Guidelines
          </h2>
          <div className="prose prose-lg max-w-none text-blue-700">
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Propeller Safety:</strong> Prop guards required for all practice flights</li>
              <li><strong>Battery Safety:</strong> LiPo bags must be used for charging; never leave batteries unattended</li>
              <li><strong>Flight Area:</strong> Only designated personnel allowed in pilot zone during race</li>
              <li><strong>Emergency Procedures:</strong> Stop all drones immediately if safety officer commands</li>
              <li><strong>Maximum Altitude:</strong> Do not exceed 15m altitude at any time</li>
              <li><strong>First Aid:</strong> First aid kit and fire extinguisher at pilot station</li>
              <li><strong>Eye Protection:</strong> FPV goggles must have adequate light filtering</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-900 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about Drone Race?</h3>
          <p className="text-blue-300 mb-6">
            Contact our technical team for clarifications on regulations
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-700 hover:bg-blue-100 transition"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}

export default Drone
