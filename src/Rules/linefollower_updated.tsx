import { Link } from "react-router"

const LineFollower = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-900 via-cyan-800 to-cyan-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-200 mt-6 mb-4">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Line Follower
          </h1>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            Autonomous robot line tracking competition - Speed, precision, and reliability
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
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Line Follower Regulations</h1>
          <p className="text-lg text-slate-600">Autonomous line tracking competition standards for general robotics platforms</p>
        </header>

        {/* Section 1: Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">1. OVERVIEW</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">1.1 Competition Purpose</p>
              <p>The Line Follower category challenges teams to design and build an autonomous robot capable of following a black line on a white surface as quickly and accurately as possible. This is one of the most popular robotics competitions worldwide, testing fundamental skills in navigation, sensor integration, and real-time control systems.</p>
            </div>
            <div>
              <p className="font-semibold">1.2 Competition Format</p>
              <p>Individual timed runs. Best time from multiple attempts determines ranking. Fastest completion times advance through qualification rounds.</p>
            </div>
          </div>
        </section>

        {{/* Section 2: Robot Specifications */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">2. ROBOT SPECIFICATIONS</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">2.1 Dimension and Weight Limits</p>
              <p>Maximum dimensions: 250mm × 250mm × 250mm (L×W×H). Weight limit: No limit (recommended under 1.5kg). Robots may expand after start if all components remain connected.</p>
            </div>
            <div>
              <p className="font-semibold">2.2 Control Type</p>
              <p>Fully autonomous (no remote control). Only pre-programmed sequences permitted. No real-time external input or wireless control allowed.</p>
            </div>
            <div>
              <p className="font-semibold">2.3 Power Supply</p>
              <p>Internal battery only (max 12V). Battery must be securely mounted and properly insulated. Lithium batteries must include protective circuits.</p>
            </div>
            <div>
              <p className="font-semibold">2.4 Sensor Specifications</p>
              <p>IR sensors, color sensors, line sensors, ultrasonic, gyroscope, and encoders permitted. Any sensor type allowed for line detection.</p>
            </div>
            <div>
              <p className="font-semibold">2.5 Controller and Drive System</p>
              <p>Any programmable microcontroller permitted (Arduino, ESP32, STM32, etc.). Any drive system allowed (wheeled, tracked, or legged).</p>
            </div>
          </div>
        </section>

        {/* Section 3: Playing Field */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">3. PLAYING FIELD</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">3.1 Track Specifications</p>
              <p>Track surface: White or light-colored mat/board. Line color: Black (matte finish, 18-25mm width). Track layout includes straight sections, curves (R ≥ 50mm), 90° turns, intersections, and optional branches.</p>
            </div>
            <div>
              <p className="font-semibold">3.2 Course Dimensions</p>
              <p>Track length: 10-30 meters depending on difficulty level. Start/Finish zone: Clearly marked 200mm × 200mm area.</p>
            </div>
            <div>
              <p className="font-semibold">3.3 Environmental Conditions</p>
              <p>Ambient lighting controlled (200-500 lux). Temperature: 20-25°C. No external light interference allowed.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Match Rules */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">4. MATCH RULES</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">4.1 Match Procedure</p>
              <p>Teams submit robot at inspection area at least 30 minutes before scheduled run. Robot placed in designated start zone. Judge gives "Ready" signal - teams must not touch robot. After 3 seconds, judge gives "Start" signal.</p>
            </div>
            <div>
              <p className="font-semibold">4.2 Run Execution</p>
              <p>Robot must begin moving within 5 seconds of start signal. Robot follows line until reaching finish zone or disqualification. Time recorded from start signal to finish line crossing.</p>
            </div>
            <div>
              <p className="font-semibold">4.3 Number of Attempts</p>
              <p>Each team gets 3 attempts. Best time counts toward final ranking. Minimum 2-minute break required between attempts.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Scoring System */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">5. SCORING SYSTEM</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">5.1 Primary Ranking Criteria</p>
              <p>Completion time is the primary ranking metric (lower is better). Accuracy of line following evaluated. Track must be completed fully to be ranked.</p>
            </div>
            <div>
              <p className="font-semibold">5.2 Bonus and Tiebreaker</p>
              <p>Line accuracy bonus: No penalty for minor deviations. Tiebreaker: Second best attempt time used if primary times are equal.</p>
            </div>
          </div>
        </section>

        {{/* Section 6: Penalties & Disqualification */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">6. PENALTIES AND DISQUALIFICATION</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">6.1 Penalty Violations</p>
              <p>Robot leaves track (more than 50% off line) = +5 seconds to final time. Robot stops for more than 10 seconds = attempt terminated. Robot crosses wrong path at intersection = +3 seconds penalty.</p>
            </div>
            <div>
              <p className="font-semibold">6.2 Disqualification Conditions</p>
              <p>Manual intervention during run results in attempt disqualification. Using remote control or external communication = automatic disqualification. Damaging track or equipment = disqualification. Unsportsmanlike behavior = disqualification. Violating robot specifications = disqualification. Refusing to follow judge's instructions = disqualification.</p>
            </div>
          </div>
        </section>

        {{/* Section 7: Safety Guidelines */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">7. SAFETY GUIDELINES</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div>
              <p className="font-semibold">7.1 Battery and Material Safety</p>
              <p>Use properly protected batteries; no leaking or damaged batteries allowed. Robots must not contain hazardous materials that could cause injury.</p>
            </div>
            <div>
              <p className="font-semibold">7.2 Competition Safety Measures</p>
              <p>Emergency stop: Judges may stop any robot at any time for safety concerns. No open flames or heating elements on robots. Workspace must be kept clear of equipment and bags.</p>
            </div>
            <div>
              <p className="font-semibold">7.3 Medical Support</p>
              <p>First aid station available at venue. All safety concerns must be reported to judges immediately.</p>
            </div>
          </div>
        </section>

        <div className="mt-16 p-8 bg-cyan-50 border border-cyan-200 rounded-lg">
          <p className="text-slate-700">
            <span className="font-semibold">Note:</span> The Line Follower competition follows international standards for autonomous navigation and sensor-based control systems. Robot designs demonstrating innovation in line detection algorithms and control systems are encouraged. These regulations are subject to modification at the discretion of the competition organizing committee. Teams will receive advance notice of any changes.
          </p>
        </div>

        {/* Contact Section */}
        <section className="rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-800 p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">Questions about Line Follower?</h3>
          <p className="text-cyan-100 mb-6">
            Contact our technical team for clarifications on regulations
          </p>
          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-cyan-700 hover:bg-cyan-50 transition"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  )
}

export default LineFollower
