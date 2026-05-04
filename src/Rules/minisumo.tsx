import { Link } from "react-router-dom"

const minisumo = () => {
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
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Mini Sumo
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Autonomous & RC robot sumo competition - Push your opponent out of the ring
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Mini Sumo Regulations</h1>
          <p className="text-lg text-slate-600">Competition-grade standards for small-scale sumo robotics</p>
        </header>

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>GLOSSARY</h2>
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

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>1. GENERAL PROVISIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>1.1 Objective</p>
              <p>This regulation defines the rules of a battle and regulations for the Mini Sumo category, ensuring fair and safe competition.</p>
            </div>
            <div>
              <p className='font-semibold'>1.2 Autonomy Requirement</p>
              <p>Robots must operate either as fully autonomous units or via radio control after match start, according to their specified type.</p>
            </div>
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>2. MATCH DEFINITION</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>2.1 Match Format</p>
              <p>In a match, both contestants compete for a Yuko Point using Radio-Control or Autonomous type robots in a Dohyo according to this regulation.</p>
            </div>
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>3. DOHYO SPECIFICATIONS</h2>
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

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>4. ROBOT SPECIFICATIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>4.1 Dimensions</p>
              <p>Maximum width and depth: 10 cm each. No height restrictions, provided stability is maintained.</p>
            </div>
            <div>
              <p className='font-semibold'>4.2 Maximum Weight</p>
              <p>500 g maximum (including accessories); PCS weight excluded for RC type.</p>
            </div>
            <div>
              <p className='font-semibold'>4.3 Radio Frequency</p>
              <p>Narrow band waves of 2.4 GHz, 27 MHz or 40 MHz for RC-type robots.</p>
            </div>
            <div>
              <p className='font-semibold'>4.4 Control System</p>
              <p>Only one PCS allowed. Approved brands: Fujisoft Shin Rajikon System, Futaba, JR, Sanwa, Kondo Kagaku.</p>
            </div>
            <div>
              <p className='font-semibold'>4.5 Autonomous Control</p>
              <p>Autonomous robots start with Judge Remote Control signal and stop via same signal or player remote.</p>
            </div>
            <div>
              <p className='font-semibold'>4.6 Structural Requirements</p>
              <p>Prohibited materials that can break into separate parts. Safety equipment like fuses required.</p>
            </div>
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>5. MOVEMENT CONDITIONS</h2>
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

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>6. PROHIBITED MATTERS AND WEAPONS</h2>
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

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>7. MATCH RULES</h2>
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

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>8. MATCH EXECUTION</h2>
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

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>9. VICTORY CONDITIONS</h2>
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

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>10. PENALTIES AND WARNINGS</h2>
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

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>11. DISQUALIFICATION</h2>
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

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>12. INSPECTION AND SAFETY</h2>
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
        <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center mt-12 mb-12">
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