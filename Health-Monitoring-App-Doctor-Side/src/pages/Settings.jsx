import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [allowedNotifications, setAllowedNotifications] = useState("All");

  const [availability, setAvailability] = useState({
    Monday: { available: false, from: "", to: "" },
    Tuesday: { available: false, from: "", to: "" },
    Wednesday: { available: false, from: "", to: "" },
    Thursday: { available: false, from: "", to: "" },
    Friday: { available: false, from: "", to: "" },
    Saturday: { available: false, from: "", to: "" },
    Sunday: { available: false, from: "", to: "" },
  });

  const navigate = useNavigate();

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  // Handle Availability Change
  const handleAvailabilityChange = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], available: !prev[day].available },
    }));
  };

  // Handle Time Change
  const handleTimeChange = (day, type, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  // Day badge color based on availability
  const getDayBadgeColor = (day) => {
    if (!availability[day].available) return "bg-gray-200 dark:bg-gray-700";
    return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-indigo-700 dark:to-blue-900 py-6 px-8">
          <h2 className="text-3xl font-bold text-white">Settings</h2>
          <p className="text-blue-100 mt-1">Customize your experience</p>
        </div>

        <div className="p-6 sm:p-8">
          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Appearance Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-gray-700">Appearance</h3>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                <div>
                  <span className="text-lg">Dark Mode</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:peer-focus:ring-blue-600 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-600 peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all dark:after:border-gray-600"></div>
                </label>
              </div>
            </div>

            {/* Notifications Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-gray-700">Notifications</h3>
              
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                <div>
                  <span className="text-lg">Enable Notifications</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive alerts and updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:peer-focus:ring-blue-600 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-600 peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all dark:after:border-gray-600"></div>
                </label>
              </div>

              {notificationsEnabled && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-3 ml-6 border-l-2 border-blue-500 dark:border-blue-700"
                >
                  <div>
                    <span className="text-lg">Notification Level</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Select which notifications to receive</p>
                  </div>
                  <select
                    value={allowedNotifications}
                    onChange={(e) => setAllowedNotifications(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All">All</option>
                    <option value="Regular">Regular</option>
                    <option value="Critical">Critical</option>
                    <option value="Highly Critical">Highly Critical</option>
                  </select>
                </motion.div>
              )}
            </div>

            {/* Availability Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2 dark:border-gray-700">Availability</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Set your weekly schedule and available hours</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(availability).map((day) => (
                  <motion.div 
                    key={day}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col p-4 border rounded-lg dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className={`${getDayBadgeColor(day)} text-sm font-medium px-2.5 py-0.5 rounded mr-2`}>
                          {day.slice(0, 3)}
                        </span>
                        <span className="text-lg">{day}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={availability[day].available}
                          onChange={() => handleAvailabilityChange(day)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-green-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                      </label>
                    </div>
                    
                    {availability[day].available && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-2 gap-3 mt-2"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
                          <input
                            type="time"
                            value={availability[day].from}
                            onChange={(e) => handleTimeChange(day, "from", e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                          <input
                            type="time"
                            value={availability[day].to}
                            onChange={(e) => handleTimeChange(day, "to", e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t dark:border-gray-700">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <div className="space-x-3">
              <button
                onClick={() => {
                  // Save settings logic would go here
                  alert("Settings saved successfully!");
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Save Settings
              </button>
              <button
                onClick={() => navigate("/profile/edit")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;