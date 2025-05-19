import React, { useEffect, useState, useContext } from "react";
import { FaCheck, FaTimes, FaCalendarAlt, FaClock, FaExclamationCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { DarkModeContext } from "../Context/DarkModeContext";

const AppointmentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const { darkMode } = useContext(DarkModeContext);

  // Show notification function
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Fetch Appointments and Patient Names
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setError("No auth token found. Please log in again.");
          setLoading(false);
          return;
        }

        // Decode token to get doctor ID
        let decodedToken;
        try {
          decodedToken = jwtDecode(authToken);
        } catch (tokenError) {
          console.error("Failed to decode token:", tokenError);
          setError("Authentication error. Please log in again.");
          setLoading(false);
          return;
        }
        
        const doctorId = decodedToken.id;
        console.log("Decoded Doctor ID:", doctorId);

        // Fetch all appointments
        const response = await axios.get("http://localhost:3000/api/appointments", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        if (!response.data || !Array.isArray(response.data)) {
          console.error("Invalid response format:", response.data);
          setError("Received invalid data from server");
          setLoading(false);
          return;
        }
        
        console.log("Fetched all appointments:", response.data);

        // Filter appointments by doctorId and relevant statuses
        const filteredAppointments = response.data.filter(
          (appointment) =>
            appointment.doctor === doctorId && 
            (appointment.status === "pending" || appointment.status === "requested" || appointment.status === "canceled")
        );
        
        console.log("Filtered Appointments:", filteredAppointments);

        if (filteredAppointments.length === 0) {
          setRequests([]);
          setLoading(false);
          return;
        }

        // Use patientName directly from the appointment if available
        const appointmentsWithNames = filteredAppointments.map(appointment => {
          // If patientName is already in the appointment object, use it directly
          if (appointment.patientName) {
            return appointment;
          }
          
          // Otherwise, return the appointment with a promise to fetch the name
          return appointment;
        });

        // For any appointments that don't have a patientName, fetch it
        const enrichedAppointments = await Promise.all(
          appointmentsWithNames.map(async (appointment) => {
            // If we already have the patient name, return as is
            if (appointment.patientName) {
              console.log(`Using provided patientName: ${appointment.patientName} for ID: ${appointment.patient}`);
              return appointment;
            }
            
            try {
              if (!appointment.patient) {
                console.error("Appointment has no patient ID:", appointment);
                return { ...appointment, patientName: "Unknown" };
              }
              
              const patientResponse = await axios.get(
                `http://localhost:3000/api/patients/${appointment.patient}`,
                {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              );
              
              console.log(`Patient data response for ID ${appointment.patient}:`, patientResponse.data);
              
              if (!patientResponse.data) {
                return { ...appointment, patientName: "Unknown" };
              }
              
              // Check for the name in different possible locations in the response
              let patientName = "Unknown";
              if (patientResponse.data.name) {
                patientName = patientResponse.data.name;
              } else if (patientResponse.data.firstName && patientResponse.data.lastName) {
                patientName = `${patientResponse.data.firstName} ${patientResponse.data.lastName}`;
              } else if (patientResponse.data.patient && patientResponse.data.patient.name) {
                patientName = patientResponse.data.patient.name;
              }
              
              console.log(`Resolved patient name to: ${patientName}`);
              
              // Append patient name to the appointment
              return {
                ...appointment,
                patientName: patientName
              };
            } catch (error) {
              console.error(
                `Failed to fetch patient data for ID ${appointment.patient}:`,
                error.response || error.message
              );
              return { ...appointment, patientName: "Unknown" };
            }
          })
        );

        setRequests(enrichedAppointments);
      } catch (error) {
        console.error("Error fetching appointments or patient data:", error.response || error.message);
        setError("Failed to load appointment requests. " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Handle Accepting Appointments
  const handleAccept = async (appointmentId) => {
    try {
      console.log(`Accept button clicked for appointment ID: ${appointmentId}`);
      
      const authToken = localStorage.getItem("authToken");
  
      if (!authToken) {
        setError("Authentication token is missing. Please log in again.");
        return;
      }
  
      const response = await axios.patch(
        `http://localhost:3000/api/appointments/${appointmentId}`,
        { status: "scheduled" },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log("Appointment accepted successfully:", response.data);
  
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== appointmentId)
      );
  
      showNotification("Appointment accepted successfully!", "success");
    } catch (error) {
      console.error("Error accepting appointment:", error.response || error.message);
      showNotification(`Failed to accept the appointment: ${error.response?.data?.message || error.message}`, "error");
    }
  };
  
  // Handle Rejecting Appointments
  const handleReject = async (appointmentId) => {
    try {
      console.log(`Reject button clicked for appointment ID: ${appointmentId}`);
      const authToken = localStorage.getItem("authToken");
      
      if (!authToken) {
        setError("Authentication token is missing. Please log in again.");
        return;
      }
  
      const response = await axios.delete(
        `http://localhost:3000/api/appointments/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Appointment rejected successfully:", response.data);
  
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== appointmentId)
      );
  
      showNotification("Appointment rejected successfully!", "success");
    } catch (error) {
      console.error("Error rejecting appointment:", error.response || error.message);
      showNotification(`Failed to reject the appointment: ${error.response?.data?.message || error.message}`, "error");
    }
  };

  // Helper function to format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Helper function to format time nicely
  const formatTime = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
      case "requested":
        return darkMode ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-100 text-yellow-800";
      case "canceled":
        return darkMode ? "bg-red-500/20 text-red-300" : "bg-red-100 text-red-800";
      default:
        return darkMode ? "bg-gray-500/20 text-gray-300" : "bg-gray-100 text-gray-800";
    }
  };
  
  if (loading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-blue-500 mb-4"></div>
          <div className={`text-xl ${darkMode ? "text-white" : "text-gray-800"}`}>Loading appointment requests...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className={`${darkMode ? "bg-red-900/50" : "bg-red-100"} p-6 rounded-lg shadow-lg max-w-lg w-full`}>
          <div className="flex items-center mb-4">
            <FaExclamationCircle className={`h-6 w-6 ${darkMode ? "text-red-400" : "text-red-600"} mr-3`} />
            <h2 className={`text-xl font-bold ${darkMode ? "text-red-400" : "text-red-600"}`}>Error</h2>
          </div>
          <p className={darkMode ? "text-white" : "text-gray-800"}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center py-10 px-4 pt-16 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Custom notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white z-50 transition-opacity duration-300`}>
          {notification.message}
        </div>
      )}
      
      <div className="w-full max-w-5xl mx-auto">
        <div className={`mb-8 flex items-center justify-center`}>
          <div className={`w-16 h-16 rounded-full ${darkMode ? "bg-blue-500" : "bg-blue-600"} flex items-center justify-center shadow-lg`}>
            <FaCalendarAlt className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <h1 className={`text-3xl font-bold text-center ${darkMode ? "text-blue-400" : "text-blue-700"} mb-6`}>
          Appointment Requests
        </h1>
        
        <div className="space-y-6 w-full">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request._id}
                className={`rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                  darkMode 
                    ? "bg-gray-800 border border-gray-700 hover:border-blue-500/50" 
                    : "bg-white border border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <h2 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-800"} mb-2 md:mb-0`}>
                      {request.patientName || "Unknown Patient"}
                    </h2>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                      {request.status?.charAt(0).toUpperCase() + request.status?.slice(1) || "Status Unknown"}
                    </span>
                  </div>
                  
                  <div className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="text-lg">{request.reason || "No reason provided"}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className={`flex items-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      <FaCalendarAlt className="mr-2" />
                      <span>Date: {formatDate(request.appointmentDate)}</span>
                    </div>
                    <div className={`flex items-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      <FaClock className="mr-2" />
                      <span>Time: {formatTime(request.appointmentDate)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() => handleAccept(request._id)}
                      className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium shadow-md transition-all ${
                        darkMode 
                          ? "bg-green-600 hover:bg-green-500" 
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      <FaCheck className="mr-2" /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(request._id)}
                      className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium shadow-md transition-all ${
                        darkMode 
                          ? "bg-red-600 hover:bg-red-500" 
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      <FaTimes className="mr-2" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`rounded-lg shadow-lg p-10 text-center ${
              darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
            }`}>
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 mb-4 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"} flex items-center justify-center`}>
                  <FaCalendarAlt className={`h-6 w-6 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                </div>
                <p className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  No appointment requests found.
                </p>
                <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Any pending appointment requests will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentRequests;