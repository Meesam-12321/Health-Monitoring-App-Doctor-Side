<<<<<<< HEAD
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../../Context/DarkModeContext"; // Import the context
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f

const Appointments = () => {
  const { darkMode } = useContext(DarkModeContext); // Access darkMode from context
  const [filterDate, setFilterDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const staticAppointmentsData = [
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-12-06",
      time: "10:30 AM",
      condition: "Diabetes Check-up",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-12-06",
      time: "11:15 AM",
      condition: "Follow-up Consultation",
    },
    {
      id: 3,
      patientName: "Emily Johnson",
      date: "2024-12-07",
      time: "1:00 PM",
      condition: "Routine Physical",
    },
    {
      id: 4,
      patientName: "Michael Brown",
      date: "2024-12-08",
      time: "2:30 PM",
      condition: "Orthopedic Review",
    },
  ];

<<<<<<< HEAD
  // Navigate to details page
  const navigate = useNavigate();

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/appointments");
        console.log("Appointments:", response.data);
        if (response.data.length === 0) {
          console.log("No appointments found. Using static data.");
          setAppointments(staticAppointmentsData);
        } else {
          setAppointments(response.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
        setAppointments(staticAppointmentsData);
      }
    };

    fetchAppointments();
  }, []);
=======
  const [filterDate, setFilterDate] = useState('');
  const [appointments, setAppointments] = useState(appointmentsData);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const navigate = useNavigate();
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f

  // Handle date filtering
  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    if (selectedDate) {
      setAppointments(
        appointments.filter((appointment) => appointment.date === selectedDate)
      );
    } else {
      setAppointments(staticAppointmentsData); // Reset to all appointments if no date is selected
    }
  };

<<<<<<< HEAD
  // Function to handle View Details button click
  const handleViewDetails = (appointmentId) => {
    navigate(`/appointments/${appointmentId}`); // Navigate to the details page
  };
=======
  // Handle row click
  const handleRowClick = (id) => {
    setSelectedPatientId(id);
    navigate(`/appointments/${id}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f

  return (
    <div
      className={`p-8 min-h-screen ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white"
          : "bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-center mb-12">
        <h1 className="text-5xl font-bold text-center mt-8">Appointments</h1>
      </div>

      {/* Filter Section */}
      <div
        className={`flex items-center justify-between p-6 rounded-lg mb-8 shadow-md w-full ${
          darkMode ? "bg-gray-800" : "bg-white border border-gray-300"
        }`}
      >
        <label htmlFor="filterDate" className="text-lg font-medium mr-4">
          Filter by Date:
        </label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={handleFilterChange}
<<<<<<< HEAD
          className={`p-3 w-full max-w-md rounded-lg ${
            darkMode
              ? "bg-gray-900 text-white border border-gray-600 focus:ring-indigo-500"
              : "bg-white text-gray-900 border border-gray-300 focus:ring-indigo-500"
          }`}
=======
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-600"
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
        />
      </div>

      {/* Appointments Table */}
<<<<<<< HEAD
      <div
        className={`p-8 rounded-lg shadow-md w-full ${
          darkMode ? "bg-gray-800" : "bg-white border border-gray-300"
        }`}
      >
        <table className="w-full text-left table-auto">
          <thead>
            <tr
              className={`text-lg font-semibold ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              <th className="px-6 py-3 border-b border-gray-600">Patient</th>
              <th className="px-6 py-3 border-b border-gray-600">Date</th>
              <th className="px-6 py-3 border-b border-gray-600">Time</th>
              <th className="px-6 py-3 border-b border-gray-600">Condition</th>
              <th className="px-6 py-3 border-b border-gray-600">Action</th> {/* Added Action column */}
=======
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Patient
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Date
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Time
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Condition
              </th>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
<<<<<<< HEAD
                  className={`hover:transition duration-300 ease-in-out ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                >
                  <td className="px-6 py-4 border-b border-gray-600">
                    {appointment.patientName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    {appointment.date}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    {appointment.time}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    {appointment.condition}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    <button
                      onClick={() => handleViewDetails(appointment.id)} // Add View Details functionality
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      View Details
                    </button>
                  </td>
=======
                  onClick={() => handleRowClick(appointment.id)}
                  className={`cursor-pointer transition-all ${
                    selectedPatientId === appointment.id
                      ? 'bg-green-500 dark:bg-green-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {appointment.patientName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {appointment.date}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {appointment.time}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {appointment.condition}
                  </td>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
                </tr>
              ))
            ) : (
              <tr>
                <td
<<<<<<< HEAD
                  colSpan="5" // Updated to 5 since we added one more column
                  className={`text-center py-4 ${
                    darkMode ? "text-gray-400" : "text-gray-700"
                  } border-b border-gray-700`}
=======
                  colSpan="4"
                  className="text-center py-4 text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600"
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
                >
                  No appointments found for the selected date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
