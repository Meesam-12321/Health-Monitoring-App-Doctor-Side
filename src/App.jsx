import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"; // Import Navbar
import Sidebar from "./components/Sidebar/Sidebar"; // Import Sidebar
import ChatbotSidebar from "./components/Sidebar/ChatbotSidebar"; // Import ChatbotSidebar
import Dashboard from "./pages/Dashboard/Dashboard";
import Appointments from "./pages/Appointments/Appointments";
import AppointmentDetails from "./pages/Appointments/AppointmentDetails";
import ChatPage from "./pages/Chat/ChatPage";
import Chatbot from "./pages/Chatbot/Chatbot"; // Import Chatbot
import DoctorLogin from "./pages/DoctorLogin/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister/DoctorRegister";
import Patients from "./pages/Patients/Patients";
import PatientDetails from "./pages/Patients/PatientDetails";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import LandingPage from "./pages/LandingPage/LandingPage"; // Import LandingPage component

const AppLayout = () => {
  const location = useLocation(); // Get the current location

  // Determine which sidebar to render based on the route
  const isChatbotRoute = location.pathname === "/chatbot";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4">
        {isChatbotRoute ? <ChatbotSidebar /> : <Sidebar />}
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<DoctorLogin />} />
          <Route path="/register" element={<DoctorRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chatbot" element={<Chatbot />} /> {/* Chatbot Route */}
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
