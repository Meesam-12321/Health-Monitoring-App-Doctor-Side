import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const AppointmentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Appointments and Patient Names
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          console.error("No auth token found");
          alert("You are not authenticated!");
          return;
        }

        const decodedToken = jwtDecode(authToken);
        const doctorId = decodedToken.id;
        console.log("Decoded Doctor ID:", doctorId);

        // Fetch all appointments
        const response = await axios.get("http://localhost:3000/api/appointments", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log("Fetched all appointments:", response.data);

        // Filter appointments by doctorId and status 'canceled'
        const filteredAppointments = response.data.filter(
          (appointment) =>
            appointment.doctor === doctorId && appointment.status === "canceled"
        );
        console.log("Filtered Appointments:", filteredAppointments);

        // Fetch patient names for each filtered appointment
        const enrichedAppointments = await Promise.all(
          filteredAppointments.map(async (appointment) => {
            try {
              const patientResponse = await axios.get(
                `http://localhost:3000/api/patients/${appointment.patient}`,
                {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              );
              console.log(
                `Fetched patient data for ID ${appointment.patient}:`,
                patientResponse.data
              );

              // Append patient name to the appointment
              return {
                ...appointment,
                patientName: patientResponse.data.name,
              };
            } catch (error) {
              console.error(
                `Failed to fetch patient data for ID ${appointment.patient}:`,
                error
              );
              return { ...appointment, patientName: "Unknown" };
            }
          })
        );

        setRequests(enrichedAppointments);
      } catch (error) {
        console.error("Error fetching appointments or patient data:", error);
        alert("Failed to load appointment requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Handle Accepting Appointments
  // Handle Accepting Appointments
// Handle Accepting Appointments
const handleAccept = async (appointmentId) => {
    try {
      console.log(`Accept button clicked for appointment ID: ${appointmentId}`);
      
      // Retrieve the auth token
      const authToken = localStorage.getItem("authToken");
  
      // Check if the token is present
      if (!authToken) {
        console.log("No authToken found, please log in.");
        alert("Authentication token is missing. Please log in again.");
        return;
      }
  
      // Make a PATCH request to update the appointment status
      const response = await axios.patch(
        `http://localhost:3000/api/appointments/${appointmentId}`,
        { status: "scheduled" },  // Changing status to 'scheduled'
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',  // Ensure Content-Type is set to JSON
          },
        }
      );
  
      console.log("Appointment accepted successfully:", response.data);
  
      // Update the state by removing the accepted appointment from the list
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== appointmentId)
      );
  
      alert("Appointment accepted successfully!");
    } catch (error) {
      console.error("Error accepting appointment:", error.response || error.message);
      alert("Failed to accept the appointment. Please try again.");
    }
  };
  
  // Handle Rejecting Appointments
  const handleReject = async (appointmentId) => {
    try {
      console.log(`Reject button clicked for appointment ID: ${appointmentId}`);
      const authToken = localStorage.getItem("authToken");
  
      const response = await axios.delete(
        `http://localhost:3000/api/appointments/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Appointment rejected successfully:", response.data);
  
      // Remove the rejected appointment from the list
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== appointmentId)
      );
  
      alert("Appointment rejected successfully!");
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      alert("Failed to reject the appointment. Please try again.");
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-5">
      <h1 className="text-white text-3xl font-bold mb-6">Appointment Requests</h1>
      <div className="space-y-5 w-full max-w-4xl">
        {requests.map((request) => (
          <div
            key={request._id} // Fixed unique key error
            className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between"
          >
            <div className="mb-4">
              <h2 className="text-white text-2xl font-semibold">{request.patientName}</h2>
              <p className="text-gray-300 text-lg">{request.reason}</p>
              <p className="text-gray-500 mt-2">
                📅 {request.date} | 🕒 {request.time}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleAccept(request._id)}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition duration-300"
              >
                <FaCheck className="mr-2" /> Accept
              </button>
              <button
                onClick={() => handleReject(request._id)}
                className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition duration-300"
              >
                <FaTimes className="mr-2" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentRequests;
