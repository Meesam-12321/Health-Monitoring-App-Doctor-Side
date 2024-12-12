import React, { useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
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
            <a
              href="#"
              className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Appointments
            </a>
            <a
              href="#"
              className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Patients
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-800 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            </button>

            {/* User Profile */}
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img
                  src="/src/assets/images/avatar.avif"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full border-2 border-blue-500"
                />
                <span className="text-gray-800 dark:text-gray-300 text-sm font-medium">
                  Dr. Smith
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
