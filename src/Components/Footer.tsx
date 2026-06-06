import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  const categoryLinks = [
    { label: t('Mini Sumo'), to: '/regulations/mini-sumo' },
    { label: t('Mini Sumo Kids'), to: '/regulations/mini-sumo-kids' },
    { label: t('Start Up'), to: '/regulations/start-up-senior' },
  ]
  return (
    <footer className='relative bg-slate-900 text-slate-100 mt-20 overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(34,211,238,.15),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,.1),transparent_50%)]'></div>
      <div className='absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/50 to-transparent'></div>

      <div className='relative max-w-7xl mx-auto px-6 py-16'>
        <div className='grid gap-12 lg:grid-cols-4 md:grid-cols-2'>
          {/* Company Info */}
          <div className='lg:col-span-1'>
            <div className='mb-6'>
              <h3 className='text-xl font-bold text-white mb-2'>NextGen Robotics</h3>
              <p className='text-cyan-300 font-medium text-sm tracking-wider uppercase'>{t("Competition 2026")}</p>
            </div>
            <p className='text-slate-300 text-sm leading-relaxed mb-6'>
              Empowering the next generation of robotics innovators through competitive challenges,
              education, and community building across the globe.
            </p>
            <div className='flex space-x-4'>
              <a href='https://api.whatsapp.com/send/?phone=994776266858&text&type=phone_number&app_absent=0&utm_source=ig' className='w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-200'>
                <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M20.52 3.48A11.92 11.92 0 0012 0C5.373 0 0 5.373 0 12a11.93 11.93 0 001.8 6.3L0 24l5.85-1.53A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.19-1.245-6.19-3.48-8.52zM12 22c-2.07 0-4.02-.63-5.67-1.71l-.4-.25-3.48.91.93-3.39-.27-.44A9.92 9.92 0 012 12c0-5.52 4.48-10 10-10 2.66 0 5.16 1.04 7.04 2.92A9.93 9.93 0 0122 12c0 5.52-4.48 10-10 10zm5.48-7.5c-.26-.13-1.54-.76-1.78-.84-.24-.08-.42-.13-.6.13s-.69.84-.84 1.01c-.15.17-.3.19-.56.06-.26-.13-1.08-.4-2.06-1.26-.76-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.12-.53.12-.13.26-.33.39-.5.13-.17.17-.3.26-.5.09-.19.05-.36-.03-.5-.08-.13-.6-1.44-.82-1.98-.22-.53-.45-.46-.6-.47-.15-.01-.33-.01-.51-.01-.19 0-.5.07-.76.36-.26.28-1 1-1 2.45 0 1.45 1.02 2.86 1.16 3.05.14.19 2.01 3.07 4.86 4.3.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.11-.26-.18-.53-.31z'/>
                </svg>
              </a>
              <a href='' className='w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors duration-200'>
                <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M23.498 6.186a2.995 2.995 0 00-2.105-2.115C19.337 3.5 12 3.5 12 3.5s-7.337 0-9.393.572A2.995 2.995 0 00.502 6.186 31.66 31.66 0 000 12a31.66 31.66 0 00.502 5.814 2.995 2.995 0 002.105 2.115C4.663 20.5 12 20.5 12 20.5s7.337 0 9.393-.572a2.995 2.995 0 002.105-2.115A31.66 31.66 0 0024 12a31.66 31.66 0 00-.502-5.814zM9.75 16.5v-9l7.25 4.5-7.25 4.5z'/>
                </svg>
              </a>
              <a href='https://www.instagram.com/nextgen_robotics_competition/' className='w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors duration-200'>
                <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.405.59.22 1.01.485 1.45.925.44.44.705.86.925 1.45.166.46.35 1.26.405 2.43.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.405 2.43a3.64 3.64 0 01-.925 1.45 3.64 3.64 0 01-1.45.925c-.46.166-1.26.35-2.43.405-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.405a3.64 3.64 0 01-1.45-.925 3.64 3.64 0 01-.925-1.45c-.166-.46-.35-1.26-.405-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.405-2.43a3.64 3.64 0 01.925-1.45 3.64 3.64 0 011.45-.925c.46-.166 1.26-.35 2.43-.405C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.17 0-3.542.012-4.79.069-1.04.05-1.602.22-1.977.365-.49.184-.84.403-1.21.773-.37.37-.59.72-.773 1.21-.145.375-.315.937-.365 1.977-.057 1.248-.069 1.62-.069 4.79s.012 3.542.069 4.79c.05 1.04.22 1.602.365 1.977.184.49.403.84.773 1.21.37.37.72.59 1.21.773.375.145.937.315 1.977.365 1.248.057 1.62.069 4.79.069s3.542-.012 4.79-.069c1.04-.05 1.602-.22 1.977-.365.49-.184.84-.403 1.21-.773.37-.37.59-.72.773-1.21.145-.375.315-.937.365-1.977.057-1.248.069-1.62.069-4.79s-.012-3.542-.069-4.79c-.05-1.04-.22-1.602-.365-1.977a3.64 3.64 0 00-.773-1.21 3.64 3.64 0 00-1.21-.773c-.375-.145-.937-.315-1.977-.365-1.248-.057-1.62-.069-4.79-.069z'/>
                  <path d='M12 7.838a4.162 4.162 0 100 8.324 4.162 4.162 0 000-8.324zm0 6.838a2.676 2.676 0 110-5.352 2.676 2.676 0 010 5.352zm4.406-7.91a.998.998 0 11-1.996 0 .998.998 0 011.996 0z'/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-6'>{t("Quick Links")}</h4>
            <ul className='space-y-3'>
              <li><Link to='/home' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>{t("Home")}</Link></li>
              <li><Link to='/about' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>{t("About")}</Link></li>
              <li><Link to='/standings' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>{t("Standings")}</Link></li>
              <li><Link to='/news' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>{t("News")}</Link></li>
              <li><Link to='/participants' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>{t("Participants")}</Link></li>
              <li><Link to='/regulations' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>{t("Regulations")}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-6'>{t('Competition Categories')}</h4>
            <ul className='space-y-3'>
              {categoryLinks.map((category) => (
                <li key={category.to}>
                  <Link
                    to={category.to}
                    className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to='/regulations'
                  className='text-white hover:text-cyan-200 transition-colors duration-200 text-sm font-medium'
                >
                  {t('View all regulations')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-6'>{t("Contact & Support")}</h4>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <svg className='w-5 h-5 text-cyan-300 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
                <div>
                  <p className='text-slate-300 text-sm'>nextgenazer@gmail.com</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <svg className='w-5 h-5 text-cyan-300 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                </svg>
                <div>
                  <p className='text-slate-300 text-sm'>+994 77 626 68 58</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <svg className='w-5 h-5 text-cyan-300 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                <div>
                  <p className='text-slate-300 text-sm'>Baku, Azerbaijan</p>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              <Link
                to='/contact'
                className='inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors duration-200'
              >
                Contact Us
                <svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-slate-800 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='flex flex-col md:flex-row items-center gap-4 text-sm text-slate-400'>
              <p>&copy; {new Date().getFullYear()} NextGen Robotics Competition. All rights reserved.</p>
              <div className='flex items-center gap-4'>
                <Link to='/privacy' className='hover:text-cyan-300 transition-colors duration-200'>Privacy Policy</Link>
                <Link to='/terms' className='hover:text-cyan-300 transition-colors duration-200'>Terms of Service</Link>
              </div>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-400'>
              <span>Powered by</span>
              <span className='text-cyan-300 font-semibold'>INNOVATIONS TEAM</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer