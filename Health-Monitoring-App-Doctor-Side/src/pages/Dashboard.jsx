import React, { useContext, useState, useEffect } from "react";
import { FaCalendarAlt, FaUserFriends, FaBell, FaFileMedical, FaSearch, FaChartLine, FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { DarkModeContext } from "../Context/DarkModeContext";
import { motion } from "framer-motion";
import axios from "axios";

const Dashboard = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const welcomeMessage = "Welcome to Your Dashboard";
  const [displayedText, setDisplayedText] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const typingSpeed = 100;
  
  // Helper function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Helper function to check if a date is in the future (including today)
  const isCurrentOrFuture = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for proper comparison
    return date >= today;
  };

  // Helper function to format appointment date for display
  const formatAppointmentDate = (dateStr) => {
    const date = new Date(dateStr);
    
    if (isToday(date)) {
      return "Today";
    }
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.getDate() === tomorrow.getDate() &&
        date.getMonth() === tomorrow.getMonth() &&
        date.getFullYear() === tomorrow.getFullYear()) {
      return "Tomorrow";
    }
    
    // For other dates, return formatted date
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Helper function to format appointment time
  const formatAppointmentTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    // Only run the typing animation once and stop when complete
    if (!animationComplete && displayedText.length < welcomeMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText(welcomeMessage.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === welcomeMessage.length) {
          setAnimationComplete(true);
        }
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [displayedText, animationComplete]);

  // Fetch appointments from the API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          throw new Error("Authentication token not found");
        }
        
        const response = await axios.get("http://localhost:3000/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Filter out past appointments and sort the remaining by date and time
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set to beginning of day for proper comparison
        
        const filteredAppointments = response.data.filter(appointment => {
          const appointmentDate = new Date(appointment.appointmentDate);
          return isCurrentOrFuture(appointmentDate);
        });
        
        // Sort appointments by date and time
        const sortedAppointments = filteredAppointments.sort((a, b) => 
          new Date(a.appointmentDate) - new Date(b.appointmentDate)
        );
        
        setAppointments(sortedAppointments);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Updated statistics with more realistic figures
  const stats = [
    { title: "Total Patients", value: 4, icon: <FaUserFriends />, color: darkMode ? "from-blue-400 to-blue-600" : "from-blue-400 to-blue-600" },
    { title: "Appointments Today", value: appointments.filter(appt => isToday(new Date(appt.appointmentDate))).length, icon: <FaCalendarAlt />, color: darkMode ? "from-blue-400 to-blue-600" : "from-blue-400 to-blue-600" },
    { title: "Pending Alerts", value: 10, icon: <FaBell />, color: darkMode ? "from-blue-400 to-blue-600" : "from-blue-400 to-blue-600" },
    { title: "Prescriptions Issued", value: 2, icon: <FaFileMedical />, color: darkMode ? "from-blue-400 to-blue-600" : "from-blue-400 to-blue-600" },
  ];

  // Updated patients without wearable references
  const patients = [
    { id: 1, name: "Aleena Sehar", age: 21, condition: "Diabetes", status: "Stable", lastVisit: "2 days ago" },
    { id: 2, name: "Meesam Imran", age: 38, condition: "Hypertension", status: "Improving", lastVisit: "1 week ago" },
    { id: 3, name: "Mudasser Raza", age: 29, condition: "Asthma", status: "Needs Review", lastVisit: "3 days ago" },
    { id: 4, name: "Adnan Bashir", age: 50, condition: "Heart Disease", status: "Critical", lastVisit: "Today" },
    { id: 5, name: "Sonia", age: 45, condition: "Migraine", status: "Stable", lastVisit: "Yesterday" },
    { id: 6, name: "Farhad", age: 62, condition: "Arthritis", status: "Improving", lastVisit: "4 days ago" },
  ];

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatNavigation = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        navigate("/chat", { state: { doctorId: decodedToken.id } });
      } catch (error) {
        console.error("Invalid Token", error);
        alert("Invalid session. Please log in again.");
      }
    } else {
      alert("You are not logged in. Please log in to access Chat.");
    }
  };

  const handlePrescriptionNavigation = () => {
    navigate("/prescription");
  };

  return (
    <div className={`transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-indigo-950 text-gray-100' 
        : 'bg-gradient-to-br from-blue-100 to-blue-300 text-gray-900'
    }`}>
  
      {/* Reduced navbar spacer height */}
      <div className="h-24"></div>
      
      <div className="p-4 md:p-8 min-h-screen">
        <motion.div 
          className="mb-6 md:mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${
            darkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600'
          }`}>
            {displayedText}
          </h1>
          <p className={`mt-2 text-lg ${darkMode ? 'text-sky-300' : 'text-blue-600'}`}>
            Stay updated with your patients and appointments
          </p>
        </motion.div>
        {/* Dashboard Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search patients or conditions..."
              className={`w-full py-3 px-4 pl-10 rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 text-white border-gray-700 focus:ring-sky-500' 
                  : 'bg-white text-gray-900 border-blue-200 focus:ring-blue-500'
              } border shadow-md focus:outline-none focus:ring-2`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className={`absolute left-3 top-3.5 ${darkMode ? 'text-sky-400' : 'text-blue-500'}`} />
          </div>
          <div className="flex gap-4">
            <motion.button
              onClick={handleChatNavigation}
              className={`px-6 py-3 rounded-lg transition-all duration-300 shadow-md flex items-center gap-2 ${
                darkMode 
                  ? 'bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white' 
                  : 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChartLine className="text-lg" />
              <span>Chat</span>
            </motion.button>
            <motion.button
              onClick={handlePrescriptionNavigation}
              className={`px-6 py-3 rounded-lg transition-all duration-300 shadow-md flex items-center gap-2 ${
                darkMode 
                  ? 'bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white' 
                  : 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFileMedical className="text-lg" />
              <span>Prescription</span>
            </motion.button>

            <Link to="/report">
            <motion.button
              className={`px-6 py-3 rounded-lg transition-all duration-300 shadow-md flex items-center gap-2 ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white' 
                  : 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaClipboardList className="text-lg" />
              <span>Reports</span>
            </motion.button>
          </Link>
          </div>
        </div>

        {/* Statistics Section - Improved animation cascade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${stat.color} text-white`}
              whileHover={{ scale: 1.03, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold opacity-90">{stat.title}</h3>
                  <p className="text-3xl font-extrabold mt-2">{stat.value}</p>
                </div>
                <div className="text-4xl opacity-80">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Upcoming Appointments - with real data from API and filtered for current/future dates */}
          <motion.div 
            className={`p-6 rounded-xl shadow-lg col-span-1 ${
              darkMode 
                ? 'bg-gray-800/90 border border-gray-700' 
                : 'bg-white/90 border border-blue-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-sky-300' : 'text-blue-800'}`}>
              <FaCalendarAlt /> Upcoming Appointments
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${darkMode ? 'border-sky-500' : 'border-blue-500'}`}></div>
              </div>
            ) : error ? (
              <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-red-900/20 text-red-300' : 'bg-red-100 text-red-600'}`}>
                <p>{error}</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700/60' : 'bg-blue-50/60'}`}>
                <p>No upcoming appointments</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Show scheduled appointments only for current and future dates */}
                {appointments
                  .filter(appt => appt.status === "scheduled")
                  .slice(0, 5)
                  .map((appointment, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-700/80 border border-gray-600' 
                          : 'bg-blue-50'
                      } shadow-sm`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{appointment.patientName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          formatAppointmentDate(appointment.appointmentDate) === "Today" 
                            ? "bg-green-500 text-white" 
                            : "bg-blue-500 text-white"
                        }`}>
                          {formatAppointmentDate(appointment.appointmentDate)}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-sky-300' : 'text-blue-600'}`}>
                        {formatAppointmentTime(appointment.appointmentDate)}
                      </p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {appointment.reason && appointment.reason.length > 30 
                          ? `${appointment.reason.substring(0, 30)}...` 
                          : appointment.reason}
                      </p>
                    </motion.div>
                  ))}
              </div>
            )}
            
            <Link 
              to="/appointments"
              className={`mt-4 w-full py-2 rounded-lg text-center block ${
                darkMode 
                  ? 'bg-sky-600 hover:bg-sky-500 text-white' 
                  : 'bg-blue-500 hover:bg-blue-400 text-white'
              } transition-colors duration-300`}
            >
              View All Appointments
            </Link>
          </motion.div>

          {/* Patients Section - with limited preview and view all functionality */}
          <motion.div 
            className={`p-6 rounded-xl shadow-lg col-span-1 lg:col-span-2 ${
              darkMode 
                ? 'bg-gray-800/90 border border-gray-700' 
                : 'bg-white/90 border border-blue-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-sky-300' : 'text-blue-800'}`}>
              <FaUserFriends /> Recent Patients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPatients.length > 0 ? (
                // Only show up to 4 patients in the dashboard
                filteredPatients.slice(0, 4).map((patient) => (
                  <motion.div 
                    key={patient.id} 
                    className={`p-4 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-700/80 border border-gray-600' 
                        : 'bg-blue-50'
                    } shadow-sm`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <p className="text-sm">Age: {patient.age}</p>
                        <p className="text-sm">Condition: {patient.condition}</p>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-sky-300' : 'text-blue-600'}`}>Last visit: {patient.lastVisit}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        patient.status === "Stable" ? "bg-green-500 text-white" : 
                        patient.status === "Improving" ? "bg-blue-500 text-white" : 
                        patient.status === "Needs Review" ? "bg-yellow-500 text-white" : 
                        "bg-red-500 text-white"
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                    <div className="mt-3">
                      <Link 
                        to={`/patients/${patient.id}`} 
                        className={`inline-block px-4 py-2 rounded-lg text-sm ${
                          darkMode 
                            ? 'bg-sky-600 hover:bg-sky-500 text-white' 
                            : 'bg-blue-500 hover:bg-blue-400 text-white'
                        } transition-colors duration-300`}
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={`col-span-2 p-8 text-center rounded-lg ${darkMode ? 'bg-gray-700/60' : 'bg-blue-50/60'}`}>
                  <p className="text-lg font-medium">No patients match your search</p>
                </div>
              )}
            </div>
            
            <Link 
              to="/patients"
              className={`mt-4 w-full py-2 rounded-lg text-center block ${
                darkMode 
                  ? 'bg-sky-600 hover:bg-sky-500 text-white' 
                  : 'bg-blue-500 hover:bg-blue-400 text-white'
              } transition-colors duration-300`}
            >
              View All Patients
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;