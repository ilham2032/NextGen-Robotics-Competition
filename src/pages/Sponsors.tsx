import { Link } from 'react-router'
import YourVisaAssistance from '../assets/619395084_17896020795383433_1687352418807126550_n-removebg-preview.png'
import { useTranslation } from 'react-i18next'
import KapitalBank from '../assets/Kapital_Bank_logo_2025.png'
import Kavkaz from '../assets/491497892_17926750140050283_2377610097470685483_n-removebg-preview.png'
import RSMEDIA from '../assets/rs-media-logo-YAGN3-1G-removebg-preview (1).png'

const Partners = () => {
  const { t } = useTranslation()

  const sponsors = [
    //{
      //name: t('All Japan Robot Sumo Tournament'),
      //description: t('Global robotics partner supporting competitive excellence and teamwork.'),
      //src: 'https://www.fsi.co.jp/sumo/robot/en/AJRST2020_LOGO_2.png',
      //alt: 'AJRST logo',
    //},
    //{
      //name: t('RoboChallenge Romania'),
      //description: t('Education partner advancing STEM learning for young innovators.'),
      //src: 'https://www.robkod.org/wp-content/uploads/2024/01/logo.png',
      //alt: 'RoboChallenge Romania logo',
    //},
    {
      name: t('Kavkaz Robotics School'),
      description: t('Educational partner delivering hands-on robotics training and competition-focused engineering development.'),
      src: Kavkaz,
      alt: 'Kavkaz Logo',
    },
    {
      name: t('Your Visa Assistance'),
      description: t('Logistics partner helping international teams participate with confidence.'),
      src: YourVisaAssistance,
      alt: 'Your Visa Assistance logo',
    },
    {
      name: t('Victory Group'),
      description: t('Strategic partner supporting community growth and event outreach.'),
      src: '',
      alt: 'Victory Group logo',
    },
    {
      name: t('RS Media Team'),
      description: t('Media partner providing event coverage, video production, and digital content creation.'),
      src: RSMEDIA,
      alt: 'RS MEDIA logo',
    },
    {
      name: t('Kapital Bank'),
      description: t('Financial partner investing in education, innovation, and student success.'),
      src: KapitalBank,
      alt: 'Kapital Bank logo',
    },
  ]

  return (
    <section className='min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='rounded-4xl bg-linear-to-r from-blue-700 via-indigo-700 to-blue-900 px-8 py-12 text-white shadow-2xl sm:px-10'>
          <p className='text-xs font-semibold tracking-[0.3em] text-cyan-200 uppercase'>{t('NextGen Partners')}</p>
          <h1 className='mt-3 text-4xl font-display font-bold tracking-tight sm:text-5xl'>{t('Our Partners')}</h1>
          <p className='mt-5 max-w-2xl text-sm text-slate-200 sm:text-base'>
            {t('Leading teams, technology, and logistics that elevate the NextGen Robotics experience.')}
          </p>
          <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Link to='/contact' className='inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20'>
              {t('Learn more')}
            </Link>
            <a href='mailto:nextgenazer@gmail.com' className='inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20'>
              nextgenazer@gmail.com
            </a>
          </div>
        </div>

        <div className='mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {sponsors.map((sponsor) => (
            <article key={sponsor.name} className='rounded-4xl border border-slate-200 bg-white p-6 shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl'>
              <div className='flex h-24 items-center justify-center rounded-3xl bg-slate-100 p-4'>
                <img src={sponsor.src} alt={sponsor.alt} className='max-h-20 object-contain' />
              </div>
              <div className='mt-5'>
                <h2 className='text-lg font-semibold text-slate-900'>{sponsor.name}</h2>
                <p className='mt-2 text-sm text-slate-600'>{sponsor.description}</p>
              </div>
              <div className='mt-6 text-white'>
                <Link to='/contact' className='inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'>
                  {t('Learn more')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners

