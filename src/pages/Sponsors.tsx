import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import OrganizationSection from '../Components/OrganizationSection'
import { getOrganizationsByType } from '../data/organizations'

const PartnersPage = () => {
  const { t } = useTranslation()
  const sponsors = getOrganizationsByType('sponsor')
  const partners = getOrganizationsByType('partner')

  return (
    <div className='min-h-screen bg-white'>
      <section className='relative overflow-hidden px-4 pb-14 pt-24 sm:px-6 sm:pt-28'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.08),transparent_50%)]' />
        <div className='relative mx-auto max-w-6xl'>
          <div className='rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 px-8 py-12 text-white shadow-xl sm:px-12 sm:py-14'>
            <p className='text-xs font-semibold uppercase tracking-[0.35em] text-blue-200'>
              {t('Partners & Sponsors')}
            </p>
            <h1 className='mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl'>
              {t('Organizations powering NextGen')}
            </h1>
            <p className='mt-5 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg'>
              {t('Partners & Sponsors page intro')}
            </p>
            <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
              <a
                href='#sponsors'
                className='inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-50'
              >
                {t('View sponsors')}
              </a>
              <a
                href='#partners'
                className='inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20'
              >
                {t('View partners')}
              </a>
              <Link
                to='/contact'
                className='inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10'
              >
                {t('Partnership inquiries')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className='mx-auto max-w-6xl space-y-16 px-4 pb-20 sm:px-6'>
        <OrganizationSection
          id='sponsors'
          title={t('Our Sponsors')}
          description={t('Sponsors section description')}
          organizations={sponsors}
        />

        <div className='h-px bg-blue-100' />

        <OrganizationSection
          id='partners'
          title={t('Our Partners')}
          description={t('Partners section description')}
          organizations={partners}
        />

        <section className='rounded-2xl border border-blue-100 bg-blue-50/40 px-8 py-10 text-center sm:px-12 sm:py-12'>
          <h2 className='font-display text-2xl font-bold text-slate-900 sm:text-3xl'>
            {t('Interested in partnering with us?')}
          </h2>
          <p className='mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base'>
            {t('Partnership CTA description')}
          </p>
          <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Link
              to='/contact'
              className='inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700'
            >
              {t('Contact us')}
            </Link>
            <a
              href='mailto:nextgenazer@gmail.com'
              className='inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-8 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-50'
            >
              nextgenazer@gmail.com
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PartnersPage
