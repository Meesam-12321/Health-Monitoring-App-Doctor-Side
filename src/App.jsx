import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatbotSidebar from "./components/Sidebar/ChatbotSidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Appointments from "./pages/Appointments/Appointments";
import AppointmentDetails from "./pages/Appointments/AppointmentDetails";
import ChatPage from "./pages/Chat/ChatPage";
import Chatbot from "./pages/Chatbot/Chatbot";
import DoctorLogin from "./pages/DoctorLogin/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister/DoctorRegister";
import Patients from "./pages/Patients/Patients";
import PatientDetails from "./pages/Patients/PatientDetails";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import LandingPage from "./pages/LandingPage/LandingPage";
import { DarkModeProvider } from "./Context/DarkModeContext";

const AppLayout = () => {
  const location = useLocation();
  const isChatbotRoute = location.pathname === "/chatbot";

  // State to manage current chat ID
  const [currentChatId, setCurrentChatId] = useState(null);

  // Handler for starting a new chat
  const handleStartNewChat = (newChatId) => {
    setCurrentChatId(newChatId); // Update current chat ID
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4">
        {isChatbotRoute ? (
          <ChatbotSidebar
            onStartNewChat={handleStartNewChat} // Pass handler to ChatbotSidebar
            currentChatId={currentChatId}
          />
        ) : (
          <Sidebar />
        )}
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
          <Route
            path="/chatbot"
            element={<Chatbot chatId={currentChatId} />} // Pass current chat ID to Chatbot
          />
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
      <Router>
        <AppLayout />
      </Router>
    </DarkModeProvider>
  );
}

export default App;
