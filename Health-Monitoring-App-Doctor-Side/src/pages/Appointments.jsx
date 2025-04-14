import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../Context/DarkModeContext"; // Import the context
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode the auth token

const Appointments = () => {
  const { darkMode } = useContext(DarkModeContext); // Access darkMode from context
  const [filterDate, setFilterDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const navigate = useNavigate();

  // Function to get the doctor ID from the auth token
  const getDoctorIdFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id; // Assuming the decoded token contains doctor id as "id"
    }
    return null;
  };

  // Function to get the Authorization header
  const getAuthHeader = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch appointments and patient data from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/appointments",
          { headers: getAuthHeader() } // Pass Authorization header
        );

        // Get doctor ID from token
        const doctorId = getDoctorIdFromToken();
        console.log("Doctor ID from Token:", doctorId);

        if (doctorId) {
          // Filter appointments based on doctor ID and status: "scheduled"
          const filteredAppointments = response.data.filter(
            (appointment) =>
              appointment.doctor === doctorId && appointment.status === "scheduled"
          );
          console.log("Filtered Appointments:", filteredAppointments);
          setAppointments(filteredAppointments);
          console.log(filteredAppointments)

          // Fetch patient data for each appointment
          const patientIds = [...new Set(filteredAppointments.map(a => a.patient))];
          fetchPatientsData(patientIds);
        } else {
          console.log("No doctor ID found in token.");
          setAppointments([]); // Handle the case where doctor ID is not available
        }
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized. Please log in.");
        }
        // Handle other potential errors (e.g., network errors)
      }
    };

    // Fetch patients based on patient IDs
    const fetchPatientsData = async (patientIds) => {
      try {
        const patientDataPromises = patientIds.map((patientId) =>
          axios.get(`http://localhost:3000/api/patients/${patientId}`, {
            headers: getAuthHeader(),
          })
        );
        const patientDataResponses = await Promise.all(patientDataPromises);
        const patientsData = patientDataResponses.reduce((acc, response) => {
          const patient = response.data;
          acc[patient._id] = patient.name; // Store patient name with ID as the key
          return acc;
        }, {});
        setPatients(patientsData); // Update the patients state with fetched names
      } catch (error) {
        console.error("Error fetching patient data:", error.message);
      }
    };

    fetchAppointments();
  }, []);

  // Handle date filtering
  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    if (selectedDate) {
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) =>
            new Date(appointment.appointmentDate).toLocaleDateString("en-CA") === selectedDate
        )
      );
    } else {
      setAppointments((prevAppointments) => prevAppointments); // Reset to all filtered appointments
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
                  key={appointment._id} // Use unique key (e.g., _id from the API response)
                  onClick={() => handleRowClick(appointment._id)}
                  className={`cursor-pointer hover:transition duration-300 ease-in-out ${
                    selectedPatientId === appointment._id
                      ? "bg-blue-600 text-white"
                      : darkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <td className="px-6 py-4 border-b border-gray-600">
                    {patients[appointment.patient] || "Loading..."} {/* Display patient name */}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    {new Date(appointment.appointmentDate).toLocaleDateString("en-CA")}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    {new Date(appointment.appointmentDate).toLocaleTimeString("en-GB")}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    {appointment.reason}
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
                  No scheduled appointments found.
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
