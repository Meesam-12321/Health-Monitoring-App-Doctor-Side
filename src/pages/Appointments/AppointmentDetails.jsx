import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        <h1 className="text-3xl font-bold">Appointment Details</h1>
        <button
          onClick={() => navigate('/appointments')}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Back to Appointments
        </button>
      </div>

      {/* Appointment Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-400">
            Appointment Information
          </h2>
          <p className="text-gray-300 mt-1">ID: {appointment.id}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-200">Patient</h3>
            <p className="text-gray-400">{appointment.patientName}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-200">Doctor</h3>
            <p className="text-gray-400">{appointment.doctorName}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-200">Date</h3>
            <p className="text-gray-400">{appointment.date}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-200">Time</h3>
            <p className="text-gray-400">{appointment.time}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-200">Location</h3>
            <p className="text-gray-400">{appointment.location}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-200">Condition</h3>
            <p className="text-gray-400">{appointment.condition}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-200">Notes</h3>
          <p className="text-gray-400 mt-2">{appointment.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
