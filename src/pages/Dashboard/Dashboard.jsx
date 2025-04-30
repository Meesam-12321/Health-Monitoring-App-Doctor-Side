<<<<<<< HEAD
import React, { useContext } from "react";
import { FaCalendarAlt, FaUserFriends, FaBell, FaChartLine } from "react-icons/fa";
import { DarkModeContext } from "../../Context/DarkModeContext"; // Import the context
=======
import React from 'react';
import { FaCalendarAlt, FaUserFriends, FaBell, FaFileMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from React Router
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f

const Dashboard = () => {
  const { darkMode } = useContext(DarkModeContext); // Access darkMode from context

  const stats = [
<<<<<<< HEAD
    { title: "Total Patients", value: 45, icon: <FaUserFriends />, color: "bg-gradient-to-r from-blue-400 to-blue-600" },
    { title: "Appointments Today", value: 8, icon: <FaCalendarAlt />, color: "bg-gradient-to-r from-green-400 to-green-600" },
    { title: "Pending Alerts", value: 3, icon: <FaBell />, color: "bg-gradient-to-r from-yellow-400 to-yellow-600" },
    { title: "Performance", value: "85%", icon: <FaChartLine />, color: "bg-gradient-to-r from-purple-400 to-purple-600" },
=======
    { title: 'Total Patients', value: 45, icon: <FaUserFriends />, color: 'bg-blue-500 dark:bg-blue-700' },
    { title: 'Appointments Today', value: 8, icon: <FaCalendarAlt />, color: 'bg-green-500 dark:bg-green-700' },
    { title: 'Pending Alerts', value: 3, icon: <FaBell />, color: 'bg-yellow-500 dark:bg-yellow-600' },
    { title: 'Prescriptions Issued', value: 120, icon: <FaFileMedical />, color: 'bg-red-500 dark:bg-red-700' },
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
  ];

  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      time: "10:30 AM",
      condition: "Diabetes Check-up",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      time: "11:15 AM",
      condition: "Follow-up Consultation",
    },
    {
      id: 3,
      patientName: "Emily Johnson",
      time: "1:00 PM",
      condition: "Routine Physical",
    },
  ];

  return (
<<<<<<< HEAD
    <div
      className={`pt-20 p-8 min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="mb-12 text-center">
        <h1
          className={`text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent ${
            darkMode
              ? "bg-gradient-to-r from-indigo-400 to-pink-500"
              : "bg-gradient-to-r from-indigo-500 to-pink-600"
          }`}
        >
          Welcome to Your Dashboard
        </h1>
        <p className="mt-4 text-lg">
          {darkMode ? "Stay updated with your patients and appointments" : "Your professional overview at a glance"}
        </p>
      </div>
=======
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Dashboard</h1>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
<<<<<<< HEAD
            className={`flex items-center p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 ${
              stat.color
            }`}
          >
            <div className="text-5xl text-white mr-4">{stat.icon}</div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-gray-100 truncate">{stat.title}</h2>
              <p className="text-3xl font-bold text-white truncate">{stat.value}</p>
=======
            className={`flex items-center p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 ${stat.color}`}
            title={`Click to view more details about ${stat.title}`}
          >
            <div className="text-4xl mr-4 text-white">{stat.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            </div>
          </div>
        ))}
      </div>

<<<<<<< HEAD
      {/* Upcoming Appointments Section */}
      <div
        className={`p-8 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white border border-gray-300"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Upcoming Appointments
        </h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className={`${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
              <th className="px-6 py-3 text-lg border-b border-gray-600">Patient</th>
              <th className="px-6 py-3 text-lg border-b border-gray-600">Time</th>
              <th className="px-6 py-3 text-lg border-b border-gray-600">Condition</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className={`hover:${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                } transition-colors duration-300`}
              >
                <td className={`px-6 py-4 border-b ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
                  {appointment.patientName}
                </td>
                <td className={`px-6 py-4 border-b ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-900"}`}>
                  {appointment.time}
                </td>
                <td className={`px-6 py-4 border-b ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-900"}`}>
                  {appointment.condition}
=======
      {/* Upcoming Appointments */}
      <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Upcoming Appointments</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">Patient</th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">Time</th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">Condition</th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment.id}
                className={`${
                  index === 0
                    ? 'bg-green-500 text-white dark:bg-green-700'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{appointment.patientName}</td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{appointment.time}</td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{appointment.condition}</td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  {/* Updated View Details Button with Link */}
                  <Link
                    to={`/patients/${appointment.id}`}
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    View Details
                  </Link>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <div
            className={`mt-4 text-center ${
              darkMode ? "text-gray-400" : "text-gray-700"
            }`}
          >
            No upcoming appointments
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
