import { Link } from "react-router"

const legoline = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-200 mt-6 mb-4">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            LEGO Line Follower
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
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
        <header className="text-center mb-16 pt-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">LEGO Line Follower Regulations</h1>
          <p className="text-lg text-slate-600">LEGO-based autonomous line tracking competition standards</p>
        </header>

        {/* Section 1: Overview */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>1. OVERVIEW</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>1.1 Competition Objectives</p>
              <p>The LEGO Line Follower category requires teams to design and program an autonomous LEGO robot capable of following a line track accurately and efficiently. This category is perfect for teams using LEGO Spike Prime, Mindstorms, or classic LEGO robotics kits.</p>
            </div>
            <div>
              <p className='font-semibold'>1.2 Category Focus</p>
              <p>Teams must demonstrate proficiency in sensor integration, program logic, and autonomous navigation systems while maintaining strict adherence to LEGO-only construction standards.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Team Requirements */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>2. TEAM REQUIREMENTS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>2.1 Team Composition</p>
              <p>Teams must consist of 1–4 members per competition entry.</p>
            </div>
            <div>
              <p className='font-semibold'>2.2 Registration and Participation</p>
              <p>Each team must register before the deadline. Only one robot per team is allowed. All team members must be present during competition rounds.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Robot Specifications */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>3. ROBOT SPECIFICATIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>3.1 Construction Requirements</p>
              <p>Must be built mainly using LEGO components (SPIKE, Mindstorms, or classic LEGO kits). No non-LEGO mechanical parts permitted except for sensors specified by organizers.</p>
            </div>
            <div>
              <p className='font-semibold'>3.2 Dimension and Weight Limits</p>
              <p>Maximum size: 25cm x 25cm x 25cm at start position. No weight restrictions imposed. Robots may expand after start if all components remain connected.</p>
            </div>
            <div>
              <p className='font-semibold'>3.3 Autonomous Operation</p>
              <p>Must operate fully autonomously (no remote control). Only one programmable controller allowed.</p>
            </div>
            <div>
              <p className='font-semibold'>3.4 Sensor Specifications</p>
              <p>Sensors such as color, ultrasonic, and gyro are permitted. Only LEGO-compatible sensors allowed. Maximum 4 motors allowed.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Playing Field */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>4. PLAYING FIELD</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>4.1 Track Surface and Line Specifications</p>
              <p>Black line (2–3 cm width) on white surface. May include curves, turns, intersections, gaps, and checkpoints.</p>
            </div>
            <div>
              <p className='font-semibold'>4.2 Course Layout</p>
              <p>Exact track will be revealed on competition day. Start and finish zones clearly marked.</p>
            </div>
            <div>
              <p className='font-semibold'>4.3 Environmental Conditions</p>
              <p>Ambient lighting controlled. Track surface uniform and consistent throughout competition.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Game Rules */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>5. GAME RULES</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>5.1 Match Procedure</p>
              <p>Robot must start from the designated start area. No human control during the run. Each team gets 3 attempts.</p>
            </div>
            <div>
              <p className='font-semibold'>5.2 Run Conditions</p>
              <p>If robot leaves the line, time penalty is applied. Manual intervention is not allowed during run.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Scoring System */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>6. SCORING SYSTEM</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>6.1 Primary Scoring Metric</p>
              <p>Based on completion time (fastest time wins). Accuracy of line following also evaluated.</p>
            </div>
            <div>
              <p className='font-semibold'>6.2 Penalty Application</p>
              <p>Penalties for violations added to final time. Best of 3 attempts counts toward ranking.</p>
            </div>
          </div>
        </section>

        {/* Section 7: Penalties */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>7. PENALTIES</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>7.1 Track Deviation Penalties</p>
              <p>Leaving track = +5 seconds to final time.</p>
            </div>
            <div>
              <p className='font-semibold'>7.2 Intervention Penalties</p>
              <p>Manual interference = attempt disqualified.</p>
            </div>
            <div>
              <p className='font-semibold'>7.3 Incomplete Run Penalties</p>
              <p>Incomplete run = partial scoring based on checkpoints completed.</p>
            </div>
            <div>
              <p className='font-semibold'>7.4 Starting Penalties</p>
              <p>Starting before signal = +3 seconds penalty.</p>
            </div>
          </div>
        </section>

        {{/* Section 8: Safety & Fair Play */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>8. SAFETY AND FAIR PLAY</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>8.1 Equipment Safety</p>
              <p>No damage to field or equipment allowed. All robots must pass safety inspection before competition.</p>
            </div>
            <div>
              <p className='font-semibold'>8.2 Competition Integrity</p>
              <p>Follow judge instructions at all times. Cheating results in immediate disqualification.</p>
            </div>
          </div>
        </section>

        <div className="mt-16 p-8 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-slate-700">
            <span className="font-semibold">Note:</span> LEGO Line Follower competition follows international standards for autonomous line tracking. All robots must use exclusively LEGO components for construction. These regulations are subject to modification at the discretion of the competition organizing committee. Teams will receive advance notice of any changes.
          </p>
        </div>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-amber-600 to-amber-800 p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about LEGO Line Follower?</h3>
          <p className="text-amber-100 mb-6">
            Contact our technical team for clarifications on regulations
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-amber-700 hover:bg-amber-50 transition"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}

export default legoline
