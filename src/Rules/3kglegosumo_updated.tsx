import { Link } from "react-router-dom"

const LegoSumo3kg = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-100 mb-4 mt-6">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            LEGO Sumo (3kg)
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            LEGO robot sumo wrestling - Push your opponent out of the ring with enhanced weight allowance
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

      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="text-center mb-16 pt-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">LEGO Sumo (3kg) Regulations</h1>
          <p className="text-lg text-slate-600">Heavy-class LEGO robot sumo competition standards</p>
        </header>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">1. OVERVIEW</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">1.1 Competition Purpose</p>
              <p>The LEGO Sumo (3kg) category challenges teams to build autonomous LEGO robots that push opponent robots out of a circular ring (dohyo). This category follows the international LEGO Sumo standards with a 3kg weight limit, combining mechanical design, programming, and strategy.</p>
            </div>
            <div>
              <p className="font-semibold">1.2 Competition Format</p>
              <p>Best of 3 matches per bout. Winner advances through knockout bracket. Consolation rounds available for losers.</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">2. ROBOT SPECIFICATIONS</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">2.1 Material and Weight Limits</p>
              <p>Construction material: LEGO components only (SPIKE, Mindstorms, classic LEGO). Maximum weight: 3.0 kg (including battery).</p>
            </div>
            <div>
              <p className="font-semibold">2.2 Dimension Limits</p>
              <p>Maximum dimensions: 200mm × 200mm × 200mm (L×W×H). Robots may expand after match start if all components remain connected.</p>
            </div>
            <div>
              <p className="font-semibold">2.3 Control and Sensors</p>
              <p>Control type: Fully autonomous (no remote control). Programmable controller: LEGO Spike Prime, Mindstorms EV3, or equivalent. Sensors allowed: Color, distance, force, gyroscope (LEGO sensors only).</p>
            </div>
            <div>
              <p className="font-semibold">2.4 Power and Drive Systems</p>
              <p>Power supply: LEGO rechargeable battery or AA batteries. Drive system: LEGO motors only (max 4 motors).</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">3. THE DOHYO (RING)</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">3.1 Ring Specifications</p>
              <p>Dohyo diameter: 154cm (outer), 145cm (inner battle zone). Surface: Flat white or light-colored mat. Border: Black or dark ring boundary (5cm wide). Starting lines: Two parallel lines 30cm from center. Height: Dohyo elevated 5-10cm from floor.</p>
            </div>
            <div>
              <p className="font-semibold">3.2 Dohyo Divisions</p>
              <p>Dohyo Jonai: Inner battle area where matches occur. Dohyo Jogai: Area outside the ring boundary. Shikiri-sen: Starting lines for robot placement.</p>
            </div>
          </div>
        </section>

      
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">4. MATCH RULES</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">4.1 Match Structure</p>
              <p>Bout: Best of 3 matches. Match: Single round within the dohyo. Match duration: Maximum 3 minutes. Rest period: 2 minutes between matches.</p>
            </div>
            <div>
              <p className="font-semibold">4.2 Match Procedure</p>
              <p>Robots placed on shikiri-sen (starting lines). Judge gives "Ready" command. After 5 seconds, judge gives "Start" signal. Robots must begin moving within 3 seconds. Robots battle until one is pushed out of dohyo. Judge may stop match for violations.</p>
            </div>
          </div>
        </section>

       
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">5. SCORING SYSTEM</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">5.1 Victory Conditions</p>
              <p>Yuko (Effective Win): Opponent's robot fully exits dohyo. Fusensho (Default Win): Opponent fails to start or cannot move. Torinaoshi (Rematch): Match voided due to external factors. Draw: No winner after 3 minutes - decided by judge.</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">6. PENALTIES AND DISQUALIFICATION</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">6.1 Penalty Violations (Hansoku)</p>
              <p>Robot leaves dohyo voluntarily = Loss of match. Robot becomes immobilized (Shinitai) = Loss of match after 10 seconds. Starting before signal = Warning, restart match. Using non-LEGO components = Disqualification from tournament.</p>
            </div>
            <div>
              <p className="font-semibold">6.2 Disqualification Conditions (Shikkaku)</p>
              <p>Using remote control or external communication. Exceeding weight or dimension limits. Damaging opponent's robot intentionally. Unsportsmanlike behavior. Refusing judge's decision.</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">7. SAFETY GUIDELINES</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">7.1 Equipment and Construction Safety</p>
              <p>Weight limit: Strictly enforced - robots weighed before each match. Battery safety: Use properly maintained LEGO batteries. No sharp edges: All robot edges must be smooth and safe.</p>
            </div>
            <div>
              <p className="font-semibold">7.2 Arena and Judge Authority</p>
              <p>Emergency stop: Judge may stop match at any time. Workspace: Keep area around dohyo clear. First aid: First aid station available at venue.</p>
            </div>
          </div>
        </section>

        <div className="mt-16 p-8 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-slate-700">
            <span className="font-semibold">Note:</span> LEGO Sumo (3kg) is the heavy-class variant of standard LEGO Sumo, permitting more robust mechanical designs. All robots must use exclusively LEGO components. These regulations are subject to modification at the discretion of the competition organizing committee. Teams will receive advance notice of any changes.
          </p>
        </div>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about LEGO Sumo (3kg)?</h3>
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

export default LegoSumo3kg
