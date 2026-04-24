const About = () => {
  return (
    <main className='min-h-screen bg-white text-slate-900 overflow-hidden'>
      <div className='absolute inset-0 bg-linear-to-br from-cyan-200 via-white to-slate-100 opacity-70 pointer-events-none'></div>
      <div className='relative max-w-6xl mx-auto px-6 pt-28 pb-24'>
        <header className='text-center mb-14'>
          <h1 className='text-5xl md:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600'>About NextGen Robotics</h1>
          <p className='mt-4 text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed'>
            NextGen Robotics Competition empowers the next generation of innovators by combining engineering, strategy, and hands-on learning. Teams level up in problem-solving, collaboration, and competitive spirit.
          </p>
        </header>

        <div className='mb-12 grid gap-8 md:grid-cols-2 items-center'>
          <div className='rounded-3xl overflow-hidden shadow-2xl transform transition duration-500 hover:-translate-y-2 bg-linear-to-r from-blue-500 to-indigo-500'>
            <img src='https://edgerton.mit.edu/sites/default/files/2021-05/14231185_1082261505194512_820772061020141366_o.jpg' alt='Robotics competition' className='w-full h-80 object-cover opacity-90' />
          </div>
          <div className='space-y-4'>
            <p className='text-slate-700 text-base md:text-lg leading-relaxed'>We deliver an immersive, NextGen experience using inclusive rules, live scoring, and team mentorship. Every year, we bring fresh challenges to test agility, design thinking, coding, and autonomous systems.</p>
            <p className='text-slate-700 text-base md:text-lg leading-relaxed'>The competition also includes workshops in AI, sensor integration, and robotics strategy, along with networking opportunities from top technology sponsors.</p>
          </div>
        </div>

        <section className='grid gap-6 md:grid-cols-2 lg:grid-cols-2'>
          <article className='relative rounded-2xl border border-blue-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-lg'>
            <h2 className='text-2xl font-semibold text-blue-700 mb-2'>General</h2>
            <p className='text-slate-600 leading-relaxed'>International tech competition for high school and university teams with engineering and AI categories. The goal is to encourage learning through hands-on robot design and strong team culture.</p>
          </article>

          <article className='relative rounded-2xl border border-blue-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-lg'>
            <h2 className='text-2xl font-semibold text-blue-700 mb-2'>Competition Dates</h2>
            <ul className='space-y-2 text-slate-600'>
              <li>Registration deadline: <strong>June 15</strong></li>
              <li>Practice day / inspection: <strong>July 22</strong></li>
              <li>Main event: <strong>July 23-24</strong></li>
            </ul>
          </article>

          <article className='relative rounded-2xl border border-blue-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-lg'>
            <h2 className='text-2xl font-semibold text-blue-700 mb-2'>Contact</h2>
            <p className=' text-slate-600 leading-relaxed'>Questions about team setup, rules, or location? Our support team is ready to help at every stage.</p>
            <ul className='mt-3 space-y-1 text-slate-600'>
              <li>Email: <a href='mailto:info@nextgenrobotics.com' className='text-cyan-500 underline'>nextgenazer@gmail.com</a></li>
              <li>Phone: <strong>+994 55 718 68 58</strong></li>
              <li>Venue: <strong>123 Future Drive, Tech City</strong></li>
            </ul>
          </article>

          <article className='relative rounded-2xl border border-blue-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-lg'>
            <h2 className='text-2xl font-semibold text-blue-700 mb-2'>Registration</h2>
            <ul className='space-y-2 text-slate-600'>
              <li>Fee: <strong>FREE</strong></li>
              <li>Team size: up to <strong>3-4 members</strong></li>
              <li>Submit: design document + robot blueprint</li>
            </ul>
            <p className='mt-2 text-sm text-slate-500'>Early registrants get priority scheduling and exclusive workshop spots.</p>
          </article>
        </section>
      </div>
    </main>
  )
}

export default About