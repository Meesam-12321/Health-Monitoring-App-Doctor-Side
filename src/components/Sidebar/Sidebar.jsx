import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUserFriends, FaComments, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Appointments', path: '/appointments', icon: <FaCalendarAlt /> },
    { name: 'Patients', path: '/patients', icon: <FaUserFriends /> },
    { name: 'Chat', path: '/chat', icon: <FaComments /> },
    { name: 'Settings', path: '/settings', icon: <FaCog /> },
  ];

  return (
    <aside className="w-64 bg-gray-800 h-screen flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">DocPortal</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700 p-4">
        <p className="text-sm text-gray-500">© 2024 DocPortal</p>
      </div>
    </aside>
  );
};

export default Sidebar;
