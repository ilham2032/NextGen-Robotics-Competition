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

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div>
          <h3 className='text-3xl font-bold text-slate-900 mb-6'>1. Overview</h3>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            The LEGO Line Category requires teams to design and program an autonomous LEGO robot
            capable of following a line track accurately and efficiently. This category is perfect for 
            teams using LEGO Spike Prime, Mindstorms, or classic LEGO robotics kits.
          </p>
        </div>

        <div>
          <h3 className='text-3xl font-bold text-slate-900 mb-6'>2. Team Requirements</h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Teams must consist of 1–4 members</li>
            <li>Each team must register before the deadline</li>
            <li>Only one robot per team is allowed</li>
            <li>All team members must be present during competition</li>
          </ul>
        </div>

        <div className="mt-10">
          <h3 className='text-3xl font-bold text-slate-900 mb-6'>3. Robot Specifications</h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Must be built mainly using LEGO components (SPIKE, Mindstorms, etc.)</li>
            <li>Maximum size: 25cm x 25cm x 25cm at start position</li>
            <li>Must operate fully autonomously (no remote control)</li>
            <li>Only one programmable controller allowed</li>
            <li>Sensors such as color, ultrasonic, gyro are permitted</li>
            <li>Maximum 4 motors allowed</li>
          </ul>
        </div>

        <div className="mt-10">
          <h3 className='text-3xl font-bold text-slate-900 mb-6'>4. Playing Field</h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Black line (2–3 cm width) on white surface</li>
            <li>May include curves, turns, intersections, gaps, and checkpoints</li>
            <li>Exact track will be revealed on competition day</li>
            <li>Start and finish zones clearly marked</li>
          </ul>
        </div>

        <div className="mt-10">
          <h3 className='text-3xl font-bold text-slate-900 mb-6'>5. Game Rules</h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Robot must start from the designated start area</li>
            <li>No human control during the run</li>
            <li>Each team gets 3 attempts</li>
            <li>If robot leaves the line, time penalty is applied</li>
            <li>Manual intervention is not allowed during run</li>
          </ul>
        </div>

        <div className="mt-10">
          <h3 className='text-3xl font-bold text-slate-900 mb-6'>6. Scoring System</h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Based on completion time (fastest time wins)</li>
            <li>Accuracy of line following</li>
            <li>Penalties for violations added to final time</li>
            <li>Best of 3 attempts counts toward ranking</li>
          </ul>
        </div>

        <div className="mt-10">
          <h3 className='text-3xl font-bold text-slate-900 mb-6'>7. Penalties</h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>Leaving track = +5 seconds to final time</li>
            <li>Manual interference = attempt disqualified</li>
            <li>Incomplete run = partial scoring based on checkpoints</li>
            <li>Starting before signal = +3 seconds penalty</li>
          </ul>
        </div>

        <div className="mt-10">
          <h3 className='text-3xl font-bold text-slate-900 mb-6'>8. Safety & Fair Play</h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 text-lg">
            <li>No damage to field or equipment allowed</li>
            <li>Follow judge instructions at all times</li>
            <li>Cheating results in immediate disqualification</li>
            <li>All robots must pass safety inspection before competition</li>
          </ul>
        </div>

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