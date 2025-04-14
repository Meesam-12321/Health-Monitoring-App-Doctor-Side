import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../Context/DarkModeContext";

const Patients = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all patients from the backend with authToken
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
                // Fallback to static data if fetching fails
                const staticData = [
                    {
                        id: 1,
                        name: "John Doe",
                        age: 45,
                        gender: "Male",
                        condition: "Diabetes",
                        contact: "555-1234",
                    },
                    {
                        id: 2,
                        name: "Jane Smith",
                        age: 38,
                        gender: "Female",
                        condition: "Hypertension",
                        contact: "555-5678",
                    },
                    {
                        id: 3,
                        name: "Emily Johnson",
                        age: 50,
                        gender: "Female",
                        condition: "Arthritis",
                        contact: "555-9101",
                    },
                    {
                        id: 4,
                        name: "Michael Brown",
                        age: 30,
                        gender: "Male",
                        condition: "Asthma",
                        contact: "555-1122",
                    },
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
        
        if (query) {
            setFilteredPatients(
                patients.filter((patient) =>
                    patient.name.toLowerCase().includes(query)
                )
            );
        } else {
            setFilteredPatients(patients);
        }
    };

    // Get condition badge color based on condition
    const getConditionBadgeColor = (condition) => {
        const conditionMap = {
            "Diabetes": darkMode ? "bg-blue-800" : "bg-blue-100 text-blue-800",
            "Hypertension": darkMode ? "bg-red-800" : "bg-red-100 text-red-800",
            "Arthritis": darkMode ? "bg-yellow-800" : "bg-yellow-100 text-yellow-800",
            "Asthma": darkMode ? "bg-green-800" : "bg-green-100 text-green-800",
        };
        
        return conditionMap[condition] || (darkMode ? "bg-purple-800" : "bg-purple-100 text-purple-800");
    };

    return (
        <div
            className={`p-4 md:p-8 min-h-screen transition-colors duration-300 ${
                darkMode
                    ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
                    : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900"
            }`}
        >
            {/* Header with improved styling */}
            <div className="mb-8">
                <h1
                    className={`text-4xl md:text-5xl font-bold text-center mt-6 mb-2 ${
                        darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    Patient Directory
                </h1>
                <p className={`text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Manage and review all patient information
                </p>
            </div>

            {/* Search Bar with icon */}
            <div className="mb-8 flex justify-center">
                <div className="relative w-full max-w-xl">
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
            </div>

            {/* Patients Card */}
            <div
                className={`p-4 md:p-6 rounded-xl shadow-lg transition-all duration-500 ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
                }`}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center p-8">
                        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${darkMode ? "border-white" : "border-indigo-600"}`}></div>
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
                                        <th className="px-4 md:px-6 py-3 rounded-tr-lg font-semibold">Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatients.length > 0 ? (
                                        filteredPatients.map((patient) => (
                                            <tr
                                                key={patient.id}
                                                className={`text-sm md:text-base hover:${
                                                    darkMode ? "bg-gray-700" : "bg-gray-50"
                                                } transition duration-300 ease-in-out`}
                                            >
                                                <td className="px-4 md:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                                    <div className="font-medium">{patient.name}</div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                                    {patient.age}
                                                </td>
                                                <td className="px-4 md:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                                    {patient.gender}
                                                </td>
                                                <td className="px-4 md:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getConditionBadgeColor(patient.condition)}`}>
                                                        {patient.condition}
                                                    </span>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                                                    <a 
                                                        href={`tel:${patient.contact}`} 
                                                        className={`${darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-800"}`}
                                                    >
                                                        {patient.contact}
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center py-8 text-gray-500"
                                            >
                                                <div className="flex flex-col items-center">
                                                    <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <p className="text-lg">No patients found matching your search criteria.</p>
                                                    {searchQuery && (
                                                        <button 
                                                            onClick={() => {
                                                                setSearchQuery("");
                                                                setFilteredPatients(patients);
                                                            }}
                                                            className={`mt-2 px-4 py-2 text-sm rounded-md ${
                                                                darkMode 
                                                                    ? "bg-gray-700 hover:bg-gray-600 text-white" 
                                                                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                                            }`}
                                                        >
                                                            Clear Search
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className={`mt-4 px-4 py-3 text-sm text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Total patients: {filteredPatients.length}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Patients;