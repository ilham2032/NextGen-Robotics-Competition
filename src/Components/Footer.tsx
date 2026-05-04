import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='relative bg-slate-900 text-slate-100 mt-20 overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(34,211,238,.15),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,.1),transparent_50%)]'></div>
      <div className='absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/50 to-transparent'></div>

      <div className='relative max-w-7xl mx-auto px-6 py-16'>
        <div className='grid gap-12 lg:grid-cols-4 md:grid-cols-2'>
          {/* Company Info */}
          <div className='lg:col-span-1'>
            <div className='mb-6'>
              <h3 className='text-xl font-bold text-white mb-2'>NextGen Robotics</h3>
              <p className='text-cyan-300 font-medium text-sm tracking-wider uppercase'>Competition 2026</p>
            </div>
            <p className='text-slate-300 text-sm leading-relaxed mb-6'>
              Empowering the next generation of robotics innovators through competitive challenges,
              education, and community building across the globe.
            </p>
            <div className='flex space-x-4'>
              <a href='#' className='w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'/>
                </svg>
              </a>
              <a href='#' className='w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z'/>
                </svg>
              </a>
              <a href='#' className='w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                </svg>
              </a>
              <a href='#' className='w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12.017 24c6.624 0 11.99-5.367 11.99-11.013C24.007 5.367 18.641.001.012.017z'/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-6'>Quick Links</h4>
            <ul className='space-y-3'>
              <li><Link to='/home' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>Home</Link></li>
              <li><Link to='/about' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>About Us</Link></li>
              <li><Link to='/standings' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>Live Standings</Link></li>
              <li><Link to='/news' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>Latest News</Link></li>
              <li><Link to='/participants' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>Participants</Link></li>
              <li><Link to='/regulations' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>Competition Rules</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-6'>Competition Categories</h4>
            <ul className='space-y-3'>
              <li><Link to='/rules/minisumo' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>Mini Sumo</Link></li>
              <li><Link to='/rules/linefollower' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>Line Follower</Link></li>
              <li><Link to='/rules/legoline' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>LEGO Line Follower</Link></li>
              <li><Link to='/rules/legosumo' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>LEGO Sumo</Link></li>
              <li><Link to='/rules/botscombat' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>Bots Combat</Link></li>
              <li><Link to='/rules/drone' className='text-slate-300 hover:text-cyan-300 transition-colors duration-200 text-sm'>Drone Racing</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-6'>Contact & Support</h4>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <svg className='w-5 h-5 text-cyan-300 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
                <div>
                  <p className='text-slate-300 text-sm'>info@nextgenrobotics.az</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <svg className='w-5 h-5 text-cyan-300 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                </svg>
                <div>
                  <p className='text-slate-300 text-sm'>+994 12 345 67 89</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <svg className='w-5 h-5 text-cyan-300 mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                <div>
                  <p className='text-slate-300 text-sm'>Baku, Azerbaijan</p>
                </div>
              </div>
            </div>
            <div className='mt-6'>
              <Link
                to='/contact'
                className='inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors duration-200'
              >
                Contact Us
                <svg className='w-4 h-4 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-slate-800 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='flex flex-col md:flex-row items-center gap-4 text-sm text-slate-400'>
              <p>&copy; {new Date().getFullYear()} NextGen Robotics Competition. All rights reserved.</p>
              <div className='flex items-center gap-4'>
                <Link to='/privacy' className='hover:text-cyan-300 transition-colors duration-200'>Privacy Policy</Link>
                <Link to='/terms' className='hover:text-cyan-300 transition-colors duration-200'>Terms of Service</Link>
              </div>
            </div>
            <div className='flex items-center gap-2 text-sm text-slate-400'>
              <span>Powered by</span>
              <span className='text-cyan-300 font-semibold'>INNOVATIONS TEAM</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer