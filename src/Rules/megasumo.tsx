import { Link } from "react-router"

const megasumo = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-900 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <span className="inline-block rounded-full bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-200 mb-4 mt-6">
            NEXTGEN ROBOTICS COMPETITION 2026
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Mega Sumo
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Advanced autonomous robot sumo competition - Large-scale engineering and intelligent design
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Mega Sumo Regulations</h1>
          <p className="text-lg text-slate-600">Competition-grade standards for advanced autonomous robotics</p>
        </header>

        {/* Section 1: General Principles */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>1. GENERAL PRINCIPLES</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>1.1 Competition Objectives</p>
              <p>The Mega Sumo competition prioritizes safety, fairness, and innovation through autonomous robot competition on a standardized arena.</p>
            </div>
            <div>
              <p className='font-semibold'>1.2 Autonomy Requirement</p>
              <p>All robots must operate as fully autonomous units after match start. Human intervention is strictly prohibited during active match rounds.</p>
            </div>
            <div>
              <p className='font-semibold'>1.3 Fairness and Integrity</p>
              <p>All teams must comply with regulations to ensure a level competitive field. Equipment checks and rule enforcement are mandatory.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Robot Specifications */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>2. ROBOT SPECIFICATIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>2.1 Maximum Initial Dimensions</p>
              <p>Robot dimensions at start must not exceed 50 cm (width) × 50 cm (depth). Height is unrestricted, provided stability is maintained.</p>
            </div>
            <div>
              <p className='font-semibold'>2.2 Maximum Weight</p>
              <p>Total robot weight, including all components and attachments, must not exceed 20 kg.</p>
            </div>
            <div>
              <p className='font-semibold'>2.3 Height Regulations</p>
              <p>No height restriction is imposed. However, robots must maintain structural stability at all times to prevent tipping or collapse.</p>
            </div>
            <div>
              <p className='font-semibold'>2.4 Expandable Configurations</p>
              <p>Robots may expand after match start beyond initial dimensions. Expansion mechanisms must keep all components physically connected.</p>
            </div>
            <div>
              <p className='font-semibold'>2.5 Modular and Detachable Parts</p>
              <p>Any modular or detachable components must remain physically connected to the main robot body. Separation into independent units is prohibited.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Materials and Construction */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>3. MATERIALS AND CONSTRUCTION</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>3.1 Dohyo Surface Protection</p>
              <p>Robots must not damage, scratch, or degrade the matte black dohyo surface. All contact surfaces must be smooth and non-abrasive.</p>
            </div>
            <div>
              <p className='font-semibold'>3.2 Prohibited Hazardous Materials</p>
              <p>Use of corrosive, toxic, or hazardous materials is strictly prohibited. All materials must be inert and safe for handlers and spectators.</p>
            </div>
            <div>
              <p className='font-semibold'>3.3 Magnet Usage</p>
              <p>Magnets are permitted within safe operational limits. Magnets must not damage or permanently alter the arena structure or other equipment.</p>
            </div>
            <div>
              <p className='font-semibold'>3.4 Traction Enhancement Prohibition</p>
              <p>Adhesives, glues, and sticky substances designed to increase traction are strictly prohibited. This includes any form of surface alteration.</p>
            </div>
            <div>
              <p className='font-semibold'>3.5 Vacuum and Suction Systems</p>
              <p>Vacuum and suction systems are permitted within safe operational limits, provided they do not damage the dohyo surface.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Power and Electronics */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>4. POWER AND ELECTRONICS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>4.1 Maximum Voltage</p>
              <p>Maximum voltage supply is 48V DC. Any configuration exceeding this limit is prohibited.</p>
            </div>
            <div>
              <p className='font-semibold'>4.2 Battery Requirements</p>
              <p>Batteries must be commercially manufactured or engineered to industry safety standards. All batteries must be properly secured and insulated.</p>
            </div>
            <div>
              <p className='font-semibold'>4.3 Lithium Battery Protection</p>
              <p>Lithium-based batteries must include protective circuits to prevent overcharging, over-discharging, and short-circuit conditions.</p>
            </div>
            <div>
              <p className='font-semibold'>4.4 Emergency Stop Button</p>
              <p>All robots must include a clearly labeled and easily accessible emergency stop button. The button must be tested during pre-match inspection.</p>
            </div>
            <div>
              <p className='font-semibold'>4.5 Wireless Communication Restriction</p>
              <p>All wireless communication systems must be disabled during active matches. Only pre-programmed sequences are permitted.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Sensors and AI */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>5. SENSORS AND AI</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>5.1 Permitted Sensor Types</p>
              <p>All types of sensors are permitted, including but not limited to: infrared (IR), ultrasonic, LiDAR, cameras, gyroscopes, accelerometers, and pressure sensors.</p>
            </div>
            <div>
              <p className='font-semibold'>5.2 External Tracking System Prohibition</p>
              <p>No external tracking systems, beacons, or positioning aids are allowed. Robots must rely solely on onboard sensors.</p>
            </div>
            <div>
              <p className='font-semibold'>5.3 AI-Based Decision Systems</p>
              <p>Artificial intelligence and machine learning-based decision systems are permitted for autonomous decision-making during matches.</p>
            </div>
            <div>
              <p className='font-semibold'>5.4 Pre-Programmed Strategies</p>
              <p>Pre-programmed behavior sequences and strategies are fully permitted. However, no real-time external input or control is allowed during matches.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Dohyo Specifications */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>6. DOHYO SPECIFICATIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>6.1 Arena Diameter</p>
              <p>The dohyo has a circular diameter of 300 cm, providing ample space for large-scale robot competition.</p>
            </div>
            <div>
              <p className='font-semibold'>6.2 Surface Characteristics</p>
              <p>The dohyo surface is matte black with low reflectivity to minimize sensor interference and ensure uniform lighting conditions.</p>
            </div>
            <div>
              <p className='font-semibold'>6.3 Border Marking</p>
              <p>A 5 cm white ring marking clearly delineates the outer boundary of the dohyo.</p>
            </div>
            <div>
              <p className='font-semibold'>6.4 Arena Height</p>
              <p>The dohyo platform height is standardized between 5–10 cm above ground level.</p>
            </div>
            <div>
              <p className='font-semibold'>6.5 Surface Friction Standardization</p>
              <p>Friction coefficient should be standardized and consistent across all competition matches to ensure fair competition conditions.</p>
            </div>
          </div>
        </section>

        {/* Section 7: Match Rules */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>7. MATCH RULES</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>7.1 Match Format</p>
              <p>Matches follow a best-of-three (3) round format. The first robot to win 2 rounds is declared the match winner.</p>
            </div>
            <div>
              <p className='font-semibold'>7.2 Round Duration</p>
              <p>Each round has a maximum duration of 3 minutes. If no victory condition is met, judges will determine the winner based on control and strategy.</p>
            </div>
            <div>
              <p className='font-semibold'>7.3 Immobilization Rule</p>
              <p>A robot is considered immobilized if it remains stationary for 10 consecutive seconds without executing any movement.</p>
            </div>
            <div>
              <p className='font-semibold'>7.4 Starting Positions</p>
              <p>Both robots must start behind designated starting lines positioned equidistantly from the arena center.</p>
            </div>
            <div>
              <p className='font-semibold'>7.5 False Start Consequences</p>
              <p>A false start results in an official warning. Repeated false starts result in automatic loss of the round.</p>
            </div>
          </div>
        </section>

        {/* Section 8: Victory Conditions */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>8. VICTORY CONDITIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>8.1 Ring Ejection</p>
              <p>A robot achieves victory by successfully pushing its opponent completely out of the dohyo boundaries.</p>
            </div>
            <div>
              <p className='font-semibold'>8.2 Opponent Outside Ring</p>
              <p>Victory is awarded if the opponent's main body touches the area outside the white boundary marking.</p>
            </div>
            <div>
              <p className='font-semibold'>8.3 Immobilization Victory</p>
              <p>Victory is awarded if the opponent remains immobilized for the full 10-second duration as defined in Section 7.3.</p>
            </div>
            <div>
              <p className='font-semibold'>8.4 Rule Violation Disqualification</p>
              <p>Victory is awarded to the opponent if the opposing robot violates competition rules resulting in disqualification.</p>
            </div>
          </div>
        </section>

        {/* Section 9: Scoring Criteria */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>9. SCORING CRITERIA (FOR JUDGES IF NEEDED)</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>9.1 Aggression Scoring</p>
              <p>Points awarded for forward motion, active engagement with opponent, and sustained attack patterns. Robots demonstrating stronger offensive capability gain advantage.</p>
            </div>
            <div>
              <p className='font-semibold'>9.2 Control Scoring</p>
              <p>Points based on stability, positioning control, and ability to maintain advantageous placement within the arena.</p>
            </div>
            <div>
              <p className='font-semibold'>9.3 Effectiveness Scoring</p>
              <p>Points awarded for overall effectiveness in dominating the opponent, including strategy execution and tactical superiority.</p>
            </div>
          </div>
        </section>

        {/* Section 10: Prohibited Weapons and Actions */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>10. PROHIBITED WEAPONS AND ACTIONS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>10.1 Flame and Thermal Weapons</p>
              <p>Flames, explosives, and heat-based attacks are strictly prohibited.</p>
            </div>
            <div>
              <p className='font-semibold'>10.2 Liquid and Gas Emissions</p>
              <p>Discharge of liquids, powders, or gas emissions is prohibited.</p>
            </div>
            <div>
              <p className='font-semibold'>10.3 Entanglement Devices</p>
              <p>Nets, cables, and other entanglement devices designed to trap or immobilize opponents are prohibited.</p>
            </div>
            <div>
              <p className='font-semibold'>10.4 Projectile Weapons</p>
              <p>Any form of projectile weapon or throwing mechanism is prohibited.</p>
            </div>
            <div>
              <p className='font-semibold'>10.5 Self-Destruction</p>
              <p>Intentional self-destruction or explosive mechanisms are strictly prohibited.</p>
            </div>
            <div>
              <p className='font-semibold'>10.6 Electronic Interference</p>
              <p>Jamming, hacking, or intentional disruption of opponent systems is prohibited.</p>
            </div>
          </div>
        </section>

        {/* Section 11: Safety and Inspection */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>11. SAFETY AND INSPECTION</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>11.1 Mandatory Pre-Match Inspection</p>
              <p>All robots must pass mandatory pre-match inspection before competition. Judges verify compliance with all specifications.</p>
            </div>
            <div>
              <p className='font-semibold'>11.2 Re-Inspection Authority</p>
              <p>Judges retain authority to request re-inspection of any robot at any time during the competition.</p>
            </div>
            <div>
              <p className='font-semibold'>11.3 Unsafe Robot Disqualification</p>
              <p>Any robot deemed unsafe or non-compliant is immediately disqualified from competition.</p>
            </div>
            <div>
              <p className='font-semibold'>11.4 Emergency Stop Verification</p>
              <p>Teams must successfully demonstrate emergency stop button functionality during inspection and upon request.</p>
            </div>
          </div>
        </section>

        {/* Section 12: Penalties */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>12. PENALTIES</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>12.1 Warning Level</p>
              <p>Warning issued for minor rule violations or technical infractions. Two warnings result in escalation to next penalty level.</p>
            </div>
            <div>
              <p className='font-semibold'>12.2 Round Loss</p>
              <p>Automatic round loss for repeated or moderate violations of competition rules.</p>
            </div>
            <div>
              <p className='font-semibold'>12.3 Match Disqualification</p>
              <p>Immediate disqualification from the current match for severe rule violations or safety concerns.</p>
            </div>
            <div>
              <p className='font-semibold'>12.4 Tournament Ban</p>
              <p>Extreme misconduct, unsportsmanlike behavior, or repeated violations may result in tournament-wide ban.</p>
            </div>
          </div>
        </section>

        {/* Section 13: Edge Case Rules */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>13. EDGE CASE RULES</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>13.1 Simultaneous Ring Exit</p>
              <p>If both robots exit the ring simultaneously, the round is replayed under identical starting conditions.</p>
            </div>
            <div>
              <p className='font-semibold'>13.2 Mutual Immobilization</p>
              <p>If both robots become immobilized simultaneously, judges evaluate control, positioning, and strategy to determine the winner.</p>
            </div>
            <div>
              <p className='font-semibold'>13.3 Robot Fragmentation</p>
              <p>If a robot splits into multiple parts, only the main body is considered valid for competition. Separated components do not count toward victory.</p>
            </div>
            <div>
              <p className='font-semibold'>13.4 Inactivity Reset</p>
              <p>If no significant action occurs for 30 seconds, referees may restart the round after verbal warning to both teams.</p>
            </div>
          </div>
        </section>

        {/* Section 14: Team Responsibilities */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>14. TEAM RESPONSIBILITIES</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>14.1 Regulation Compliance</p>
              <p>Teams must ensure their robot complies with all stated regulations before competition. Non-compliance results in disqualification.</p>
            </div>
            <div>
              <p className='font-semibold'>14.2 Damage Liability</p>
              <p>Teams are fully responsible for any damage caused by their robot, including arena damage or equipment malfunction.</p>
            </div>
            <div>
              <p className='font-semibold'>14.3 Single Operator Setup</p>
              <p>Only one designated operator is permitted to set up and prepare the robot before each match.</p>
            </div>
          </div>
        </section>

        {/* Section 15: Referee Authority */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>15. REFEREE AUTHORITY</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>15.1 Final Authority</p>
              <p>Referee decisions are final and binding. No appeals or challenges override referee determinations.</p>
            </div>
            <div>
              <p className='font-semibold'>15.2 Video Replay Provision</p>
              <p>Video replay may be utilized if recording equipment is available to verify critical match decisions or disputed calls.</p>
            </div>
            <div>
              <p className='font-semibold'>15.3 Dispute Resolution</p>
              <p>The head referee resolves disputes between teams, judges, and officials with final authority.</p>
            </div>
          </div>
        </section>

        {/* Section 16: Document Standards */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-slate-900 mb-6'>16. REGULATORY DOCUMENT STANDARDS</h2>
          <div className='space-y-4 text-slate-700 leading-relaxed'>
            <div>
              <p className='font-semibold'>16.1 Document Tone</p>
              <p>This regulation adopts a formal legal and technical tone to ensure clarity and enforceability of all rules.</p>
            </div>
            <div>
              <p className='font-semibold'>16.2 Numbered Structure</p>
              <p>All sections and subsections utilize numbered hierarchical structure for easy reference and citation.</p>
            </div>
            <div>
              <p className='font-semibold'>16.3 Ambiguity Elimination</p>
              <p>All rules are designed to eliminate ambiguity and provide unambiguous guidance for competition execution.</p>
            </div>
            <div>
              <p className='font-semibold'>16.4 Enforceability</p>
              <p>All regulations are written to be measurable, verifiable, and enforceable by competition officials.</p>
            </div>
          </div>
        </section>

        <div className="mt-16 p-8 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-slate-700">
            <span className="font-semibold">Note:</span> These regulations are subject to modification at the discretion of the competition organizing committee. Teams will receive advance notice of any changes.
          </p>
        </div>
      </div>
    </main>
  )
}

export default megasumo
