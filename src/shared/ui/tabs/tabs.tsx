import type { TabContentProps, TabProps, TabsProps } from "./tabs.types";
import React, { useState } from "react";

const Tab: React.FC<TabProps> = ({ tab, isActive, onClick }) => (
  <button
    className={`pb-4 font-semibold capitalize transition-colors relative ${
      isActive ? "text-rose-500" : "text-gray-500 hover:text-gray-700"
    }`}
    onClick={onClick}
  >
    {tab.name}
    {isActive && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-rose-500 to-pink-500" />
    )}
  </button>
);

const TabContent: React.FC<TabContentProps> = ({ content }) => (
  <div className="py-12">{content}</div>
);

const Tabs: React.FC<TabsProps> = ({ tabsData }) => {
  const [activeTab, setActiveTab] = useState<string>(tabsData[0]?.name || "");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const activeTabData = tabsData.find((tab) => tab.name === activeTab);

  return (
    <div className="mt-20">
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          {tabsData.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              isActive={tab.name === activeTab}
              onClick={() => handleTabClick(tab.name)}
            />
          ))}
        </div>
      </div>
      {activeTabData && <TabContent content={activeTabData.content} />}
    </div>
  );
};

export default Tabs;
