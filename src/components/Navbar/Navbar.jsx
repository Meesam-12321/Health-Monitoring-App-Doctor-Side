import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DarkModeContext } from "../../Context/DarkModeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav
      className={`bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50 transition duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/src/assets/images/logo.jpeg"
              alt="DoctorApp Logo"
              className="h-8 w-8 rounded-full dark:invert"
            />
            <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white transition duration-300">
              DoctorApp
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            {["dashboard", "appointments", "patients"].map((path) => (
              <NavLink
                key={path}
                to={`/${path}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  }`
                }
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle (Switch Style) */}
            <div
              className="relative flex items-center cursor-pointer"
              onClick={toggleDarkMode}
            >
              {/* Background */}
              <div
                className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  darkMode ? "bg-gray-600" : "bg-yellow-300"
                }`}
              ></div>
              {/* Slider */}
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md transition-transform duration-300 ${
                  darkMode
                    ? "translate-x-6 bg-gray-900"
                    : "translate-x-0 bg-yellow-500"
                }`}
              >
                {darkMode ? (
                  // Moon Icon for Dark Mode
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full p-1 text-gray-200"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.752 15.002A9.718 9.718 0 0112.002 22C6.476 22 2 17.523 2 12c0-4.292 2.686-7.947 6.463-9.315.345-.131.746-.03.986.24.24.27.306.656.169.993A7.724 7.724 0 004.5 12a7.5 7.5 0 0014.752 3.002c.152-.339.532-.494.892-.364.36.13.547.518.426.864z" />
                  </svg>
                ) : (
                  // Sun Icon for Light Mode
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full p-1 text-yellow-100"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM12 20a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.22 4.22a1 1 0 00-.7 1.7l.7.7a1 1 0 101.41-1.41l-.7-.7a1 1 0 00-.7-.29zM19.07 19.07a1 1 0 00-1.41-1.41l-.7.7a1 1 0 101.41 1.41l.7-.7zM3 11H2a1 1 0 100 2h1a1 1 0 100-2zM22 11h-1a1 1 0 100 2h1a1 1 0 100-2zM6.64 6.64a1 1 0 00-.7 1.7l.7.7a1 1 0 101.41-1.41l-.7-.7a1 1 0 00-.7-.29zM17.36 17.36a1 1 0 00-1.41-1.41l-.7.7a1 1 0 101.41 1.41l.7-.7zM12 5a7 7 0 100 14 7 7 0 000-14z" />
                  </svg>
                )}
              </div>
            </div>

            {/* User Profile */}
            <div className="relative">
              <NavLink
                to="/profile"
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src="/src/assets/images/avatar.avif"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full border-2 border-blue-500"
                />
                <span className="text-gray-800 dark:text-gray-300 text-sm font-medium hover:underline">
                  Dr. Smith
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
