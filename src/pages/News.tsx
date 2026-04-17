import React from 'react'
import { Link } from 'react-router'

const News = () => {
  return (
    <div className='min-h-screen bg-white py-12 px-4 lg:px-6'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl lg:text-5xl font-display text-blue-600 font-bold text-center mt-16 lg:mt-32'>NEWS</h1>
        <p className='text-center text-slate-600 mt-4 text-sm lg:text-base'>Stay updated with the latest announcements and news from NextGen Robotics Competition</p>
      </div>

      <Link to='/news/nextgen1'><div className='mt-8 bg-blue-50/60 rounded-2xl border border-blue-100 p-6 max-w-4xl mx-auto shadow-sm '>
        <h4 className='font-display text-2xl font-semibold text-blue-800'>NextGen Robotics Competition 1st Edition in AZERBAIJAN</h4>
      </div></Link>
    </div>
  )
}

export default News