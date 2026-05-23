import { useTranslation } from 'react-i18next'
import type { OrganizationDefinition } from '../data/organizations'
import { normalizeWebsiteUrl } from '../data/organizations'

type OrganizationCardProps = {
  organization: OrganizationDefinition
}

const ExternalLinkIcon = () => (
  <svg className='h-4 w-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
    />
  </svg>
)

const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  const { t } = useTranslation()
  const websiteUrl = normalizeWebsiteUrl(organization.website)
  const name = t(organization.nameKey)
  const description = t(organization.descriptionKey)
  const badgeLabel = organization.type === 'sponsor' ? t('Sponsor') : t('Partner')

  return (
    <article className='group flex h-full flex-col rounded-2xl border border-blue-100 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md'>
      <div className='flex flex-1 flex-col p-6'>
        <span className='inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800 ring-1 ring-blue-100'>
          {badgeLabel}
        </span>

        <a
          href={websiteUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-5 flex h-28 items-center justify-center rounded-xl border border-blue-50 bg-white p-4 transition duration-300 hover:border-blue-100 hover:bg-blue-50/50'
          aria-label={`${t('Visit website')}: ${name}`}
        >
          {organization.logo ? (
            <img
              src={organization.logo}
              alt={organization.logoAlt}
              className='max-h-20 w-full object-contain'
            />
          ) : (
            <span className='font-display text-3xl font-bold text-blue-200'>{name.charAt(0)}</span>
          )}
        </a>

        <div className='mt-5 flex flex-1 flex-col'>
          <h3 className='text-lg font-semibold text-slate-900'>{name}</h3>
          <p className='mt-2 flex-1 text-sm leading-relaxed text-slate-600'>{description}</p>
        </div>

        <a
          href={websiteUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        >
          <span>{t('Visit website')}</span>
          <ExternalLinkIcon />
        </a>
      </div>
    </article>
  )
}

export default OrganizationCard
