import React from 'react'
import { assets } from '../assets/assets'

const Notfound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-slate-50'>
      <img src={assets.download} className='w-2xl'/>
      <p className='text-center text-lg md:text-xl lg:text-2xl mt-4 font-semibold text-gray-500'>The page you are looking for does not exist.</p>
    </div>
  )
}

export default Notfound