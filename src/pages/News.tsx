import { Link } from 'react-router'

const News = () => {
  return (
    <section className='min-h-screen bg-slate-50 px-4 pb-16 pt-24 sm:px-6 sm:pt-28'>
      <div className='mx-auto max-w-5xl'>
        <div className='rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 px-6 py-10 text-white shadow-lg sm:px-8'>
          <p className='text-xs font-semibold tracking-[0.25em] text-blue-100 uppercase'>Event Updates</p>
          <h1 className='mt-2 font-display text-4xl font-bold sm:text-5xl'>News</h1>
          <p className='mt-3 text-sm text-blue-100 sm:text-base'>Stay updated with the latest announcements from NextGen Robotics Competition.</p>
        </div>
      </div>

      <Link to='/news/nextgen1'>
        <article className='mt-8 rounded-2xl border border-blue-100 bg-white p-6 max-w-5xl mx-auto shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
          <h4 className='font-display text-2xl font-semibold text-blue-800'>NextGen Robotics Competition 1st Edition in Azerbaijan</h4>
        </article>
      </Link>
    </section>
  )
}

export default News

