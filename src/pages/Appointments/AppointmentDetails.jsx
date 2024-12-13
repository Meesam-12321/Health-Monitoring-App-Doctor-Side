import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importing an icon for the back button

const AppointmentDetails = () => {
  const navigate = useNavigate();

  // Static data for an example appointment
  const appointment = {
    id: 1,
    patientName: 'John Doe',
    doctorName: 'Dr. Emily Carter',
    date: '2024-12-10',
    time: '3:00 PM',
    location: 'Room 202, City Hospital',
    condition: 'Diabetes follow-up',
    notes:
      'Patient requires a thorough review of blood sugar levels. Discuss recent lab results and potential adjustments to insulin dosage.',
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-500">Appointment Details</h1>
        <button
          onClick={() => navigate('/appointments')}
          className="flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Appointments
        </button>
      </div>

      {/* Appointment Card */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-2">Appointment Information</h2>
          <p className="text-gray-300">ID: {appointment.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Patient Info */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Patient</h3>
            <p className="text-gray-200">{appointment.patientName}</p>
          </div>

          {/* Doctor Info */}
          <div className="bg-gradient-to-r from-teal-400 via-blue-500 to-green-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Doctor</h3>
            <p className="text-gray-200">{appointment.doctorName}</p>
          </div>

          {/* Date Info */}
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Date</h3>
            <p className="text-gray-200">{appointment.date}</p>
          </div>

          {/* Time Info */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Time</h3>
            <p className="text-gray-200">{appointment.time}</p>
          </div>

          {/* Location Info */}
          <div className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Location</h3>
            <p className="text-gray-200">{appointment.location}</p>
          </div>

          {/* Condition Info */}
          <div className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Condition</h3>
            <p className="text-gray-200">{appointment.condition}</p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-8">
          <h3 className="text-xl font-medium text-blue-400">Notes</h3>
          <p className="text-gray-300 mt-2">{appointment.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
