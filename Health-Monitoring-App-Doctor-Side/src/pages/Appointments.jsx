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

  // Hardcoded patient data matching dashboard
  const dashboardPatients = {
    "patient1": "Aleena Sehar",
    "patient2": "Meesam Imran",
    "patient3": "Emily Johnson",
    "patient4": "Michael Brown",
    "patient5": "Sophia Garcia",
    "patient6": "David Wilson",
    "patient7": "John Doe",
    "patient8": "Sarah Williams",
    "patient9": "Robert Chen",
    "patient10": "Maria Rodriguez",
    "patient11": "James Thompson",
    "patient12": "Li Wei"
  };

  // Mock appointment data based on dashboard patients
  const generateMockAppointments = (doctorId) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const mockAppointments = [
      {
        _id: "appt1",
        patient: "patient1",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(9, 0, 0)).toISOString(),
        reason: "Diabetes",
        status: "scheduled"
      },
      {
        _id: "appt2",
        patient: "patient2",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(10, 30, 0)).toISOString(),
        reason: "Hypertension",
        status: "scheduled"
      },
      {
        _id: "appt3",
        patient: "patient3",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(11, 15, 0)).toISOString(),
        reason: "Asthma",
        status: "scheduled"
      },
      {
        _id: "appt4",
        patient: "patient4",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(13, 0, 0)).toISOString(),
        reason: "Heart Disease",
        status: "scheduled"
      },
      {
        _id: "appt5",
        patient: "patient5",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(14, 30, 0)).toISOString(),
        reason: "Migraine",
        status: "scheduled"
      },
      {
        _id: "appt6",
        patient: "patient6",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(15, 45, 0)).toISOString(),
        reason: "Arthritis",
        status: "scheduled"
      },
      {
        _id: "appt7",
        patient: "patient7",
        doctor: doctorId,
        appointmentDate: new Date(tomorrow.setHours(9, 30, 0)).toISOString(),
        reason: "Annual Checkup",
        status: "scheduled"
      },
      {
        _id: "appt8",
        patient: "patient8",
        doctor: doctorId,
        appointmentDate: new Date(tomorrow.setHours(11, 0, 0)).toISOString(),
        reason: "Allergies",
        status: "scheduled"
      },
      {
        _id: "appt9",
        patient: "patient9",
        doctor: doctorId,
        appointmentDate: new Date(tomorrow.setHours(13, 30, 0)).toISOString(),
        reason: "Back Pain",
        status: "scheduled"
      },
      {
        _id: "appt10",
        patient: "patient10",
        doctor: doctorId,
        appointmentDate: new Date(tomorrow.setHours(14, 45, 0)).toISOString(),
        reason: "Headache",
        status: "scheduled"
      }
    ];
    
    return mockAppointments;
  };

  // Fetch appointments and patient data from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = getDoctorIdFromToken();
        console.log("Doctor ID from Token:", doctorId);

        if (!doctorId) {
          console.log("No doctor ID found in token.");
          setAppointments([]);
          return;
        }

        // First try to fetch from API
        let appointmentsData = [];
        try {
          const response = await axios.get(
            "http://localhost:3000/api/appointments",
            { headers: getAuthHeader() }
          );

          // Filter appointments based on doctor ID and status: "scheduled"
          appointmentsData = response.data.filter(
            (appointment) =>
              appointment.doctor === doctorId && appointment.status === "scheduled"
          );
          
          console.log("API Appointments:", appointmentsData);
          
          // If no appointments found via API or they don't match our dashboard patients,
          // we'll supplement with mock data
          if (appointmentsData.length === 0) {
            throw new Error("No appointments found or API failed");
          }
          
          // Check if we have patient data for each appointment
          const hasAllPatientData = appointmentsData.every(appt => 
            dashboardPatients[appt.patient] || patients[appt.patient]
          );
          
          if (!hasAllPatientData) {
            // Supplement with some mock data
            const mockAppts = generateMockAppointments(doctorId);
            appointmentsData = [...appointmentsData, ...mockAppts];
          }
        } catch (error) {
          console.log("Using mock appointment data instead");
          appointmentsData = generateMockAppointments(doctorId);
        }
        
        setAppointments(appointmentsData);
        console.log("Final Appointments:", appointmentsData);

        // Create patient name mapping
        const patientMap = {};
        appointmentsData.forEach(appt => {
          // If we have a dashboard patient that matches, use it
          if (dashboardPatients[appt.patient]) {
            patientMap[appt.patient] = dashboardPatients[appt.patient];
          } else {
            // Otherwise try to fetch from API
            fetchPatientData(appt.patient);
          }
        });
        
        setPatients(patientMap);
      } catch (error) {
        console.error("Error setting up appointments:", error.message);
      }
    };

    // Fetch a single patient's data
    const fetchPatientData = async (patientId) => {
      if (dashboardPatients[patientId]) {
        // If we already have this patient in dashboard data, use that
        setPatients(prev => ({
          ...prev,
          [patientId]: dashboardPatients[patientId]
        }));
        return;
      }
      
      try {
        const response = await axios.get(
          `http://localhost:3000/api/patients/${patientId}`,
          { headers: getAuthHeader() }
        );
        const patient = response.data;
        setPatients(prev => ({
          ...prev,
          [patientId]: patient.name
        }));
      } catch (error) {
        console.error(`Error fetching patient ${patientId}:`, error.message);
        // Use a placeholder name if fetch fails
        setPatients(prev => ({
          ...prev,
          [patientId]: `Patient ${patientId.slice(-4)}`
        }));
      }
    };

    fetchAppointments();
  }, []);

  // Handle date filtering
  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
  };

  // Get filtered appointments
  const getFilteredAppointments = () => {
    if (!filterDate) {
      return appointments;
    }

    return appointments.filter(
      (appointment) =>
        new Date(appointment.appointmentDate).toLocaleDateString("en-CA") === filterDate
    );
  };

  // Handle row click
  const handleRowClick = (id) => {
    setSelectedPatientId(id);
    navigate(`/appointments/${id}`);
  };

  const filteredAppointments = getFilteredAppointments();

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
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr
                  key={appointment._id}
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
                    {patients[appointment.patient] || "Loading..."}
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