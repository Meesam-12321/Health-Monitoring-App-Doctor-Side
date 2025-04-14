import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatbotSidebar from "./components/Sidebar/ChatbotSidebar";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import AppointmentDetails from "./pages/AppointmentDetails";
import AppointmentRequests from "./pages/AppointmentRequests";
import ChatPage from "./pages/ChatPage";
import Chatbot from "./pages/Chatbot";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import LandingPage from "./pages/LandingPage";
import Settings from "./pages/Settings";
import PrescriptionForm from './pages/Prescriptions';
import { DarkModeProvider } from "./Context/DarkModeContext";

const AppLayout = () => {
  const location = useLocation();
  const isChatbotRoute = location.pathname === "/chatbot";

  // Hide Navbar and Sidebar on login and register pages
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/" || location.pathname === "/chat";

  // State to manage current chat ID
  const [currentChatId, setCurrentChatId] = useState(null);

  // Handler for starting a new chat
  const handleStartNewChat = (newChatId) => {
    setCurrentChatId(newChatId); // Update current chat ID
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden"> {/* Prevent horizontal overflow */}
      {/* Conditionally render Sidebar */}
      {!isAuthRoute && (
        <div className="w-64"> {/* Fixed width for sidebar */}
          {isChatbotRoute ? (
            <ChatbotSidebar
              onStartNewChat={handleStartNewChat} // Pass handler to ChatbotSidebar
              currentChatId={currentChatId}
            />
          ) : (
            <Sidebar />
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden"> {/* Prevent horizontal overflow */}
        {/* Conditionally render Navbar */}
        {!isAuthRoute && <Navbar />}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<DoctorLogin />} />
          <Route path="/register" element={<DoctorRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
          <Route path="/appointmentRequests" element={<AppointmentRequests />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route
            path="/chatbot"
            element={<Chatbot chatId={currentChatId} />} // Pass current chat ID to Chatbot
          />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/prescription" element={<PrescriptionForm />} />
        </Routes>
      </div>
    </div>
  );
};


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Get the current theme from localStorage
    return localStorage.getItem("darkMode") === "true";
  });

  // Apply theme when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <DarkModeProvider>
      {/* Wrap everything inside BrowserRouter */}
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
