import { useEffect, useState } from 'react'
import { Link } from 'react-router'


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`sticky-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <nav className='navbar-inner mx-auto mt-3 flex justify-between items-center bg-blue-600 rounded-[14px] py-2 px-2 md:px-4 border border-[#60a5fa] shadow-[0_8px_20px_rgba(37,99,235,0.35),0_0_18px_rgba(96,165,250,0.35)]'>
            <Link to='/home' className='flex items-center gap-2 pl-1'>
                <div className='leading-tight rounded-md bg-white/10 px-2 py-1 sm:px-3'>
                  <p className='font-display text-xs sm:text-sm lg:text-base text-white'>NextGen Robotics</p>
                  <p className='text-[9px] sm:text-[10px] lg:text-xs text-blue-100 tracking-[0.16em]'>COMPETITION</p>
                </div>
            </Link>

            {/* Desktop Menu */}
            <ul className='hidden lg:flex items-center gap-2 xl:gap-3 mt-1'>
                <Link className='font-display text-[15px] xl:text-lg font-medium text-white hover:text-blue-200 transition-colors' to='/home'>Home</Link>
                <Link className='font-display text-[15px] xl:text-lg font-medium text-white hover:text-blue-200 transition-colors' to='/about'>About</Link>
                <Link className='font-display text-[15px] xl:text-lg font-medium text-white hover:text-blue-200 transition-colors' to='/standings'>Standings</Link>
                <Link className='font-display text-[15px] xl:text-lg font-medium text-white hover:text-blue-200 transition-colors' to='/news'>News</Link>
                <Link className='font-display text-[15px] xl:text-lg font-medium text-white hover:text-blue-200 transition-colors' to='/participants'>Participants</Link>
                <Link className='font-display text-[15px] xl:text-lg font-medium text-white hover:text-blue-200 transition-colors' to='/regulations'>Regulations</Link>
                <Link className='font-display text-[15px] xl:text-lg font-medium text-white hover:text-blue-200 transition-colors' to='/partners'>Partners</Link>
                <Link className='font-display text-[15px] xl:text-lg font-medium text-white hover:text-blue-200 transition-colors' to='/awards'>Awards</Link>
                <Link className='font-display text-[15px] xl:text-lg font-medium text-white hover:text-blue-200 transition-colors' to='/contact'>Contact</Link>
                <a
                  className='font-display text-[15px] xl:text-lg font-medium text-white bg-blue-500 hover:bg-blue-700 py-2 px-3 xl:px-4 rounded-2xl transition-colors'
                  href='/user/auth'
                  rel='noopener noreferrer'
                >
                  Sign UP
                </a>
            </ul>

            <button
              className='lg:hidden text-white text-3xl font-bold focus:outline-none px-2'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
        </nav>

        {isMenuOpen && (
          <div className='lg:hidden absolute right-0 top-full mt-2 w-[min(92vw,420px)] bg-blue-600 rounded-[14px] border border-[#60a5fa] shadow-lg z-50'>
             <Link to='/home' className='flex items-center gap-2 pl-1'>
                <div className='leading-tight rounded-md bg-white/10 px-2 py-1'>
                  <p className='font-display text-sm text-white'>NextGen Robotics</p>
                  <p className='text-[10px] text-blue-100 tracking-[0.16em]'>COMPETITION</p>
                </div>
            </Link>
            <ul className='flex flex-col py-4 px-4 space-y-4'>
                <Link className='font-display text-[20px] font-medium text-white hover:text-blue-200 transition-colors py-2' to='/home' onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link className='font-display text-[20px] font-medium text-white hover:text-blue-200 transition-colors py-2' to='/about' onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link className='font-display text-[20px] font-medium text-white hover:text-blue-200 transition-colors py-2' to='/standings' onClick={() => setIsMenuOpen(false)}>Standings</Link>
                <Link className='font-display text-[20px] font-medium text-white hover:text-blue-200 transition-colors py-2' to='/news' onClick={() => setIsMenuOpen(false)}>News</Link>
                <Link className='font-display text-[20px] font-medium text-white hover:text-blue-200 transition-colors py-2' to='/participants' onClick={() => setIsMenuOpen(false)}>Participants</Link>
                <Link className='font-display text-[20px] font-medium text-white hover:text-blue-200 transition-colors py-2' to='/regulations' onClick={() => setIsMenuOpen(false)}>Regulations</Link>
                <Link className='font-display text-[20px] font-medium text-white hover:text-blue-200 transition-colors py-2' to='/partners' onClick={() => setIsMenuOpen(false)}>Partners</Link>
                <Link className='font-display text-[20px] font-medium text-white hover:text-blue-200 transition-colors py-2' to='/awards' onClick={() => setIsMenuOpen(false)}>Awards</Link>
                <Link className='font-display text-[20px] font-medium text-white hover:text-blue-200 transition-colors py-2' to='/contact' onClick={() => setIsMenuOpen(false)}>Contact</Link>
                <a
                  className='font-display text-[20px] font-medium text-white bg-blue-500 hover:bg-blue-700 py-3 px-6 rounded-2xl transition-colors w-full text-left'
                  href='/user/auth'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign UP
                </a>
            </ul>
          </div>
        )}
    </div>
  )
}

export default Navbar