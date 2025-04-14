import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUserFriends, FaComments, FaCog, FaRobot, FaEnvelope, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { DarkModeContext } from "../../Context/DarkModeContext";

const Sidebar = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome />, badge: null },
    { name: "Appointments", path: "/appointments", icon: <FaCalendarAlt />, badge: 3 },
    { name: "Patients", path: "/patients", icon: <FaUserFriends />, badge: null },
    { name: "Requests", path: "/appointmentRequests", icon: <FaEnvelope />, badge: 5 },
    { name: "Chat", path: "/chat", icon: <FaComments />, badge: 2 },
    { name: "Chatbot", path: "/chatbot", icon: <FaRobot />, badge: null },
    { name: "Settings", path: "/settings", icon: <FaCog />, badge: null },
  ];

  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-64 h-full flex flex-col transition-all duration-300 border-r shadow-xl ${
        darkMode 
          ? "bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700" 
          : "bg-gradient-to-b from-white to-gray-50 border-gray-300"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center justify-center h-24 border-b ${darkMode ? "border-gray-700" : "border-gray-300"} mt-11`}>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex flex-col items-center"
        >
          <h1 className={`text-3xl font-extrabold tracking-wide bg-gradient-to-r ${
            darkMode 
              ? "from-blue-400 to-purple-500" 
              : "from-blue-600 to-purple-700"
            } bg-clip-text text-transparent`}
          >
            DocPortal
          </h1>
          <div className="h-1 w-24 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
        </motion.div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <motion.ul 
          className="space-y-3"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {menuItems.map((item, index) => (
            <motion.li 
              key={item.name}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 }
              }}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-5 py-3 rounded-lg transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? darkMode 
                        ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white" 
                        : "bg-gradient-to-r from-blue-100 to-purple-100 text-gray-900"
                      : darkMode 
                        ? "text-gray-300 hover:bg-gray-800/50 hover:text-white" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Left Side Animation Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                    )}
                    
                    <div className="flex items-center gap-4 z-10">
                      <span className={`text-2xl ${
                        isActive ? "text-blue-400" : ""
                      }`}>
                        {item.icon}
                      </span>
                      <span className="text-lg font-medium">{item.name}</span>
                    </div>
                    
                    <div className="flex items-center z-10">
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold 
                          ${darkMode 
                            ? "bg-blue-500/80 text-white" 
                            : "bg-blue-500 text-white"}`
                        }>
                          {item.badge}
                        </span>
                      )}
                      
                      <AnimatePresence>
                        {(hoveredItem === item.name || isActive) && (
                          <motion.div
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -5 }}
                            transition={{ duration: 0.2 }}
                            className="ml-2"
                          >
                            <FaChevronRight className={`text-sm ${
                              isActive 
                                ? darkMode ? "text-blue-400" : "text-blue-600" 
                                : darkMode ? "text-gray-400" : "text-gray-500"
                            }`} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Background hover effect */}
                    {hoveredItem === item.name && !isActive && (
                      <motion.div 
                        className={`absolute inset-0 -z-10 opacity-10 ${
                          darkMode ? "bg-blue-500" : "bg-blue-200"
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Status Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`mx-4 mb-4 p-4 rounded-lg ${
          darkMode 
            ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white" 
            : "bg-gradient-to-r from-gray-100 to-white text-gray-800"
        } shadow-lg`}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full bg-green-500 animate-pulse`}></div>
          <p className="text-sm font-medium">System Status: Online</p>
        </div>
        <div className="mt-2 text-xs font-medium opacity-75">Last updated: Today, 3:45 PM</div>
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: ${darkMode ? "#222222" : "#f1f1f1"};
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: ${darkMode ? "#444444" : "#bbbbbb"};
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: ${darkMode ? "#555555" : "#888888"};
          }
        `}
      </style>

      {/* Footer */}
      <div className={`border-t p-5 text-center ${
        darkMode 
          ? "border-gray-700/50 text-gray-400" 
          : "border-gray-300 text-gray-600"
      }`}>
        <p className="text-sm font-medium">© 2024 DocPortal</p>
        <p className="text-xs mt-1 opacity-70">v2.4.1</p>
      </div>
    </motion.aside>
  );
};

export default Sidebar;