import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from "../../Context/DarkModeContext"; // Import the context

const PatientDetails = () => {
  const { darkMode } = useContext(DarkModeContext); // Access darkMode state
  const navigate = useNavigate();

  // Static data for an example patient
  const patient = {
    id: 101,
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    contact: 'john.doe@example.com',
    phone: '+1 234-567-890',
    address: '123 Elm Street, Springfield, IL',
    medicalHistory: [
      'Diabetes - Diagnosed in 2015',
      'High Blood Pressure - Diagnosed in 2018',
      'Knee Surgery - 2021',
    ],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Wife',
      phone: '+1 234-567-891',
    },
  };

  return (
<<<<<<< HEAD
    <div
      className={`p-6 min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
=======
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Patient Details</h1>
        <button
          onClick={() => navigate('/patients')}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Back to Patients
        </button>
      </div>

      {/* Patient Information Card */}
<<<<<<< HEAD
      <div
        className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } p-6 rounded-lg shadow-lg`}
      >
=======
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {[
              { label: 'Name', value: patient.name },
              { label: 'Age', value: patient.age },
              { label: 'Gender', value: patient.gender },
              { label: 'Contact', value: patient.contact },
              { label: 'Phone', value: patient.phone },
              { label: 'Address', value: patient.address },
            ].map((info, index) => (
              <div key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">{info.label}</h3>
                <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medical History */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Medical History</h2>
          <ul className="mt-4 space-y-2">
            {patient.medicalHistory.map((item, index) => (
<<<<<<< HEAD
              <li
                key={index}
                className={`${
                  darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-900'
                } p-4 rounded-lg`}
              >
=======
              <li key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400">
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Current Medications */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Current Medications</h2>
          <ul className="mt-4 space-y-2">
            {patient.currentMedications.map((medication, index) => (
<<<<<<< HEAD
              <li
                key={index}
                className={`${
                  darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-900'
                } p-4 rounded-lg`}
              >
=======
              <li key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400">
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
                {medication}
              </li>
            ))}
          </ul>
        </div>

        {/* Emergency Contact */}
        <div>
<<<<<<< HEAD
          <h2 className="text-xl font-semibold text-blue-400">Emergency Contact</h2>
          <div
            className={`${
              darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-900'
            } p-4 rounded-lg mt-4`}
          >
            <p>
              <span className="font-medium text-gray-200">Name: </span>
              {patient.emergencyContact.name}
            </p>
            <p className="mt-2">
              <span className="font-medium text-gray-200">Relationship: </span>
              {patient.emergencyContact.relationship}
            </p>
            <p className="mt-2">
              <span className="font-medium text-gray-200">Phone: </span>
=======
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Emergency Contact</h2>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mt-4">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-200">Name: </span>
              {patient.emergencyContact.name}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-200">Relationship: </span>
              {patient.emergencyContact.relationship}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-200">Phone: </span>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
              {patient.emergencyContact.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
