import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import BigSlider from '../components/BigSlider'
import Testimonials from '../components/Testimonials'
import Upload from '../components/Upload'

const Home = () => {
  return (
    <div >
        <Header/>
        <Steps/>
        <BigSlider/>
        <Testimonials/>
        <Upload/>
    </div>
  )
}

export default Home