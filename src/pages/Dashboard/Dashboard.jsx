import React from 'react';
import { FaCalendarAlt, FaUserFriends, FaBell, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    { title: 'Total Patients', value: 45, icon: <FaUserFriends />, color: 'bg-gradient-to-r from-blue-400 to-blue-600' },
    { title: 'Appointments Today', value: 8, icon: <FaCalendarAlt />, color: 'bg-gradient-to-r from-green-400 to-green-600' },
    { title: 'Pending Alerts', value: 3, icon: <FaBell />, color: 'bg-gradient-to-r from-yellow-400 to-yellow-600' },
    { title: 'Performance', value: '85%', icon: <FaChartLine />, color: 'bg-gradient-to-r from-purple-400 to-purple-600' },
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
    <div className="pt-20 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
          Welcome to Your Dashboard
        </h1>
        <p className="mt-4 text-lg text-gray-400">Stay updated with your patients and appointments</p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  {stats.map((stat, index) => (
    <div
      key={index}
      className={`flex items-center p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 ${stat.color}`}
    >
      <div className="text-5xl text-white mr-4">{stat.icon}</div>
      <div className="flex-1 min-w-0">
        {/* Title */}
        <h2 className="text-base font-semibold text-gray-100 truncate">
          {stat.title}
        </h2>
        {/* Value */}
        <p className="text-3xl font-bold text-white truncate">
          {stat.value}
        </p>
      </div>
    </div>
  ))}
</div>


      {/* Upcoming Appointments Section */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Upcoming Appointments</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="px-6 py-3 text-lg border-b border-gray-600">Patient</th>
              <th className="px-6 py-3 text-lg border-b border-gray-600">Time</th>
              <th className="px-6 py-3 text-lg border-b border-gray-600">Condition</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="hover:bg-gray-700 transition-colors duration-300"
              >
                <td className="px-6 py-4 border-b border-gray-600 text-gray-200">
                  {appointment.patientName}
                </td>
                <td className="px-6 py-4 border-b border-gray-600 text-gray-200">{appointment.time}</td>
                <td className="px-6 py-4 border-b border-gray-600 text-gray-200">{appointment.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <div className="mt-4 text-center text-gray-400">No upcoming appointments</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
