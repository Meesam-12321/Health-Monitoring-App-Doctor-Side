import React, { useContext, useState, useEffect } from "react";
import { FaCalendarAlt, FaUserFriends, FaBell, FaFileMedical, FaSearch, FaChartLine, FaClipboardList, FaPencilAlt, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { DarkModeContext } from "../Context/DarkModeContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const welcomeMessage = "Welcome to Your Dashboard";
  const [displayedText, setDisplayedText] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showManualEntryModal, setShowManualEntryModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const typingSpeed = 100;

  // Form state for manual entry
  const [manualEntry, setManualEntry] = useState({
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    glucoseLevel: "",
    oxygenLevel: "",
    timestamp: new Date().toISOString().slice(0, 16) // Default to current time in yyyy-MM-ddThh:mm format
  });

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

  const stats = [
    { title: "Total Patients", value: 45, icon: <FaUserFriends />, color: darkMode ? "from-blue-400 to-blue-600" : "from-blue-500 to-blue-700" },
    { title: "Appointments Today", value: 8, icon: <FaCalendarAlt />, color: darkMode ? "from-emerald-400 to-emerald-600" : "from-green-500 to-green-700" },
    { title: "Pending Alerts", value: 3, icon: <FaBell />, color: darkMode ? "from-amber-400 to-amber-600" : "from-yellow-500 to-yellow-700" },
    { title: "Prescriptions Issued", value: 120, icon: <FaFileMedical />, color: darkMode ? "from-violet-400 to-violet-600" : "from-purple-500 to-purple-700" },
  ];

  const patients = [
    { id: 1, name: "Aleena Sehar", age: 21, condition: "Diabetes", status: "Stable", lastVisit: "2 days ago", hasWearable: true },
    { id: 2, name: "Meesam Imran", age: 38, condition: "Hypertension", status: "Improving", lastVisit: "1 week ago", hasWearable: false },
    { id: 3, name: "Emily Johnson", age: 29, condition: "Asthma", status: "Needs Review", lastVisit: "3 days ago", hasWearable: true },
    { id: 4, name: "Michael Brown", age: 50, condition: "Heart Disease", status: "Critical", lastVisit: "Today", hasWearable: false },
  ];

  const upcomingAppointments = [
    { id: 1, patient: "John Doe", time: "10:00 AM", date: "Today" },
    { id: 2, patient: "Sarah Williams", time: "2:30 PM", date: "Today" },
    { id: 3, patient: "Robert Chen", time: "9:15 AM", date: "Tomorrow" },
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
  // Add this right after handleChatNavigation function
const handlePrescriptionNavigation = () => {
  navigate("/prescription");
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualEntry(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleManualEntrySubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send this data to your backend
    console.log("Manual entry submitted for patient:", selectedPatient);
    console.log("Data:", manualEntry);
    
    // For demo purposes, show alert
    alert(`Data submitted successfully for ${selectedPatient.name}`);
    
    // Reset form and close modal
    setManualEntry({
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      glucoseLevel: "",
      oxygenLevel: "",
      timestamp: new Date().toISOString().slice(0, 16)
    });
    setShowManualEntryModal(false);
    setSelectedPatient(null);
  };

  const openManualEntryModal = (patient) => {
    setSelectedPatient(patient);
    setShowManualEntryModal(true);
  };

  return (
    <div className={`transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-indigo-950 text-gray-100' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'
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
            {/* Add this button next to the Chat button */}
            <motion.button
              onClick={handlePrescriptionNavigation}
              className={`px-6 py-3 rounded-lg transition-all duration-300 shadow-md flex items-center gap-2 ${
                darkMode 
                  ? 'bg-gradient-to-r from-violet-500 to-violet-700 hover:from-violet-600 hover:to-violet-800 text-white' 
                  : 'bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFileMedical className="text-lg" />
              <span>Prescription</span>
            </motion.button>
            <motion.button
              className={`px-6 py-3 rounded-lg transition-all duration-300 shadow-md flex items-center gap-2 ${
                darkMode 
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white' 
                  : 'bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaClipboardList className="text-lg" />
              <span>Reports</span>
            </motion.button>
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
          {/* Upcoming Appointments */}
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
              <FaCalendarAlt /> Today's Appointments
            </h2>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  className={`p-4 rounded-lg ${
                    darkMode 
                      ? 'bg-gray-700/80 border border-gray-600' 
                      : 'bg-blue-50'
                  } shadow-sm`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{appointment.patient}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${appointment.date === "Today" ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}>
                      {appointment.date}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-sky-300' : 'text-blue-600'}`}>{appointment.time}</p>
                </motion.div>
              ))}
            </div>
            <button className={`mt-4 w-full py-2 rounded-lg ${
              darkMode 
                ? 'bg-sky-600 hover:bg-sky-500 text-white' 
                : 'bg-blue-500 hover:bg-blue-400 text-white'
            } transition-colors duration-300`}>
              View All Appointments
            </button>
          </motion.div>

          {/* Patients Section in Grid Format */}
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
                filteredPatients.map((patient) => (
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
                        
                        {/* Wearable status indicator */}
                        <div className={`mt-2 text-xs inline-flex items-center rounded-full px-2.5 py-1 ${
                          patient.hasWearable 
                            ? darkMode ? 'bg-green-900/40 text-green-300' : 'bg-green-100 text-green-800' 
                            : darkMode ? 'bg-orange-900/40 text-orange-300' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {patient.hasWearable ? 'Wearable Device' : 'Manual Entry'}
                        </div>
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
                    <div className="mt-3 flex gap-2">
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
                      
                      {/* Manual Entry Button (shows only for patients without wearables) */}
                      {!patient.hasWearable && (
                        <button 
                          onClick={() => openManualEntryModal(patient)}
                          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm ${
                            darkMode 
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                              : 'bg-green-500 hover:bg-green-400 text-white'
                          } transition-colors duration-300`}
                        >
                          <FaPencilAlt className="mr-1" /> Enter Data
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={`col-span-2 p-8 text-center rounded-lg ${darkMode ? 'bg-gray-700/60' : 'bg-blue-50/60'}`}>
                  <p className="text-lg font-medium">No patients match your search</p>
                </div>
              )}
            </div>
            <button className={`mt-4 w-full py-2 rounded-lg ${
              darkMode 
                ? 'bg-sky-600 hover:bg-sky-500 text-white' 
                : 'bg-blue-500 hover:bg-blue-400 text-white'
            } transition-colors duration-300`}>
              View All Patients
            </button>
          </motion.div>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {showManualEntryModal && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className={`w-full max-w-lg rounded-xl shadow-2xl ${
              darkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-blue-200'
            } p-6`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-sky-300' : 'text-blue-800'}`}>
                Manual Health Data Entry
              </h2>
              <button 
                onClick={() => setShowManualEntryModal(false)}
                className={`p-2 rounded-full ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                ✕
              </button>
            </div>
            
            <div className={`mb-4 p-3 rounded-lg ${
              darkMode 
                ? 'bg-gray-700/80' 
                : 'bg-blue-50'
            }`}>
              <p className="font-medium">{selectedPatient.name}</p>
              <p className="text-sm">Age: {selectedPatient.age} | Condition: {selectedPatient.condition}</p>
            </div>
            
            <form onSubmit={handleManualEntrySubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Blood Pressure (mmHg)
                  </label>
                  <input 
                    type="text" 
                    name="bloodPressure"
                    placeholder="e.g. 120/80"
                    value={manualEntry.bloodPressure}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Heart Rate (bpm)
                  </label>
                  <input 
                    type="number" 
                    name="heartRate"
                    placeholder="e.g. 75"
                    value={manualEntry.heartRate}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Temperature (°C)
                  </label>
                  <input 
                    type="number" 
                    name="temperature"
                    placeholder="e.g. 37.0"
                    step="0.1"
                    value={manualEntry.temperature}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Glucose Level (mg/dL)
                  </label>
                  <input 
                    type="number" 
                    name="glucoseLevel"
                    placeholder="e.g. 95"
                    value={manualEntry.glucoseLevel}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Oxygen Level (%)
                  </label>
                  <input 
                    type="number" 
                    name="oxygenLevel"
                    placeholder="e.g. 98"
                    min="0" 
                    max="100"
                    value={manualEntry.oxygenLevel}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Timestamp
                  </label>
                  <input 
                    type="datetime-local" 
                    name="timestamp"
                    value={manualEntry.timestamp}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setShowManualEntryModal(false)}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={`px-6 py-2 rounded-lg flex items-center ${
                    darkMode 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                      : 'bg-green-500 hover:bg-green-400 text-white'
                  }`}
                >
                  <FaPlus className="mr-2" /> Save Data
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;