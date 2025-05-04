import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../Context/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Calendar, Clock, Search, User, Activity } from "lucide-react";

const Appointments = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [filterDate, setFilterDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"

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

  // Hardcoded patient data matching dashboard
  const dashboardPatients = {
    "patient1": "Aleena Sehar",
    "patient2": "Meesam Imran",
    "patient3": "Eman",
    "patient4": "Mishaal",
    "patient5": "Sonia Arshad",
    "patient6": "Mudasser Raza",
    "patient7": "Javid",
    "patient8": "Jasmine",
    "patient9": "Rehan",
    "patient10": "Madeeha",
    "patient11": "Maneeha",
    "patient12": "Musawer"
  };

  // Generate condition-based badge colors
  const getConditionColor = (condition) => {
    const conditionMap = {
      "Diabetes": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Hypertension": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "Asthma": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Heart Disease": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "Migraine": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      "Arthritis": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Annual Checkup": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Allergies": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Back Pain": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "Headache": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    };
    
    return conditionMap[condition] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
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
      setIsLoading(true);
      try {
        const doctorId = getDoctorIdFromToken();
        console.log("Doctor ID from Token:", doctorId);

        if (!doctorId) {
          console.log("No doctor ID found in token.");
          setAppointments([]);
          setIsLoading(false);
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
      } finally {
        setIsLoading(false);
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

  // Handle search filtering
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle view mode between list and grid
  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  // Get filtered appointments
  const getFilteredAppointments = () => {
    let filtered = appointments;
    
    // Filter by date if set
    if (filterDate) {
      filtered = filtered.filter(
        (appointment) =>
          new Date(appointment.appointmentDate).toLocaleDateString("en-CA") === filterDate
      );
    }
    
    // Filter by search query if set
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (appointment) => {
          const patientName = patients[appointment.patient] || "";
          const reason = appointment.reason || "";
          return (
            patientName.toLowerCase().includes(query) ||
            reason.toLowerCase().includes(query)
          );
        }
      );
    }
    
    return filtered;
  };

  // Handle row click
  const handleAppointmentClick = (id) => {
    setSelectedPatientId(id);
    navigate(`/appointments/${id}`);
  };

  const filteredAppointments = getFilteredAppointments();
  // Function to get initials from patient name
  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Function to get random pastel color for avatar backgrounds
  const getAvatarColor = (patientId) => {
    const colors = [
      "bg-blue-200 text-blue-800",
      "bg-green-200 text-green-800",
      "bg-yellow-200 text-yellow-800",
      "bg-red-200 text-red-800",
      "bg-purple-200 text-purple-800",
      "bg-pink-200 text-pink-800",
      "bg-indigo-200 text-indigo-800",
      "bg-teal-200 text-teal-800",
    ];
    
    // Use patient ID to determine color (consistent per patient)
    const colorIndex = patientId.charCodeAt(patientId.length - 1) % colors.length;
    return colors[colorIndex];
  };

  // Format appointment time to be more readable
  const formatAppointmentTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit",
      hour12: true 
    });
  };

  // Format date to be more readable
  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      weekday: "long",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
        : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900"
    }`}>
      {/* Header with animated gradient */}
      <div className={`relative overflow-hidden ${
        darkMode 
          ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900" 
          : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
      }`}>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-white/[0.05]"></div>
        <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center">
            <Calendar className="mr-3 h-8 w-8" />
            Appointments Dashboard
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl">
            Manage your scheduled patient appointments and access detailed information.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
      </div>

      {/* Controls Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className={`rounded-lg shadow-xl p-6 mb-8 transition-all duration-300 ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              </div>
              <input
                type="text"
                placeholder="Search patients or conditions..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`pl-10 pr-4 py-3 w-full rounded-lg focus:ring-2 transition-all duration-300 ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500" 
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-600 focus:border-indigo-600"
                }`}
              />
            </div>
            
            {/* Date Filter */}
            <div className="relative max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              </div>
              <input
                type="date"
                id="filterDate"
                value={filterDate}
                onChange={handleFilterChange}
                className={`pl-10 pr-4 py-3 w-full rounded-lg focus:ring-2 transition-all duration-300 ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500" 
                    : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-indigo-600 focus:border-indigo-600"
                }`}
              />
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center justify-end">
              <button
                onClick={toggleViewMode}
                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                <span className="mr-2">View:</span>
                <span className={`font-medium ${viewMode === "grid" ? "text-indigo-500" : ""}`}>
                  {viewMode === "list" ? "List" : "Grid"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {isLoading ? (
          // Loading State
          <div className={`rounded-lg shadow-lg p-8 text-center ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Loading appointments...
            </p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          // No Appointments State
          <div className={`rounded-lg shadow-lg p-8 text-center ${
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
          }`}>
            <div className="py-12">
              <Calendar className={`mx-auto h-16 w-16 mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <h3 className={`text-xl font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                No appointments found
              </h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {searchQuery || filterDate 
                  ? "Try adjusting your filters to see more results." 
                  : "There are no scheduled appointments at this time."}
              </p>
            </div>
          </div>
        ) : viewMode === "list" ? (
          // List View
          <div className={`rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={
                    darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-50 text-gray-700"
                  }>
                    <th className="px-6 py-4 text-left font-medium">Patient</th>
                    <th className="px-6 py-4 text-left font-medium">Date</th>
                    <th className="px-6 py-4 text-left font-medium">Time</th>
                    <th className="px-6 py-4 text-left font-medium">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      onClick={() => handleAppointmentClick(appointment._id)}
                      className={`cursor-pointer transition-colors duration-200 ${
                        selectedPatientId === appointment._id
                          ? darkMode 
                              ? "bg-indigo-900 bg-opacity-50" 
                              : "bg-indigo-50"
                          : darkMode
                              ? "hover:bg-gray-700"
                              : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                            getAvatarColor(appointment.patient)
                          }`}>
                            {getInitials(patients[appointment.patient])}
                          </div>
                          <div className="ml-4">
                            <div className={`font-medium ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}>
                              {patients[appointment.patient] || "Loading..."}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                            {formatAppointmentDate(appointment.appointmentDate)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-400" />
                          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                            {formatAppointmentTime(appointment.appointmentDate)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          getConditionColor(appointment.reason)
                        }`}>
                          {appointment.reason}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment._id}
                onClick={() => handleAppointmentClick(appointment._id)}
                className={`cursor-pointer rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                  selectedPatientId === appointment._id
                    ? darkMode 
                        ? "ring-2 ring-indigo-500 bg-gray-800" 
                        : "ring-2 ring-indigo-500 bg-white"
                    : darkMode
                        ? "bg-gray-800 hover:shadow-xl border border-gray-700" 
                        : "bg-white hover:shadow-xl border border-gray-200"
                }`}
              >
                <div className={`p-5 ${darkMode ? "border-b border-gray-700" : "border-b"}`}>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                      getAvatarColor(appointment.patient)
                    }`}>
                      {getInitials(patients[appointment.patient])}
                    </div>
                    <div className="ml-4">
                      <h3 className={`text-lg font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {patients[appointment.patient] || "Loading..."}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        getConditionColor(appointment.reason)
                      }`}>
                        {appointment.reason}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <div className="flex items-center mb-2">
                    <Calendar className={`h-5 w-5 mr-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={darkMode ? "text-gray-200" : "text-gray-700"}>
                      {formatAppointmentDate(appointment.appointmentDate)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className={`h-5 w-5 mr-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                    <span className={darkMode ? "text-gray-200" : "text-gray-700"}>
                      {formatAppointmentTime(appointment.appointmentDate)}
                    </span>
                  </div>
                </div>
                <div className={`px-5 py-3 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                  <div className="flex justify-end">
                    <button className={`px-3 py-1 rounded text-sm font-medium ${
                      darkMode 
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                        : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                    }`}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Appointment count summary */}
        {filteredAppointments.length > 0 && (
          <div className="mt-6 text-center">
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Showing {filteredAppointments.length} {filteredAppointments.length === 1 ? "appointment" : "appointments"}
              {filterDate && ` for ${new Date(filterDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;