import { Link } from "react-router-dom"
import { resolvePublicUrl } from "../utils/publicAsset"

const minisumo = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-blue-900 via-blue-800 to-blue-900 py-20">
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
            Mini Sumo
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Regulations for the 500g Mini Sumo category, covering autonomous and RC competition on a 77cm dohyo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/regulations"
              className="rounded-lg bg-white/10 border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/20 transition"
            >
              ← Back to Regulations
            </Link>
            <a
              href={resolvePublicUrl("regs/mini-sumo.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="rounded-lg bg-white px-6 py-3 text-blue-700 font-semibold hover:bg-slate-100 transition"
            >
              Download Mini Sumo PDF
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        
        {/* Table of Contents */}
        <nav className="mb-12 rounded-2xl bg-blue-50 p-6 border border-blue-100">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Contents</h2>
          <ol className="space-y-2 text-blue-700">
            <li><a href="#glossary" className="hover:text-blue-900">1. Glossary</a></li>
            <li><a href="#general-provisions" className="hover:text-blue-900">2. General Provisions</a></li>
            <li><a href="#match-definition" className="hover:text-blue-900">3. Match Structure</a></li>
            <li><a href="#dohyo-specs" className="hover:text-blue-900">4. Dohyo Specifications</a></li>
            <li><a href="#robot-specs" className="hover:text-blue-900">5. Robot Specifications</a></li>
            <li><a href="#movement-conditions" className="hover:text-blue-900">6. Movement Conditions</a></li>
            <li><a href="#prohibited-matters" className="hover:text-blue-900">7. Prohibitions</a></li>
            <li><a href="#match-rules" className="hover:text-blue-900">8. Match Rules</a></li>
            <li><a href="#match-execution" className="hover:text-blue-900">9. Match Execution</a></li>
            <li><a href="#victory-conditions" className="hover:text-blue-900">10. Victory Conditions</a></li>
            <li><a href="#penalties" className="hover:text-blue-900">11. Penalties & Warnings</a></li>
            <li><a href="#disqualification" className="hover:text-blue-900">12. Disqualification</a></li>
            <li><a href="#inspection-safety" className="hover:text-blue-900">13. Inspection & Safety</a></li>
          </ol>
        </nav>

        {/* Section 1: Glossary */}
        <section id="glossary" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            1. Glossary
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>Battle:</p>
              <p>The confrontation between 2 robots, composed of 3 matches.</p>
            </div>
            <div>
              <p className='font-semibold'>Dohyo:</p>
              <p>The match ring where the robots fight.</p>
            </div>
            <div>
              <p className='font-semibold'>Dohyo Jonai:</p>
              <p>All the match area considered as battle zone.</p>
            </div>
            <div>
              <p className='font-semibold'>Dohyo Jogai:</p>
              <p>All the outside area from the Dohyo Jonai.</p>
            </div>
            <div>
              <p className='font-semibold'>Fusensho:</p>
              <p>A win by default due to opponent not appearing or robot not working.</p>
            </div>
            <div>
              <p className='font-semibold'>Hansoku:</p>
              <p>Violation or penalty.</p>
            </div>
            <div>
              <p className='font-semibold'>Hansoku-Make:</p>
              <p>Losing a battle by violation or penalty.</p>
            </div>
            <div>
              <p className='font-semibold'>Judge Remote Control:</p>
              <p>Official remote control used by judges to start/stop autonomous robots.</p>
            </div>
            <div>
              <p className='font-semibold'>Keikoku:</p>
              <p>Warning or advise.</p>
            </div>
            <div>
              <p className='font-semibold'>Match:</p>
              <p>The time where 2 robots fight to push the opponent outside the Dohyo.</p>
            </div>
            <div>
              <p className='font-semibold'>PCS:</p>
              <p>Proportional Control System for RC type robots.</p>
            </div>
            <div>
              <p className='font-semibold'>Shikiri-sen:</p>
              <p>Starting line delimiting robot placement.</p>
            </div>
            <div>
              <p className='font-semibold'>Shikkaku:</p>
              <p>Disqualification.</p>
            </div>
            <div>
              <p className='font-semibold'>Shinitai:</p>
              <p>Death robot - cannot move because wheels don't touch the Dohyo.</p>
            </div>
            <div>
              <p className='font-semibold'>Tawara:</p>
              <p>White line delimiting the external border of the Dohyo.</p>
            </div>
            <div>
              <p className='font-semibold'>Torinaoshi:</p>
              <p>Rematch or repeat a match.</p>
            </div>
            <div>
              <p className='font-semibold'>Yuko Point:</p>
              <p>Effective point for defeating the opponent.</p>
            </div>
            <div>
              <p className='font-semibold'>Yusei:</p>
              <p>Predominant robot showing more battle actions.</p>
            </div>
            <div>
              <p className='font-semibold'>Yochi:</p>
              <p>Square area where the Dohyo is placed, delimiting safe area.</p>
            </div>
          </div>
        </section>

        {/* Section 2: General Provisions */}
        <section id="general-provisions" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            2. General Provisions
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>2.1 Objective</p>
              <p>This regulation defines the competition format and technical requirements for Mini Sumo, ensuring safety, fairness, and consistent judging.</p>
            </div>
            <div>
              <p className='font-semibold'>2.2 Autonomy Requirement</p>
              <p>Robots may compete as either fully autonomous or radio-controlled units, but no external control is permitted once the match starts.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Match Definition */}
        <section id="match-definition" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            3. Match Structure
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>3.1 Match Format</p>
              <p>Each match is contested between two robots in a standard dohyo. The objective is to score Yuko points by forcing the opponent outside the boundary or otherwise satisfying victory conditions.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Dohyo Specifications */}
        <section id="dohyo-specs" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            4. Dohyo Specifications
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>3.1 Arena Composition</p>
              <p>Dohyo Jonai consists of Dohyo and Yochi. Rest is Dohyo Jogai (outside area).</p>
            </div>
            <div>
              <p className='font-semibold'>3.2 Dohyo Dimensions</p>
              <p>Circular wooden frame of 77 cm diameter (including Tawara) covered with formica laminate at 2.5 cm height.</p>
            </div>
            <div>
              <p className='font-semibold'>3.3 Starting Lines (Shikiri-Sen)</p>
              <p>Two brown lines 2 cm wide, 20 cm long, positioned 10 cm from center.</p>
            </div>
            <div>
              <p className='font-semibold'>3.4 Border Marking (Tawara)</p>
              <p>White circle line 5 cm width, considered within Dohyo boundaries.</p>
            </div>
            <div>
              <p className='font-semibold'>3.5 Safety Area (Yochi)</p>
              <p>Square area 360 cm per side, free shape/material but safety is prioritized.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Robot Specifications */}
        <section id="robot-specs" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            5. Robot Specifications
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>5.1 Dimensions</p>
              <p>Maximum width and depth: 10 cm each. Height is unrestricted provided the robot remains stable and safe.</p>
            </div>
            <div>
              <p className='font-semibold'>5.2 Maximum Weight</p>
              <p>Maximum weight is 500 g including all accessories; PCS weight is excluded for RC robots.</p>
            </div>
            <div>
              <p className='font-semibold'>5.3 Radio Frequency</p>
              <p>Permitted frequencies for RC robots are 2.4 GHz, 27 MHz, or 40 MHz only.</p>
            </div>
            <div>
              <p className='font-semibold'>5.4 Control System</p>
              <p>Only one PCS system is permitted. Approved systems include Fujisoft Shin Rajikon, Futaba, JR, Sanwa, and Kondo Kagaku.</p>
            </div>
            <div>
              <p className='font-semibold'>5.5 Autonomous Control</p>
              <p>Autonomous robots must begin after the judge signal and may be stopped only by judge control or the designated player remote.</p>
            </div>
            <div>
              <p className='font-semibold'>5.6 Structural Requirements</p>
              <p>Robots must not include materials that can break into separate parts. Required safety components such as fuses must be installed.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Movement Conditions */}
        <section id="movement-conditions" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            6. Movement Conditions
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>5.1 Autonomous Robots</p>
              <p>Must detect, turn, face, and act against opponent independently without external input.</p>
            </div>
            <div>
              <p className='font-semibold'>5.2 Remote Control Operation</p>
              <p>Remote placed at designated location, operated from Dohyo Jogai (outside arena area).</p>
            </div>
          </div>
        </section>

        {/* Section 7: Prohibited Matters & Weapons */}
        <section id="prohibited-matters" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            7. Prohibited Matters & Weapons
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>6.1 Disruptive Devices</p>
              <p>Disturbing wave generators, lasers, flash, and infrared devices are prohibited.</p>
            </div>
            <div>
              <p className='font-semibold'>6.2 Arena Damage</p>
              <p>No robot components that scratch or damage Dohyo surface.</p>
            </div>
            <div>
              <p className='font-semibold'>6.3 Projectiles and Emissions</p>
              <p>No spraying devices, ignition devices, or shooting/throwing mechanisms.</p>
            </div>
            <div>
              <p className='font-semibold'>6.4 Adhesive Systems</p>
              <p>No fixing devices like vacuum suckers or adhesive glues.</p>
            </div>
          </div>
        </section>

        {/* Section 8: Match Rules */}
        <section id="match-rules" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            8. Match Rules
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>7.1 Battle Format</p>
              <p>Battle consists of 3 matches within 3 minutes total. Winner acquires 2 Yuko points.</p>
            </div>
            <div>
              <p className='font-semibold'>7.2 Tie Resolution</p>
              <p>If tied, winner is decided by Yusei (judge evaluation). Extension match may be required.</p>
            </div>
            <div>
              <p className='font-semibold'>7.3 Maintenance Restrictions</p>
              <p>No maintenance allowed during battle except approved setups and preparations.</p>
            </div>
          </div>
        </section>

        {/* Section 9: Match Execution */}
        <section id="match-execution" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            9. Match Execution
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>8.1 Safety Requirements</p>
              <p>Goggles, gloves, and sports shoes required. PCS operated only during active match.</p>
            </div>
            <div>
              <p className='font-semibold'>8.2 Match Beginning</p>
              <p>Competitors bow, enter Dohyo, place robots at Shikiri-sen manually, then begin at signal.</p>
            </div>
            <div>
              <p className='font-semibold'>8.3 Match Ending</p>
              <p>Stop at judge signal and announce winner immediately.</p>
            </div>
            <div>
              <p className='font-semibold'>8.4 Rematch (Torinaoshi)</p>
              <p>Rematch required if both robots stuck, both touch outside simultaneously, or judges decide.</p>
            </div>
          </div>
        </section>

        {/* Section 10: Victory Conditions */}
        <section id="victory-conditions" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            10. Victory Conditions
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>9.1 Yuko Point</p>
              <p>Granted for opponent pushed out, opponent touching outside, Shinitai, Yusei decision, double Keikoku, or rule violations.</p>
            </div>
            <div>
              <p className='font-semibold'>9.2 Shinitai (Death Robot)</p>
              <p>Opponent's wheels out of Dohyo for count of 3 seconds constitutes immobilization.</p>
            </div>
            <div>
              <p className='font-semibold'>9.3 Yusei (Predominance)</p>
              <p>Judges decide predominant robot based on strategy, movement quality, and technical skills.</p>
            </div>
          </div>
        </section>

        {/* Section 11: Penalties & Warnings */}
        <section id="penalties" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            11. Penalties & Warnings
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>10.1 Keikoku (Warning)</p>
              <p>Warning for entering Dohyo improperly, premature movement, remote violations, delays. Two warnings = Yuko to opponent.</p>
            </div>
            <div>
              <p className='font-semibold'>10.2 Hansoku (Violation)</p>
              <p>Yuko awarded to opponent for robot splitting, no movement, no contact, match stopping, or dangerous starts.</p>
            </div>
          </div>
        </section>

        {/* Section 12: Disqualification */}
        <section id="disqualification" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            12. Disqualification
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>11.1 Hansoku-Make (Battle Loss)</p>
              <p>Lose battle for not appearing, damaging Dohyo, violating specifications, improper movement, or safety violations.</p>
            </div>
            <div>
              <p className='font-semibold'>11.2 Shikkaku (Tournament Disqualification)</p>
              <p>Disqualified for prohibited designs, unsportsmanlike behavior, or intentional harm.</p>
            </div>
          </div>
        </section>

        {/* Section 13: Inspection & Safety */}
        <section id="inspection-safety" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            13. Inspection & Safety
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>12.1 Pre-Match Inspection</p>
              <p>Inspection box: 105×105mm for 10cm robots. All robots must pass inspection before competition.</p>
            </div>
            <div>
              <p className='font-semibold'>12.2 Structural Integrity</p>
              <p>Blade rules: No materials that can break into separate parts. Same standards as Mega Sumo.</p>
            </div>
            <div>
              <p className='font-semibold'>12.3 Maintenance Rules</p>
              <p>Limited to cleaning, verification, and minor fixes between matches.</p>
            </div>
          </div>
        </section>

        <div className="mt-16 p-8 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-slate-700">
            <span className="font-semibold">Note:</span> Mini Sumo regulations are adapted from All Japan Robot Sumo Tournament standards and scaled for 500g robots on a 77cm arena. These regulations are subject to modification at the discretion of the competition organizing committee. Teams will receive advance notice of any changes.
          </p>
        </div>

        {/* Contact Section */}
        <section className="rounded-2xl bg-linear-to-r from-blue-600 to-blue-800 p-8 text-center mt-12 mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about Mini Sumo?</h3>
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

export default minisumo