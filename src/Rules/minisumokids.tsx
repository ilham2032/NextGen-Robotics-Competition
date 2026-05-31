import { Link } from "react-router-dom"
import { resolvePublicUrl } from "../utils/publicAsset"

const minisumokids = () => {
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
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-200 mb-4 mt-6">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 ">
            Mini Sumo Kids
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Junior regulation summary for young competitors, balancing safety with robot performance in a scaled Mini Sumo format.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/regulations"
              className="rounded-lg bg-white/10 border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/20 transition"
            >
              ← Back to Regulations
            </Link>
            <a
              href={resolvePublicUrl("regs/mini-sumo-kids.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="rounded-lg bg-white px-6 py-3 text-blue-700 font-semibold hover:bg-slate-100 transition"
            >
              Download Mini Sumo Kids PDF
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
            <li><a href="#glossary" className="hover:text-blue-900">1. Glossary of Terms</a></li>
            <li><a href="#general-provisions" className="hover:text-blue-900">2. General Provisions</a></li>
            <li><a href="#match-definition" className="hover:text-blue-900">3. Match Structure</a></li>
            <li><a href="#dohyo-specs" className="hover:text-blue-900">4. Dohyo Specifications</a></li>
            <li><a href="#robot-specs" className="hover:text-blue-900">5. Robot Specifications</a></li>
            <li><a href="#movement-conditions" className="hover:text-blue-900">6. Movement Conditions</a></li>
            <li><a href="#prohibited-matters" className="hover:text-blue-900">7. Prohibited Matters</a></li>
            <li><a href="#battle-rules" className="hover:text-blue-900">8. Battle Rules</a></li>
            <li><a href="#match-execution" className="hover:text-blue-900">9. Match Execution</a></li>
            <li><a href="#yuko-points" className="hover:text-blue-900">10. Yuko Points</a></li>
            <li><a href="#penalties" className="hover:text-blue-900">11. Penalties</a></li>
            <li><a href="#disqualification" className="hover:text-blue-900">12. Disqualification</a></li>
            <li><a href="#appendix" className="hover:text-blue-900">13. Appendix</a></li>
          </ol>
        </nav>

        {/* Section 1: Glossary of Terms */}
        <section id="glossary" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            1. Glossary of Terms
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
              <p>These regulations define the structure and technical requirements for Mini Sumo Kids to ensure a fair, safe, and engaging youth competition.</p>
            </div>
            <div>
              <p className='font-semibold'>2.2 Age Group</p>
              <p>This category is intended for participants aged 8–12. Teams should ensure robots are safe for junior operators and spectators.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Match Definition */}
        <section id="match-definition" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            3. Match Definition
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>Definition</p>
              <p>In a match, both contestants compete for a Yuko Point using Radio-Control or Autonomous type robots in a Dohyo according to this regulation.</p>
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
              <p className='font-semibold'>Dohyo Specifications</p>
              <p>Dohyo Jonai consists of Dohyo and Yochi. Rest is Dohyo Jogai.</p>
            </div>
            <div>
              <p className='font-semibold'>Specifications of Dohyo</p>
              <p>Circular wooden frame of 77 cm diameter (including Tawara) covered with formica laminate at 2.5 cm height.</p>
            </div>
            <div>
              <p className='font-semibold'>Shikiri-Sen</p>
              <p>Two brown lines 2 cm wide, 20 cm long, 10 cm from center.</p>
            </div>
            <div>
              <p className='font-semibold'>Tawara</p>
              <p>White circle line 5 cm width, considered within Dohyo.</p>
            </div>
            <div>
              <p className='font-semibold'>Yochi</p>
              <p>Square area 360 cm side, free shape/material but safety prioritized.</p>
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
              <p className='font-semibold'>Robot Measures</p>
              <p>Less than or equal to 10 cm width and 10 cm depth (no height restrictions).</p>
            </div>
            <div>
              <p className='font-semibold'>Robot Weight</p>
              <p>Less than or equal to 500 g (including accessories); PCS weight excluded for RC type.</p>
            </div>
            <div>
              <p className='font-semibold'>Radio Waves</p>
              <p>Narrow band waves of 2.4 GHz, 27 MHz or 40 MHz for RC type.</p>
            </div>
            <div>
              <p className='font-semibold'>PCS Requirements</p>
              <p>Only one PCS allowed. Fujisoft Shin Rajikon System or Futaba, JR, Sanwa, Kondo Kagaku brands.</p>
            </div>
            <div>
              <p className='font-semibold'>Autonomous Starting</p>
              <p>Starts with Judge Remote Control signal.</p>
            </div>
            <div>
              <p className='font-semibold'>Autonomous Stopping</p>
              <p>Stops with Judge Remote Control or player's remote (non-PCS waves).</p>
            </div>
            <div>
              <p className='font-semibold'>Blade Conditions</p>
              <p>Prohibited materials that can break into two parts.</p>
            </div>
            <div>
              <p className='font-semibold'>Fire Prevention</p>
              <p>Safety equipment like fuses required.</p>
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
              <p className='font-semibold'>Autonomous Movement</p>
              <p>Robot must detect, turn, face and act against opponent independently.</p>
            </div>
            <div>
              <p className='font-semibold'>Remote Control Usage</p>
              <p>Remote placed at designated place, operated from Dohyo Jogai.</p>
            </div>
          </div>
        </section>

        {/* Section 7: Prohibited Matters */}
        <section id="prohibited-matters" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            7. Prohibited Matters
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>7.1 Restricted Devices</p>
              <p>The following are prohibited: disturbing wave generators, lasers, rapid-flash devices, and infrared emitters.</p>
            </div>
            <div>
              <p className='font-semibold'>7.2 Arena Safety</p>
              <p>Robots must not scratch or damage the dohyo surface. All contact surfaces must be smooth.</p>
            </div>
            <div>
              <p className='font-semibold'>7.3 Prohibited Offensive Systems</p>
              <p>No spraying, ignition, shooting, throwing, or entanglement mechanisms are allowed.</p>
            </div>
            <div>
              <p className='font-semibold'>7.4 Adhesives and Suction</p>
              <p>Adhesive devices, vacuum suckers or glue-based traction systems are prohibited.</p>
            </div>
          </div>
        </section>

        {/* Section 8: Battle Rules */}
        <section id="battle-rules" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            8. Battle Rules
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>8.1 Match Duration</p>
              <p>Each contest consists of up to 3 rounds. Victory is awarded to the first robot to score two Yuko points.</p>
            </div>
            <div>
              <p className='font-semibold'>8.2 Tie Resolution</p>
              <p>If the contest is tied after three rounds, judges decide the winner based on Yusei criteria or order an extension round.</p>
            </div>
            <div>
              <p className='font-semibold'>8.3 Maintenance</p>
              <p>No maintenance is allowed during an active contest, except for approved setup or repair interventions between rounds.</p>
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
              <p className='font-semibold'>Safety Measures</p>
              <p>Goggles, gloves, sports shoes required. PCS operated only during match.</p>
            </div>
            <div>
              <p className='font-semibold'>Match Beginning</p>
              <p>Bow, enter Dohyo, place robots at Shikiri-sen manually, start with signal.</p>
            </div>
            <div>
              <p className='font-semibold'>Match Ending</p>
              <p>Stop at judge signal, announce winner.</p>
            </div>
            <div>
              <p className='font-semibold'>Torinaoshi</p>
              <p>Rematch if both stuck, touch outside simultaneously, or judges decide.</p>
            </div>
          </div>
        </section>

        {/* Section 10: Yuko Point, Shinitai and Yusei */}
        <section id="yuko-points" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            10. Yuko Point, Shinitai and Yusei
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>Yuko Point</p>
              <p>Granted for pushing opponent out, opponent touching outside, Shinitai, Yusei, double Keikoku, Hansoku, Fusensho.</p>
            </div>
            <div>
              <p className='font-semibold'>Shinitai</p>
              <p>Opponent's wheels out of Dohyo for count of 3.</p>
            </div>
            <div>
              <p className='font-semibold'>Yusei</p>
              <p>Judges decide predominant robot based on strategy, movements, skills.</p>
            </div>
          </div>
        </section>

        {/* Section 11: Hansoku and Keikoku */}
        <section id="penalties" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            11. Hansoku and Keikoku
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>Keikoku</p>
              <p>Warning for entering Dohyo, premature movement, remote violations, delays, etc. Two Keikoku = Yuko to opponent.</p>
            </div>
            <div>
              <p className='font-semibold'>Hansoku</p>
              <p>Yuko to opponent for robot splitting, not moving, no contact, stopping match, dangerous starts, flying parts.</p>
            </div>
          </div>
        </section>

        {/* Section 12: Hansoku-make, Shikkaku */}
        <section id="disqualification" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            12. Hansoku-make, Shikkaku
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>Hansoku-make</p>
              <p>Lose battle for not showing up, damaging Dohyo, violating specs, not moving properly, no safety gear, fire.</p>
            </div>
            <div>
              <p className='font-semibold'>Shikkaku</p>
              <p>Disqualified for prohibited designs, unsportsmanlike behavior, intentional injury.</p>
            </div>
          </div>
        </section>

        {/* Section 13: Appendix: Notes and Cases */}
        <section id="appendix" className="mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-blue-500">
            13. Appendix
          </h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <p>These notes adapt the Mini Sumo rules for junior participants, preserving the same technical structure as the broader Mega Sumo standards.</p>
            <p>The inspection box for Mini Sumo Kids is 105×105 mm for robots measuring 10 cm on each side.</p>
            <p>Robots must comply with blade and fragmentation safety rules; any part that separates during a match is not permitted.</p>
            <p>Maintenance between rounds is limited to cleaning, verification, and minor adjustments approved by referees.</p>
            <p>A robot touching the outside boundary first may result in a Yuko point for the opponent under the governing rules.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about Mini Sumo Kids?</h3>
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

export default minisumokids
