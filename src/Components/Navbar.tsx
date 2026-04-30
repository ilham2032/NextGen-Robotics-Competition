import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: t('Home'), path: '/home' },
    { label: t('About'), path: '/about' },
    { label: t('Standings'), path: '/standings' },
    { label: t('News'), path: '/news' },
    { label: t('Participants'), path: '/participants' },
    { label: t('Regulations'), path: '/regulations' },
    { label: t('Partners'), path: '/partners' },
    { label: t('Awards'), path: '/awards' },
    { label: t('FAQ'), path: '/faq' },
    { label: t('Contact'), path: '/contact' },
  ]
  const navClassName = ({ isActive }: { isActive: boolean }) =>
    `font-display rounded-full px-3 py-2 text-sm xl:text-base font-medium tracking-wide transition-all ${
      isActive
        ? 'bg-white/18 !text-white ring-1 ring-white/40'
        : '!text-white hover:bg-white/10'
    }`

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`sticky-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <nav className='navbar-inner mx-auto mt-3 flex justify-between items-center rounded-2xl py-2 px-3 md:px-4 border border-white/20 bg-gradient-to-r from-blue-700/95 via-blue-600/95 to-indigo-700/95 shadow-[0_12px_36px_rgba(15,23,42,0.32)] backdrop-blur-md'>
        <Link to='/home' className='flex items-center gap-2 pl-1'>
          <div className='leading-tight rounded-lg bg-white/12 px-2 py-1 sm:px-3'>
            <p className='font-display text-xs sm:text-sm lg:text-base text-white'>{t('NextGen Robotics')}</p>
            <p className='text-[9px] sm:text-[10px] lg:text-xs text-blue-100 tracking-[0.16em]'>{t('COMPETITION')}</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden lg:flex items-center gap-1 xl:gap-1.5'>
          {navItems.map((item) => (
            <NavLink key={item.path} className={navClassName} to={item.path}>
              {item.label}
            </NavLink>
          ))}
          {/* Language Switcher */}
          <div className='flex items-center ml-3'>
            <div className='relative flex items-center bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10 shadow-sm'>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out ${
                  i18n.language === 'en'
                    ? 'bg-white text-slate-900 shadow-md transform scale-105'
                    : 'text-white hover:bg-white/10 hover:text-blue-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('az')}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out ${
                  i18n.language === 'az'
                    ? 'bg-white text-slate-900 shadow-md transform scale-105'
                    : 'text-white hover:bg-white/10 hover:text-blue-100'
                }`}
              >
                AZ
              </button>
            </div>
          </div>
          <a
            className='font-display ml-2 rounded-full bg-cyan-400 px-4 py-2 text-sm xl:text-base font-semibold text-slate-900 transition-colors hover:bg-cyan-300'
            href='/user/auth'
            rel='noopener noreferrer'
          >
            {t('Sign Up')}
          </a>
        </ul>

        <button
          className='lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-white/40'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {isMenuOpen && (
        <div className='lg:hidden absolute right-3 top-full mt-2 w-[min(92vw,430px)] rounded-2xl border border-white/20 bg-gradient-to-b from-blue-700/95 to-indigo-700/95 p-4 shadow-xl z-50 backdrop-blur-md'>
          <ul className='grid grid-cols-2 gap-2'>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `font-display rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-white/20 !text-white' : '!text-white hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </ul>
          {/* Language Switcher Mobile */}
          <div className='flex items-center justify-center gap-2 mt-4'>
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`font-display rounded-full px-3 py-1 text-sm font-medium transition-all ${
                i18n.language === 'en'
                  ? 'bg-white/20 text-white ring-1 ring-white/40'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => i18n.changeLanguage('az')}
              className={`font-display rounded-full px-3 py-1 text-sm font-medium transition-all ${
                i18n.language === 'az'
                  ? 'bg-white/20 text-white ring-1 ring-white/40'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              AZ
            </button>
          </div>
          <a
            className='mt-4 inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300'
            href='/user/auth'
            rel='noopener noreferrer'
            onClick={() => setIsMenuOpen(false)}
          >
            {t('Sign Up')}
          </a>
        </div>
      )}
    </div>
  )
}

export default Navbar