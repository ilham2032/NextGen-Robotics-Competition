const Partners= () => {
  return (
    <div>
      
      <div className='max-w-4xl mx-auto mt-16 lg:mt-32 px-4 text-center'>
        <h1 className='text-4xl lg:text-5xl font-display text-blue-600 font-bold'>PARTNERS</h1>
        <p className='text-slate-600 mt-4 text-sm lg:text-base'>
          We are grateful for the support of our sponsors who help make the NextGen Robotics Competition possible. If you are interested in sponsoring or partnering with us, please contact us to discuss opportunities to shape tomorrow's technology.
        </p>
        <p className='text-slate-600 mt-2 text-sm lg:text-base'>
          For sponsorship inquiries, please reach out to us at <a href="mailto:nextgenazer@gmail.com" className='text-blue-600 hover:underline'>
            nextgenazer@gmail.com
          </a>
        </p>
      </div>

      <section className='mx-auto mt-20 max-w-6xl px-6 pb-8 md:px-10 lg:px-16'>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg flex items-center justify-center'>
            <img src='/path/to/partner1-logo.png' alt='AJRST' className='max-h-16' />
          </div>
          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg flex justify-center '>
            <img src='https://www.robkod.org/wp-content/uploads/2024/01/logo.png' alt='RoboChallenge Romania' className='max-h-16' />
            <p>RoboChallenge Romania</p>
          </div>
          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg flex items-center justify-center'>
            <img src='/path/to/partner3-logo.png' alt='JSUMO' className='max-h-16' />
          </div>
        </div>
      </section>

      
     

    </div>
  )
}

export default Partners