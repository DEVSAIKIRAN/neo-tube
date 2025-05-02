import React from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
const Navbar = () => {
  const {openSignIn} = useClerk()
  const { isSignedIn , user } = useUser()
  return (
    <div className='flex  items-center justify-between m-4 py3 lg:mx-44'>
        <Link to='/'><img src={assets.logo} className='w-32 sm:w-44' /></Link>
        {
          isSignedIn ? <div>
            <UserButton/>
          </div>
           : 
          <button onClick={()=>openSignIn({})} className='bg-zinc-800 text-amber-50 flex items-center gap-4 px-4 py-2 sm:px-6 sm:py-3 rounded-3xl text-sm cursor-pointer  hover:scale-[1.02] transition-all duration-200 ease-in-out '>
          Get Started
          <img src={assets.arrow_icon} className='w-3 sm:w-4'/>
      </button>
        }
      
    </div>
  )
}

export default Navbar