import React, { useState } from "react";
import orphanageImage from "../assets/images/orphanage1.jpg";
import { orphanageTabs } from "../constants"; // Replace this with the correct path
import Overview from "./Overview";
import Children from "./Children";

const Orphanage = () => {
  const [selectedTab, setSelectedTab] = useState(orphanageTabs[0].label);

  // Function to render the corresponding component based on the selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Overview":
        return <Overview />;
      case "Children":
        return <Children />;
      // Add cases for other tabs if needed
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="h-[50vh] relative">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${orphanageImage})`,
          }}
        ></div>
        <div className="absolute bottom-20 left-5">
          <h1 className="text-white font-bold text-3xl">
            Somawathi Child Orphanage
          </h1>
        </div>
      </div>

      {/* Tab selection area */}
      <div className="relative mt-10">
        {/* Mobile dropdown */}
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>
          <select
            id="Tab"
            className="w-full rounded-md border-gray-200"
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
          >
            {orphanageTabs.map((tab) => (
              <option key={tab.label} value={tab.label}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop tabs */}
        <div className="hidden sm:block ">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6 justify-around" aria-label="Tabs">
              {orphanageTabs.map((tab) => (
                <div
                
                 
                  className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-semibold   ${
                    selectedTab === tab.label
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                  onClick={() => setSelectedTab(tab.label)}
                  aria-current={selectedTab === tab.label ? "page" : undefined}
                >
                  {tab.label}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Render tab content */}
        <div className="mt-5">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Orphanage;
