import React, { useState } from "react";
import TabList from "./TabList";
// import GalleryCard from "./GalleryCard";
import './tabList.css'

function TabContent() {
  const [activeTab, setActiveTab] = useState("About Me");

  const content = {
    "About Me": `Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4-year-old twin daughters — Emma and Ella.`,
    Experiences:
      "With over 3 years at Salesforce, I have extensive experience in sales, customer relationship management, and team collaboration.",
    Recommended:
      "Check out my recommendations from colleagues and clients who have worked with me over the years.",
  };

  return (
   <>
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-1">
        <div className="w-full max-w-2xl space-y-6">
          {/* ABOUT BOX */}
          <div className="bg-[#363C43] rounded-3xl outer-box">
            

            <TabList activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="px-6 pb-6">
              <div className="lg:p-8">
                <div className="mt-4 max-h-48 overflow-y-auto pr-4 custom-scrollbar">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {content[activeTab]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
     


   </>

  );
}

export default TabContent;
