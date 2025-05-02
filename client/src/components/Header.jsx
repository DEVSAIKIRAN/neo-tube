import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
        {/**left side */}
        <div >
            <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight '>Remove the <br className='max-md:hidden'/> <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent' >background</span> from  <br className='max-md:hidden' />images for free</h1>
            <p className='my-6 text-[15px] text-gray-500'>Remove background from images in seconds.<br className='max-md:hidden' />boldtech provides everything!</p>
            <div>
              <input type="file" name="" id="upload1"  hidden accept='image/*'/>
              <label htmlFor="upload1" className='flex items-center justify-center gap-x-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold rounded-full shadow-blue-400 py-3 px-4 cursor-pointer hover:scale-[1.02] transition-all duration-200 ease-in-out '>
                <img src={assets.upload_btn_icon} width={20} />
                <p>Upload your image</p>
              </label>
            </div>
        </div>
        {/**right side */}
        <div className='w-full max-w-md'>
          <img src={assets.header_img} alt="" className='hover:scale-105 transition-all duration-500 ease-in-out' />
        </div>
    </div>
  )
}

export default Header