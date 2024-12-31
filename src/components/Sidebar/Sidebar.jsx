import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUserFriends, FaComments, FaCog, FaRobot } from 'react-icons/fa';
import { DarkModeContext } from "../../Context/DarkModeContext"; // Import DarkModeContext

const Sidebar = () => {
  const { darkMode } = useContext(DarkModeContext); // Access darkMode state

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Appointments', path: '/appointments', icon: <FaCalendarAlt /> },
    { name: 'Patients', path: '/patients', icon: <FaUserFriends /> },
    { name: 'Chat', path: '/chat', icon: <FaComments /> },
    { name: 'Chatbot', path: '/chatbot', icon: <FaRobot /> },
    { name: 'Settings', path: '/settings', icon: <FaCog /> },
  ];

  return (
<<<<<<< HEAD
    <aside
      className={`w-64 h-screen flex flex-col shadow-lg transition-all duration-300 ${
        darkMode ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700' : 'bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300'
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center justify-center h-24 border-b border-gray-600 transition-all duration-300 ${
          darkMode ? 'border-gray-600' : 'border-gray-300'
        } mt-11`} // Margin-top added here to push the logo down
      >
        <h1
          className={`text-3xl font-extrabold tracking-wide ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          DocPortal
        </h1>
=======
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 h-screen flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-gray-300 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DocPortal</h1>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
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
<<<<<<< HEAD
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:text-white'
                      : 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:text-white'
=======
                      ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white'
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
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
<<<<<<< HEAD
      <div
        className={`border-t p-5 text-center transition-all duration-300 ${
          darkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-600'
        }`}
      >
        <p className="text-sm">© 2024 DocPortal</p>
=======
      <div className="border-t border-gray-300 dark:border-gray-700 p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 DocPortal</p>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
      </div>
    </aside>
  );
};

export default Sidebar;
