import { Link } from "react-router"

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
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
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
          <p className="text-lg text-slate-600">Junior robot sumo competition standards adapted from All Japan Robot Sumo Tournament</p>
        </header>

        {/* Section 1: General Provisions */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>1. GENERAL PROVISIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>1.1 Competition Objectives</p>
              <p>This regulation defines the rules of battle and establishes standards for the Mini Sumo Kids category, designed for young competitors using both radio-controlled and autonomous robots.</p>
            </div>
            <div>
              <p className='font-semibold'>1.2 Match Definition</p>
              <p>In a match, both contestants compete for Yuko Points using Radio-Control or Autonomous type robots in a Dohyo according to these regulations.</p>
            </div>
            <div>
              <p className='font-semibold'>1.3 Tournament Structure</p>
              <p>Competitions follow a best-of-three format where the first team to win 2 Yuko Points is declared match winner.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Dohyo Specifications */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>2. DOHYO SPECIFICATIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>2.1 Arena Division</p>
              <p>Dohyo Jonai consists of the Dohyo and Yochi. All areas outside comprise Dohyo Jogai. The Dohyo is a circular wooden frame of 77 cm diameter (including Tawara) covered with formica laminate at 2.5 cm height.</p>
            </div>
            <div>
              <p className='font-semibold'>2.2 Starting Lines (Shikiri-Sen)</p>
              <p>Two brown lines positioned 2 cm wide, 20 cm long, and 10 cm from center mark robot starting positions.</p>
            </div>
            <div>
              <p className='font-semibold'>2.3 Arena Boundary (Tawara)</p>
              <p>White circle line 5 cm width considered within Dohyo marks the outer boundary where robots must not cross.</p>
            </div>
            <div>
              <p className='font-semibold'>2.4 Safety Zone (Yochi)</p>
              <p>Square area 360 cm side, free shape/material but safety prioritized provides spectator viewing protection.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Robot Specifications */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>3. ROBOT SPECIFICATIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>3.1 Dimension Limits</p>
              <p>Robot must not exceed 10 cm width and 10 cm depth (no height restrictions). Robots may expand after match start provided all components remain physically connected.</p>
            </div>
            <div>
              <p className='font-semibold'>3.2 Weight Limit</p>
              <p>Less than or equal to 500 g (including accessories). PCS weight excluded for RC type robots. Weight strictly verified before each match.</p>
            </div>
            <div>
              <p className='font-semibold'>3.3 Radio Communication Standards</p>
              <p>Narrow band waves of 2.4 GHz, 27 MHz or 40 MHz for RC type. Only one PCS (Proportional Control System) allowed. Approved brands: Fujisoft Shin Rajikon, Futaba, JR, Sanwa, Kondo Kagaku.</p>
            </div>
            <div>
              <p className='font-semibold'>3.4 Control Systems</p>
              <p>Autonomous robots start with Judge Remote Control signal. Autonomous robots stop with Judge Remote Control or player's remote (non-PCS waves).</p>
            </div>
            <div>
              <p className='font-semibold'>3.5 Material and Safety Requirements</p>
              <p>Blade materials must not break into separate parts. Safety equipment like fuses required. Fire prevention systems mandatory. All components must be inert and safe.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Movement and Control */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>4. MOVEMENT AND CONTROL</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>4.1 Autonomous Movement Requirements</p>
              <p>Autonomous robots must detect, turn, face and act against opponent independently. No external intervention or remote control allowed during match execution.</p>
            </div>
            <div>
              <p className='font-semibold'>4.2 Remote Control Operation</p>
              <p>Remote control unit placed at designated area, operated exclusively from Dohyo Jogai (outside the ring boundary).</p>
            </div>
          </div>
        </section>

        {/* Section 5: Prohibited Equipment and Actions */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>5. PROHIBITED EQUIPMENT AND ACTIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>5.1 Electromagnetic Interference</p>
              <p>No disturbing wave generators, lasers, flash, or infrared devices permitted.</p>
            </div>
            <div>
              <p className='font-semibold'>5.2 Surface Protection</p>
              <p>No components scratching Dohyo surface. No adhesives or gels for surface alteration.</p>
            </div>
            <div>
              <p className='font-semibold'>5.3 Weapon Restrictions</p>
              <p>No spraying devices, ignition devices, or shooting/throwing mechanisms allowed.</p>
            </div>
            <div>
              <p className='font-semibold'>5.4 Attachment Restrictions</p>
              <p>No fixing devices like suckers or glue to gain unfair advantage.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Battle Rules */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>6. BATTLE RULES</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>6.1 Battle Format</p>
              <p>Battle time consists of 3 matches within 3 minutes. Winner is first team to win 2 Yuko Points.</p>
            </div>
            <div>
              <p className='font-semibold'>6.2 Tie Resolution</p>
              <p>If tied after 3 minutes, judges determine winner based on Yusei (dominance). Extension rounds may be used if needed.</p>
            </div>
            <div>
              <p className='font-semibold'>6.3 Maintenance Restrictions</p>
              <p>No maintenance allowed during battle except for allowed robot repositioning between matches.</p>
            </div>
          </div>
        </section>

        {/* Section 7: Match Execution Procedures */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>7. MATCH EXECUTION PROCEDURES</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>7.1 Safety Requirements</p>
              <p>Goggles, gloves, and sports shoes required for all participants. PCS operated only during active match time.</p>
            </div>
            <div>
              <p className='font-semibold'>7.2 Match Start Procedure</p>
              <p>Teams bow to judges, enter Dohyo, place robots at Shikiri-sen lines, acknowledge judge readiness, start with judge signal.</p>
            </div>
            <div>
              <p className='font-semibold'>7.3 Match Conclusion</p>
              <p>Stop robots at judge signal, announce match winner, provide brief explanation of victory condition met.</p>
            </div>
            <div>
              <p className='font-semibold'>7.4 Rematch (Torinaoshi)</p>
              <p>Rematch ordered if both robots stuck, both touch boundary simultaneously, or judges decide conditions warrant replay.</p>
            </div>
          </div>
        </section>

        {/* Section 8: Victory Conditions and Scoring */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>8. VICTORY CONDITIONS AND SCORING</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>8.1 Yuko Point (Effective Win)</p>
              <p>Granted for: pushing opponent out of ring, opponent touching boundary, Shinitai condition, Yusei determination, double Keikoku, Hansoku violation, or Fusensho default.</p>
            </div>
            <div>
              <p className='font-semibold'>8.2 Shinitai (Immobilized Robot)</p>
              <p>Opponent's wheels out of Dohyo for continuous count of 3 seconds results in automatic victory.</p>
            </div>
            <div>
              <p className='font-semibold'>8.3 Yusei (Dominance Decision)</p>
              <p>Judges decide predominant robot based on strategy, aggressive movements, and overall battle skills when time expires without clear victory.</p>
            </div>
          </div>
        </section>

        {/* Section 9: Penalties and Violations */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>9. PENALTIES AND VIOLATIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>9.1 Keikoku (Warning)</p>
              <p>Warning issued for entering Dohyo improperly, premature movement before signal, remote control violations, excessive delays, or procedural infractions. Two Keikoku = automatic Yuko to opponent.</p>
            </div>
            <div>
              <p className='font-semibold'>9.2 Hansoku (Match Violation)</p>
              <p>Yuko awarded to opponent for robot splitting, robot not moving, no contact attempt, stopping match, dangerous starting, flying parts, or equipment failure.</p>
            </div>
          </div>
        </section>

        {/* Section 10: Disqualification */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>10. DISQUALIFICATION</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>10.1 Hansoku-Make (Battle Loss)</p>
              <p>Automatic battle loss for not showing up, damaging Dohyo arena, violating robot specifications, not moving properly, lack of safety gear, or fire hazard.</p>
            </div>
            <div>
              <p className='font-semibold'>10.2 Shikkaku (Tournament Disqualification)</p>
              <p>Disqualified from entire tournament for prohibited designs, unsportsmanlike behavior, intentional injury to opponent, or repeated rule violations.</p>
            </div>
          </div>
        </section>

        <div className="mt-16 p-8 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-slate-700">
            <span className="font-semibold">Note:</span> These regulations are adapted from All Japan Robot Sumo Tournament standards and are subject to modification at the discretion of the competition organizing committee. Teams will receive advance notice of any changes. All equipment must pass safety inspection before competition.
          </p>
        </div>

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
