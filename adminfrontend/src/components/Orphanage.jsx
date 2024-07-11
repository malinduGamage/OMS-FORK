import React, { useState, useEffect } from "react";
import orphanageImage from "../assets/images/orphanage1.jpg";
import { orphanageTabs } from "../constants"; // Replace this with the correct path
import Overview from "./Overview";
import Children from "./Children";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { Requests } from "./Requests";

const Orphanage = () => {

  const navigate = useNavigate()
  const logout = useLogout()
  const [selectedTab, setSelectedTab] = useState(orphanageTabs[0].label);
  const [type, setType] = useState('')

  // Function to render the corresponding component based on the selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Overview":
        return <Overview />;
      case "Children":
        return <Children />;
      case "Sent Requests":
        return <Requests type={type} />;
      case "Received Requests":
        return <Requests type={type} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (selectedTab === 'Sent Requests') {
      setType('sent')
    } else if (selectedTab === 'Received Requests') {
      setType('received')
    }
  }, [selectedTab])


  const signout = async () => {
    await logout();
    navigate('/')
  }

  return (
    <div className="container mx-auto ">
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

          <button className="text-white" onClick={signout}>Sign Out</button>
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

                  key={tab.label}
                  className={`shrink-0 border-b-2 px-1 pb-4 font-semibold   ${selectedTab === tab.label
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
