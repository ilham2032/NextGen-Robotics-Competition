const Partners = () => {
  return (
    <section className='min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 px-6 py-10 text-white shadow-lg sm:px-8'>
          <p className='text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase'>Network & Support</p>
          <h1 className='mt-2 font-display text-4xl font-bold sm:text-5xl'>Partners</h1>
          <p className='mt-3 max-w-3xl text-sm text-blue-100 sm:text-base'>
            We are grateful to organizations that support NextGen Robotics Competition and help us build a stronger innovation ecosystem.
          </p>
          <p className='mt-2 text-sm text-blue-100 sm:text-base'>
            For sponsorship inquiries, contact <a href="mailto:nextgenazer@gmail.com" className='font-semibold text-white underline'>nextgenazer@gmail.com</a>.
          </p>
        </div>

        <div className='mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <article className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg flex items-center justify-center'>
            <img src='/path/to/partner1-logo.png' alt='AJRST' className='max-h-16' />
          </article>
          <article className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center gap-3'>
            <img src='https://www.robkod.org/wp-content/uploads/2024/01/logo.png' alt='RoboChallenge Romania' className='max-h-16' />
            <p className='text-sm font-medium text-slate-700'>RoboChallenge Romania</p>
          </article>
          <article className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg flex items-center justify-center'>
            <img src='/path/to/partner3-logo.png' alt='JSUMO' className='max-h-16' />
          </article>
        </div>
      </div>
    </section>
  )
}

export default Partners

