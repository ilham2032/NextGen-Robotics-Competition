import type { ReactNode } from 'react'
import type { OrganizationDefinition } from '../data/organizations'
import OrganizationCard from './OrganizationCard'

type OrganizationSectionProps = {
  id: string
  title: string
  description: string
  organizations: OrganizationDefinition[]
  emptyMessage?: string
  footer?: ReactNode
}

const OrganizationSection = ({
  id,
  title,
  description,
  organizations,
  emptyMessage,
  footer,
}: OrganizationSectionProps) => {
  if (organizations.length === 0) {
    return emptyMessage ? (
      <section className='rounded-2xl border border-dashed border-blue-100 bg-white px-6 py-12 text-center'>
        <p className='text-sm text-slate-500'>{emptyMessage}</p>
      </section>
    ) : null
  }

  return (
    <section id={id} className='scroll-mt-28' aria-labelledby={`${id}-title`}>
      <div className='mb-8 max-w-3xl'>
        <h2 id={`${id}-title`} className='font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
          {title}
        </h2>
        <p className='mt-3 text-base leading-relaxed text-slate-600'>{description}</p>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {organizations.map((organization) => (
          <OrganizationCard key={organization.id} organization={organization} />
        ))}
      </div>

      {footer ? <div className='mt-8'>{footer}</div> : null}
    </section>
  )
}

export default OrganizationSection
