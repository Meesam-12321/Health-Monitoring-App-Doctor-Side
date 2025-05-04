import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../Context/DarkModeContext";
import { useNavigate } from "react-router-dom";

const Patients = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const navigate = useNavigate();

    // Fetch all patients from the backend with authToken
// Replace the useEffect hook in your Patients component with this fixed version:

useEffect(() => {
    const fetchPatients = async () => {
        setIsLoading(true);
        try {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                throw new Error("Auth token not found");
            }

            const response = await axios.get("http://localhost:3000/api/patients", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log("Patients:", response.data);
            setPatients(response.data);
            setFilteredPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error.message);
            // Extended static data with dummy data
            const staticData = [
                {
                    id: 1,
                    name: "John Doe",
                    age: 45,
                    gender: "Male",
                    condition: "Diabetes",
                    doctor: "Dr. Smith"
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    age: 38,
                    gender: "Female",
                    condition: "Hypertension",
                    doctor: "Dr. Johnson"
                },
                {
                    id: 3,
                    name: "Emily Johnson",
                    age: 50,
                    gender: "Female",
                    condition: "Arthritis",
                    doctor: "Dr. Williams"
                },
                {
                    id: 4,
                    name: "Michael Brown",
                    age: 30,
                    gender: "Male",
                    condition: "Asthma",
                    doctor: "Dr. Davis"
                },
                {
                    id: 5,
                    name: "Sarah Wilson",
                    age: 62,
                    gender: "Female",
                    condition: "Osteoporosis",
                    doctor: "Dr. Anderson"
                },
                {
                    id: 6,
                    name: "Robert Garcia",
                    age: 55,
                    gender: "Male",
                    condition: "Hypertension",
                    doctor: "Dr. Smith"
                },
                {
                    id: 7,
                    name: "Lisa Martinez",
                    age: 42,
                    gender: "Female",
                    condition: "Diabetes",
                    doctor: "Dr. Johnson"
                },
                {
                    id: 8,
                    name: "David Taylor",
                    age: 29,
                    gender: "Male",
                    condition: "Anxiety",
                    doctor: "Dr. Williams"
                },
                {
                    id: 9,
                    name: "Amanda Lewis",
                    age: 35,
                    gender: "Female",
                    condition: "Depression",
                    doctor: "Dr. Miller"
                },
                {
                    id: 10,
                    name: "Kevin Chen",
                    age: 41,
                    gender: "Male",
                    condition: "High Cholesterol",
                    doctor: "Dr. Lee"
                }
            ];
            setPatients(staticData);
            setFilteredPatients(staticData);
        } finally {
            setIsLoading(false);
        }
    };

    fetchPatients();
}, []);

    // Handle search input - improved to maintain original data
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        applyFilters(query, activeFilter);
    };

    // Apply both search and condition filters
    const applyFilters = (query = searchQuery, filter = activeFilter) => {
        let results = patients;
        
        // Apply search filter
        if (query) {
            results = results.filter((patient) =>
                patient.name.toLowerCase().includes(query)
            );
        }
        
        // Apply condition filter
        if (filter !== "all") {
            results = results.filter((patient) =>
                patient.condition.toLowerCase() === filter.toLowerCase()
            );
        }
        
        setFilteredPatients(results);
    };

    // Handle condition filter change
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        applyFilters(searchQuery, filter);
        setFilterOpen(false);
    };

    // Navigate to patient details page
    const handleViewDetails = (patientId) => {
        navigate(`/patients/${patientId}`);
    };

    // Get condition badge color based on condition
    const getConditionBadgeColor = (condition) => {
        const conditionMap = {
            "Diabetes": darkMode ? "bg-blue-800" : "bg-blue-100 text-blue-800",
            "Hypertension": darkMode ? "bg-red-800" : "bg-red-100 text-red-800",
            "Arthritis": darkMode ? "bg-yellow-800" : "bg-yellow-100 text-yellow-800",
            "Asthma": darkMode ? "bg-green-800" : "bg-green-100 text-green-800",
            "Anxiety": darkMode ? "bg-purple-800" : "bg-purple-100 text-purple-800",
            "Osteoporosis": darkMode ? "bg-orange-800" : "bg-orange-100 text-orange-800",
            "Depression": darkMode ? "bg-teal-800" : "bg-teal-100 text-teal-800",
            "High Cholesterol": darkMode ? "bg-indigo-800" : "bg-indigo-100 text-indigo-800",
        };
        
        return conditionMap[condition] || (darkMode ? "bg-gray-700" : "bg-gray-200 text-gray-800");
    };
    return (
        <div
            className={`p-4 md:p-8 min-h-screen transition-colors duration-300 ${
                darkMode
                    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
                    : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900"
            }`}
        >
            {/* Enhanced Header with stats cards */}
            <div className="mb-8">
                <h1
                    className={`text-4xl md:text-5xl font-bold text-center mt-6 mb-4 ${
                        darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    Patient Directory
                </h1>
                <p className={`text-center text-lg mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Manage and review all patient information
                </p>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Patients Card */}
                    <div className={`rounded-xl p-5 shadow-lg transition-all ${
                        darkMode ? "bg-gray-800 border-l-4 border-blue-500" : "bg-white border-l-4 border-blue-500"
                    }`}>
                        <div className="flex justify-between">
                            <div>
                                <p className={`text-sm uppercase font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total Patients</p>
                                <p className="text-2xl font-bold mt-1">{patients.length}</p>
                            </div>
                            <div className={`p-3 rounded-full ${darkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    {/* Diabetes Patients */}
                    <div className={`rounded-xl p-5 shadow-lg transition-all ${
                        darkMode ? "bg-gray-800 border-l-4 border-red-500" : "bg-white border-l-4 border-red-500"
                    }`}>
                        <div className="flex justify-between">
                            <div>
                                <p className={`text-sm uppercase font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Diabetes Patients</p>
                                <p className="text-2xl font-bold mt-1">{patients.filter(p => p.condition === "Diabetes").length}</p>
                            </div>
                            <div className={`p-3 rounded-full ${darkMode ? "bg-red-900/30" : "bg-red-100"}`}>
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    {/* Hypertension Patients */}
                    <div className={`rounded-xl p-5 shadow-lg transition-all ${
                        darkMode ? "bg-gray-800 border-l-4 border-green-500" : "bg-white border-l-4 border-green-500"
                    }`}>
                        <div className="flex justify-between">
                            <div>
                                <p className={`text-sm uppercase font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Hypertension Patients</p>
                                <p className="text-2xl font-bold mt-1">{patients.filter(p => p.condition === "Hypertension").length}</p>
                            </div>
                            <div className={`p-3 rounded-full ${darkMode ? "bg-green-900/30" : "bg-green-100"}`}>
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    {/* New Patients Last Week */}
                    <div className={`rounded-xl p-5 shadow-lg transition-all ${
                        darkMode ? "bg-gray-800 border-l-4 border-purple-500" : "bg-white border-l-4 border-purple-500"
                    }`}>
                        <div className="flex justify-between">
                            <div>
                                <p className={`text-sm uppercase font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>New This Week</p>
                                <p className="text-2xl font-bold mt-1">2</p>
                            </div>
                            <div className={`p-3 rounded-full ${darkMode ? "bg-purple-900/30" : "bg-purple-100"}`}>
                                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar and Filter Row */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
                {/* Search Bar with icon */}
                <div className="relative flex-grow max-w-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search by patient name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={`pl-10 p-3 w-full rounded-lg transition-all duration-300 ${
                            darkMode
                                ? "bg-gray-800 text-white border border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                                : "bg-white text-gray-900 border border-gray-300 focus:ring-indigo-600 focus:border-indigo-600"
                        } focus:outline-none focus:ring-2 shadow-md`}
                    />
                </div>
                
                {/* Filter Dropdown */}
                <div className="relative">
                    <button 
                        onClick={() => setFilterOpen(!filterOpen)}
                        className={`flex items-center justify-between w-full md:w-48 px-4 py-3 rounded-lg shadow-md transition-all duration-300 ${
                            darkMode
                                ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                                : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                            </svg>
                            <span>
                                {activeFilter === "all" ? "All Conditions" : activeFilter}
                            </span>
                        </div>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    
                    {filterOpen && (
                        <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg z-10 ${
                            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                        }`}>
                            <ul className="py-1">
                                <li>
                                    <button 
                                        onClick={() => handleFilterChange("all")}
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                            darkMode 
                                                ? "hover:bg-gray-700 text-gray-200" 
                                                : "hover:bg-gray-100 text-gray-800"
                                        } ${activeFilter === "all" ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
                                    >
                                        All Conditions
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleFilterChange("Diabetes")}
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                            darkMode 
                                                ? "hover:bg-gray-700 text-gray-200" 
                                                : "hover:bg-gray-100 text-gray-800"
                                        } ${activeFilter === "Diabetes" ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
                                    >
                                        Diabetes
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleFilterChange("Hypertension")}
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                            darkMode 
                                                ? "hover:bg-gray-700 text-gray-200" 
                                                : "hover:bg-gray-100 text-gray-800"
                                        } ${activeFilter === "Hypertension" ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
                                    >
                                        Hypertension
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleFilterChange("Arthritis")}
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                            darkMode 
                                                ? "hover:bg-gray-700 text-gray-200" 
                                                : "hover:bg-gray-100 text-gray-800"
                                        } ${activeFilter === "Arthritis" ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
                                    >
                                        Arthritis
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleFilterChange("Asthma")}
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                            darkMode 
                                                ? "hover:bg-gray-700 text-gray-200" 
                                                : "hover:bg-gray-100 text-gray-800"
                                        } ${activeFilter === "Asthma" ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
                                    >
                                        Asthma
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleFilterChange("Depression")}
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                            darkMode 
                                                ? "hover:bg-gray-700 text-gray-200" 
                                                : "hover:bg-gray-100 text-gray-800"
                                        } ${activeFilter === "Depression" ? (darkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
                                    >
                                        Depression
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {/* Patients Card with enhanced shadow and styling */}
            <div
                className={`rounded-xl shadow-lg transition-all duration-500 overflow-hidden ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
                }`}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center p-16">
                        <div className="relative">
                            <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 ${darkMode ? "border-indigo-400" : "border-indigo-600"}`}></div>
                            <div className={`absolute top-0 left-0 h-16 w-16 flex justify-center items-center ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                        <span className={`ml-4 text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Loading patient data...</span>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr
                                        className={`text-sm md:text-base ${
                                            darkMode
                                                ? "bg-gray-700 text-gray-200"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        <th className="px-4 md:px-6 py-3 rounded-tl-lg font-semibold">Name</th>
                                        <th className="px-4 md:px-6 py-3 font-semibold">Age</th>
                                        <th className="px-4 md:px-6 py-3 font-semibold">Gender</th>
                                        <th className="px-4 md:px-6 py-3 font-semibold">Condition</th>
                                        <th className="px-4 md:px-6 py-3 font-semibold">Doctor</th>
                                        <th className="px-4 md:px-6 py-3 rounded-tr-lg font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatients.length > 0 ? (
                                        filteredPatients.map((patient) => (
                                            <tr
                                                key={patient.id}
                                                className={`text-sm md:text-base border-b ${darkMode ? "border-gray-700" : "border-gray-200"} ${
                                                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                                                } transition duration-150 ease-in-out`}
                                            >
                                                <td className="px-4 md:px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-lg font-medium ${
                                                            patient.gender === "Male" 
                                                                ? (darkMode ? "bg-blue-600" : "bg-blue-500") 
                                                                : (darkMode ? "bg-pink-600" : "bg-pink-500")
                                                        }`}>
                                                            {patient.name.charAt(0)}
                                                        </div>
                                                        <div className="font-medium">{patient.name}</div>
                                                    </div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4">
                                                    {patient.age}
                                                </td>
                                                <td className="px-4 md:px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        patient.gender === "Male"
                                                            ? (darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800")
                                                            : (darkMode ? "bg-pink-900/30 text-pink-300" : "bg-pink-100 text-pink-800")
                                                    }`}>
                                                        {patient.gender}
                                                    </span>
                                                </td>
                                                <td className="px-4 md:px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getConditionBadgeColor(patient.condition)}`}>
                                                        {patient.condition}
                                                    </span>
                                                </td>
                                                <td className="px-4 md:px-6 py-4">
                                                    <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                                        {patient.doctor}
                                                    </span>
                                                </td>
                                                <td className="px-4 md:px-6 py-4">
                                                    <div className="flex items-center justify-center">
                                                        <button
                                                            onClick={() => handleViewDetails(patient.id)}
                                                            className={`p-2 rounded-lg transition-all duration-200 ${
                                                                darkMode
                                                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                                                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                                                            }`}
                                                            title="View Details"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center py-12"
                                            >
                                                <div className="flex flex-col items-center">
                                                    <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <p className="text-xl mb-4">No patients found matching your search criteria.</p>
                                                    {(searchQuery || activeFilter !== "all") && (
                                                        <button 
                                                            onClick={() => {
                                                                setSearchQuery("");
                                                                setActiveFilter("all");
                                                                setFilteredPatients(patients);
                                                            }}
                                                            className={`mt-2 px-6 py-2 rounded-md ${
                                                                darkMode 
                                                                    ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                                                                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                                                            }`}
                                                        >
                                                            Reset Filters
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination and action buttons */}
                        <div className={`p-4 md:p-6 flex flex-col md:flex-row gap-4 justify-between items-center ${
                            darkMode ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-200"
                        }`}>
                            {/* Pagination Controls */}
                            <div className="flex items-center justify-center md:justify-start space-x-2">
                                <button
                                    className={`p-2 rounded-md transition ${
                                        darkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    } disabled:opacity-50`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                <button
                                    className={`p-2 rounded-md transition ${
                                        darkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    } disabled:opacity-50`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                
                                <div className={`px-4 py-2 rounded-md text-sm font-medium ${
                                    darkMode ? "bg-gray-700 text-white" : "bg-indigo-50 text-indigo-700"
                                }`}>
                                    Page 1 of 1
                                </div>
                                
                                <button
                                    className={`p-2 rounded-md transition ${
                                        darkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    } disabled:opacity-50`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                                <button
                                    className={`p-2 rounded-md transition ${
                                        darkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    } disabled:opacity-50`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Action Button */}
                            <div>
                                <button 
                                    className={`px-4 py-2 rounded-md transition-all duration-300 ${
                                        darkMode
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : "bg-green-500 hover:bg-green-600 text-white"
                                    } flex items-center shadow-md`}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Add Patient
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Patients;