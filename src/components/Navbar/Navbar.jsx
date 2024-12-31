<<<<<<< HEAD
import React, { useContext } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import { DarkModeContext } from "../../Context/DarkModeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext); // Use the DarkModeContext
=======
import React from "react";
import { NavLink, Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode); // Update darkMode state

    // Save darkMode preference in localStorage
    localStorage.setItem("darkMode", newDarkMode);

    // Apply the dark mode class to the root element
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f

  return (
    <nav className={`bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50 transition duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo (DoctorApp) */}
          <div className="flex items-center">
            <img
              src="/src/assets/images/logo.jpeg"
              alt="DoctorApp Logo"
              className="h-8 w-auto dark:invert"
            />
            <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white transition duration-300">
              DoctorApp
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/dashboard"
<<<<<<< HEAD
              className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              activeClassName="text-blue-500 font-bold"
=======
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`
              }
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/appointments"
<<<<<<< HEAD
              className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              activeClassName="text-blue-500 font-bold"
=======
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`
              }
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            >
              Appointments
            </NavLink>
            <NavLink
              to="/patients"
<<<<<<< HEAD
              className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              activeClassName="text-blue-500 font-bold"
=======
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`
              }
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            >
              Patients
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <div
              onClick={toggleDarkMode}
<<<<<<< HEAD
              className="relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer transition duration-300"
            >
              <div
                className={`absolute w-6 h-6 rounded-full bg-yellow-500 dark:bg-gray-800 flex items-center justify-center text-white transform transition-transform duration-300 ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              >
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.752 15.002A9.718 9.718 0 0112.002 22C6.476 22 2 17.523 2 12c0-4.292 2.686-7.947 6.463-9.315.345-.131.746-.03.986.24.24.27.306.656.169.993A7.724 7.724 0 004.5 12a7.5 7.5 0 0014.752 3.002c.152-.339.532-.494.892-.364.36.13.547.518.426.864z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM12 20a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.22 4.22a1 1 0 00-.7 1.7l.7.7a1 1 0 101.41-1.41l-.7-.7a1 1 0 00-.7-.29zM19.07 19.07a1 1 0 00-1.41-1.41l-.7.7a1 1 0 101.41 1.41l.7-.7zM3 11H2a1 1 0 100 2h1a1 1 0 100-2zM22 11h-1a1 1 0 100 2h1a1 1 0 100-2zM6.64 6.64a1 1 0 00-.7 1.7l.7.7a1 1 0 101.41-1.41l-.7-.7a1 1 0 00-.7-.29zM17.36 17.36a1 1 0 00-1.41-1.41l-.7.7a1 1 0 101.41 1.41l.7-.7zM12 5a7 7 0 100 14 7 7 0 000-14z" />
                  </svg>
                )}
              </div>
            </div>
=======
              className="flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
            >
              {/* Toggle icon based on darkMode */}
              {darkMode ? (
                // Sun icon (Dark Mode, so it switches to Light Mode)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m8.66-8.66h-1m-14.14 0h-1m1.93-6.07l-.71-.71m12.02 12.02l-.71-.71m.71-12.02l-.71.71m-12.02 12.02l-.71.71M12 5a7 7 0 100 14 7 7 0 000-14z"
                  />
                </svg>
              ) : (
                // Half Moon icon (Light Mode, so it switches to Dark Mode)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9a9 9 0 010-18z"
                  />
                </svg>
              )}
              <span className="ml-2">{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f

            {/* User Profile (Logo next to Dr. Smith) - Now clickable */}
            <div className="relative">
              <NavLink to="/profile" className="flex items-center space-x-2 focus:outline-none">
                <img
                  src="/src/assets/images/avatar.avif"  // Keep the same avatar logo (not the DoctorApp logo)
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full border-2 border-blue-500"
                />
                {/* Link to Profile Page when Dr. Smith is clicked */}
                <Link
                  to="/profile"
                  className="text-gray-800 dark:text-gray-300 text-sm font-medium hover:underline"
                >
                  Dr. Smith
<<<<<<< HEAD
                </span>
              </NavLink>
=======
                </Link>
              </button>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
