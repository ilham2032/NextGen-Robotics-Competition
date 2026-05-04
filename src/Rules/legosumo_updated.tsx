import { Link } from "react-router-dom"

const LegoSumo = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 py-20">
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
            LEGO Sumo (Standard)
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Standard LEGO robot sumo - The classic sumo competition with autonomous LEGO robots
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">LEGO Sumo (Standard) Regulations</h1>
          <p className="text-lg text-slate-600">International LEGO robot sumo competition standards</p>
        </header>

     
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">1. OVERVIEW</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">1.1 Competition Purpose</p>
              <p>The LEGO Sumo (Standard) category is the classic LEGO robot sumo competition where two autonomous LEGO robots battle in a dohyo (ring), attempting to push each other out. This category follows international sumo robot standards and is perfect for teams new to competitive robotics.</p>
            </div>
            <div>
              <p className="font-semibold">1.2 Competition Format</p>
              <p>Best of 3 matches per bout. Knockout bracket with consolation rounds. First robot to win 2 matches advances.</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">2. ROBOT SPECIFICATIONS</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">2.1 Material and Construction</p>
              <p>LEGO components only (any LEGO system permitted). Maximum weight: 1.0 kg (including battery).</p>
            </div>
            <div>
              <p className="font-semibold">2.2 Dimension Limits</p>
              <p>Maximum dimensions: 150mm × 150mm × 150mm (L×W×H). Robots may expand after match start if all components remain connected.</p>
            </div>
            <div>
              <p className="font-semibold">2.3 Control Type</p>
              <p>Fully autonomous (no remote control). Only pre-programmed autonomous sequences permitted.</p>
            </div>
            <div>
              <p className="font-semibold">2.4 Programmable Controller</p>
              <p>Any LEGO controller permitted (SPIKE, EV3, NXT, etc.). Sensors permitted: Any LEGO sensors (color, ultrasonic, touch, gyro).</p>
            </div>
            <div>
              <p className="font-semibold">2.5 Power and Drive Systems</p>
              <p>LEGO battery pack or AA batteries (max 9V). Drive system: LEGO motors only (max 3 motors).</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">3. THE DOHYO (RING)</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">3.1 Ring Specifications</p>
              <p>Dohyo diameter: 100cm (outer), 90cm (inner battle zone). Surface: White or light-colored smooth surface. Border: Black line (3cm wide) marking boundary.</p>
            </div>
            <div>
              <p className="font-semibold">3.2 Starting Configuration</p>
              <p>Starting lines: Two parallel lines 20cm from center. Platform: Elevated 3-5cm from ground.</p>
            </div>
            <div>
              <p className="font-semibold">3.3 Match Areas</p>
              <p>Dohyo Jonai: Inner circle where battle takes place. Dohyo Jogai: Outside the boundary line. Shikiri-sen: Starting positions for robots.</p>
            </div>
          </div>
        </section>

     
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">4. MATCH RULES</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">4.1 Match Structure</p>
              <p>Bout: Best of 3 matches (first to 2 wins). Match duration: Maximum 2 minutes. Rest time: 1 minute between matches. Inspection: Robots checked before each bout.</p>
            </div>
            <div>
              <p className="font-semibold">4.2 Match Procedure</p>
              <p>Robots placed on opposite shikiri-sen lines. Judge announces "Ready". 3-second countdown to "Start". Robots must start within 3 seconds of signal. Battle continues until robot exits dohyo. Judge declares winner or calls for rematch.</p>
            </div>
          </div>
        </section>

       
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">5. SCORING SYSTEM</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">5.1 Victory Conditions</p>
              <p>Yuko: Full win - opponent exits dohyo. Fusensho: Default win - opponent cannot start. Keikoku: Warning - minor violation. Hansoku-Make: Loss due to violation (serious).</p>
            </div>
          </div>
        </section>

       
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">6. PENALTIES AND DISQUALIFICATION</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">6.1 Penalty Violations</p>
              <p>False start (before signal) = Warning, match restart. Robot exits dohyo voluntarily = Automatic loss. Immobilized for 10+ seconds = Match loss. Non-LEGO parts detected = Disqualification.</p>
            </div>
            <div>
              <p className="font-semibold">6.2 Disqualification Conditions</p>
              <p>Using any non-LEGO components. Remote control or wireless communication. Intentional damage to opponent. Abuse of officials or other teams. Weight/dimension violation after correction attempt.</p>
            </div>
          </div>
        </section>

       
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">7. SAFETY GUIDELINES</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">7.1 Weight and Construction Safety</p>
              <p>Weight inspection: All robots weighed before matches. Safe construction: No sharp edges or protruding parts. Battery handling: Use only undamaged LEGO batteries.</p>
            </div>
            <div>
              <p className="font-semibold">7.2 Arena and Judge Authority</p>
              <p>Clear area: Keep space around dohyo clear. Judge authority: Follow all judge instructions immediately. First aid: Medical assistance available at venue.</p>
            </div>
          </div>
        </section>

        <div className="mt-16 p-8 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-slate-700">
            <span className="font-semibold">Note:</span> LEGO Sumo Standard follows international sumo robot competition standards adapted for LEGO construction. All robots must use exclusively LEGO components. These regulations are subject to modification at the discretion of the competition organizing committee. Teams will receive advance notice of any changes.
          </p>
        </div>

       
        <section className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about LEGO Sumo?</h3>
          <p className="text-blue-100 mb-6">
            Contact our technical team for clarifications on regulations
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-blue-50 transition"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}

export default LegoSumo
