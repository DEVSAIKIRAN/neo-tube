import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div className='m-4 lg:mx-44 py-20 xl:py-40'>
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent '>Steps to remove background <br/>image in seconds</h1>
        <div className='flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center flex-col md:flex-row'>
            <div className='flex items-start gap-4 bg-white shadow-lg rounded-lg p-6 max-w-[400px] w-full hover:scale-105 transition-all duration-500 ease-in-out'>
                <img src={assets.upload_icon} className='max-w-9' />
                <div>
                    <p className='text-xl font-medium'>Upload image</p>
                    <p className='text-sm text-neutral-500 mt-1'>upload image in any format <br /> like .png , .jpeg etc</p>
                </div>
            </div>
            <div className='flex items-start gap-4 bg-white shadow-lg rounded-lg p-6 max-w-[400px] w-full hover:scale-105 transition-all duration-500 ease-in-out'>
                <img src={assets.remove_bg_icon} className='max-w-9' />
                <div>
                    <p className='text-xl font-medium'>Remove Background</p>
                    <p className='text-sm text-neutral-500 mt-1'>your uploaded image <br />will  get background less</p>
                </div>
            </div>
            <div className='flex items-start gap-4 bg-white shadow-lg rounded-lg p-6 max-w-[400px] w-full hover:scale-105 transition-all duration-500 ease-in-out'>
                <img src={assets.download_icon} className='max-w-9' />
                <div>
                    <p className='text-xl font-medium'>Download image</p>
                    <p className='text-sm text-neutral-500 mt-1'>download your <br />  image for free</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Steps