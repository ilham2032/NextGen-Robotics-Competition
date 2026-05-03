import { Link } from "react-router"

const Drone = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-200 mb-4 mt-6">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Drone Race
          </h1>
          <p className="text-xl text-sky-300 max-w-2xl mx-auto">
            FPV drone racing competition - Speed, agility, and piloting skill
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Drone Race Regulations</h1>
          <p className="text-lg text-slate-600">FPV drone racing competition standards for autonomous and piloted flight</p>
        </header>

        {{/* Section 1: Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">1. OVERVIEW</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">1.1 Competition Purpose</p>
              <p>The Drone Race category tests pilots' abilities to navigate FPV (First Person View) drones through a challenging obstacle course at high speed. This competition follows international drone racing standards, combining technical drone building skills with expert piloting abilities.</p>
            </div>
            <div>
              <p className="font-semibold">1.2 Competition Format</p>
              <p>Time trials with knockout rounds. Fastest times advance to finals. Multiple heat structure for qualification and finals.</p>
            </div>
          </div>
        </section>

        {{/* Section 2: Drone Specifications */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">2. DRONE SPECIFICATIONS</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">2.1 Frame and Motor Specifications</p>
              <p>Frame size (wheelbase): 120mm - 250mm. Motor size: Up to 2306 or equivalent. Weight (with battery): No limit (recommended under 500g).</p>
            </div>
            <div>
              <p className="font-semibold">2.2 Propeller and Power System</p>
              <p>Propeller size: Up to 5 inches. Battery: LiPo 3S-6S (11.1V - 22.2V). Video transmitter: Max 25mW (VTX) - Race frequency bands only.</p>
            </div>
            <div>
              <p className="font-semibold">2.3 FPV System</p>
              <p>FPV camera: Any standard FPV camera (analog/digital). Receiver: Any protocol (ELRS, Crossfire, SBUS, etc.).</p>
            </div>
          </div>
        </section>

        {{/* Section 3: Race Course */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">3. RACE COURSE</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">3.1 Course Layout</p>
              <p>Course type: Multi-gate obstacle course. Number of gates: 8-12 gates depending on difficulty. Gate size: Standard race gates (1m × 1m minimum). Course length: 50-100 meters. Altitude: 3-8 meters flight height.</p>
            </div>
            <div>
              <p className="font-semibold">3.2 Gate Requirements</p>
              <p>Gates must be clearly visible (LED illuminated preferred). Gates numbered in sequence for course navigation. Start and finish gates equipped with timing system. Alternative "rescue" gates may be available.</p>
            </div>
            <div>
              <p className="font-semibold">3.3 Obstacles</p>
              <p>Course includes gates, tunnels, slalom poles, and timing arches. Obstacle placement disclosed before qualification rounds.</p>
            </div>
          </div>
        </section>

        {{/* Section 4: Race Rules */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">4. RACE RULES</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">4.1 Race Format</p>
              <p>Qualifying round: Time trials - each pilot flies 2-3 laps. Semi-finals: Top times from qualifying advance. Finals: Head-to-head races or final time trials. Heat structure: 4-6 pilots per heat.</p>
            </div>
            <div>
              <p className="font-semibold">4.2 Race Procedure</p>
              <p>Pilots must be at pilot station 15 minutes before heat. Pre-race frequency scan to avoid interference. Judge gives "Pilots Ready" command. 3-second countdown, then "GO" signal. Pilots launch on signal, complete all gates in correct order, cross finish line to complete lap.</p>
            </div>
          </div>
        </section>

        {{/* Section 5: Scoring System */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">5. SCORING SYSTEM</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">5.1 Primary Ranking Criteria</p>
              <p>Lap time: Primary ranking (lower is better). Gate completion: All gates must be passed in order. Tiebreaker: Best single lap time.</p>
            </div>
            <div>
              <p className="font-semibold">5.2 Penalty Application</p>
              <p>Crash penalty: +2 seconds per gate missed/skipped.</p>
            </div>
          </div>
        </section>

        {{/* Section 6: Penalties & Disqualification */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">6. PENALTIES AND DISQUALIFICATION</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">6.1 Penalty Violations</p>
              <p>Missing a gate = +5 seconds to lap time. Flying out of bounds = +3 seconds, warning. Landing before finish (intentional) = Lap disqualified.</p>
            </div>
            <div>
              <p className="font-semibold">6.2 Disqualification Conditions</p>
              <p>Interfering with other pilots = Disqualification from heat. Exceeding power output limits (25mW VTX) = Disqualification. Flying outside designated airspace = Disqualification. Unsafe flying behavior endangering others = Disqualification. Using prohibited frequencies = Disqualification. Unsportsmanlike conduct = Disqualification.</p>
            </div>
          </div>
        </section>

        {{/* Section 7: Safety Guidelines */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">7. SAFETY GUIDELINES</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">7.1 Equipment Safety</p>
              <p>Propeller safety: Prop guards required for all practice flights. Battery safety: LiPo bags must be used for charging; never leave batteries unattended.</p>
            </div>
            <div>
              <p className="font-semibold">7.2 Flight Area Safety</p>
              <p>Flight area: Only designated personnel allowed in pilot zone during race. Emergency procedures: Stop all drones immediately if safety officer commands. Maximum altitude: Do not exceed 15m altitude at any time.</p>
            </div>
            <div>
              <p className="font-semibold">7.3 Pilot Safety</p>
              <p>Eye protection: FPV goggles must have adequate light filtering. First aid: First aid kit and fire extinguisher at pilot station.</p>
            </div>
          </div>
        </section>

        <div className="mt-16 p-8 bg-sky-50 border border-sky-200 rounded-lg">
          <p className="text-slate-700">
            <span className="font-semibold">Note:</span> Drone Race competition follows international FPV racing standards. All pilots must comply with local airspace regulations and obtain necessary permits. These regulations are subject to modification at the discretion of the competition organizing committee. Teams will receive advance notice of any changes.
          </p>
        </div>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-sky-700 to-sky-900 p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about Drone Race?</h3>
          <p className="text-sky-300 mb-6">
            Contact our technical team for clarifications on regulations
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-sky-700 hover:bg-sky-100 transition"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}

export default Drone
