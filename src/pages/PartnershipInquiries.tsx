import { useTranslation } from 'react-i18next'

const PartnershipInquiries = () => {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-blue-900 px-6 py-10 text-white shadow-lg sm:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase">{t('Partnership')}</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Partnership Inquiries</h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-100 sm:text-base">
            {t('Find out how your organization can become an official partner or sponsor of the NextGen Robotics Competition.')}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-5">{t('How to Become a Partner')}</h2>
            <div className="space-y-5 text-slate-700 leading-relaxed">
              <div>
                <p className="font-semibold">{t('Review our sponsorship opportunities')}</p>
                <p>{t('We offer structured partnership packages for companies, educational organizations, and community sponsors interested in supporting robotics education and competitive events.')}</p>
              </div>
              <div>
                <p className="font-semibold">{t('Prepare your sponsorship inquiry')}</p>
                <p>{t('Please include your organization name, sponsorship interest, preferred level of engagement, and any questions regarding sponsor benefits and visibility.')}</p>
              </div>
              <div>
                <p className="font-semibold">{t('Submit your inquiry by email')}</p>
                <p>{t('Send your inquiry to the partnership team and we will provide details on available options, sponsorship recognition, and the next steps.')}</p>
              </div>
              <div>
                <p className="font-semibold">{t('Finalize the partnership agreement')}</p>
                <p>{t('Once your inquiry is received, we will follow up with a formal proposal, terms, and the agreement required to confirm the partnership.')}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-5">{t('Contact the Partnership Team')}</h2>
            <p className="text-slate-700 mb-6 leading-relaxed">
              {t('For sponsorship or partnership inquiries, please contact our partnership team by email. We welcome interest from technology firms, educational institutions, foundations, and regional businesses seeking a strategic collaboration.')}
            </p>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-3">{t('Email')}</p>
              <a href="mailto:nextgenazer@gmail.com" className="text-base font-semibold text-blue-700 hover:text-blue-900">nextgenazer@gmail.com</a>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{t('Information to include')}</h3>
                <ul className="mt-3 space-y-2 text-slate-700 list-disc list-inside">
                  <li>{t('Organization name and industry')}</li>
                  <li>{t('Sponsorship type or estimated support level')}</li>
                  <li>{t('Preferred focus areas, such as event support, prizes, workshops, or promotional visibility')}</li>
                  <li>{t('Primary contact name, role, and email address')}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">{t('Response timeline')}</h3>
                <p className="mt-3 text-slate-700">{t('Our team typically replies to partnership inquiries within 2 business days. If you need an urgent response, please include that note in your email subject line.')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl">
          <h2 className="font-display text-2xl font-bold mb-4">{t('Partner with NextGen Robotics Competition')}</h2>
          <p className="text-sm leading-relaxed max-w-3xl">{t('Partnering with NextGen Robotics provides a valuable opportunity to support STEM development, increase brand visibility, and contribute to the growth of the robotics community.')}</p>
        </div>
      </div>
    </section>
  )
}

export default PartnershipInquiries
