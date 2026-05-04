import { Link } from "react-router-dom"

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
            Junior sumo robotics competition - Designed for young participants aged 8-12
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Mini Sumo Kids Regulations</h1>
          <p className="text-lg text-slate-600">Junior robot sumo competition standards for autonomous and RC-controlled robots</p>
        </header>

        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>GLOSSARY OF TERMS</h2>
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
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter I: General Provisions</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>Objective</p>
              <p>This regulation defines the rules of a battle and regulations for the Mini Sumo category.</p>
            </div>
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter II: Match Definition</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>Definition</p>
              <p>In a match, both contestants compete for a Yuko Point using Radio-Control or Autonomous type robots in a Dohyo according to this regulation.</p>
            </div>
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter III: Dohyo Specifications</h2>
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

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter IV: Robot Specifications</h2>
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

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter V: Movement Conditions</h2>
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

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter VI: Prohibited Matters</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <p>No disturbing wave generators, lasers, flash, infrared.</p>
            <p>No components scratching Dohyo surface.</p>
            <p>No spraying devices.</p>
            <p>No ignition devices.</p>
            <p>No shooting/throwing devices.</p>
            <p>No fixing devices like suckers or glue.</p>
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter VII: Battle Rules</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <p>Battle time: 3 matches within 3 minutes. Winner gets 2 Yuko points.</p>
            <p>If tie, decided by Yusei. Extension if needed.</p>
            <p>No maintenance during battle except allowed setups.</p>
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter VIII: Match Execution</h2>
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

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter IX: Yuko Point, Shinitai and Yusei</h2>
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

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter X: Hansoku and Keikoku</h2>
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

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Chapter XI: Hansoku-make, Shikkaku</h2>
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

        <section className='mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-6'>Appendix: Notes and Cases</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <p>Adapted notes for Mini Sumo: Similar to Mega Sumo but scaled for 500g robots and 77cm arena.</p>
            <p>Inspection box: 105x105mm for 10cm robots.</p>
            <p>Blade rules: Same as Mega Sumo, no breaking into parts.</p>
            <p>Maintenance: Limited to cleaning, verification, minor fixes.</p>
            <p>Yuko Point: First to touch outside loses.</p>
            <p>Assistant cannot become operator if injured.</p>
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
