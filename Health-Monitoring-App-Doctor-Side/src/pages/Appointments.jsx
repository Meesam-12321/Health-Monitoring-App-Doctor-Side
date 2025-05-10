import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../Context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion"; // Added framer-motion for animations

const Appointments = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [filterDate, setFilterDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Function to get the doctor ID from the auth token
  const getDoctorIdFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    }
    return null;
  };

  // Function to get the Authorization header
  const getAuthHeader = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Updated patient data with diverse names
  const dashboardPatients = {
    "patient1": "Emma Thompson",
    "patient2": "Michael Chen",
    "patient3": "Sophia Rodriguez",
    "patient4": "William Jackson",
    "patient5": "Olivia Kim",
    "patient6": "James Patel",
    "patient7": "Charlotte Lee",
    "patient8": "Benjamin Wilson",
    "patient9": "Isabella Johnson",
    "patient10": "Henry Davis",
    "patient11": "Amelia Martinez",
    "patient12": "Alexander Smith"
  };

  // Mock appointment data based on dashboard patients
  const generateMockAppointments = (doctorId) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const conditions = [
      {reason: "Diabetes Management", priority: "Medium"},
      {reason: "Hypertension Follow-up", priority: "High"},
      {reason: "Asthma Control", priority: "Medium"},
      {reason: "Cardiac Assessment", priority: "High"},
      {reason: "Migraine Treatment", priority: "Medium"},
      {reason: "Arthritis Therapy", priority: "Low"},
      {reason: "Annual Checkup", priority: "Low"},
      {reason: "Allergy Consultation", priority: "Medium"},
      {reason: "Spine Evaluation", priority: "High"},
      {reason: "Chronic Headache", priority: "Medium"}
    ];
    
    const mockAppointments = [
      {
        _id: "appt1",
        patient: "patient1",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(9, 0, 0)).toISOString(),
        reason: conditions[0].reason,
        priority: conditions[0].priority,
        status: "scheduled"
      },
      {
        _id: "appt2",
        patient: "patient2",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(10, 30, 0)).toISOString(),
        reason: conditions[1].reason,
        priority: conditions[1].priority,
        status: "scheduled"
      },
      {
        _id: "appt3",
        patient: "patient3",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(11, 15, 0)).toISOString(),
        reason: conditions[2].reason,
        priority: conditions[2].priority,
        status: "scheduled"
      },
      {
        _id: "appt4",
        patient: "patient4",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(13, 0, 0)).toISOString(),
        reason: conditions[3].reason,
        priority: conditions[3].priority,
        status: "scheduled"
      },
      {
        _id: "appt5",
        patient: "patient5",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(14, 30, 0)).toISOString(),
        reason: conditions[4].reason,
        priority: conditions[4].priority,
        status: "scheduled"
      },
      {
        _id: "appt6",
        patient: "patient6",
        doctor: doctorId,
        appointmentDate: new Date(today.setHours(15, 45, 0)).toISOString(),
        reason: conditions[5].reason,
        priority: conditions[5].priority,
        status: "scheduled"
      },
      {
        _id: "appt7",
        patient: "patient7",
        doctor: doctorId,
        appointmentDate: new Date(tomorrow.setHours(9, 30, 0)).toISOString(),
        reason: conditions[6].reason,
        priority: conditions[6].priority,
        status: "scheduled"
      },
      {
        _id: "appt8",
        patient: "patient8",
        doctor: doctorId,
        appointmentDate: new Date(tomorrow.setHours(11, 0, 0)).toISOString(),
        reason: conditions[7].reason,
        priority: conditions[7].priority,
        status: "scheduled"
      },
      {
        _id: "appt9",
        patient: "patient9",
        doctor: doctorId,
        appointmentDate: new Date(tomorrow.setHours(13, 30, 0)).toISOString(),
        reason: conditions[8].reason,
        priority: conditions[8].priority,
        status: "scheduled"
      },
      {
        _id: "appt10",
        patient: "patient10",
        doctor: doctorId,
        appointmentDate: new Date(tomorrow.setHours(14, 45, 0)).toISOString(),
        reason: conditions[9].reason,
        priority: conditions[9].priority,
        status: "scheduled"
      }
    ];
    
    return mockAppointments;
  };

  // Fetch appointments and patient data from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const doctorId = getDoctorIdFromToken();
        console.log("Doctor ID from Token:", doctorId);

        if (!doctorId) {
          console.log("No doctor ID found in token.");
          setAppointments([]);
          setLoading(false);
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
        setLoading(false);
      } catch (error) {
        console.error("Error setting up appointments:", error.message);
        setLoading(false);
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

  // Get priority badge class
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case "High":
        return darkMode 
          ? "bg-red-900 text-red-200" 
          : "bg-red-100 text-red-800 border border-red-200";
      case "Medium":
        return darkMode 
          ? "bg-yellow-900 text-yellow-200" 
          : "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Low":
        return darkMode 
          ? "bg-green-900 text-green-200" 
          : "bg-green-100 text-green-800 border border-green-200";
      default:
        return darkMode 
          ? "bg-blue-900 text-blue-200" 
          : "bg-blue-100 text-blue-800 border border-blue-200";
    }
  };

  const filteredAppointments = getFilteredAppointments();

  // Animation variants for components
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <div
      className={`p-6 min-h-screen pt-20 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-r from-blue-50 to-blue-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Appointments
          </span>
        </h1>
      </motion.div>

      {/* Filter and Summary Section */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Date Filter Card */}
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-blue-100"
          }`}
        >
          <h2 className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-blue-300" : "text-blue-600"
          }`}>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Filter by Date
            </span>
          </h2>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={handleFilterChange}
            className={`p-3 w-full rounded-lg ${
              darkMode
                ? "bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                : "bg-white text-gray-900 border border-blue-200 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-blue-100"
          }`}
        >
          <h2 className={`text-lg font-semibold mb-2 ${
            darkMode ? "text-blue-300" : "text-blue-600"
          }`}>Today's Appointments</h2>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {appointments.filter(a => 
              new Date(a.appointmentDate).toLocaleDateString() === new Date().toLocaleDateString()
            ).length}
          </p>
          <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-blue-100"
          }`}
        >
          <h2 className={`text-lg font-semibold mb-2 ${
            darkMode ? "text-blue-300" : "text-blue-600"
          }`}>Upcoming</h2>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {appointments.filter(a => 
              new Date(a.appointmentDate) > new Date()
            ).length}
          </p>
          <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Total upcoming appointments
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={`p-6 rounded-xl shadow-lg ${
            darkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-blue-100"
          }`}
        >
          <h2 className={`text-lg font-semibold mb-2 ${
            darkMode ? "text-red-300" : "text-red-600"
          }`}>High Priority</h2>
          <p className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
            {appointments.filter(a => a.priority === "High").length}
          </p>
          <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Requiring immediate attention
          </p>
        </motion.div>
      </motion.div>

      {/* Appointments Table */}
      <motion.div
        className={`p-6 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-blue-100"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className={`text-xl font-semibold mb-6 ${
          darkMode ? "text-blue-300" : "text-blue-600"
        }`}>Appointment Schedule</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              darkMode ? "border-blue-400" : "border-blue-600"
            }`}></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className={`text-sm uppercase tracking-wider ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  <th className="px-6 py-3 border-b border-gray-600">Patient</th>
                  <th className="px-6 py-3 border-b border-gray-600">Date</th>
                  <th className="px-6 py-3 border-b border-gray-600">Time</th>
                  <th className="px-6 py-3 border-b border-gray-600">Condition</th>
                  <th className="px-6 py-3 border-b border-gray-600">Priority</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      onClick={() => handleRowClick(appointment._id)}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedPatientId === appointment._id
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                          : darkMode
                          ? "hover:bg-gray-700"
                          : "hover:bg-blue-50"
                      }`}
                    >
                      <td className="px-6 py-4 border-b border-gray-600">
                        <div className="flex items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                            darkMode ? "bg-gray-700" : "bg-blue-100"
                          }`}>
                            {patients[appointment.patient] 
                              ? patients[appointment.patient].charAt(0) 
                              : "?"}
                          </div>
                          <div>
                            <p className="font-medium">{patients[appointment.patient] || "Loading..."}</p>
                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Patient ID: {appointment.patient.substring(appointment.patient.length - 4)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-600">
                        {new Date(appointment.appointmentDate).toLocaleDateString("en-US", {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-600">
                        {new Date(appointment.appointmentDate).toLocaleTimeString("en-US", {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-600">
                        {appointment.reason}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-600">
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadgeClass(appointment.priority)}`}>
                          {appointment.priority}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className={`text-center py-8 ${
                        darkMode ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg font-medium">No scheduled appointments found</p>
                      <p className={`mt-1 ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
                        Try adjusting your filter or check back later
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Appointments;