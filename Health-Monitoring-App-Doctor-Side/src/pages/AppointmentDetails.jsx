import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaUserMd, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaNotesMedical } from 'react-icons/fa';

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
    <div className="p-6 pt-16 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Header with breadcrumb - positioned lower to avoid navigation bar */}
      <div className="mb-8 mt-8">
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
          <button
            onClick={() => navigate('/appointments')}
            className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaArrowLeft className="mr-2 text-sm" />
            <span>Appointments</span>
          </button>
          <span className="mx-2">/</span>
          <span className="text-blue-600 dark:text-blue-400">Details</span>
        </div>
        <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300">
          Appointment Details
        </h1>
      </div>

      {/* Appointment Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300">
        {/* Appointment Header */}
        <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm">Appointment ID: #{appointment.id}</p>
              <h2 className="text-2xl font-semibold mt-1">{appointment.condition}</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-lg font-medium">
              {appointment.date} | {appointment.time}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Patient and Doctor Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Patient Info */}
            <div className="flex items-start p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                <FaUser className="text-blue-600 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100">Patient</h3>
                <p className="text-blue-700 dark:text-blue-300 font-semibold">{appointment.patientName}</p>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex items-start p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                <FaUserMd className="text-blue-600 dark:text-blue-300 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100">Doctor</h3>
                <p className="text-blue-700 dark:text-blue-300 font-semibold">{appointment.doctorName}</p>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Date Info */}
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <FaCalendarAlt className="text-blue-500 dark:text-blue-400 mr-3 text-lg" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</h3>
                <p className="text-gray-900 dark:text-white">{appointment.date}</p>
              </div>
            </div>

            {/* Time Info */}
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <FaClock className="text-blue-500 dark:text-blue-400 mr-3 text-lg" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</h3>
                <p className="text-gray-900 dark:text-white">{appointment.time}</p>
              </div>
            </div>

            {/* Location Info */}
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400 mr-3 text-lg" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                <p className="text-gray-900 dark:text-white">{appointment.location}</p>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <FaNotesMedical className="text-blue-500 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Notes</h3>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-md">
              <p className="text-gray-700 dark:text-gray-300">{appointment.notes}</p>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="border-t border-gray-100 dark:border-gray-700 p-6 flex justify-end gap-4">
          <button
            onClick={() => navigate('/appointments')}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;