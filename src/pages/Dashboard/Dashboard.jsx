import React from 'react';
import { FaCalendarAlt, FaUserFriends, FaBell, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  // Static data for display
  const stats = [
    { title: 'Total Patients', value: 45, icon: <FaUserFriends />, color: 'bg-blue-500' },
    { title: 'Appointments Today', value: 8, icon: <FaCalendarAlt />, color: 'bg-green-500' },
    { title: 'Pending Alerts', value: 3, icon: <FaBell />, color: 'bg-yellow-500' },
    { title: 'Performance', value: '85%', icon: <FaChartLine />, color: 'bg-purple-500' },
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
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg shadow-md ${stat.color}`}
          >
            <div className="text-4xl mr-4">{stat.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-700">Patient</th>
              <th className="px-4 py-2 border-b border-gray-700">Time</th>
              <th className="px-4 py-2 border-b border-gray-700">Condition</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-700">
                <td className="px-4 py-2 border-b border-gray-700">{appointment.patientName}</td>
                <td className="px-4 py-2 border-b border-gray-700">{appointment.time}</td>
                <td className="px-4 py-2 border-b border-gray-700">{appointment.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
