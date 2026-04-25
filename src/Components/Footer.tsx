import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className='relative bg-slate-900 py-10 text-slate-100 mt-16 overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(34,211,238,.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,.2),transparent_40%)]'></div>
      <div className='relative max-w-6xl mx-auto px-6'>
        <div className='grid gap-8 md:grid-cols-2 items-center'>
          <div>
            <h3 className='text-lg font-semibold tracking-wider text-cyan-300 uppercase'>NextGen Robotics Competition</h3>
            <p className='mt-2 text-sm text-slate-200'>Building the future, one bot at a time. Join our community of innovators.</p>
          </div>
          <div className='flex flex-wrap justify-center md:justify-end gap-4 text-sm'>
            <Link to='/home' className='px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 transition'>Home</Link>
            <Link to='/about' className='px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 transition'>About</Link>
            <Link to='/standings' className='px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 transition'>Standings</Link>
            <Link to='/news' className='px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 transition'>News</Link>
            <Link to='/regulations' className='px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 transition'>Regulations</Link>
            <Link to='/partners' className='px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 transition'>Partners</Link>
            <Link to='/faq' className='px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 transition'>FAQ</Link>
            <Link to='/contact' className='px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 transition'>Contact</Link>
          </div>
        </div>

        <hr className='my-8 border-slate-700' />

        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400'>
          <p className='text-center md:text-left'>&copy; {new Date().getFullYear()} NextGen Robotics Competition. All rights reserved.</p>
          <p className='text-center md:text-right'>Built by <strong className='text-cyan-300'>NextGen Innovations Team</strong></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer