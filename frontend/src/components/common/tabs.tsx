"use client";
import React, { useState } from "react";

const Tabs = ({
  tabs,
}: {
  tabs: {
    title: string;
    content: React.ReactNode;
  }[];
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);
  return (
    <div className="">
      <div className="flex items-center gap-5 border-b-2 ">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={` py-2 px-3 text-foreground/70 font-medium transition-colors duration-300 ${activeTab === tab.title ? "border-b-4 border-primary text-primary" : "hover:text-primary"}`}
            onClick={() => setActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className=" overflow-hidden mt-5">
        <div className=" inset-0 flex transition-transform duration-500 ease-in-out">
          {tabs.find((item) => item.title === activeTab)?.content}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
