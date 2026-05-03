import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()

  return (
    <main className='min-h-screen bg-slate-50 text-slate-900 overflow-hidden'>
      <div className='absolute inset-0 bg-linear-to-br from-cyan-200 via-white to-slate-100 opacity-70 pointer-events-none'></div>
      <div className='relative max-w-6xl mx-auto px-6 pt-28 pb-24'>
        <header className='text-center mb-14'>
          <p className='text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600'>{t('About the competition')}</p>
          <h1 className='mt-4 text-5xl font-display font-extrabold tracking-tight text-slate-900 sm:text-6xl'>
            {t('NextGen Robotics Competition')}
          </h1>
          <p className='mx-auto mt-5 max-w-3xl text-base text-slate-600 sm:text-lg leading-relaxed'>
            {t('NextGen Robotics Competition is a premier STEM event designed to inspire young innovators through immersive robotics challenges, expert mentorship, and industry collaboration.')}
          </p>
        </header>

        <div className='mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center'>
          <div className='space-y-5'>
            <p className='text-slate-700 text-base leading-relaxed'>
              {t('At NextGen Robotics, students build autonomous systems that compete in dynamic arenas while developing technical skills, strategic thinking, and strong teamwork.')}
            </p>
            <p className='text-slate-700 text-base leading-relaxed'>
              {t('The event combines robotics, artificial intelligence, and engineering design into a professional competition experience that prepares participants for future STEM careers.')}
            </p>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
                <p className='text-sm font-semibold text-slate-900'>{t('Impact')}</p>
                <p className='mt-2 text-sm text-slate-600'>{t('Builds confidence in science, technology, and engineering skills.')}</p>
              </div>
              <div className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
                <p className='text-sm font-semibold text-slate-900'>{t('Experience')}</p>
                <p className='mt-2 text-sm text-slate-600'>{t('Offers hands-on challenges, technical coaching, and real-time scoring.')}</p>
              </div>
            </div>
          </div>
          <div className='overflow-hidden rounded-4xl bg-linear-to-br from-blue-600 via-cyan-500 to-slate-800 shadow-2xl'>
            <img
              src='https://edgerton.mit.edu/sites/default/files/2021-05/14231185_1082261505194512_820772061020141366_o.jpg'
              alt={t('Students building robotics projects')}
              className='h-full w-full object-cover'
            />
          </div>
        </div>

        <section className='grid gap-6 md:grid-cols-2'>
          <article className='rounded-4xl border border-slate-200 bg-white p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-slate-900'>{t('What we do')}</h2>
            <p className='mt-4 text-slate-600 leading-relaxed'>
              {t('We host a competitive robotics event that emphasizes creativity, precision, and teamwork. Participants design, build, and test robots in a supportive, high-energy environment.')}
            </p>
          </article>

          <article className='rounded-4xl border border-slate-200 bg-white p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-slate-900'>{t('Our mission')}</h2>
            <p className='mt-4 text-slate-600 leading-relaxed'>
              {t('To empower the next generation of innovators by creating educational opportunities that blend engineering, autonomy, and competitive teamwork.')}
            </p>
          </article>

          <article className='rounded-4xl border border-slate-200 bg-white p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-slate-900'>{t('Who can join')}</h2>
            <ul className='mt-4 space-y-3 text-slate-600'>
              <li>{t('High school and university teams')}</li>
              <li>{t('Team size: up to 4 members')}</li>
              <li>{t('Includes robotics, AI, and strategy categories')}</li>
            </ul>
          </article>

          <article className='rounded-4xl border border-slate-200 bg-white p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-slate-900'>{t('Support')}</h2>
            <p className='mt-4 text-slate-600 leading-relaxed'>
              {t('Our team is ready to help with registration, rule clarification, and sponsorship information.')}
            </p>
            <ul className='mt-4 space-y-2 text-slate-600'>
              <li>
                {t('Email')}: <a href='mailto:nextgenazer@gmail.com' className='text-cyan-600 underline'>nextgenazer@gmail.com</a>
              </li>
              <li>{t('Phone')}: <strong>+994 55 718 68 58</strong></li>
              <li>{t('Location')}: <strong>Baku, Azerbaijan</strong></li>
            </ul>
          </article>
        </section>

        <div className='mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row text-white'>
          <Link to='/contact' className='inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'>
            {t('Contact the team')}
          </Link>
        </div>
      </div>
    </main>
  )
}

export default About
