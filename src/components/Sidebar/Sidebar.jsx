import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUserFriends, FaComments, FaCog, FaRobot } from "react-icons/fa";
import { DarkModeContext } from "../../Context/DarkModeContext"; // Import DarkModeContext

const Sidebar = () => {
  const { darkMode } = useContext(DarkModeContext); // Access darkMode state

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Appointments", path: "/appointments", icon: <FaCalendarAlt /> },
    { name: "Patients", path: "/patients", icon: <FaUserFriends /> },
    { name: "Chat", path: "/chat", icon: <FaComments /> },
    { name: "Chatbot", path: "/chatbot", icon: <FaRobot /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <aside
      className={`w-64 h-screen flex flex-col shadow-lg transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center justify-center h-24 border-b transition-all duration-300 ${
          darkMode ? "border-gray-600" : "border-gray-300"
        } mt-11`}
      >
        <h1
          className={`text-3xl font-extrabold tracking-wide ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          DocPortal
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold"
                      : darkMode
                      ? "text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:text-white"
                      : "text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:text-white"
                  }`
                }
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div
        className={`border-t p-5 text-center transition-all duration-300 ${
          darkMode ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-600"
        }`}
      >
        <p className="text-sm">© 2024 DocPortal</p>
      </div>
    </aside>
  );
};

export default Sidebar;
