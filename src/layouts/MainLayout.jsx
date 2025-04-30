import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { DarkModeContext } from "../../Context/DarkModeContext"; // Import the context

const MainLayout = ({ children }) => {
  const { darkMode } = useContext(DarkModeContext); // Access darkMode state

  return (
    <div
      className={`flex h-screen ${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main
          className={`flex-1 overflow-y-auto p-6 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
