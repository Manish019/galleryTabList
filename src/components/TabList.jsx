import React from "react";
import './tabList.css'

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["About Me", "Experiences", "Recommended"];
  return (
    <div className="flex gap-2 p-3 pb-3 overflow-x-auto no-scrollbar bg-black/80 border-b border-slate-700/30 m-3 border rounded-2xl">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-1 rounded-2xl text-base ${activeTab === tab
            ? "bg-[#28292F] text-white custom-1 custom-2 tabbutton"
            : " text-[#969696]"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
