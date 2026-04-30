import { useTranslation } from 'react-i18next'

const Awards = () => {
  const { t } = useTranslation()
  return (
    <section className='min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pb-16 pt-24 sm:px-6 sm:pt-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 px-6 py-10 text-white shadow-xl sm:px-10'>
          <p className='text-xs tracking-[0.2em] text-blue-100 uppercase'>{t('NextGen Robotics Competition')}</p>
          <h1 className='mt-2 text-4xl font-display font-bold sm:text-5xl'>{t('Awards & Prizes')}</h1>
          <p className='mt-4 max-w-3xl text-blue-100'>
            {t('Every category celebrates innovation, teamwork, and engineering excellence. Top-performing teams will receive cash prizes and recognition on the main stage.')}
          </p>
        </div>

        <div className='mt-8 grid gap-5 md:grid-cols-3'>
          <article className='rounded-2xl border border-yellow-200 bg-white p-6 shadow-sm'>
            <p className='text-sm font-semibold text-yellow-600 uppercase'>{t('1st Place Winner')}</p>
            <h2 className='mt-2 text-4xl font-bold text-blue-900'>$500</h2>
            <p className='mt-2 text-sm text-slate-600'>{t('Awarded to the champion team in each category.')}</p>
          </article>

          <article className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <p className='text-sm font-semibold text-slate-600 uppercase'>{t('2nd Place Winner')}</p>
            <h2 className='mt-2 text-4xl font-bold text-blue-900'>$300</h2>
            <p className='mt-2 text-sm text-slate-600'>{t('Given to the runner-up team in each category.')}</p>
          </article>

          <article className='rounded-2xl border border-orange-200 bg-white p-6 shadow-sm'>
            <p className='text-sm font-semibold text-orange-600 uppercase'>{t('3rd Place Winner')}</p>
            <h2 className='mt-2 text-4xl font-bold text-blue-900'>$200</h2>
            <p className='mt-2 text-sm text-slate-600'>{t('Presented to the third best team in each category.')}</p>
          </article>
        </div>

        <div className='mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8'>
          <h3 className='text-2xl font-display font-semibold text-blue-800'>What Winners Receive</h3>
          <ul className='mt-4 space-y-3 text-slate-700'>
            <li>- Cash prizes for top 3 teams in every competition category.</li>
            <li>- Official winner certificates and medal recognition.</li>
            <li>- Featured spotlight in event news and media updates.</li>
            <li>- Opportunity to present your robotics project to judges and guests.</li>
          </ul>
        </div>

        <div className='mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm sm:p-8'>
          <h3 className='text-2xl font-display font-semibold text-blue-800'>Award Ceremony Notes</h3>
          <p className='mt-3 text-slate-700'>
            Final rankings are decided by official judges based on challenge performance, rule compliance, and technical
            quality. All decisions announced during the closing ceremony are final.
          </p>
          <p className='mt-3 text-slate-700'>
            Teams are encouraged to stay until the end of the event to celebrate achievements and receive their certificates
            and prizes on stage.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Awards