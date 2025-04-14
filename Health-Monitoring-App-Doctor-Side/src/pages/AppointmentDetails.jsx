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
    <div className="p-6 min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Appointment Details</h1>
        <button
          onClick={() => navigate('/appointments')}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all ease-in-out duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Appointments
        </button>
      </div>

      {/* Appointment Card */}
      <div className="p-8 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Appointment Information
          </h2>
          <p className="text-gray-400">ID: {appointment.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Patient Info */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Patient</h3>
            <p className="text-gray-300">{appointment.patientName}</p>
          </div>

          {/* Doctor Info */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Doctor</h3>
            <p className="text-gray-300">{appointment.doctorName}</p>
          </div>

          {/* Date Info */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Date</h3>
            <p className="text-gray-300">{appointment.date}</p>
          </div>

          {/* Time Info */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Time</h3>
            <p className="text-gray-300">{appointment.time}</p>
          </div>

          {/* Location Info */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Location</h3>
            <p className="text-gray-300">{appointment.location}</p>
          </div>

          {/* Condition Info */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            <h3 className="text-xl font-medium text-white">Condition</h3>
            <p className="text-gray-300">{appointment.condition}</p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-8">
          <h3 className="text-xl font-medium text-white">Notes</h3>
          <p className="text-gray-400 mt-2">{appointment.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
