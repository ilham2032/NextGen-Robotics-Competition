import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const languageOptions = [
    { code: 'en', label: 'English', shortLabel: 'EN' },
    { code: 'az', label: 'Azerbaijani', shortLabel: 'AZ' },
    { code: 'ru', label: 'Russian', shortLabel: 'RU' },
  ]

  const navItems = [
    { label: t('Home'), path: '/home' },
    { label: t('About'), path: '/about' },
    { label: t('Standings'), path: '/standings' },
    { label: t('News'), path: '/news' },
    { label: t('Participants'), path: '/participants' },
    { label: t('Regulations'), path: '/regulations' },
    { label: t('Partners'), path: '/partners' },
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

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language)
    localStorage.setItem('nextgen_language', language)
  }

  const languageSelectClassName =
    'h-10 min-h-10 rounded-full border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white outline-none transition focus:border-white/50 focus:ring-2 focus:ring-white/30'

  return (
    <div className={`sticky-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <nav className='navbar-inner mx-auto mt-3 flex justify-between items-center rounded-2xl py-2 px-3 md:px-5 border border-blue-400/30 bg-linear-to-r from-blue-800 via-blue-700 to-indigo-800 shadow-2xl shadow-blue-950/25'>
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
          <label className='ml-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-white'>
            <span className='sr-only'>{t('Language')}</span>
            <select
              value={i18n.language}
              onChange={(event) => handleLanguageChange(event.target.value)}
              className={languageSelectClassName}
              aria-label={t('Choose language')}
            >
              {languageOptions.map((language) => (
                <option key={language.code} value={language.code} className='bg-slate-900 text-white'>
                  {language.shortLabel}
                </option>
              ))}
            </select>
          </label>
          <Link
            className='font-display ml-2 rounded-full bg-cyan-400 px-4 py-2 text-sm xl:text-base font-semibold text-slate-900 transition-colors hover:bg-cyan-300'
            to='/user/auth'
          >
            {t('Sign Up')}
          </Link>
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
                className={({ isActive }: { isActive: boolean }) =>
                  `font-display rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-white/20 !text-white' : '!text-white hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </ul>
          <label className='mt-4 flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-3 py-2'>
            <span className='mr-3 text-sm font-medium text-blue-50'>{t('Language')}</span>
            <select
              value={i18n.language}
              onChange={(event) => handleLanguageChange(event.target.value)}
              className={`${languageSelectClassName} flex-1`}
              aria-label={t('Choose language')}
            >
              {languageOptions.map((language) => (
                <option key={language.code} value={language.code} className='bg-slate-900 text-white'>
                  {language.label}
                </option>
              ))}
            </select>
          </label>
          <Link
            className='mt-4 inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300'
            to='/user/auth'
            onClick={() => setIsMenuOpen(false)}
          >
            {t('Sign Up')}
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
