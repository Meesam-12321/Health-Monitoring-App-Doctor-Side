import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../Context/DarkModeContext"; // Import the context
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const Appointments = () => {
  const { darkMode } = useContext(DarkModeContext); // Access darkMode from context
  const [filterDate, setFilterDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const navigate = useNavigate();

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

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/appointments");
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

  // Handle date filtering
  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    if (selectedDate) {
      setAppointments(
        staticAppointmentsData.filter((appointment) => appointment.date === selectedDate)
      );
    } else {
      setAppointments(staticAppointmentsData); // Reset to all appointments if no date is selected
    }
  };

  // Handle row click
  const handleRowClick = (id) => {
    setSelectedPatientId(id);
    navigate(`/appointments/${id}`);
  };

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
          className={`p-3 w-full max-w-md rounded-lg ${
            darkMode
              ? "bg-gray-900 text-white border border-gray-600 focus:ring-indigo-500"
              : "bg-white text-gray-900 border border-gray-300 focus:ring-indigo-500"
          }`}
        />
      </div>

      {/* Appointments Table */}
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
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  onClick={() => handleRowClick(appointment.id)}
                  className={`cursor-pointer hover:transition duration-300 ease-in-out ${
                    selectedPatientId === appointment.id
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
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
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className={`text-center py-4 ${
                    darkMode ? "text-gray-400" : "text-gray-700"
                  } border-b border-gray-700`}
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
