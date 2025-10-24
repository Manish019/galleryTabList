import React from 'react'
import TabContent from './components/TabContent'
import GalleryCard from './components/GalleryCard'

const App = () => {
  return (
    <div className="bg-[#363C43] p-4 sm:p-6 lg:p-8 min-h-screen  items-center justify-center">
    <h1 className='text-2xl text-white text-center mb-5 uppercase'>Assignment</h1>


        <TabContent />
      <div className='w-full max-w-[670px] mx-auto mt-5'>
          <hr className="border-t border-3 border-white/10 rounded-full mt-10 mb-10"/>
        </div>
        <div className="w-full max-w-[670px] mx-auto mt-5">
          <GalleryCard />
        </div>
   </div>

  
  )
}

export default App
