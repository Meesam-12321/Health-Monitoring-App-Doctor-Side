import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Patients = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [patients, setPatients] = useState([]);

    // Fetch all patients from the backend
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/patients');
                console.log('Patients:', response.data);  
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error.message);
                // If no patients data, show static data
                setPatients([
                    {
                        id: 1,
                        name: 'John Doe',
                        age: 45,
                        gender: 'Male',
                        condition: 'Diabetes',
                        contact: '555-1234',
                    },
                    {
                        id: 2,
                        name: 'Jane Smith',
                        age: 38,
                        gender: 'Female',
                        condition: 'Hypertension',
                        contact: '555-5678',
                    },
                    {
                        id: 3,
                        name: 'Emily Johnson',
                        age: 50,
                        gender: 'Female',
                        condition: 'Arthritis',
                        contact: '555-9101',
                    },
                    {
                        id: 4,
                        name: 'Michael Brown',
                        age: 30,
                        gender: 'Male',
                        condition: 'Asthma',
                        contact: '555-1122',
                    },
                ]);
            }
        };

        fetchPatients();
    }, []);

    // Handle search input
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setPatients(
            patients.filter((patient) =>
                patient.name.toLowerCase().includes(query)
            )
        );
    };

    return (
        <div className="p-8 bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen text-white">
            {/* Header */}
            <div className="flex items-center justify-center mb-12">
                <h1 className="text-5xl font-bold text-center mt-10">Patients</h1>
            </div>

            {/* Search Bar */}
            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    id="search"
                    placeholder="Search by patient name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-3 w-1/2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* Patients Table */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-md transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg">
                <table className="w-full text-left table-auto">
                    <thead>
                        <tr className="bg-gray-700 text-lg font-semibold text-white">
                            <th className="px-6 py-3 border-b border-gray-600">Name</th>
                            <th className="px-6 py-3 border-b border-gray-600">Age</th>
                            <th className="px-6 py-3 border-b border-gray-600">Gender</th>
                            <th className="px-6 py-3 border-b border-gray-600">Condition</th>
                            <th className="px-6 py-3 border-b border-gray-600">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.length > 0 ? (
                            patients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-700 transition duration-300 ease-in-out">
                                    <td className="px-6 py-4 border-b border-gray-600">{patient.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-600">{patient.age}</td>
                                    <td className="px-6 py-4 border-b border-gray-600">{patient.gender}</td>
                                    <td className="px-6 py-4 border-b border-gray-600">{patient.condition}</td>
                                    <td className="px-6 py-4 border-b border-gray-600">{patient.contact}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-4 text-gray-400 border-b border-gray-700"
                                >
                                    No patients found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Patients;
