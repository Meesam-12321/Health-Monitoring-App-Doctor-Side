import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  // Static data
  const appointmentsData = [
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-12-06',
      time: '10:30 AM',
      condition: 'Diabetes Check-up',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-12-06',
      time: '11:15 AM',
      condition: 'Follow-up Consultation',
    },
    {
      id: 3,
      patientName: 'Emily Johnson',
      date: '2024-12-07',
      time: '1:00 PM',
      condition: 'Routine Physical',
    },
    {
      id: 4,
      patientName: 'Michael Brown',
      date: '2024-12-08',
      time: '2:30 PM',
      condition: 'Orthopedic Review',
    },
  ];

  const [filterDate, setFilterDate] = useState('');
  const [appointments, setAppointments] = useState(appointmentsData);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const navigate = useNavigate();

  // Handle date filtering
  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    if (selectedDate) {
      setAppointments(
        appointmentsData.filter((appointment) => appointment.date === selectedDate)
      );
    } else {
      setAppointments(appointmentsData);
    }
  };

  // Handle row click
  const handleRowClick = (id) => {
    setSelectedPatientId(id);
    navigate(`/appointments/${id}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>

      {/* Filter */}
      <div className="mb-6">
        <label htmlFor="filterDate" className="block text-lg font-medium mb-2">
          Filter by Date:
        </label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={handleFilterChange}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-400 dark:border-gray-600"
        />
      </div>

      {/* Appointments Table */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Patient
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Date
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Time
              </th>
              <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                Condition
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  onClick={() => handleRowClick(appointment.id)}
                  className={`cursor-pointer transition-all ${
                    selectedPatientId === appointment.id
                      ? 'bg-green-500 dark:bg-green-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {appointment.patientName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {appointment.date}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {appointment.time}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                    {appointment.condition}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-500 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600"
                >
                  No appointments found for the selected date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
