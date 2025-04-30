<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
=======
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
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
import { DarkModeProvider } from "./Context/DarkModeContext"; // Import DarkModeProvider

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
  const [darkMode, setDarkMode] = useState(() => {
    // Get the current theme from localStorage
    return localStorage.getItem("darkMode") === "true" ? true : false;
  });

  // Apply theme when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");  // Apply dark theme to the root element
      localStorage.setItem("darkMode", "true"); // Save the preference to localStorage
    } else {
      document.documentElement.classList.remove("dark");  // Remove dark theme from root
      localStorage.setItem("darkMode", "false"); // Save the preference to localStorage
    }
  }, [darkMode]);

  return (
<<<<<<< HEAD
    <DarkModeProvider> {/* Wrap the application with the DarkModeProvider */}
      <Router>
        <AppLayout />
      </Router>
    </DarkModeProvider>
=======
    <Router>
      <div className={darkMode ? "dark" : ""}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="w-1/4">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Navbar with dark mode toggle */}
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

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
      </div>
    </Router>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
  );
}

export default App;
