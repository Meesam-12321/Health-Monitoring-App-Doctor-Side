import React from 'react';
import { FaCalendarAlt, FaUserFriends, FaBell, FaFileMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Dashboard = () => {
  // Static data for display
  const stats = [
    { title: 'Total Patients', value: 45, icon: <FaUserFriends />, color: 'bg-blue-500 dark:bg-blue-700' },
    { title: 'Appointments Today', value: 8, icon: <FaCalendarAlt />, color: 'bg-green-500 dark:bg-green-700' },
    { title: 'Pending Alerts', value: 3, icon: <FaBell />, color: 'bg-yellow-500 dark:bg-yellow-600' },
    { title: 'Prescriptions Issued', value: 120, icon: <FaFileMedical />, color: 'bg-red-500 dark:bg-red-700' },
  ];

  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      time: '10:30 AM',
      condition: 'Diabetes Check-up',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      time: '11:15 AM',
      condition: 'Follow-up Consultation',
    },
    {
      id: 3,
      patientName: 'Emily Johnson',
      time: '1:00 PM',
      condition: 'Routine Physical',
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Dashboard</h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 ${stat.color}`}
            title={`Click to view more details about ${stat.title}`}
          >
            <div className="text-4xl mr-4 text-white">{stat.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Upcoming Appointments</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">Patient</th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">Time</th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">Condition</th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment.id}
                className={`${
                  index === 0
                    ? 'bg-green-500 text-white dark:bg-green-700'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{appointment.patientName}</td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{appointment.time}</td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{appointment.condition}</td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  {/* Updated View Details Button with Link */}
                  <Link
                    to={`/patients/${appointment.id}`}
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
