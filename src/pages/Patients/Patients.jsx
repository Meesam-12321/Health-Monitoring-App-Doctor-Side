import React, { useState } from 'react';

const Patients = () => {
  // Static data
  const patientsData = [
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
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState(patientsData);

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setPatients(
      patientsData.filter((patient) =>
        patient.name.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Patients</h1>

      {/* Search Bar */}
      <div className="w-full max-w-4xl mb-6">
        <label htmlFor="search" className="block text-lg font-medium mb-2">
          Search Patients:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Enter patient name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 w-full rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-600"
        />
      </div>

      {/* Patients Table */}
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Name
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Age
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Gender
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Condition
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {patient.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {patient.age}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {patient.gender}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {patient.condition}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {patient.contact}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600"
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
