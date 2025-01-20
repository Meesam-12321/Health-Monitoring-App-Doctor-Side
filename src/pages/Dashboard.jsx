import React, { useContext } from "react";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaBell,
  FaFileMedical,
  FaChartLine,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode to decode the token
import { DarkModeContext } from "../Context/DarkModeContext";

const Dashboard = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const stats = [
    { title: "Total Patients", value: 45, icon: <FaUserFriends />, color: "bg-blue-500 dark:bg-blue-700" },
    { title: "Appointments Today", value: 8, icon: <FaCalendarAlt />, color: "bg-green-500 dark:bg-green-700" },
    { title: "Pending Alerts", value: 3, icon: <FaBell />, color: "bg-yellow-500 dark:bg-yellow-600" },
    { title: "Prescriptions Issued", value: 120, icon: <FaFileMedical />, color: "bg-red-500 dark:bg-red-700" },
  ];

  const appointments = [
    { id: 1, patientName: "John Doe", time: "10:30 AM", condition: "Diabetes Check-up" },
    { id: 2, patientName: "Jane Smith", time: "11:15 AM", condition: "Follow-up Consultation" },
    { id: 3, patientName: "Emily Johnson", time: "1:00 PM", condition: "Routine Physical" },
  ];

  const handleChatNavigation = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        console.log(decodedToken);// Decode the token
        navigate("/chat", { state: { doctorId: decodedToken.id } }); // Pass doctorId to Chat screen
      } catch (error) {
        console.error("Invalid Token", error);
        alert("Invalid session. Please log in again.");
      }
    } else {
      alert("You are not logged in. Please log in to access Chat.");
    }
  };

  return (
    <div
      className={`pt-20 p-8 min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
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

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 ${stat.color}`}
          >
            <div className="text-5xl text-white mr-4">{stat.icon}</div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-gray-100 truncate">{stat.title}</h2>
              <p className="text-3xl font-bold text-white truncate">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Navigation */}
      <div className="mb-8">
        <button
          onClick={handleChatNavigation}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Go to Chat
        </button>
      </div>

      {/* Upcoming Appointments Section */}
      <div className={`p-8 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white border border-gray-300"}`}>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>Upcoming Appointments</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className={`${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
              <th className="px-6 py-3 text-lg border-b">Patient</th>
              <th className="px-6 py-3 text-lg border-b">Time</th>
              <th className="px-6 py-3 text-lg border-b">Condition</th>
              <th className="px-6 py-3 text-lg border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className={`hover:${darkMode ? "bg-gray-700" : "bg-gray-200"} transition-colors duration-300`}
              >
                <td className="px-6 py-4 border-b">{appointment.patientName}</td>
                <td className="px-6 py-4 border-b">{appointment.time}</td>
                <td className="px-6 py-4 border-b">{appointment.condition}</td>
                <td className="px-6 py-4 border-b">
                  <Link
                    to={`/patients/${appointment.id}`}
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <div className={`mt-4 text-center ${darkMode ? "text-gray-400" : "text-gray-700"}`}>No upcoming appointments</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
