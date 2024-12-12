import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
