import React, { useContext } from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import ChatbotSidebar from "../components/Sidebar/ChatbotSidebar";
import Navbar from "../components/Navbar/Navbar";
import { DarkModeContext } from '../Context/DarkModeContext';

const MainLayout = ({ children, isChatbot = false, currentChatId = null, onStartNewChat = () => {} }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex h-screen ${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* Sidebar - either regular or chatbot */}
      <div className="w-64">
        {isChatbot ? (
          <ChatbotSidebar
            onStartNewChat={onStartNewChat}
            currentChatId={currentChatId}
          />
        ) : (
          <Sidebar />
        )}
      </div>

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