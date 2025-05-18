import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authStatus, setAuthStatus] = useState({
    token: null,
    isValid: false,
    checked: false
  });
  const [theme, setTheme] = useState(() => {
    // Get theme preference from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const navigate = useNavigate();

  // Apply theme effect
  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
    
    // Add or remove dark class from document
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Check auth token first
  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem("authToken");
      console.log("Auth token exists:", !!token);
      
      setAuthStatus({
        token: token,
        isValid: !!token, // Simple validation - just checks if token exists
        checked: true
      });
    };
    
    checkAuthToken();
  }, []);

  // Fetch patients only if we have a valid token
  useEffect(() => {
    if (!authStatus.checked) return; // Wait until auth check completes
    
    if (!authStatus.isValid) {
      setError("Authentication required. Please log in.");
      setIsLoading(false);
      return;
    }
    
    const fetchPatients = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get authToken from localStorage (should be available since we checked earlier)
        const authToken = authStatus.token;
        console.log("Using auth token:", authToken ? (authToken.substring(0, 10) + "...") : "No token");
        
        // Make the API request with proper headers
        const response = await axios.get("http://localhost:3000/api/patients", {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          // Include credentials (cookies, etc.) with the request
          withCredentials: true
        });
        
        console.log("API Response:", response.data);
        
        // Log patient data structure for debugging
        if (response.data && response.data.length > 0) {
          console.log("First patient data:", response.data[0]);
        }
        
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        
        // More detailed error message
        let errorMessage = "Failed to fetch patients";
        
        if (error.response) {
          // The request was made and the server responded with a non-2xx status code
          errorMessage += `: Server responded with status ${error.response.status}`;
          console.log("Response data:", error.response.data);
          console.log("Response headers:", error.response.headers);
          
          if (error.response.status === 401) {
            errorMessage += " - Authentication failed. Please log in again.";
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage += ": No response received from server";
        } else {
          // Something happened in setting up the request
          errorMessage += `: ${error.message}`;
        }
        
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [authStatus]);

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query) {
      const results = patients.filter((patient) =>
        patient.name && patient.name.toLowerCase().includes(query)
      );
      setFilteredPatients(results);
    } else {
      setFilteredPatients(patients);
    }
  };

  // Navigate to patient details page
  const handleViewDetails = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

  const handleLogin = () => {
    // Redirect to login page - adjust the path according to your routing setup
    navigate('/login');
  };

  // Toggle theme dropdown
  const toggleThemeDropdown = () => {
    setShowThemeDropdown(!showThemeDropdown);
  };

  // Change theme function
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    setShowThemeDropdown(false);
  };

  // Function to safely access fields that might be nested differently
  const getPatientField = (patient, field) => {
    // Direct access - check if the field exists at the top level
    if (patient && patient.hasOwnProperty(field) && patient[field] !== null && patient[field] !== undefined) {
      return patient[field];
    }
    
    // Check if the data might be inside a nested "patient" property
    // This is a common pattern in some APIs where they wrap the data
    if (patient && patient.patient && patient.patient.hasOwnProperty(field)) {
      return patient.patient[field];
    }
    
    return "N/A";
  };

  return (
    <div className={`min-h-screen pt-7 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header with navigation and theme switcher */}
      <header className={`shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className={`flex items-center ${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"} transition duration-200 mr-8`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold">Patient Directory</h1>
          </div>
          
          {/* Theme switcher dropdown */}
          <div className="relative">
            <button 
              onClick={toggleThemeDropdown}
              className={`flex items-center p-2 rounded-md ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition duration-200`}
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              <span className="hidden md:inline">Theme</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showThemeDropdown && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden z-10 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                <div className="py-1">
                  <button 
                    onClick={() => changeTheme("light")}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${theme === "dark" ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-700"} ${theme === "light" ? "font-semibold" : ""}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Light Mode
                  </button>
                  <button 
                    onClick={() => changeTheme("dark")}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${theme === "dark" ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-700"} ${theme === "dark" ? "font-semibold" : ""}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    Dark Mode
                  </button>
                  <button 
                    onClick={() => changeTheme("system")}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${theme === "dark" ? "hover:bg-gray-700 text-gray-200" : "hover:bg-gray-100 text-gray-700"} ${theme === "system" ? "font-semibold" : ""}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    System Default
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        {/* Auth error with login button */}
        {!authStatus.isValid && authStatus.checked && (
          <div className={`${theme === "dark" ? "bg-yellow-900 border-yellow-800 text-yellow-200" : "bg-yellow-100 border-yellow-400 text-yellow-700"} border px-4 py-3 rounded mb-6 flex justify-between items-center`}>
            <span>Authentication required to view patients.</span>
            <button 
              onClick={handleLogin}
              className={`${theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white px-4 py-2 rounded transition duration-200`}
            >
              Log In
            </button>
          </div>
        )}
        
        {/* Stats cards - only shown when authenticated */}
        {authStatus.isValid && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className={`rounded-lg p-4 shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${theme === "dark" ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-600"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Total Patients</p>
                  <p className="text-2xl font-semibold">{patients.length}</p>
                </div>
              </div>
            </div>
            
            <div className={`rounded-lg p-4 shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${theme === "dark" ? "bg-red-900 text-red-200" : "bg-red-100 text-red-600"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Critical Patients</p>
                  <p className="text-2xl font-semibold">
                    {patients.filter(p => getPatientField(p, "condition") === "Critical").length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`rounded-lg p-4 shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${theme === "dark" ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-600"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Moderate Cases</p>
                  <p className="text-2xl font-semibold">
                    {patients.filter(p => getPatientField(p, "condition") === "Moderate").length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`rounded-lg p-4 shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${theme === "dark" ? "bg-green-900 text-green-200" : "bg-green-100 text-green-600"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Normal Condition</p>
                  <p className="text-2xl font-semibold">
                    {patients.filter(p => {
                      const condition = getPatientField(p, "condition");
                      return condition !== "Critical" && condition !== "Moderate";
                    }).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Only show search when authenticated */}
        {authStatus.isValid && (
          <div className="mb-6">
            <div className={`relative ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              <input
                type="text"
                placeholder="Search by patient name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={`p-3 pl-10 border rounded w-full max-w-md ${
                  theme === "dark" 
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" 
                    : "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              <div className="absolute left-3 top-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && authStatus.isValid && (
          <div className={`${theme === "dark" ? "bg-red-900 border-red-800 text-red-200" : "bg-red-100 border-red-400 text-red-700"} border px-4 py-3 rounded mb-6`}>
            <p>{error}</p>
            <p className="text-sm">Please check your API connection and authentication.</p>
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && authStatus.isValid ? (
          <div className={`flex justify-center items-center p-16 rounded-lg shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-3">Loading patient data...</p>
          </div>
        ) : (
          /* Only show table when authenticated and not loading */
          authStatus.isValid && !isLoading && (
            <div className={`rounded-lg shadow overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              {patients.length === 0 && !error ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-xl font-semibold">No patients found</p>
                  <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Please add some patients to your database.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className={theme === "dark" ? "bg-gray-700" : "bg-gray-100"}>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Age</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Condition</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className={theme === "dark" ? "divide-y divide-gray-700" : "divide-y divide-gray-200"}>
                      {filteredPatients.map((patient) => (
                        <tr key={patient._id} className={theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </div>
                              <div className="ml-4">
                                <div className="font-medium">{getPatientField(patient, "name")}</div>
                                <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                  Patient ID: {patient._id.substring(0, 8)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getPatientField(patient, "age")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getPatientField(patient, "gender")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              getPatientField(patient, "condition") === "Critical" 
                                ? theme === "dark" ? "bg-red-900 text-red-200" : "bg-red-100 text-red-800" 
                                : getPatientField(patient, "condition") === "Moderate"
                                  ? theme === "dark" ? "bg-yellow-900 text-yellow-200" : "bg-yellow-100 text-yellow-800"
                                  : theme === "dark" ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"
                            }`}>
                              {getPatientField(patient, "condition") || "Normal"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleViewDetails(patient._id)}
                              className={`inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md ${
                                theme === "dark" 
                                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                                  : "bg-blue-500 hover:bg-blue-600 text-white"
                              } transition duration-150 ease-in-out`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Patients;