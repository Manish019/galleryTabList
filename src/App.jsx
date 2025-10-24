import React from 'react'
import TabContent from './components/TabContent'
import GalleryCard from './components/GalleryCard'

const App = () => {
  return (
    <div className="bg-[#363C43] p-4 sm:p-6 lg:p-8 min-h-screen  items-center justify-center">
        <TabContent />
      <div className="w-full max-w-[670px] mx-auto mt-5">   
        <GalleryCard />
      </div>
   </div>

  
  )
}

export default App
