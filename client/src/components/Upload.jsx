import React from 'react'
import { assets } from '../assets/assets'
const Upload = () => {
  return (
    <div className='pb-16'>
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16' >See the magic. Try now</h1>
        
         <div className='text-center m-24'>
           <input type="file" name="" id="upload2"  hidden accept='image/*'/>
            <label htmlFor="upload2" className='flex items-center justify-center gap-x-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold rounded-full shadow-blue-400 py-3 px-4 cursor-pointer hover:scale-[1.02] transition-all duration-200 ease-in-out '>
          <img src={assets.upload_btn_icon} width={20} />
              <p>Upload your image</p>
            </label>
        </div>
    </div>
  )
}

export default Upload