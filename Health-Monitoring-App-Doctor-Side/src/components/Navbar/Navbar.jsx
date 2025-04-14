import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DarkModeContext } from "../../Context/DarkModeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`${darkMode ? "bg-gray-900" : "bg-black"} border-b ${darkMode ? "border-gray-700" : "border-gray-800"} fixed top-0 left-0 w-full z-50 transition duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <img
                src="/src/assets/images/logo.jpeg"
                alt="DoctorApp Logo"
                className="h-8 w-8 rounded-full invert"
              />
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              DoctorApp
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-2">
            {["dashboard", "appointments", "patients"].map((path) => (
              <NavLink
                key={path}
                to={`/${path}`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 
                  ${isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : `text-gray-300 hover:bg-gray-800 hover:text-white ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-800"}`
                  }`
                }
              >
                {path === "dashboard" && (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    Dashboard
                  </span>
                )}
                {path === "appointments" && (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Appointments
                  </span>
                )}
                {path === "patients" && (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    Patients
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Dark Mode Toggle (Switch Style) */}
            <motion.div
              className="relative flex items-center cursor-pointer"
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background */}
              <div
                className={`w-12 h-6 rounded-full transition-colors duration-300 
                ${darkMode ? "bg-gradient-to-r from-blue-400 to-purple-500" : "bg-gradient-to-r from-gray-600 to-gray-500"}`}
              ></div>
              {/* Slider */}
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-lg transition-transform duration-300 
                ${darkMode
                  ? "translate-x-6 bg-white"
                  : "translate-x-0 bg-gray-800"}`}
              >
                {darkMode ? (
                  // Moon Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full p-1 text-purple-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.752 15.002A9.718 9.718 0 0112.002 22C6.476 22 2 17.523 2 12c0-4.292 2.686-7.947 6.463-9.315.345-.131.746-.03.986.24.24.27.306.656.169.993A7.724 7.724 0 004.5 12a7.5 7.5 0 0014.752 3.002c.152-.339.532-.494.892-.364.36.13.547.518.426.864z" />
                  </svg>
                ) : (
                  // Sun Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full p-1 text-yellow-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM12 20a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.22 4.22a1 1 0 00-.7 1.7l.7.7a1 1 0 101.41-1.41l-.7-.7a1 1 0 00-.7-.29zM19.07 19.07a1 1 0 00-1.41-1.41l-.7.7a1 1 0 101.41 1.41l.7-.7zM3 11H2a1 1 0 100 2h1a1 1 0 100-2zM22 11h-1a1 1 0 100 2h1a1 1 0 100-2zM6.64 6.64a1 1 0 00-.7 1.7l.7.7a1 1 0 101.41-1.41l-.7-.7a1 1 0 00-.7-.29zM17.36 17.36a1 1 0 00-1.41-1.41l-.7.7a1 1 0 101.41 1.41l.7-.7zM12 5a7 7 0 100 14 7 7 0 000-14z" />
                  </svg>
                )}
              </div>
            </motion.div>

            {/* User Profile */}
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <NavLink
                to="/profile"
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-9 w-9 rounded-full p-0.5 bg-gradient-to-r from-blue-400 to-purple-500">
                  <img
                    src="/src/assets/images/avatar.avif"
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full"
                  />
                </div>
                <span className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors duration-300">
                  Dr. Smith
                  <span className="block text-xs text-gray-400 group-hover:text-gray-300">Online</span>
                </span>
              </NavLink>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <svg
                  className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${darkMode ? "bg-gray-900" : "bg-black"}`}>
              {["dashboard", "appointments", "patients"].map((path) => (
                <NavLink
                  key={path}
                  to={`/${path}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  <div className="flex items-center">
                    {path === "dashboard" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    )}
                    {path === "appointments" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    )}
                    {path === "patients" && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    )}
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </div>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;