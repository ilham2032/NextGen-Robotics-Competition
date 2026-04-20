import { Link } from "react-router"
import { ReactNode } from "react"

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaPrimary?: { text: string; to: string }
  ctaSecondary?: { text: string; to: string }
  imageSrc?: string
  imageAlt?: string
  extraContent?: ReactNode
}

const HeroSection = ({ 
  title, 
  subtitle, 
  ctaPrimary, 
  ctaSecondary, 
  imageSrc, 
  imageAlt = "Robotics competition",
  extraContent 
}: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 pb-24 pt-28 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.35),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,.2),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div className="opacity-0 animate-fade-in-up text-center lg:text-left" style={{ animationDelay: '0.1s' }}>
          <p className="animate-fade-in-left text-lg font-medium tracking-[0.35em] text-cyan-300 uppercase" style={{ animationDelay: '0.25s' }}>
            Competition
          </p>
          <h1 className="animate-fade-in-left mt-3 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text font-display text-5xl leading-tight font-bold text-transparent md:text-7xl" style={{ animationDelay: '0.4s' }}>
            {title}
          </h1>
          <p className="animate-fade-in-left mt-5 text-xl font-medium text-blue-100 md:text-2xl" style={{ animationDelay: '0.55s' }}>
            {subtitle}
          </p>
          {extraContent}
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            {ctaPrimary && (
              <Link
                to={ctaPrimary.to}
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                {ctaPrimary.text}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                to={ctaSecondary.to}
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                {ctaSecondary.text}
              </Link>
            )}
          </div>
        </div>
        {imageSrc && (
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-cyan-400/35 via-blue-500/30 to-purple-500/35 blur-2xl" />
            <img
              className="relative h-[280px] w-full rounded-[1.5rem] border border-white/20 object-cover shadow-2xl md:h-[360px]"
              src={imageSrc}
              alt={imageAlt}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroSection

