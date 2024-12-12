import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"; // Import Navbar
import Sidebar from "./components/Sidebar/Sidebar"; // Import Sidebar
import Dashboard from "./pages/Dashboard/Dashboard";
import Appointments from "./pages/Appointments/Appointments";
import AppointmentDetails from "./pages/Appointments/AppointmentDetails";
import ChatPage from "./pages/Chat/ChatPage";
import DoctorLogin from "./pages/DoctorLogin/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister/DoctorRegister";
import Patients from "./pages/Patients/Patients";
import PatientDetails from "./pages/Patients/PatientDetails";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";

function App() {
  return (
    <Router>
      {/* If doctor is logged in, render the layout with Sidebar and Navbar */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-1/4">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Navbar */}
          <Navbar />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<DoctorLogin />} />
            <Route path="/register" element={<DoctorRegister />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/:id" element={<AppointmentDetails />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
