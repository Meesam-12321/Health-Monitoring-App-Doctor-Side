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

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/src/assets/images/logo.jpeg"
              alt="DoctorApp Logo"
              className="h-8 w-auto dark:invert"
            />
            <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
              DoctorApp
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`
              }
            >
              Appointments
            </NavLink>
            <NavLink
              to="/patients"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`
              }
            >
              Patients
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
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

            {/* User Profile */}
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img
                  src="/src/assets/images/avatar.avif"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full border-2 border-blue-500"
                />
                {/* Link to Profile Page when Dr. Smith is clicked */}
                <Link
                  to="/profile"
                  className="text-gray-800 dark:text-gray-300 text-sm font-medium hover:underline"
                >
                  Dr. Smith
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
