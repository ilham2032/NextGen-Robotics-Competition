import { Link } from "react-router-dom"

const legoline = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-200 mt-6 mb-4">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            LEGO Line Follower
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Autonomous LEGO robot line tracking - Navigate the track accurately and efficiently
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
            <li><a href="#team-requirements" className="hover:text-blue-900">2. Team Requirements</a></li>
            <li><a href="#robot-specs" className="hover:text-blue-900">3. Robot Specifications</a></li>
            <li><a href="#playing-field" className="hover:text-blue-900">4. Playing Field</a></li>
            <li><a href="#game-rules" className="hover:text-blue-900">5. Game Rules</a></li>
            <li><a href="#scoring" className="hover:text-blue-900">6. Scoring System</a></li>
            <li><a href="#penalties" className="hover:text-blue-900">7. Penalties</a></li>
            <li><a href="#safety-fairplay" className="hover:text-blue-900">8. Safety & Fair Play</a></li>
          </ol>
        </nav>
        
        {/* Section 1: Overview */}
        <section id="overview" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            1. Overview
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            The LEGO Line Category requires teams to design and program an autonomous LEGO robot
            capable of following a line track accurately and efficiently. This category is perfect for 
            teams using LEGO Spike Prime, Mindstorms, or classic LEGO robotics kits.
          </p>
        </section>

        {/* Section 2: Team Requirements */}
        <section id="team-requirements" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            2. Team Requirements
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Teams must consist of 1–4 members</li>
            <li>Each team must register before the deadline</li>
            <li>Only one robot per team is allowed</li>
            <li>All team members must be present during competition</li>
          </ul>
        </section>

        {/* Section 3: Robot Specifications */}
        <section id="robot-specs" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            3. Robot Specifications
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Must be built mainly using LEGO components (SPIKE, Mindstorms, etc.)</li>
            <li>Maximum size: 25cm x 25cm x 25cm at start position</li>
            <li>Must operate fully autonomously (no remote control)</li>
            <li>Only one programmable controller allowed</li>
            <li>Sensors such as color, ultrasonic, gyro are permitted</li>
            <li>Maximum 4 motors allowed</li>
          </ul>
        </section>

        {/* Section 4: Playing Field */}
        <section id="playing-field" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            4. Playing Field
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Black line (2–3 cm width) on white surface</li>
            <li>May include curves, turns, intersections, gaps, and checkpoints</li>
            <li>Exact track will be revealed on competition day</li>
            <li>Start and finish zones clearly marked</li>
          </ul>
        </section>

        {/* Section 5: Game Rules */}
        <section id="game-rules" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            5. Game Rules
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Robot must start from the designated start area</li>
            <li>No human control during the run</li>
            <li>Each team gets 3 attempts</li>
            <li>If robot leaves the line, time penalty is applied</li>
            <li>Manual intervention is not allowed during run</li>
          </ul>
        </section>

        {/* Section 6: Scoring System */}
        <section id="scoring" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            6. Scoring System
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Based on completion time (fastest time wins)</li>
            <li>Accuracy of line following</li>
            <li>Penalties for violations added to final time</li>
            <li>Best of 3 attempts counts toward ranking</li>
          </ul>
        </section>

        {/* Section 7: Penalties */}
        <section id="penalties" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            7. Penalties
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Leaving track = +5 seconds to final time</li>
            <li>Manual interference = attempt disqualified</li>
            <li>Incomplete run = partial scoring based on checkpoints</li>
            <li>Starting before signal = +3 seconds penalty</li>
          </ul>
        </section>

        {/* Section 8: Safety & Fair Play */}
        <section id="safety-fairplay" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            8. Safety & Fair Play
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>No damage to field or equipment allowed</li>
            <li>Follow judge instructions at all times</li>
            <li>Cheating results in immediate disqualification</li>
            <li>All robots must pass safety inspection before competition</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-700 p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about LEGO Line?</h3>
          <p className="text-yellow-100 mb-6">
            Contact our technical team for clarifications on regulations
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-yellow-600 hover:bg-yellow-50 transition"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}

export default legoline