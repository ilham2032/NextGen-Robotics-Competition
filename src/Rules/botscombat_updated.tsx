import { Link } from "react-router-dom"

const BotsCombat = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <section className="relative overflow-hidden bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-200 mb-4 mt-6">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Bots Combat
          </h1>
          <p className="text-xl text-red-200 max-w-2xl mx-auto">
            Battle robot competition - Strategy, durability, and combat skill
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
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="text-center mb-16 pt-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Bots Combat Regulations</h1>
          <p className="text-lg text-slate-600">Remote-controlled battle robot competition standards</p>
        </header>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">1. OVERVIEW</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">1.1 Competition Purpose</p>
              <p>The Bots Combat category features remote-controlled battle robots equipped with weapons designed to disable or push opponent robots out of the arena. This high-energy competition follows international battle robot standards with strict safety protocols.</p>
            </div>
            <div>
              <p className="font-semibold">1.2 Competition Format</p>
              <p>Single elimination bracket. 3-minute matches with knockout or points decision. Weight classes: Lightweight (1.5kg), Middleweight (3.5kg), Heavyweight (15kg).</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">2. ROBOT SPECIFICATIONS</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">2.1 Weight and Dimensions</p>
              <p>Weight classes: Lightweight (1.5kg), Middleweight (3.5kg), Heavyweight (15kg). Maximum dimensions: 500mm × 500mm × 500mm (L×W×H).</p>
            </div>
            <div>
              <p className="font-semibold">2.2 Control and Power</p>
              <p>Control: Remote control (2.4GHz recommended). Power supply: Battery powered (max 24V for heavy, 12V for others).</p>
            </div>
            <div>
              <p className="font-semibold">2.3 Weapon Specifications</p>
              <p>Weapon types: Spinning blades, flippers, hammers, axes, rammers. Weapon speed limit: Spinning weapons: 10,000 RPM max. Safety switch: Kill switch required on all robots.</p>
            </div>
            <div>
              <p className="font-semibold">2.4 Radio Frequency</p>
              <p>Radio frequency: 2.4GHz or specific competition frequency as designated.</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">3. THE ARENA</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">3.1 Arena Specifications</p>
              <p>Arena size: 4m × 4m (minimum) for lightweight, larger for heavier classes. Walls: Steel or polycarbonate, minimum 1m height. Floor: Non-slip surface (rubber or textured metal).</p>
            </div>
            <div>
              <p className="font-semibold">3.2 Hazards and Lighting</p>
              <p>Hazards: Optional hazards (spikes, saws) in designated areas. Lighting: Adequate overhead lighting for visibility and camera recording.</p>
            </div>
            <div>
              <p className="font-semibold">3.3 Safety Features</p>
              <p>Safety fence: Transparent barrier between arena and audience. Emergency stop: Large red button accessible to judges and operators. Fire suppression: Fire extinguisher and blanket at arena perimeter. Medical kit: First aid supplies near arena.</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">4. MATCH RULES</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">4.1 Match Structure</p>
              <p>Match duration: 3 minutes (may be extended). Weight verification: Robots weighed before each match. Weapon inspection: All weapons checked for safety compliance. Radio check: Frequency verified to avoid interference.</p>
            </div>
            <div>
              <p className="font-semibold">4.2 Match Procedure</p>
              <p>Robots placed in opposite corners of arena. Judges conduct "Weapons On" and "Radio Check". Countdown: "30 seconds", "10 seconds", "3, 2, 1, FIGHT!". Robots engage - pilot controls from designated station. Match ends at 3 minutes or knockout. Judges inspect robots for damage after match.</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">5. SCORING SYSTEM</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">5.1 Victory Conditions</p>
              <p>Knockout (KO): Opponent's robot immobilized or unable to continue. Technical Knockout (TKO): Opponent cannot return to arena after 30 seconds. Judges decision: Points based on aggression, control, damage. Draw: Equal points - may have overtime or rematch.</p>
            </div>
          </div>
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">6. PENALTIES AND DISQUALIFICATION</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">6.1 Penalty Violations</p>
              <p>Starting before signal = Warning, opponent gets +10 points. Leaving arena (non-combat) = Warning, -1 point. Exceeding weapon RPM = Disqualification from match. Uncontrolled weapon after match = Warning, safety inspection required.</p>
            </div>
            <div>
              <p className="font-semibold">6.2 Disqualification Conditions</p>
              <p>Exceeding weight limit (after correction). Using illegal weapons (fire, explosives, chemicals). Damaging arena or endangering spectators. Radio interference or jamming. Unsportsmanlike conduct.</p>
            </div>
          </div>
        </section>

       
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">7. SAFETY GUIDELINES</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">7.1 Robot Safety Features</p>
              <p>Kill switch: Must be functional and accessible at all times. Weapon guards: Spinning weapons must have proper guards. Battery safety: Securely mounted, protected from damage.</p>
            </div>
            <div>
              <p className="font-semibold">7.2 Pilot and Arena Safety</p>
              <p>Pilot safety: Must wear safety glasses when near active weapons. Emergency procedures: Stop immediately when judge commands. Fire safety: No flammable liquids or open flames. Weight verification: All robots weighed before each match.</p>
            </div>
          </div>
        </section>

        <div className="mt-16 p-8 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-slate-700">
            <span className="font-semibold">Note:</span> Bots Combat follows international battle robot competition standards. Safety is paramount - all weapons and equipment must pass strict inspection. These regulations are subject to modification at the discretion of the competition organizing committee. Teams will receive advance notice of any changes.
          </p>
        </div>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-red-700 to-red-900 p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about Bots Combat?</h3>
          <p className="text-red-100 mb-6">
            Contact our technical team for clarifications on regulations
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-red-700 hover:bg-red-50 transition"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}

export default BotsCombat
