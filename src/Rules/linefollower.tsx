import { Link } from "react-router"

const LineFollower = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-200 mt-8 mb-4">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Line Follower
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Autonomous robot line tracking competition - Speed, precision, and reliability
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
            <li><a href="#field" className="hover:text-blue-900">3. Playing Field</a></li>
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
              The <strong>Line Follower</strong> category challenges teams to design and build an autonomous robot 
              capable of following a black line on a white surface as quickly and accurately as possible. This is 
              one of the most popular robotics competitions worldwide, testing fundamental skills in navigation, 
              sensor integration, and real-time control systems.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="font-semibold text-blue-900">Competition Format</p>
              <p className="text-blue-800">Individual timed runs. Best time from multiple attempts determines ranking.</p>
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
                  <td className="p-4 font-semibold text-slate-700">Maximum Dimensions</td>
                  <td className="p-4 text-slate-600">250mm × 250mm × 250mm (L×W×H)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Weight Limit</td>
                  <td className="p-4 text-slate-600">No limit (recommended under 1.5kg)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Control Type</td>
                  <td className="p-4 text-slate-600">Fully autonomous (no remote control)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Power Supply</td>
                  <td className="p-4 text-slate-600">Internal battery only (max 12V)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Sensors Allowed</td>
                  <td className="p-4 text-slate-600">IR sensors, color sensors, line sensors, ultrasonic, gyroscope, encoders</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Microcontroller</td>
                  <td className="p-4 text-slate-600">Any programmable controller (Arduino, ESP32, STM32, etc.)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Drive System</td>
                  <td className="p-4 text-slate-600">Any (wheeled, tracked, or legged)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Number of Robots</td>
                  <td className="p-4 text-slate-600">One robot per team</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Playing Field */}
        <section id="field" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            3. Playing Field
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">3.1 Track Specifications</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Track Surface:</strong> White or light-colored mat/board</li>
              <li><strong>Line Color:</strong> Black (matte finish, 18-25mm width)</li>
              <li><strong>Track Layout:</strong> Includes straight sections, curves (R ≥ 50mm), 90° turns, intersections, and optional branches</li>
              <li><strong>Track Length:</strong> 10-30 meters depending on difficulty level</li>
              <li><strong>Start/Finish Zone:</strong> Clearly marked 200mm × 200mm area</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">3.2 Environmental Conditions</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ambient lighting: Controlled (200-500 lux)</li>
              <li>Temperature: 20-25°C</li>
              <li>No external light interference allowed</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Match Rules */}
        <section id="match-rules" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            4. Match Rules
          </h2>
          <div className="prose prose-lg max-w-none text-slate-700">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">4.1 Match Procedure</h3>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Teams submit their robot at the inspection area at least 30 minutes before their scheduled run</li>
              <li>Robot is placed in the designated start zone</li>
              <li>Judge gives the signal "Ready" - teams must not touch the robot</li>
              <li>After 3 seconds, judge gives "Start" signal</li>
              <li>Robot must begin moving within 5 seconds of the start signal</li>
              <li>Robot follows the line until it reaches the finish zone or is disqualified</li>
              <li>Time is recorded from start signal to finish line crossing</li>
            </ol>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">4.2 Number of Attempts</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Each team gets <strong>3 attempts</strong></li>
              <li>Best time counts toward final ranking</li>
              <li>Minimum 2-minute break between attempts</li>
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
                  <th className="p-4 text-left font-semibold">Criteria</th>
                  <th className="p-4 text-left font-semibold">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Completion Time</td>
                  <td className="p-4 text-slate-600">Primary ranking (lower is better)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Track Completion</td>
                  <td className="p-4 text-slate-600">Must complete full track to be ranked</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4 font-semibold text-slate-700">Line Accuracy Bonus</td>
                  <td className="p-4 text-slate-600">No penalty for minor deviations</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-slate-700">Tiebreaker</td>
                  <td className="p-4 text-slate-600">Second best attempt time</td>
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
                <tr className="bg-orange-500 text-white">
                  <th className="p-4 text-left font-semibold">Violation</th>
                  <th className="p-4 text-left font-semibold">Penalty</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-4">Robot leaves track (more than 50% off line)</td>
                  <td className="p-4">+5 seconds to final time</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-4">Robot stops for more than 10 seconds</td>
                  <td className="p-4">Attempt terminated</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-4">Robot crosses wrong path at intersection</td>
                  <td className="p-4">+3 seconds penalty</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4">Manual intervention during run</td>
                  <td className="p-4">Attempt disqualified</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">6.2 Disqualification</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using remote control or external communication</li>
              <li>Damaging the track or field equipment</li>
              <li>Unsportsmanlike behavior</li>
              <li>Violating robot specifications</li>
              <li>Refusing to follow judge's instructions</li>
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
              <li><strong>Battery Safety:</strong> Use properly protected batteries; no leaking or damaged batteries allowed</li>
              <li><strong>No Hazardous Materials:</strong> Robots must not contain materials that could cause injury</li>
              <li><strong>Emergency Stop:</strong> Judges may stop any robot at any time for safety concerns</li>
              <li><strong>Fire Safety:</strong> No open flames or heating elements on robots</li>
              <li><strong>Workspace Safety:</strong> Keep walkways clear of equipment and bags</li>
              <li><strong>First Aid:</strong> First aid station available at the venue</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about Line Follower?</h3>
          <p className="text-blue-100 mb-6">
            Contact our technical team for clarifications on regulations
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-700 hover:bg-blue-50 transition"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}

export default LineFollower