import React from "react";
import './tabList.css'

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["About Me", "Experiences", "Recommended"];
  return (
    <div className="flex  p-2 pb-3 overflow-x-auto no-scrollbar bg-black/80 border-b border-slate-700/30 m-3 rounded-2xl text-sm sm:text-base  lg:gap-5 gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-2 rounded-2xl custom-1 custom-2 tabbutton transition-colors duration-300 ${activeTab === tab
              ? "bg-[#28292F] text-white px-2"
              : "text-[#969696] hover:text-white"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>

  );
};

export default Tabs;
